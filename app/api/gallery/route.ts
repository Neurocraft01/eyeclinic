
import { NextResponse } from "next/server";
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getGalleryImages());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newImage = addGalleryImage(body);
  return NextResponse.json(newImage);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (id) {
    deleteGalleryImage(id);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: "ID required" }, { status: 400 });
}
