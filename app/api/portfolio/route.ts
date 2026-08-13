import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import { processUploadImage } from "@/lib/image";
import {
  getPortfolioItems,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  reorderPortfolioItems,
  type Category,
} from "@/lib/portfolio";

export async function GET() {
  const items = await getPortfolioItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const category = (formData.get("category") as Category) || "PARTY";
  const title = (formData.get("title") as string) || "";
  const tag = (formData.get("tag") as string) || "";
  const linkUrl = (formData.get("linkUrl") as string) || "";

  // sharp로 리사이즈·WebP 압축 (GIF는 원본 유지)
  const { buffer, ext, contentType } = await processUploadImage(file, {
    maxDimension: 2000,
  });
  const filename = `${uuidv4()}.${ext}`;

  // Supabase Storage에 업로드
  const { error: uploadError } = await supabase.storage
    .from("belluno-uploads")
    .upload(filename, buffer, {
      contentType,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: "Upload failed: " + uploadError.message },
      { status: 500 }
    );
  }

  const item = await addPortfolioItem({
    id: uuidv4(),
    filename,
    originalName: file.name,
    category,
    title,
    tag,
    linkUrl,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, category, title, tag, linkUrl } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const item = await updatePortfolioItem(id, { category, title, tag, linkUrl });
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const success = await deletePortfolioItem(id);
  if (!success) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const { orderedIds } = await request.json();
  if (!Array.isArray(orderedIds)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  const items = await reorderPortfolioItems(orderedIds);
  return NextResponse.json(items);
}
