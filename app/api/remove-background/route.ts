import { removeBackground } from "@imgly/background-removal-node";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  
  // --- Configurable CORS Headers ---
  // Create a new Headers object for our response
  const responseHeaders = new Headers();
  const allowedOrigin = process.env.ALLOWED_ORIGIN;

  if (allowedOrigin) {
    responseHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
  }
  // We will add this 'responseHeaders' object to every NextResponse
  // --- End of added block ---

  try {
    // --- API KEY SECURITY CHECK ---
    const incomingApiKey = request.headers.get("x-api-key");
    const serverApiKey = process.env.SECRET_API_KEY;

    if (!serverApiKey) {
      console.error("[API SECURITY ERROR] SECRET_API_KEY is not set.");
      return NextResponse.json(
        { error: "Internal server configuration error." }, 
        { status: 500, headers: responseHeaders } // <-- Add headers
      );
    }

    if (incomingApiKey !== serverApiKey) {
      console.warn(`[API SECURITY WARN] Unauthorized attempt with key: ${incomingApiKey}`);
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401, headers: responseHeaders } // <-- Add headers
      );
    }
    // --- END OF SECURITY CHECK ---

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "No image file provided." }, 
        { status: 400, headers: responseHeaders } // <-- Add headers
      );
    }

    console.log(`[API INFO] File received: ${file.name}, Type: ${file.type}`);

    // --- UPDATED LOGIC: Fetch medium model from /assets/ ---
    const baseUrl = new URL(request.url).origin;
    const modelUrl = `${baseUrl}/assets/model.onnx`;
    let modelConfig: any = "medium"; 

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
      console.warn(`[API WARN] Could not fetch public model.onnx (${err.message}) — falling back to internal medium model`);
    }
    // --- END OF UPDATED LOGIC ---

    const processedImageBlob = await removeBackground(file, {
      model: modelConfig,
      output: { 
        type: "foreground",
        format: "image/png",
        quality: 1.0
      }
    });

    console.log("[API SUCCESS] Background removal successful.");

    // --- 🚀 ADDED: Set Content-Type on our existing headers ---
    responseHeaders.set("Content-Type", "image/png");
    
    return new NextResponse(processedImageBlob, { 
      status: 200, 
      headers: responseHeaders // <-- Use the headers object
    });

  } catch (err: any) {
    console.error(" [API CRITICAL ERROR] ", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" }, 
      { status: 500, headers: responseHeaders } // <-- Add headers
    );
  }
}