/**
 * 카카오 알림톡 발송 유틸리티
 *
 * 사전 준비:
 * 1. 카카오 비즈니스 채널 개설 (https://business.kakao.com)
 * 2. 알림톡 발송 프로필 등록
 * 3. 메시지 템플릿 심사 승인
 * 4. REST API 키 발급
 *
 * 환경변수:
 * - KAKAO_REST_API_KEY: 카카오 REST API 키
 * - KAKAO_ALIMTALK_SENDER_KEY: 발신 프로필 키
 * - KAKAO_ALIMTALK_TEMPLATE_CODE: 승인된 템플릿 코드
 */

interface InquiryData {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  location?: string;
  budget?: string;
  message?: string;
}

interface AlimtalkResult {
  success: boolean;
  error?: string;
}

const KAKAO_API_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

function isConfigured(): boolean {
  return !!(
    process.env.KAKAO_REST_API_KEY &&
    process.env.KAKAO_ALIMTALK_SENDER_KEY &&
    process.env.KAKAO_ALIMTALK_TEMPLATE_CODE
  );
}

/**
 * 관리자에게 카카오 알림톡 발송
 */
export async function sendInquiryAlimtalk(
  data: InquiryData,
  adminPhone: string
): Promise<AlimtalkResult> {
  if (!isConfigured()) {
    console.log("[알림톡] 카카오 알림톡 미설정 - 발송 스킵");
    return { success: false, error: "카카오 알림톡이 설정되지 않았습니다." };
  }

  const senderKey = process.env.KAKAO_ALIMTALK_SENDER_KEY!;
  const templateCode = process.env.KAKAO_ALIMTALK_TEMPLATE_CODE!;
  const apiKey = process.env.KAKAO_REST_API_KEY!;

  const templateArgs = {
    name: data.name,
    phone: data.phone,
    event_type: data.eventType,
    event_date: data.eventDate,
    location: data.location || "미정",
    budget: data.budget || "협의",
    message: data.message
      ? data.message.length > 50
        ? data.message.slice(0, 50) + "..."
        : data.message
      : "없음",
  };

  try {
    const res = await fetch(
      "https://kapi.kakao.com/v1/api/talk/friends/message/default/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `KakaoAK ${apiKey}`,
        },
        body: new URLSearchParams({
          sender_key: senderKey,
          template_code: templateCode,
          receiver_number: adminPhone.replace(/-/g, ""),
          template_object: JSON.stringify(templateArgs),
        }),
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[알림톡] 발송 실패:", res.status, errorBody);
      return { success: false, error: `카카오 API 오류: ${res.status}` };
    }

    console.log("[알림톡] 발송 성공:", data.name);
    return { success: true };
  } catch (error) {
    console.error("[알림톡] 네트워크 오류:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류",
    };
  }
}

/**
 * 알림톡 설정 여부 확인용 (외부 노출)
 */
export function isAlimtalkConfigured(): boolean {
  return isConfigured();
}
