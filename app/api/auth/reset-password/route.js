import connectDb from "@/db/connectDb";
import Otp from "@/models/Otp";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {

  try {

    await connectDb();

    const body =
      await req.json();

    let {
      email,
      otp,
      password
    } = body;

    email =
      email
        .trim()
        .toLowerCase();

    if (
      !email ||
      !otp ||
      !password
    ) {

      return Response.json(
        {
          error:
            "Missing fields"
        },
        {
          status: 400
        }
      );

    }

    if (
      password.length < 6
    ) {

      return Response.json(
        {
          error:
            "Password must be at least 6 characters"
        },
        {
          status: 400
        }
      );

    }

    const record =
      await Otp.findOne({

        email,

        type:
          "forgot-password"

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

    if (
      record.attempts >= 5
    ) {

      await Otp.deleteMany({
        email,
        type:
          "forgot-password"
      });

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
          error:
            "Invalid OTP"
        },
        {
          status: 400
        }
      );

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await User.updateOne(
      { email },
      {
        password:
          hashedPassword
      }
    );

    await Otp.deleteMany({
      email,
      type:
        "forgot-password"
    });

    return Response.json({
      success: true
    });

  } catch (err) {

    return Response.json(
      {
        error:
          err.message
      },
      {
        status: 500
      }
    );

  }

}