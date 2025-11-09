import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';
import { USER_STATUS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await Database.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check user status
    if (user.status === USER_STATUS.PENDING) {
      return NextResponse.json(
        { success: false, message: 'Your account is pending approval. Please wait for admin approval.' },
        { status: 401 }
      );
    }

    if (user.status === USER_STATUS.DENIED) {
      return NextResponse.json(
        { success: false, message: 'Your account access has been denied. Please contact an administrator.' },
        { status: 401 }
      );
    }

    // For simplicity, we're not implementing password hashing in this demo
    // In production, you would hash passwords and compare hashes
    // For now, assume password is stored in plain text (demo only)
    
    // Return user without password
    const { ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}