import { removeBackground } from "@imgly/background-removal-node";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    console.log(`[API INFO] File received: ${file.name}, Type: ${file.type}`);

    // Try loading local "large.onnx"
    const modelPath = path.join(process.cwd(), "models", "large.onnx");
    let modelConfig: string | { buffer: Buffer } = "medium"; // FIX: Replace 'any' with proper type

    try {
      const modelBuffer = await fs.readFile(modelPath);
      console.log("[API INFO] Using local large.onnx model");
      modelConfig = { buffer: modelBuffer };
    } catch {
      console.warn("[API WARN] large.onnx not found locally — falling back to medium model");
    }

    const processedImageBlob = await removeBackground(file, {
      model: modelConfig,
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

  } catch (err: unknown) { // FIX: Replace 'any' with 'unknown'
    console.error("API CRITICAL ERROR", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
