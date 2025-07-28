import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔧 Draft mode enable called");
    console.log("🔧 Request URL:", request.url);

    // Validate the preview secret if provided
    const { searchParams } = request.nextUrl;
    const secret = searchParams.get("sanity-preview-secret");
    const pathname = searchParams.get("sanity-preview-pathname") || "/";

    // Optional: Add secret validation for security
    // if (secret && secret !== process.env.SANITY_PREVIEW_SECRET) {
    //   return NextResponse.json({ error: "Invalid preview secret" }, { status: 401 });
    // }

    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    console.log("🔧 Draft mode enabled successfully");
    console.log("🔧 Redirecting to:", pathname);

    // Build the redirect URL
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const redirectUrl = `${protocol}://${host}${pathname}`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("❌ Error enabling draft mode:", error);
    return NextResponse.json(
      { error: "Failed to enable draft mode", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}