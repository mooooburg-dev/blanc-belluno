import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  sendInquiryAlimtalkToAdmin,
  sendInquiryAlimtalkToCustomer,
} from "@/lib/kakao-alimtalk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, email, eventType, eventDate, location, budget, message } = body;

    // 필수값 검증
    if (!name || !phone || !eventType || !eventDate) {
      return NextResponse.json(
        { error: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    // 1) Supabase DB 저장
    let inquiryId: string | null = null;

    if (supabase) {
      const { data, error } = await supabase
        .from("belluno_inquiries")
        .insert({
          name,
          phone,
          email: email || null,
          event_type: eventType,
          event_date: eventDate,
          location: location || null,
          budget: budget || null,
          message: message || null,
        })
        .select("id")
        .single();

      if (error) {
        console.error("[상담신청] DB 저장 실패:", error.message);
        return NextResponse.json(
          { error: "상담 신청 저장에 실패했습니다." },
          { status: 500 }
        );
      }

      inquiryId = data.id;
    }

    // 2) 카카오 알림톡 발송 (고객 + 관리자 병렬)
    const inquiryData = {
      name,
      phone,
      email,
      eventType,
      eventDate,
      location,
      budget,
      message,
    };
    const adminPhone = process.env.ADMIN_PHONE || "";

    const [customerResult, adminResult] = await Promise.all([
      sendInquiryAlimtalkToCustomer(inquiryData),
      adminPhone
        ? sendInquiryAlimtalkToAdmin(inquiryData, adminPhone)
        : Promise.resolve({ success: false, error: "ADMIN_PHONE 미설정" }),
    ]);

    const kakaoSent = customerResult.success && adminResult.success;

    if (supabase && inquiryId) {
      await supabase
        .from("belluno_inquiries")
        .update({ kakao_sent: kakaoSent })
        .eq("id", inquiryId);
    }

    return NextResponse.json({
      success: true,
      id: inquiryId,
      kakao: {
        customer: customerResult.success,
        admin: adminResult.success,
      },
    });
  } catch (error) {
    console.error("[상담신청] 처리 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
