import { removeBackground, Config } from "@imgly/background-removal";
import { NextResponse } from "next/server";

// Use Edge Runtime to avoid 250MB serverless function limit
export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    console.log(`[API INFO] File received: ${file.name}, Type: ${file.type}`);

    // Configure with specific model
    const config: Config = {
      model: "isnet_fp16", // Choose: "small" | "medium" | "isnet" | "isnet_fp16" | "isnet_quint8"
      device: "gpu", // Use GPU if available, falls back to CPU
      output: {
        type: "foreground",
        format: "image/png",
        quality: 1.0
      }
    };

    const processedImageBlob = await removeBackground(file, config);

    console.log("[API SUCCESS] Background removal successful.");
    return new NextResponse(processedImageBlob, {
      status: 200,
      headers: { "Content-Type": "image/png" }
    });

  } catch (err: unknown) {
    console.error("API CRITICAL ERROR", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
