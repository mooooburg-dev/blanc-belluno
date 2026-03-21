import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import {
  getPortfolioItems,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  reorderPortfolioItems,
  type Category,
} from "@/lib/portfolio";

export async function GET() {
  const items = getPortfolioItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
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

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${uuidv4()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  const item = addPortfolioItem({
    id: uuidv4(),
    filename,
    originalName: file.name,
    category,
    title,
    tag,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, category, title, tag } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const item = updatePortfolioItem(id, { category, title, tag });
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const success = deletePortfolioItem(id);
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
  const items = reorderPortfolioItems(orderedIds);
  return NextResponse.json(items);
}
