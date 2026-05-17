"use server";

import { supabase } from "../../lib/supabase";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function submitContactForm(prevState, formData) {
  // Add an artificial delay to show loading state nicely
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(", ");
    return { error: `Validation Error: ${errorMessages}` };
  }

  const { name, email, message } = parsed.data;

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return { error: "Failed to submit message. Please try again later." };
    }

    return { success: true, message: "Thank you for reaching out! We will get back to you soon." };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
}
