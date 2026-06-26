"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react';
import { signIn } from "next-auth/react";

const page = () => {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");
  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);
  const [timer, setTimer] =
    useState(30);

  const handleSignup = async (e) => {

    e.preventDefault();

    if (
      password !== confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;

    }

    const res = await fetch(
      "/api/auth/send-otp",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    const data = await res.json();

    if (data.success) {

      setOtpSent(true);
      alert(
        "OTP sent to email"
      );

    } else {

      alert(data.error);

    }

  };
  useEffect(() => {

    let interval;

    if (otpSent && timer > 0) {

      interval = setInterval(() => {

        setTimer((prev) => prev - 1);

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [otpSent, timer]);
  const handleResendOtp =
    async () => {

      const res = await fetch(
        "/api/auth/send-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data =
        await res.json();

      if (data.success) {

        setTimer(30);

        alert("OTP resent");

      } else {

        alert(data.error);

      }

    };
  const handleVerifyOtp =
    async () => {

      const res = await fetch(
        "/api/auth/verify-otp",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            email,
            otp
          })

        }
      );

      const data =
        await res.json();

      if (data.success) {

        await signIn(
          "credentials",
          {
            email,
            password,
            redirect: false
          }
        );

        router.push("/");

      } else {

        alert(data.error);

      }

    };
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account ✨
        </h2>

        <form className="space-y-5" onSubmit={handleSignup}>

          <div>
            <label className="block text-sm font-medium mb-1">UserName</label>
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              type="text"
              placeholder="UserName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              type="password"
              placeholder="Create a strong password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              type="password"
              placeholder="Repeat password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2
             rounded-lg hover:opacity-90 transition"
          >
            Sign Up
          </button>

        </form>
        {
          otpSent && (

            <div className="mt-4">

              <input
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                placeholder="Enter OTP"
                className="w-full border p-2 rounded"
              />

              <button
                onClick={
                  handleVerifyOtp
                }
                className="w-full bg-green-600 text-white py-2 rounded mt-2"
              >
                Verify OTP
              </button>
              <button type="button" disabled={timer > 0} onClick={handleResendOtp}>
                {
                  timer > 0
                    ? `Resend in ${timer}s`
                    : "Resend OTP"
                }
              </button>

            </div>

          )
        }

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="font-medium hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>

  )
}

export default page
