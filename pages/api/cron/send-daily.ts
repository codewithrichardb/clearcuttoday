import { NextApiRequest, NextApiResponse } from "next";
import { runDailyEmailCronJob } from "./sendNextDayEmails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runDailyEmailCronJob();
    res.status(200).json({ message: "Detox emails sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Failed to send emails",
        details: error instanceof Error ? error.message : String(error),
      });
  }
}
