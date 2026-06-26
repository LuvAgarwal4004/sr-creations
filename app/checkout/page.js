"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSearchParams } from 'next/navigation';
import DeliveryAddressForm from '@/components/DeliveryAddressForm';
import OrderSummary from '@/components/OrderSummary';
import PaymentStep from '@/components/PaymentStep';
// import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect, useState }
  from "react";

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
  const router = useRouter();
  const [checking,
    setChecking] =
    useState(true);
  const [
    checkoutState,
    setCheckoutState
  ] = useState(null);
  const searchParams = useSearchParams();
  const rawStep =
    Number(searchParams.get("step"));

  const step =
    [2, 3, 4].includes(rawStep)
      ? rawStep
      : 2;
  // useEffect(() => {

  //   const validate =
  //     async () => {

  //       const res =
  //         await fetch(

  //           `/api/checkout/validate?step=${step}`

  //         );

  //       const data =
  //         await res.json();

  //       if (!data.allowed) {
  //         console.log("Redirecting to cart");
  //         router.replace("/Cart");

  //         return;

  //       }

  //       setChecking(false);

  //     };

  //   validate();

  // }, [step]);
  useEffect(() => {
    const init = async () => {
      const currentRes =
        await fetch("/api/checkout/current");

      const current =
        await currentRes.json();
        console.log("CURRENT:", current);

      setCheckoutState(current);

      const validateRes =
        await fetch(`/api/checkout/validate?step=${step}`);

      const validate =
        await validateRes.json();

      if (!validate.allowed) {
        router.replace("/Cart");
        return;
      }

      setChecking(false);
    };

    init();
  }, [step, router]);


  // const {
  //   orderCompleted
  // } = useCheckout();

  // useEffect(() => {

  //   const load = async () => {

  //     const res =
  //       await fetch(
  //         "/api/checkout/current"
  //       );

  //     const data =
  //       await res.json();

  //     setCheckoutState(data);

  //   };

  //   load();

  // }, []);
  // useEffect(() => {
  //    console.log(
  //   "URL STEP:",
  //   step
  // );

  // console.log(
  //   "CHECKOUT STATE:",
  //   checkoutState
  // );

  //   if (!checkoutState) return;

  //   if (checkoutState.completed) {
  //     router.replace("/");
  //     return;
  //   }

  //   if (step > checkoutState.step) {
  //     console.log("Redirecting to cart");
  //     router.replace("/Cart");
  //     return;
  //   }

  // }, [
  //   step,
  //   checkoutState,
  //   router
  // ]);
  if (checking) {

    return null;

  }

  return (
    <div className='px-10 mt-5 lg:px-20'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step - 1}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className='mt-10'>
          {step === 2 && <DeliveryAddressForm />}
          {step === 3 && <OrderSummary />}
          {step === 4 && <PaymentStep />}
        </div>

      </Box>
    </div>
  );
}