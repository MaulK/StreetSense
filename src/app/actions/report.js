"use server";

import { supabase } from "../../lib/supabase";
import { z } from "zod";

const ReportSchema = z.object({
  road_name: z.string().min(3, "Road name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  severity: z.enum(["Low", "Medium", "High"], {
    errorMap: () => ({ message: "Severity must be Low, Medium, or High" })
  }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  reporter_name: z.string().optional(),
});

export async function submitRoadReport(prevState, formData) {
  // Add a slight artificial delay for UX (Loading State)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const parsed = ReportSchema.safeParse({
    road_name: formData.get("road_name"),
    description: formData.get("description"),
    severity: formData.get("severity"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    reporter_name: formData.get("reporter_name"),
  });

  const evidenceFile = formData.get("evidence");

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(", ");
    return { error: `Validation Error: ${errorMessages}` };
  }

  const { road_name, description, severity, latitude, longitude, reporter_name } = parsed.data;

  // Optional: In a real app, you might fetch weather_condition via an API using the lat/long here.
  // For the MVP, we'll store what we have and mock weather for predictive analysis.
  let weather_condition = "Sunny";
  if (severity === "High") weather_condition = "Heavy Rain";
  else if (severity === "Medium") weather_condition = "Light Rain";

  // Encode Evidence File to Base64 (Perfect for MVP without Storage bucket setup)
  let evidence_url = null;
  if (evidenceFile && evidenceFile.size > 0) {
    try {
      const buffer = Buffer.from(await evidenceFile.arrayBuffer());
      evidence_url = `data:${evidenceFile.type};base64,${buffer.toString('base64')}`;
    } catch (e) {
      console.warn("Exception during file encoding:", e);
    }
  }

  try {
    const { data, error } = await supabase
      .from("road_reports")
      .insert([{ 
        road_name, 
        description, 
        severity, 
        latitude: latitude ? parseFloat(latitude) : null, 
        longitude: longitude ? parseFloat(longitude) : null,
        reporter_name: reporter_name || 'Anonymous Citizen',
        evidence_url,
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
