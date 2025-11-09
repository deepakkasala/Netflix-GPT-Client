import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice"; // so we can update redux user after payment
import { API_URL } from "../utils/constants";

// const plans = [
//   {
//     id: "mobile",
//     title: "Mobile",
//     resolution: "480p",
//     price: "₹149",
//     quality: "Fair",
//     devices: "Mobile phone, tablet",
//     watchCount: 1,
//     downloadDevices: 1,
//   },
//   {
//     id: "basic",
//     title: "Basic",
//     resolution: "720p",
//     price: "₹199",
//     quality: "Good",
//     devices: "TV, computer, mobile phone, tablet",
//     watchCount: 1,
//     downloadDevices: 1,
//   },
//   {
//     id: "standard",
//     title: "Standard",
//     resolution: "1080p",
//     price: "₹499",
//     quality: "Great",
//     devices: "TV, computer, mobile phone, tablet",
//     watchCount: 2,
//     downloadDevices: 2,
//   },
//   {
//     id: "premium",
//     title: "Premium",
//     resolution: "4K + HDR",
//     price: "₹649",
//     quality: "Best",
//     devices: "TV, computer, mobile phone, tablet",
//     watchCount: 6,
//     downloadDevices: 6,
//     current: true,
//   },
// ];
const plans = [
  {
    id: "mobile",
    title: "Mobile",
    resolution: "480p",
    price: 149, // in rupees
    priceDisplay: "₹149",
    quality: "Fair",
    devices: "Mobile phone, tablet",
    watchCount: 1,
    downloadDevices: 1,
    // GPT policy
    gpt: {
      searches: 5,
      period: "day", // renews every 24 hours
      free: true,
    },
  },
  {
    id: "basic",
    title: "Basic",
    resolution: "720p",
    price: 199,
    priceDisplay: "₹199",
    quality: "Good",
    devices: "TV, computer, mobile phone, tablet",
    watchCount: 1,
    downloadDevices: 1,
    gpt: {
      searches: 30,
      period: "month",
      free: false,
    },
  },
  {
    id: "standard",
    title: "Standard",
    resolution: "1080p",
    price: 499,
    priceDisplay: "₹499",
    quality: "Great",
    devices: "TV, computer, mobile phone, tablet",
    watchCount: 2,
    downloadDevices: 2,
    gpt: {
      searches: 120,
      period: "month",
      free: false,
    },
  },
  {
    id: "premium",
    title: "Premium",
    resolution: "4K + HDR",
    price: 649,
    priceDisplay: "₹649",
    quality: "Best",
    devices: "TV, computer, mobile phone, tablet",
    watchCount: 6,
    downloadDevices: 6,
    current: true,
    gpt: {
      searches: 500,
      period: "month",
      free: false,
    },
  },
];

const ChangePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processing, setProcessing] = useState(false);
  const user = useSelector((state) => state.user);
  console.log("User obj inside ChangePlan:", user);

  const dispatch = useDispatch();

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const existing = document.getElementById("razorpay-script");
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.id = "razorpay-script";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });

  const handleContinue = async () => {
    if (!selectedPlan) return;
    if (!user) {
      alert("Please login to subscribe");
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) return;

    // free plans (e.g., mobile with gpt.free true) could be handled without Razorpay
    if (plan.gpt.free) {
      // Directly update subscription locally and call backend to persist (optional)
      try {
        setProcessing(true);
        const resp = await axios.post(
          "payments/verify-payment",
          {
            razorpay_order_id: "free-plan",
            razorpay_payment_id: "free-plan",
            razorpay_signature: "free-signature",
            planId: plan.id,
            userId: user._id,
            planMeta: plan.gpt,
          },
          { withCredentials: true }
        );
        // backend will handle free case if you build endpoint; above is a convenience call
        dispatch(addUser(resp.data.user));
        alert("Free plan activated");
      } catch (err) {
        console.error(err);
        alert("Could not activate free plan");
      } finally {
        setProcessing(false);
      }
      return;
    }

    // Paid plan: start razorpay flow
    try {
      setProcessing(true);
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Failed to load Razorpay SDK");
        setProcessing(false);
        return;
      }

      // 1) Create order on server
      const userId = user._id || user.id || user.user._id || user.user.id;
      console.log(userId);

      const createOrderResp = await axios.post(
        API_URL + "payments/create-order",
        {
          planId: plan.id,
          price: plan.price, // rupees
          userId: userId,
        },
        { withCredentials: true }
      );

      if (!createOrderResp.data.success) {
        throw new Error("Failed to create order");
      }

      const { order } = createOrderResp.data;

      // 2) Open Razorpay Checkout
      const options = {
        key:
          import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXXXXXXXX", // fallback
        amount: order.amount,
        currency: order.currency,
        name: "Netflix-GPT",
        description: `${plan.title} subscription`,
        order_id: order.id,
        handler: async function (response) {
          // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
          try {
            // Send verification + plan meta to server
            const verifyResp = await axios.post(
              API_URL + "payments/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan.id,
                userId: user._id || user.id || user.user._id || user.user.id,
                planMeta: plan.gpt,
              },
              { withCredentials: true }
            );

            if (verifyResp.data.success) {
              // server returned updated user
              dispatch(addUser(verifyResp.data.user));
              alert("Payment successful & subscription activated!");
            } else {
              alert("Payment verified failed on server");
            }
          } catch (err) {
            console.error("verify error", err);
            alert("Verification failed. Contact support");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
        },
        theme: {
          color: "#e50914",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // optional: handle failure callback
      rzp.on("payment.failed", function (response) {
        console.error("payment.failed", response);
        alert("Payment failed or cancelled");
      });
    } catch (err) {
      console.error("handleContinue err", err);
      console.log(err);
      alert("Something went wrong while processing payment");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center font-sans">
      {/* Netflix Logo */}
      <div className="w-full flex justify-start px-10 py-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix"
          className="w-32"
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Dynamic Info Bar */}
        {user?.subscription?.active && user?.subscription?.planId && (
          <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-md text-sm mb-8 text-center">
            <p>
              Your <b>{user.subscription.planId}</b> upgrade ends on{" "}
              <b>
                {new Date(user.subscription.expiresAt).toLocaleDateString()}
              </b>
              . Keep <b>{user.subscription.planId}</b> or your plan will
              automatically switch back to Standard.
            </p>
          </div>
        )}

        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-2">Change plan</h1>
        <p className="text-gray-600 mb-10">
          Try out a new plan. You can always switch back if you do not love it.
        </p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12 px-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isCurrent = user?.subscription?.planId === plan.title;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border transition-all duration-200 overflow-hidden shadow-md cursor-pointer
                ${
                  isSelected
                    ? "border-red-500 ring-2 ring-red-400"
                    : isCurrent
                    ? "border-gray-400"
                    : "border-gray-200 hover:border-gray-400"
                }
                bg-white min-h-[580px] min-w-[290px]`}
              >
                {/* Header Gradient */}
                <div
                  className={`h-20 flex flex-col items-center justify-center text-white font-semibold text-xl ${
                    isCurrent
                      ? "bg-gradient-to-r from-purple-700 via-pink-600 to-red-500"
                      : isSelected
                      ? "bg-gradient-to-r from-blue-600 to-purple-500"
                      : "bg-gradient-to-r from-blue-700 to-blue-400"
                  }`}
                >
                  <p>{plan.title}</p>
                  <p className="text-sm font-medium opacity-90">
                    {plan.resolution}
                  </p>
                </div>

                {/* Current Plan Badge */}
                {user.subscription?.planId === plan.id && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-3 py-1 rounded-b-md shadow">
                    Current Plan
                  </div>
                )}

                {/* Plan Details */}
                <div className="p-8 text-left text-base space-y-4">
                  <p className="text-base font-semibold text-gray-700">
                    Monthly price <br />
                    <span className="text-xl font-bold text-black">
                      {plan.priceDisplay}
                    </span>
                  </p>

                  <hr className="border-gray-200" />

                  <div className="text-[15px] text-gray-700 space-y-3 leading-relaxed">
                    <div>
                      <b>Video & sound quality:</b> {plan.quality}
                    </div>
                    <hr className="border-gray-200" />
                    <div>
                      <b>Resolution:</b> {plan.resolution}
                    </div>
                    <hr className="border-gray-200" />
                    <div>
                      <b>Supported devices:</b> {plan.devices}
                    </div>
                    <hr className="border-gray-200" />
                    <div>
                      <b>Watch simultaneously:</b> {plan.watchCount} devices
                    </div>
                    <hr className="border-gray-200" />
                    <div>
                      <b>Download devices:</b> {plan.downloadDevices}
                    </div>
                  </div>

                  {/* GPT Search Plan Info */}
                  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
                    <p className="font-semibold text-gray-800 mb-1">
                      AI (GPT) Search Access
                    </p>
                    <p>
                      {plan.gpt.free ? (
                        <>
                          <span className="font-semibold text-green-600">
                            Free Access
                          </span>{" "}
                          — {plan.gpt.searches} searches per day (auto-renews
                          every 24 hours)
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-blue-600">
                            Premium AI Plan
                          </span>{" "}
                          — {plan.gpt.searches} searches per {plan.gpt.period}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mb-16">
          <button
            disabled={!selectedPlan || processing}
            onClick={handleContinue}
            className={`w-full sm:w-96 py-3 rounded-md text-lg font-semibold transition-all duration-200 ${
              selectedPlan
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } ${processing ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {processing ? "Processing..." : "Continue"}
          </button>
        </div>

        {/* Footer Notes */}
        <div className="text-xs text-gray-500 max-w-4xl text-center mx-auto leading-relaxed">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
          to your internet service and device capabilities. See our{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>{" "}
          for more details. Not all content is available in all resolutions or
          with spatial audio.
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="bg-white min-h-screen flex flex-col items-center font-sans">
  //       {/* Netflix Logo */}
  //       <div className="w-full flex justify-start px-10 py-6">
  //         <img
  //           src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
  //           alt="Netflix"
  //           className="w-32"
  //         />
  //       </div>

  //       {/* Main Content */}
  //       <div className="w-full max-w-6xl px-6 sm:px-8 md:px-12">
  //         {/* Info Bar */}
  //         <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-md text-sm mb-8">
  //           <p>
  //             Your Premium upgrade ends on <b>12/12/2025</b>. Keep <b>Premium</b>{" "}
  //             or your plan will automatically switch back to Standard.
  //           </p>
  //         </div>

  //         {/* Heading */}
  //         <h1 className="text-3xl font-semibold mb-2">Change plan</h1>
  //         <p className="text-gray-600 mb-10">
  //           Try out a new plan. You can always switch back if you do not love it.
  //         </p>

  //         {/* Plans Grid */}
  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-48 mb-12 px-10">
  //           {plans.map((plan) => (
  //             <div
  //               key={plan.id}
  //               onClick={() => setSelectedPlan(plan.id)}
  //               className={`relative rounded-2xl border transition-all duration-200 overflow-hidden shadow-md cursor-pointer
  //       ${
  //         selectedPlan === plan.id
  //           ? "border-red-500 ring-2 ring-red-400"
  //           : plan.current
  //           ? "border-gray-300"
  //           : "border-gray-200 hover:border-gray-400"
  //       }
  //       bg-white min-h-[550px] min-w-[270px]`}
  //             >
  //               {/* Header gradient */}
  //               <div
  //                 className={`h-16 flex flex-col items-center justify-center text-white font-semibold text-xl ${
  //                   plan.current
  //                     ? "bg-gradient-to-r from-purple-700 via-pink-600 to-red-500"
  //                     : selectedPlan === plan.id
  //                     ? "bg-gradient-to-r from-blue-600 to-purple-500"
  //                     : "bg-gradient-to-r from-blue-700 to-blue-400"
  //                 }`}
  //               >
  //                 <p>{plan.title}</p>
  //                 <p className="text-sm font-medium opacity-90">
  //                   {plan.resolution}
  //                 </p>
  //               </div>

  //               {/* Current Plan Label */}
  //               {plan.current && (
  //                 <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-3 py-1 rounded-b-md shadow">
  //                   Current plan
  //                 </div>
  //               )}

  //               {/* Plan Details */}
  //               <div className="p-8 text-left text-base">
  //                 <p className="text-base font-semibold text-gray-700 mb-5">
  //                   Monthly price <br />
  //                   <span className="text-xl font-bold text-black">
  //                     {plan.price}
  //                   </span>
  //                 </p>

  //                 <hr className="my-3 border-gray-200" />

  //                 <div className="text-[15px] text-gray-700 space-y-3 leading-relaxed">
  //                   <div>
  //                     <b>Video and sound quality:</b> {plan.quality}
  //                   </div>
  //                   <hr className="border-gray-200" />
  //                   <div>
  //                     <b>Resolution:</b> {plan.resolution}
  //                   </div>
  //                   <hr className="border-gray-200" />
  //                   <div>
  //                     <b>Supported devices:</b> {plan.devices}
  //                   </div>
  //                   <hr className="border-gray-200" />
  //                   <div>
  //                     <b>Devices your household can watch at the same time:</b>{" "}
  //                     {plan.watchCount}
  //                   </div>
  //                   <hr className="border-gray-200" />
  //                   <div>
  //                     <b>Download devices:</b> {plan.downloadDevices}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         {/* Continue Button */}
  //         <div className="flex justify-center mb-16">
  //           <button
  //             disabled={!selectedPlan || processing}
  //             onClick={handleContinue}
  //             className={`w-full sm:w-96 py-3 rounded-md text-lg font-semibold transition-all duration-200 ${
  //               selectedPlan
  //                 ? "bg-red-600 text-white hover:bg-red-700"
  //                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
  //             } ${processing ? "opacity-60 cursor-not-allowed" : ""}`}
  //           >
  //             {processing ? "Processing..." : "Continue"}
  //           </button>
  //         </div>

  //         {/* Footer Notes */}
  //         <div className="text-xs text-gray-500 max-w-4xl text-center mx-auto leading-relaxed">
  //           HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
  //           to your internet service and device capabilities. See our{" "}
  //           <a href="#" className="underline">
  //             Terms of Use
  //           </a>{" "}
  //           for more details. Not all content is available in all resolutions or
  //           with spatial audio.
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default ChangePlan;
