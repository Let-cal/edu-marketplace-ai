import { NextResponse } from "next/server";

// Define the GET route handler
export async function GET() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/Let-cal/cdd3e74266e18aa68e4aed6ee850e7dc/raw/73c4ad74e08a99a3b38cbfa1f1ada3cbf5a9b392/mock-data.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch mock data:", error);
    return NextResponse.json(
      { error: "Failed to load mock data" },
      { status: 500 }
    );
  }
}
