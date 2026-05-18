"use server";
import { supabase } from "../../lib/supabase";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginUser(prevState, formData) {
  // Artificial delay for UX
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const parsed = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(", ");
    return { error: `Validation Error: ${errorMessages}` };
  }

  const { email, password } = parsed.data;
  let success = false;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const cookieStore = await cookies();
    cookieStore.set("session", data.session.access_token, { httpOnly: true, secure: true, path: "/" });
    success = true;
  } catch (err) {
    console.error("Login error:", err);
    return { error: "An unexpected error occurred during login." };
  }

  if (success) {
    redirect("/dashboard");
  }
}

export async function registerUser(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const parsed = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(", ");
    return { error: `Validation Error: ${errorMessages}` };
  }

  const { email, password } = parsed.data;
  let success = false;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
    
    // For MVP, if it succeeds without email confirmation requirement
    if (data.session) {
      const cookieStore = await cookies();
      cookieStore.set("session", data.session.access_token, { httpOnly: true, secure: true, path: "/" });
      success = true;
    } else {
      return { success: true, message: "Registration successful! You can now log in." };
    }
  } catch (err) {
    console.error("Register error:", err);
    return { error: "An unexpected error occurred during registration." };
  }

  if (success) {
    redirect("/dashboard");
  }
}

export async function logoutUser() {
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
