import dayjs from "dayjs";
import { sendEmail } from "../contact";
import { withDatabase } from "@/lib/db";

export async function runDailyEmailCronJob() {
  try {
    await withDatabase(async (db) => {
      const users = db.collection("users");
      const now = new Date();

      const candidates = await users.find({ day: { $lt: 7 } }).toArray();

      for (const user of candidates) {
        const nextDayTime = dayjs(user.registeredAt).add(user.day, "day");
        if (dayjs(now).isAfter(nextDayTime)) {
          try {
            await sendEmail(user.email, user.day + 1);
            await users.updateOne(
              { email: user.email },
              { $set: { day: user.day + 1 } }
            );
          } catch (error) {
            console.error(`Error sending email to ${user.email}:`, error);
            // Continue with next user even if one fails
            continue;
          }
        }
      }
    });
  } catch (error) {
    console.error("Error in runDailyEmailCronJob:", error);
    throw error; // Re-throw to be handled by the calling function
  }
}
