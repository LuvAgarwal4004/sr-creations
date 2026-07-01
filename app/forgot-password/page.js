"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } else {
      toast.error(data.error);
    }
  };

  const resetPassword = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Password reset successful");
      router.push("/login");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex bg-[#06081f] text-white p-10 flex-col justify-center">

          <h1 className="text-4xl font-bold mb-6">
            Forgot Password?
          </h1>

          <p className="text-gray-300 leading-8">
            Don't worry. It happens to everyone.
            We'll securely verify your email using a One-Time Password
            and help you create a brand new password.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex gap-4 items-center">
              <ShieldCheck className="text-green-400" size={32} />
              <div>
                <h3 className="font-semibold">
                  Secure Verification
                </h3>
                <p className="text-gray-400 text-sm">
                  OTP verification keeps your account safe.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Mail className="text-blue-400" size={32} />
              <div>
                <h3 className="font-semibold">
                  Instant Delivery
                </h3>
                <p className="text-gray-400 text-sm">
                  Receive your OTP instantly in your inbox.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 sm:p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Reset Password
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            {otpSent
              ? "Enter the OTP sent to your email."
              : "Enter your registered email address."}
          </p>

          {/* Email */}

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
            />

          </div>

          {!otpSent && (

            <button
              onClick={sendOtp}
              className="mt-6 w-full rounded-xl bg-[#06081f] py-3 text-white font-semibold hover:bg-[#0f143d] transition"
            >
              Send OTP
            </button>

          )}

          {otpSent && (

            <>

              {/* OTP */}

              <div className="relative mt-6">

                <ShieldCheck
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                />

              </div>

              {/* Password */}

              <div className="relative mt-5">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="New Password"
                  className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                />

              </div>

              <button
                onClick={resetPassword}
                className="mt-7 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition"
              >
                Reset Password
              </button>

            </>

          )}

        </div>

      </div>

    </div>
  );
}