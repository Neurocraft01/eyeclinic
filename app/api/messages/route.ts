import { NextResponse } from "next/server";
import { getContactMessages, addContactMessage } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getContactMessages());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newMessage = addContactMessage(body);
  
  // Trigger Email Notification
  // In a real app, this would be a separate service call
  console.log("---------------------------------------------------");
  console.log(`CONTACT FORM EMAIL TRIGGERED`);
  console.log(`To: ${newMessage.email}`);
  console.log(`Subject: We received your message: ${newMessage.subject}`);
  console.log(`Body: Dear ${newMessage.firstName},\n\nThank you for contacting Visionary Eye Clinic. We have received your message regarding "${newMessage.subject}" and will get back to you shortly.\n\nBest regards,\nThe Team`);
  console.log("---------------------------------------------------");

  return NextResponse.json(newMessage);
}
