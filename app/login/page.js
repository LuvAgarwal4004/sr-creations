"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter }
  from "next/navigation";
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  const handleLogin = async (e) => {

    e.preventDefault();

    const res = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false
      }
    );

    if (res.error) {

      toast.error(res.error);

    } else {

      router.push("/");

    }

  };
  return (
    <div
      className="
  relative
  overflow-hidden
  min-h-screen
  flex
  items-center
  justify-center
  bg-gradient-to-br
  from-slate-900
  via-blue-900
  to-indigo-950
  px-4
  py-10
"
    >
      <div
        className="
w-full
max-w-md
rounded-3xl
bg-white
shadow-[0_20px_60px_rgba(0,0,0,0.25)]
border
border-white/20
p-6
sm:p-8
"
      >
        <div className="flex justify-center mb-5">

          <div
            className="
h-16
w-16
rounded-full
bg-gradient-to-r
from-blue-500
to-indigo-600
flex
items-center
justify-center
text-white
text-3xl
shadow-lg
"
          >
            🔐
          </div>

        </div>
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue shopping
          </p>

        </div>

        <form className="space-y-6" onSubmit={handleLogin}>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="you@example.com"
              className="
w-full
rounded-xl
border
border-gray-300
px-4
py-3
transition
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
outline-none
"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              type="password"
              placeholder="••••••••"
              className="
w-full
rounded-xl
border
border-gray-300
px-4
py-3
transition
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
outline-none
"
            />
          </div>

          <button
            type="submit"
            className="
w-full
rounded-xl
bg-gradient-to-r
from-blue-600
to-indigo-700
py-3
font-semibold
text-white
shadow-lg
hover:scale-[1.02]
hover:shadow-blue-400/40
transition-all
duration-300
"
          >
            Login
          </button>

        </form>
        <div className="mt-4">
          <button onClick={() => { signIn("google", { callbackUrl: "/" }) }}
            className="
flex
w-full
items-center
justify-center
gap-3
rounded-xl
border
border-gray-300
bg-white
py-3
font-medium
shadow-sm
transition-all
hover:bg-blue-50
hover:border-blue-300
hover:shadow-lg
">
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48" version="1.1">

              <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
            <span>Continue with Google</span>
          </button>
        </div>
        <Link href="/forgot-password">
          <p className="mt-5 text-center text-sm text-blue-600 hover:underline">
            Forgot Password?
          </p>
        </Link>

        <p className="mt-8 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href={"/signup"}>
            <span className="font-semibold text-blue-600 hover:underline">
              Sign up
            </span>
          </Link>
        </p>


      </div>
    </div>
  )
}

export default page
