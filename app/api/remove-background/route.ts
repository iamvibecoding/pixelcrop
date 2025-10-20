import { removeBackground } from "@imgly/background-removal-node";
import { NextResponse } from "next/server";
// No longer need fs or path
// import path from "path";
// import { promises as fs } from "fs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    console.log(`[API INFO] File received: ${file.name}, Type: ${file.type}`);

    // --- UPDATED LOGIC: Fetch medium model from /assets/ ---
    const baseUrl = new URL(request.url).origin;
    // This model.onnx is the medium model, copied by your postinstall script
    const modelUrl = `${baseUrl}/assets/model.onnx`;
    let modelConfig: any = "medium"; // Fallback default

    try {
      console.log(`[API INFO] Attempting to fetch model from: ${modelUrl}`);
      const response = await fetch(modelUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
      }

      const modelBuffer = await response.arrayBuffer();
      console.log("[API INFO] Successfully fetched and using public medium model (model.onnx)");
      modelConfig = { buffer: modelBuffer };

    } catch (err: any) {
      // If fetching fails, it will just use the default "medium" config
      console.warn(`[API WARN] Could not fetch public model.onnx (${err.message}) — falling back to internal medium model`);
    }
    // --- END OF UPDATED LOGIC ---

    const processedImageBlob = await removeBackground(file, {
      model: modelConfig, // Use the fetched model (or fallback)
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

  } catch (err: any) {
    console.error(" [API CRITICAL ERROR] ", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}