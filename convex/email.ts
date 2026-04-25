import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendInquiryEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("sendInquiryEmail action invoked for:", args.name);

    if (!process.env.RESEND_API_KEY) {
      const errorMsg = "RESEND_API_KEY is missing from Convex Environment Variables!";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const response = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["chaitanya.sai311@gmail.com"], // Reverting to your verified Resend account email
        subject: `New Portfolio Inquiry from ${args.name}`,
        html: `
          <h3>New Message from Portfolio OS</h3>
          <p><strong>Name:</strong> ${args.name}</p>
          <p><strong>Email:</strong> ${args.email}</p>
          <p><strong>Message:</strong></p>
          <p>${args.message}</p>
          <hr />
          <p>Sent from Sai's Portfolio OS</p>
        `,
      });

      if (response.error) {
        console.error("Resend API Error:", response.error);
        throw new Error(`Resend failed: ${response.error.message}`);
      }

      console.log("Email sent successfully:", response.data?.id);
    } catch (error) {
      console.error("Critical failure in sendInquiryEmail action:", error);
      throw error;
    }
  },
});
