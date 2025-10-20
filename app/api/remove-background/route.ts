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

    // ✅ Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // ✅ Dynamically load removeBackground (prevents build hang)
    const { removeBackground } = await import("@imgly/background-removal-node");

    // ✅ Try loading local "large.onnx"
    const modelPath = path.join(process.cwd(), "models", "large.onnx");
    let modelConfig: any = "medium";

    try {
      const modelBuffer = await fs.readFile(modelPath);
      console.log("[API INFO] Using local large.onnx model");
      modelConfig = { buffer: modelBuffer };
    } catch {
      console.warn("[API WARN] large.onnx not found locally — falling back to medium model");
    }

    const processedBuffer = await removeBackground(inputBuffer, {
      model: modelConfig,
      output: {
        type: "foreground",
        format: "image/png",
        quality: 1.0
      }
    });

    console.log("[API SUCCESS] Background removal successful.");
    return new NextResponse(processedBuffer, {
      status: 200,
      headers: { "Content-Type": "image/png" }
    });

  } catch (err: any) {
    console.error("[API CRITICAL ERROR]", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
