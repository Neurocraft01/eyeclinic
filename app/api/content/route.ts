
import { NextResponse } from "next/server";
import { getAllSiteData, updatePageData, updateSiteSettings } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getAllSiteData());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, data, settings } = body;
  
  if (settings) {
    const updated = await updateSiteSettings(settings);
    return NextResponse.json(updated);
  }

  if (slug && data) {
      const updated = await updatePageData(slug, data);
      return NextResponse.json(updated);
  }
  
  return NextResponse.json({ error: "Missing slug, data, or settings" }, { status: 400 });
}
