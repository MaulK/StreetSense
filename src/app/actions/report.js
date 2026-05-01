"use server";

import { supabase } from "../../lib/supabase";

export async function submitRoadReport(prevState, formData) {
  // Add a slight artificial delay for UX (Loading State)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const road_name = formData.get("road_name");
  const description = formData.get("description");
  const severity = formData.get("severity");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");

  if (!road_name || !description || !severity) {
    return { error: "Road name, description, and severity are required." };
  }

  // Optional: In a real app, you might fetch weather_condition via an API using the lat/long here.
  // For the MVP, we'll store what we have and mock weather for predictive analysis.
  let weather_condition = "Sunny";
  if (severity === "High") weather_condition = "Heavy Rain";
  else if (severity === "Medium") weather_condition = "Light Rain";

  try {
    const { data, error } = await supabase
      .from("road_reports")
      .insert([{ 
        road_name, 
        description, 
        severity, 
        latitude: latitude ? parseFloat(latitude) : null, 
        longitude: longitude ? parseFloat(longitude) : null,
        weather_condition
      }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return { error: "Failed to submit report. Please try again later." };
    }

    return { success: true, message: "Report submitted successfully! Thank you for helping the community." };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
}
