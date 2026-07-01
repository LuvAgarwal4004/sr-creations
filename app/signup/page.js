"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react';
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

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

      toast.error(
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
      toast.success(
        "OTP sent to email"
      );

    } else {

      toast.error(data.error);

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

        toast.success("OTP resent");

      } else {

        toast.error(data.error);

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

        toast.error(data.error);

      }

    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 px-8 text-center">

          <div className="h-20 w-20 rounded-full bg-white/20 mx-auto flex items-center justify-center text-4xl mb-5">
            ✨
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-blue-100 mt-2">
            Join us and start shopping today
          </p>

        </div>

        {/* BODY */}

        <div className="p-6 sm:p-8">

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Username
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Repeat password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
              />

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3.5 font-semibold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Sign Up
            </button>

          </form>

          {otpSent && (

            <div className="mt-8 border-t pt-8">

              <div className="flex justify-center">

                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl shadow-lg">
                  📧
                </div>

              </div>

              <h2 className="text-center text-2xl font-bold mt-5">
                Verify Email
              </h2>

              <p className="text-center text-gray-500 mt-2">
                Enter the OTP sent to
              </p>

              <p className="text-center text-blue-600 font-semibold break-all mt-1">
                {email}
              </p>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full mt-6 rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition focus:ring-4 focus:ring-green-100 focus:border-green-500"
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full mt-5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 font-semibold text-white shadow-lg hover:scale-[1.02] transition"
              >
                Verify OTP
              </button>

              <button
                type="button"
                disabled={timer > 0}
                onClick={handleResendOtp}
                className="w-full mt-4 text-blue-600 font-medium hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {timer > 0
                  ? `Resend OTP in ${timer}s`
                  : "Resend OTP"}
              </button>

            </div>

          )}

          <div className="mt-10 border-t pt-6">

            <p className="text-center text-gray-600">

              Already have an account?{" "}

              <a
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Login
              </a>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default page
