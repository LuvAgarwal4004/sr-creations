import connectDb from "@/db/connectDb";
import Otp from "@/models/Otp";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {

    try {

        await connectDb();

        const body =
            await req.json();

        const {
            email,
            otp
        } = body;

        const record = await Otp.findOne({
            email,
            type: "signup"
        });

        if (!record) {

            return Response.json(
                {
                    error:
                        "Invalid OTP"
                },
                {
                    status: 400
                }
            );

        }

        if (
            record.expiresAt <
            new Date()
        ) {

            return Response.json(
                {
                    error:
                        "OTP expired"
                },
                {
                    status: 400
                }
            );

        }
        if (record.attempts >= 5) {

            await Otp.deleteMany({ email });

            return Response.json(
                {
                    error:
                        "Too many failed attempts"
                },
                {
                    status: 400
                }
            );

        }
        const otpMatch =
            await bcrypt.compare(
                otp,
                record.otp
            );

        if (!otpMatch) {

            record.attempts += 1;

            await record.save();

            return Response.json(
                {
                    error: "Invalid OTP"
                },
                {
                    status: 400
                }
            );

        }
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            await Otp.deleteMany({ email });

            return Response.json(
                {
                    error: "User already exists"
                },
                {
                    status: 400
                }
            );

        }

        await User.create({

            name: record.name,

            email: record.email,

            password:
                record.password,

            verified: true,

            cart: []

        });

        await Otp.deleteMany({
            email
        });

        return Response.json({
            success: true
        });

    } catch (err) {

        return Response.json(
            {
                error: err.message
            },
            {
                status: 500
            }
        );

    }


}