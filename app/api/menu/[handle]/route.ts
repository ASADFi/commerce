import { NextRequest, NextResponse } from 'next/server';
import { mockMenu } from 'lib/api/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    // Return mock menu data for now
    // In a real app, you'd fetch this from your database
    return NextResponse.json({
      data: mockMenu,
      success: true
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}
