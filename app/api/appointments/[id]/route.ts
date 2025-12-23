
import { NextResponse } from "next/server";
import { updateAppointment, deleteAppointment } from "@/lib/data";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updatedAppointment = updateAppointment(params.id, body);
  
  if (updatedAppointment) {
    return NextResponse.json(updatedAppointment);
  }
  
  return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  deleteAppointment(params.id);
  return NextResponse.json({ success: true });
}
