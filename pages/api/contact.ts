// /pages/api/contact.js
import nodemailer from "nodemailer";
import { wrapWithTracking } from "@/lib/sendEmailWithTracking";
import { NextApiRequest, NextApiResponse } from "next";
import { findUserByEmail, createUser } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(200).json({ message: "Already registered" });
    }

    await createUser(email);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clearcuttoday.com';
    const origin = req.headers.origin || siteUrl;
    await sendEmail(email, 1, origin); // send Day 1 message immediately
    
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

interface DailyContent {
  [key: number]: string;
}

export async function sendEmail(to: string, day: number, origin: string = 'https://yourdomain.com') {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subjects: DailyContent = {
    1: "Day 1 – Acknowledging Your Journey",
    2: "Day 2 – Understanding Your Emotions",
    3: "Day 3 – Setting Healthy Boundaries",
    4: "Day 4 – Reclaiming Your Power",
    5: "Day 5 – Processing and Releasing",
    6: "Day 6 – Reconnecting With Yourself",
    7: "Day 7 – Envisioning Your Path Forward",
  };

  const htmlBodies: DailyContent = {
    1: `<h2>Day 1 – Acknowledging Your Journey</h2><p>Welcome to your healing journey. Today, we honor where you've been and the strength it took to get here. Whether you're healing from heartbreak, family estrangement, workplace toxicity, or emotional wounds, this is your safe space.</p><p><strong>Journal Prompt:</strong> What emotions are you carrying with you today? Name them without judgment.</p>`,

    2: `<h2>Day 2 – Understanding Your Emotions</h2><p>Emotions are not your enemies; they're messengers. Today, let's practice sitting with our feelings without letting them overwhelm us.</p><p><strong>Journal Prompt:</strong> What physical sensations do you notice when you reflect on your current emotional state?</p>`,

    3: `<h2>Day 3 – Setting Healthy Boundaries</h2><p>Boundaries are the foundation of emotional wellbeing. Today, we'll explore what healthy boundaries look like in your relationships and environment.</p><p><strong>Journal Prompt:</strong> What's one boundary you need to set or strengthen in your life?</p>`,

    4: `<h2>Day 4 – Reclaiming Your Power</h2><p>Your worth isn't defined by others' actions or words. Today, we focus on rebuilding your sense of self and personal power.</p><p><strong>Journal Prompt:</strong> What's one thing you love about yourself that no one can take away?</p>`,

    5: `<h2>Day 5 – Processing and Releasing</h2><p>Healing isn't about forgetting; it's about processing and making peace. Today, we'll work on releasing what no longer serves you.</p><p><strong>Journal Prompt:</strong> What's one burden you're ready to set down?</p>`,

    6: `<h2>Day 6 – Reconnecting With Yourself</h2><p>Amidst emotional challenges, we often lose touch with ourselves. Today is about rediscovering who you are beyond your pain.</p><p><strong>Journal Prompt:</strong> What's one activity or interest you've neglected that you'd like to reconnect with?</p>`,

    7: `<h2>Day 7 – Envisioning Your Path Forward</h2><p>Healing is a journey, not a destination. Today, we celebrate your progress and look ahead with hope and intention.</p><p><strong>Journal Prompt:</strong> What does emotional freedom look and feel like to you? Describe your vision for the next chapter of your life.</p>`,
  };

  const htmlTemplate = (content: string) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa; color: #333;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <div style="padding: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="ClearCut Logo" style="width: 80px; margin-bottom: 20px;">
          ${content}
          <hr style="margin-top: 30px;">
          <p style="font-size: 14px; color: #777;">You’re receiving this because you signed up for the ClearCut Detox Guide. <a href="https://yourdomain.com/unsubscribe?email=${encodeURIComponent(
            to
          )}">Unsubscribe</a>.</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `ClearCut <${process.env.EMAIL_USER}>`,
    to,
    subject: subjects[day] || `ClearCut Daily – Day ${day}`,
    html: htmlTemplate(
      wrapWithTracking(htmlBodies[day], to, day, origin) ||
        `<p>This is Day ${day} of your detox. Keep showing up.</p>`
    ),
  });
}
