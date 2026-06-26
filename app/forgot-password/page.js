"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function Page() {

  const router =
    useRouter();

  const [email,
    setEmail] =
    useState("");

  const [otp,
    setOtp] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [otpSent,
    setOtpSent] =
    useState(false);

  const sendOtp =
    async () => {

      const res =
        await fetch(
          "/api/auth/forgot-password",
          {

            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                email
              })

          }
        );

      const data =
        await res.json();

      if (data.success) {

        setOtpSent(true);

        alert(
          "OTP sent"
        );

      } else {

        alert(
          data.error
        );

      }

    };

  const resetPassword =
    async () => {

      const res =
        await fetch(
          "/api/auth/reset-password",
          {

            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({

                email,

                otp,

                password

              })

          }
        );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "Password reset successful"
        );

        router.push(
          "/login"
        );

      } else {

        alert(
          data.error
        );

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-center mb-6">

          Forgot Password

        </h2>

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          type="email"
          placeholder="Enter email"
          className="w-full border p-2 rounded mb-4"
        />

        {
          !otpSent && (

            <button
              onClick={sendOtp}
              className="w-full bg-black text-white py-2 rounded"
            >
              Send OTP
            </button>

          )
        }

        {
          otpSent && (

            <>

              <input
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
                placeholder="Enter OTP"
                className="w-full border p-2 rounded mt-4"
              />

              <input
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                type="password"
                placeholder="New password"
                className="w-full border p-2 rounded mt-4"
              />

              <button
                onClick={
                  resetPassword
                }
                className="w-full bg-green-600 text-white py-2 rounded mt-4"
              >
                Reset Password
              </button>

            </>

          )
        }

      </div>

    </div>

  );

}