import { NextResponse } from "next/server";
import { getInstagramFeed } from "@/lib/instagram";

export async function GET() {
  const posts = await getInstagramFeed(6);
  return NextResponse.json({ posts });
}
