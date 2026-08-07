"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
        return { error: "Please fill in all required fields." };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(32).toString("hex");

        const baseUsername = email.split("@")[0];
        const username = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;

        await prisma.user.create({
            data: {
                displayName: name,
                email,
                username,
                password: hashedPassword,
                verificationToken: token,
                emailVerified: null,
            },
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const verificationLink = `${appUrl}/api/verify?token=${token}&email=${encodeURIComponent(email)}`;

        await transporter.sendMail({
            from: `"Bloggy" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Verify your Bloggy account",
            html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Welcome to Bloggy, ${name}! 👋</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">
            Thanks for signing up. Please click the button below to verify your email address and start reading/writing stories.
          </p>
          <div style="margin: 28px 0; text-align: center;">
            <a href="${verificationLink}" style="background-color: #6d28d9; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">
            If you didn't create an account, you can safely ignore this message.
          </p>
        </div>
      `,
        });

        return { success: true };
    } catch (err) {
        console.error("Registration/Email Error:", err);
        return { error: "An unexpected error occurred during registration." };
    }
}