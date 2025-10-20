import { removeBackground } from "@imgly/background-removal-node";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    console.log(`[API INFO] File received: ${file.name}, Type: ${file.type}`);

    // Node.js version only supports: "small" | "medium" | "large"
    const processedImageBlob = await removeBackground(file, {
      model: "medium", // Options: "small" | "medium" | "large"
      output: { 
        type: "foreground",
        format: "image/png",
        quality: 1.0
      }
    });

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
