"use client";
import { useState, useEffect } from "react";
// import { useRef } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    _id: initialData._id || "",
    title: initialData.title || "",
    price: initialData.price || "",
    image: initialData.image || "",
    category: initialData.category || "trends",
    collection: initialData.collection || "",
    description: initialData.description || "",
    specifications:
      initialData.specifications || "",

    isDiscount:
      initialData.isDiscount || false,
  });
  useEffect(() => {
    setForm({
      _id: initialData._id || "",
      title: initialData.title || "",
      price: initialData.price || "",

      image: initialData.image || "",
      category: initialData.category || "trends",
      collection: initialData.collection || "",
      description: initialData.description || "",
      specifications: initialData.specifications || "",
      isDiscount: initialData.isDiscount || false,
    });
    setDiscountedPrice(
      initialData.discountedPrice || ""
    );

    setDiscountPercent(
      initialData.discountPercent || ""
    );
    console.log(initialData);
  }, [initialData]);

  // useEffect(() => {

  //   const handleClickOutside =
  //     (e) => {

  //       if (
  //         popupRef.current &&
  //         !popupRef.current.contains(
  //           e.target
  //         )
  //       ) {

  //         setForm(prev => ({
  //           ...prev,
  //           isDiscount: false
  //         }));

  //       }

  //     };

  //   document.addEventListener(
  //     "mousedown",
  //     handleClickOutside
  //   );

  //   return () =>
  //     document.removeEventListener(
  //       "mousedown",
  //       handleClickOutside
  //     );

  // }, []);

  const [uploading, setUploading] = useState(false);
  const [originalPrice] =
    useState(initialData.price || 0);
  const [discountedPrice, setDiscountedPrice] =
    useState(initialData.discountedPrice || "");
  // const popupRef = useRef(null);

  const [discountPercent, setDiscountPercent] =
    useState(initialData.discountPercent || "");

  // const [showDiscountPopup,
  //   setShowDiscountPopup] =
  //   useState(false);
  if (Number(discountPercent) < 0) {
    alert("Discount cannot be negative");
    return;
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const submitProduct = (isDiscount) => {
    const finalData = {
      ...form,
      isDiscount,
      collection:
        form.category === "collections"
          ? form.collection
          : null
    };

    onSubmit(finalData);

    // setShowDiscountPopup(false);
  };

  const handleImageUpload = async (file) => {
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ecommerce_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxytdtu3y/image/upload",
      { method: "POST", body: data }
    );
    if (!res.ok) {
      setUploading(false);
      alert("Upload failed");
      return;
    }

    const json = await res.json();

    setForm(prev => ({
      ...prev,
      image: json.secure_url
    }));

    setUploading(false);
  };

  const handleSubmit = (e, isDiscount) => {
    e.preventDefault();
    console.log("SUBMIT FIRED");
    if (!form.title || !form.price || !form.category || !form.image) {
      alert("All fields are required");
      return;
    }

    // CLEAN LOGIC
    // const finalData = {
    //   ...form, isDiscount,
    //   collection: form.category === "collections" ? form.collection : null
    // };
    const currentPrice =
      Number(form.price);

    const oldPrice =
      Number(originalPrice);

    if (
      oldPrice &&
      currentPrice < oldPrice
    ) {
      // setShowDiscountPopup(true);
      return;
    }
    if (form.isDiscount) {

      const hasPrice =
        Number(discountedPrice) > 0;

      const hasPercent =
        Number(discountPercent) > 0;

      if (!hasPrice && !hasPercent) {

        alert(
          "Please fill either Discounted Price or Discount %"
        );

        return;
      }

    }
    if (
      Number(discountedPrice) >=
      Number(form.price)
    ) {
      alert(
        "Discounted price must be lower than original price"
      );
      return;
    }
    if (
      Number(discountPercent) >= 100
    ) {
      alert(
        "Discount percentage must be less than 100"
      );
      return;
    }
    console.log("Before onSubmit");
    onSubmit({
      ...form,
      discountedPrice:
        form.isDiscount
          ? discountedPrice
          : null,

      discountPercent:
        form.isDiscount
          ? discountPercent
          : 0
    });
    // submitProduct(false);

    // onSubmit(finalData);

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl text-black">

      <input name="title" required value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2" />

      <input name="price" type="number" required value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2" />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isDiscount}
          onChange={(e) =>
            setForm({
              ...form,
              isDiscount: e.target.checked
            })
          }
        />

        Apply Discount
      </label>
      {/* <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isDiscount}
          onChange={(e) =>
            setForm({
              ...form,
              isDiscount: e.target.checked
            })
          }
        />

        Put As Discount
      </label> */}
      {
        form.isDiscount && (
          <div className="space-y-3">

            <input
              type="number"
              placeholder="Discounted Price"
              value={discountedPrice}
              onChange={(e) => {

                const value =
                  Number(e.target.value);

                setDiscountedPrice(value);

                const percent =
                  Math.round(
                    ((Number(form.price) - value) /
                      Number(form.price))
                    * 100
                  );

                setDiscountPercent(percent);
              }}
              className="w-full p-2"
            />

            <input
              type="number"
              placeholder="Discount %"
              value={discountPercent}
              onChange={(e) => {

                const percent =
                  Number(e.target.value);

                setDiscountPercent(percent);

                const discounted =
                  Math.round(
                    Number(form.price) *
                    (1 - percent / 100)
                  );

                setDiscountedPrice(
                  discounted
                );
              }}
              className="w-full p-2"
            />

          </div>
        )
      }
      {/*
        //   showDiscountPopup && (
        //           <div
        //             className="
        // fixed
        // inset-0
        // bg-black/60
        // flex
        // items-center
        // justify-center
        // z-50
        // "
        //           >

        //             <div
        //               className="
        // bg-white
        // rounded-3xl
        // p-8
        // max-w-md
        // w-full
        // "
        //             >

        //               <h2
        //                 className="
        // text-2xl
        // font-bold
        // mb-4
        // "
        //               >
        //                 // ⚡ Price Reduction Detected
        //               </h2>

        //               <p className="mb-2">
        //                 Old Price:
        //                 ₹{originalPrice}
        //               </p>

        //               <p className="mb-6">
        //                 New Price:
        //                 ₹{form.price}
        //               </p>

        //               <div
        //                 className="
        // flex
        // gap-4
        // "
        //               >
        //                 <button
        //                   type="button"
        //                   onClick={() => {
        //                     onSubmit({
        //                       ...form,
        //                       isDiscount: true
        //                     });

        //                     // setShowDiscountPopup(false);
        //                   }}
        //                   className="
        // flex-1
        // bg-red-500
        // text-white
        // py-3
        // rounded-xl
        // "
        //                 >
        //                   // Create Discount
        //                 </button>

        //                 <button
        //                   type="button"
        //                   onClick={() => {
        //                     onSubmit({
        //                       ...form,
        //                       isDiscount: false
        //                     });

        //                     // setShowDiscountPopup(false);
        //                   }}
        //                   className="
        // flex-1
        // bg-gray-200
        // py-3
        // rounded-xl
        // "
        //                 >
        //                   // Just Update Price
        //                 </button>
        {/* <button
                  type="button"
                  onClick={() =>
                    submitProduct(true)
                  }
                  className="
flex-1
bg-red-500
text-white
py-3
rounded-xl
"
                >
                  Create Discount
                </button>

                <button
                  type="button"
                  onClick={() =>
                    submitProduct(false)
                  }
                  className="
flex-1
bg-gray-200
py-3
rounded-xl
"
                >
                  Just Update Price
                </button> */}

      {/* //     </div> */}

      {/* //   </div> */}

      {/* // </div> */}
      {/* // ) */}
      {/* // } */}
      {/* CATEGORY DROPDOWN */}
      <select name="category" value={form.category} onChange={handleChange} className="w-full p-2">
        <option value="trends">Trends</option>
        <option value="collections">Collections</option>
      </select>

      {/* CONDITIONAL INPUT */}
      {
        form.category === "collections" && (
          <input
            name="collection"
            value={form.collection}
            onChange={handleChange}
            placeholder="Enter collection name"
            className="w-full p-2"
          />
        )
      }

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"
        className="w-full p-2" />
      <textarea
        name="specifications"
        value={form.specifications}
        onChange={handleChange}
        placeholder="Specifications"
        className="w-full p-2"
      />


      <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />

      {uploading && <p>Uploading...</p>}

      {form.image && <img src={form.image} className="w-32 h-32" />}

      <button className="bg-blue-600 text-white px-4 py-2">
        Save Product
      </button>
    </form >
  );
}
