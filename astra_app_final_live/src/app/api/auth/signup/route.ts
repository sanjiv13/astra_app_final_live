import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';
import { USER_STATUS, USER_ROLES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, team } = await request.json();

    if (!email || !password || !name || !team) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await Database.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user with pending status
    const newUser = await Database.createUser({
      email,
      name,
      role: USER_ROLES.MEMBER,
      status: USER_STATUS.PENDING,
      team,
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Your account is pending admin approval.',
      userId: newUser.id
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}