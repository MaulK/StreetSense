"use server";

import { supabase } from "../../lib/supabase";

export async function submitContactForm(prevState, formData) {
  // Add an artificial delay to show loading state nicely
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { error: "All fields are required" };
  }

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
