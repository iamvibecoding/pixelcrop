import { removeBackground } from "@imgly/background-removal";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    const processedImageBlob = await removeBackground(file, {
      model: "medium",
      output: {
        type: "foreground",
        format: "image/png",
        quality: 1.0
      }
    });

    return new NextResponse(processedImageBlob, {
      status: 200,
      headers: { "Content-Type": "image/png" }
    });

  } catch (err: unknown) {
    console.error("API Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
