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
      console.error("No image file provided");
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    console.log(`[API INFO] File received: ${file.name}, Type: ${file.type}`);

    // Try loading local "large.onnx" model file if present
    const modelPath = path.join(process.cwd(), "models", "large.onnx");
    let modelConfig: unknown = "medium"; // Default model name

    try {
      const modelBuffer = await fs.readFile(modelPath);
      console.log("[API INFO] Using local large.onnx model");
      modelConfig = { buffer: modelBuffer };
    } catch (err) {
      console.warn("[API WARN] large.onnx not found locally — falling back to medium model");
    }

    const processedImageBlob = await removeBackground(file, {
      model: modelConfig as any, // Model can be string or { buffer: Buffer }
      output: {
        type: "foreground",
        format: "image/png",
        quality: 1.0,
      },
    });

    console.log("[API SUCCESS] Background removal successful.");
    return new NextResponse(processedImageBlob, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API CRITICAL ERROR", err.message, err.stack);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("API CRITICAL ERROR (unknown)", err);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
