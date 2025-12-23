
import { NextResponse } from "next/server";
import { getAppointments, addAppointment } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getAppointments());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newAppointment = addAppointment(body);

  // Trigger Email Notification
  console.log("---------------------------------------------------");
  console.log(`APPOINTMENT BOOKING EMAIL TRIGGERED`);
  console.log(`To: ${newAppointment.email}`);
  console.log(`Subject: Appointment Request Received - Visionary Eye Clinic`);
  console.log(`Body: Dear ${newAppointment.name},\n\nWe have received your request for an appointment on ${newAppointment.date} at ${newAppointment.time} for ${newAppointment.service}.\n\nOur staff will review your request and contact you shortly to confirm.\n\nThank you,\nVisionary Eye Clinic`);
  console.log("---------------------------------------------------");

  return NextResponse.json(newAppointment);
}
