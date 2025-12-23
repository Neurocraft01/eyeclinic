import { NextResponse } from "next/server";
import { getTestimonials, addTestimonial, deleteTestimonial } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTestimonial = await addTestimonial(body);
  return NextResponse.json(newTestimonial);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (id) {
    await deleteTestimonial(id);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: "Missing id" }, { status: 400 });
}
