import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const OWNER_EMAIL = "chirag@bidx.ai";

if (!SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY in environment variables");
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, message } = data;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: OWNER_EMAIL }] }],
        from: { email: OWNER_EMAIL },
        subject: "MailSprout Demo Request",
        content: [{ type: "text/plain", value: `Email: ${email}\nMessage: ${message}` }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid send error:", errorText);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}