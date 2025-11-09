import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export async function GET() {
  try {
    const pendingUsers = await Database.getPendingUsers();
    return NextResponse.json({
      success: true,
      users: pendingUsers
    });
  } catch (error) {
    console.error('Error fetching pending users:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, action } = await request.json();

    if (!userId || !action || !['approve', 'deny'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Valid userId and action (approve/deny) are required' },
        { status: 400 }
      );
    }

    let success = false;
    if (action === 'approve') {
      success = await Database.approveUser(userId);
    } else {
      success = await Database.denyUser(userId);
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: `User ${action}d successfully`
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error processing user approval:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}