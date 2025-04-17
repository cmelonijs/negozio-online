import { uploadProductImages } from "@/lib/actions/products.actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files uploaded" },
        { status: 400 }
      );
    }
    
    const imagePaths = await uploadProductImages(files);
    
    return NextResponse.json({
      success: true,
      paths: imagePaths,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
