import { createServerFn } from "@tanstack/react-start";
import { toE164 } from "@/lib/firebase";

export const sendSms = createServerFn({ method: "POST" })
  .validator((data: { phone: string; message: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.HTTPSMS_API_KEY;
    const from = process.env.HTTPSMS_FROM_NUMBER;
    if (!apiKey || !from) {
      throw new Error("Missing HTTPSMS_API_KEY or HTTPSMS_FROM_NUMBER in your environment.");
    }

    const res = await fetch("https://api.httpsms.com/v1/messages/send", {
      method: "POST",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: toE164(data.phone), content: data.message }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`httpSMS send failed (${res.status}): ${body}`);
    }

    return { sent: true };
  });
