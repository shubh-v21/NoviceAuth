import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import sendVerificationEmail from "@/utils/sendVerificationEmail";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setHours(otpExpiry.getHours() + 1); // OTP expires in 1 hour

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with unverified status
    const user = await User.create({
      email,
      password: hashedPassword,
      isGoogleAuth: false,
      isEmailVerified: false,
      verificationOTP: {
        code: otp,
        expiresAt: otpExpiry,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, otp);

    return NextResponse.json(
      { 
        message: "Registration successful. Please check your email for OTP verification.",
        userId: user._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
} 