import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdressCard from './AdressCard'
import { useRouter } from 'next/navigation';
import { setGlobalLoading } from './RouteLoader';
import { useSession } from "next-auth/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import { useCheckout } from "@/context/CheckoutContext";

const DeliveryAddressForm = () => {

  const router = useRouter();

  const [address, setAddress] = useState(null);
  const { data: session } = useSession();
  const [selectedState, setSelectedState] =
    useState("");
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ];
  // const {
  //   setCheckoutStep
  // } = useCheckout();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: selectedState,
      mobile: data.get("phoneNumber"),
    };

    localStorage.setItem(
      `address-${session.user.email}`,
      JSON.stringify(address)
    );
    await fetch("/api/user/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    });
    if (typeof setGlobalLoading === "function") {
      setGlobalLoading(true);
    }
    setTimeout(async () => {
      const res = await fetch(
        "/api/checkout/update-step",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            step: 3
          })
        }
      );

      const data = await res.json();

      console.log("UPDATE STEP:", data);
      console.log("STATUS:", res.status);
      if (!res.ok) {
        const err = await res.json();
        console.log(err);
        return;
      }

      router.push("/checkout?step=3");

      setTimeout(() => {
        setGlobalLoading(false); // STOP LOADER AFTER PAGE LOAD FEEL
      }, 800);
    }, 1);
  };
  useEffect(() => {

    if (!session?.user?.email) return;

    const savedAddress =
      localStorage.getItem(
        `address-${session.user.email}`
      );

    if (savedAddress) {
      const parsed =
        JSON.parse(savedAddress);

      setAddress(parsed);

      setSelectedState(
        parsed.state || ""
      );
    }

  }, [session]);


  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12} lg={5} className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>
          <div className='p-5 py-7 border-b cursor-pointer'>
            <AdressCard address={address} />
            {/* <Button sx={{mt:2, bgcolor:"RGB(145 85 253)"}} size='large' variant='contained'>Deliver Here</Button> */}
          </div>

        </Grid>
        <Grid item xs={12} lg={7}>
          <Box className='border rounded-s-md shadow-md p-5'>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="firstName" name="firstName" defaultValue={address?.firstName || ""}
                    className="w-full border  border-gray-300 bg-white px-4 py-3 text-gray-900 
               focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                    placeholder="John" required />
                </div>
                <div>
                  <label for="lastName" className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
                  <input defaultValue={address?.lastName || ""} type="text" id="lastName" name="lastName" className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" placeholder="Doe" required />
                </div>
              </div>

              <div>
                <label for="address" className="mb-2 block text-sm font-medium text-gray-700">Address</label>
                <input defaultValue={address?.streetAddress || ""} type="address" id="address" name="address" className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" placeholder="Address" required />
              </div>

              <div>
                <label for="city" className="mb-2 block text-sm font-medium text-gray-700">City</label>
                <input defaultValue={address?.city || ""} type="text" id="city" name="city" className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" placeholder=" City" required />
                {/* <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters with numbers and symbols</p> */}
              </div>
              <div>
                <label for="state" className="mb-2 block text-sm font-medium text-gray-700">State</label>
                {/* <select
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={(e) =>
                    setSelectedState(e.target.value)}
                  className="w-full border border-gray-300 bg-white px-4 py-3"
                  required
                >
                  <option value="">
                    Select State
                  </option>

                  <option value="West Bengal">
                    West Bengal
                  </option>

                  <option value="Maharashtra">
                    Maharashtra
                  </option>

                  <option value="Delhi">
                    Delhi
                  </option>

                  <option value="Karnataka">
                    Karnataka
                  </option>

                  <option value="Tamil Nadu">
                    Tamil Nadu
                  </option>

                  <option value="Uttar Pradesh">
                    Uttar Pradesh
                  </option>

                  <option value="Gujarat">
                    Gujarat
                  </option>

                  {/* add remaining states */}
                {/* </select>  */}
                <Autocomplete
                  id="state"
                  name="state"
                  options={states}
                  value={selectedState}
                  onChange={(event, newValue) =>
                    setSelectedState(newValue || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      required
                    />
                  )}
                />
                {/* <input defaultValue={address?.state || ""} type="text" id="state" name="state" className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" placeholder=" City" required /> */}
                {/* <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters with numbers and symbols</p> */}
              </div>


              <div>
                <label for="phoneNumber" className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                <input defaultValue={address?.mobile || ""} type="tel" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" placeholder="" required />
              </div>

              <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }} size='large' variant='contained'
                type='submit'>Deliver Here</Button>
            </form>
          </Box>
        </Grid>

      </Grid>
    </div>
  )
}

export default DeliveryAddressForm
