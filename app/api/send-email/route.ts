
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { to, subject, message } = body;

  // In a real application, you would use a service like SendGrid, AWS SES, or Nodemailer here.
  // For this demo, we'll just log the email to the console.
  
  console.log("---------------------------------------------------");
  console.log(`MOCK EMAIL SENT`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message:`);
  console.log(message);
  console.log("---------------------------------------------------");

  return NextResponse.json({ success: true, message: "Email sent successfully (mock)" });
}
