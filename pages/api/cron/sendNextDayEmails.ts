import { sendEmail } from "../contact";
import { findUsersToNotify, updateUser } from "@/lib/db";

export async function runDailyEmailCronJob() {
  try {
    // Get all users who should receive an email now based on their timezone
    const users = await findUsersToNotify();
    
    // Process each user
    for (const user of users) {
      try {
        // Send the next day's email
        await sendEmail(user.email, user.day + 1);
        
        // Update user's day and lastEmailSent timestamp
        await updateUser(user.email, { 
          day: user.day + 1,
          lastEmailSent: new Date()
        });
        
        console.log(`Sent day ${user.day + 1} email to ${user.email}`);
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        // Continue with next user even if one fails
        continue;
      }
    }
    
    console.log(`Cron job completed. Processed ${users.length} users.`);
    return { success: true, processed: users.length };
  } catch (error) {
    console.error("Error in runDailyEmailCronJob:", error);
    throw error; // Re-throw to be handled by the calling function
  }
}
