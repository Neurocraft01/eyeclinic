import { NextResponse } from "next/server";
import { getTeamMembers, addTeamMember, deleteTeamMember } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getTeamMembers());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newMember = await addTeamMember(body);
  return NextResponse.json(newMember);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (id) {
    await deleteTeamMember(id);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: "Missing id" }, { status: 400 });
}
