import { NextResponse } from "next/server";
import { getContactMessages, addContactMessage } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getContactMessages());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newMessage = await addContactMessage(body);
  
  // Trigger Email Notification (Mock)
  // 1. Send notification to Admin
  console.log("---------------------------------------------------");
  console.log(`[EMAIL SENT] To: admin@visionaryeye.com`);
  console.log(`Subject: New Contact Message from ${newMessage.firstName} ${newMessage.lastName}`);
  console.log(`Message: ${newMessage.message}`);
  console.log("---------------------------------------------------");

  // 2. Send Auto-reply to User
  console.log("---------------------------------------------------");
  console.log(`[EMAIL SENT] To: ${newMessage.email}`);
  console.log(`Subject: We received your message: ${newMessage.subject}`);
  console.log(`Body: Dear ${newMessage.firstName},\n\nThank you for contacting Visionary Eye Clinic. We have received your message regarding "${newMessage.subject}" and will get back to you shortly.\n\nBest regards,\nThe Team`);
  console.log("---------------------------------------------------");

  return NextResponse.json(newMessage);
}
