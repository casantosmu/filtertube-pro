import { NextResponse } from "next/server";

export default async function routeHandler(
  handler: () => Promise<unknown>,
): Promise<NextResponse> {
  try {
    const result = await handler();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in route handler:", error);
    return NextResponse.json(
      {
        message:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 },
    );
  }
}
