import { useState } from "react";
import { ArrowLeft, Ticket, CreditCard, User, Mail, Phone } from "lucide-react";
import { useAuthStore } from "../../store/userAuthStore";
import type { IEvent } from "../../Types/basicTypes";
import { createRazorpayOrder, confirmPayment, purchaseTicket } from "../../service/user/userApi";

interface CheckoutPageProps {
  event: IEvent;
  onClose: () => void;
  onBackToDetails?: () => void;
  onPurchaseComplete: (paymentMethod: "wallet" | "stripe" | "razorpay") => void;
}

interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
}

const MAX_TICKETS_PER_USER = 5;

export default function CheckoutPage({ event, onClose, onBackToDetails, onPurchaseComplete }: CheckoutPageProps) {
  const { name, email } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: name || "",
    email: email || "",
    phone: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"stripe" | "wallet" | "razorpay">("stripe");

  const totalPrice = (event.ticketPrice * quantity).toFixed(2);
  const processingFee = 3;
  const finalTotal = Math.round(parseFloat(totalPrice) + processingFee);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + change;
      return Math.max(1, Math.min(MAX_TICKETS_PER_USER, newQuantity));
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "stripe" | "wallet" | "razorpay";
    setSelectedPaymentMethod(value);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmPurchase = async () => {
    if (!userDetails.fullName || !userDetails.email || !userDetails.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (selectedPaymentMethod === "razorpay") {
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        alert("Razorpay SDK failed to load. Please try again.");
        return;
      }

      try {
        const orderData = await createRazorpayOrder(finalTotal,event._id);
        if (!orderData || !orderData.success) {
          alert("Failed to create Razorpay order.");
          return;
        }
        console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderData.data.amount,
          currency: orderData.data.currency,
          name: "Event Aura",
          description: `Purchase Tickets for ${event.title}`,
          order_id: orderData.data.id,
          handler: async function (response: any) {
            const confirmData = {
              eventId: event._id,
              quantity,
              price: finalTotal,
              paymentId: response.razorpay_payment_id
            };
            const result = await confirmPayment(confirmData);
            if (result && result.success) {
              onPurchaseComplete("razorpay");
            } else {
              alert("Payment confirmation failed.");
            }
          },
          prefill: {
            name: userDetails.fullName,
            email: userDetails.email,
            contact: userDetails.phone
          },
          theme: {
            color: "#14B8A6"
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Razorpay error:", error);
        alert("Payment failed. Please try again.");
      }
    } else if (selectedPaymentMethod === "wallet") {
      const data = {
        eventId: event._id,
        quantity,
        price: finalTotal
      };
      const response = await purchaseTicket(data);
      if (response && response.success) {
        onPurchaseComplete(selectedPaymentMethod);
      } else {
        alert("Payment failed. Please try again.");
      }
    }
  };

  const handleBackClick = () => {
    if (onBackToDetails) {
      onBackToDetails();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 shadow-md">
        <div className="relative bg-gray-50 p-6 rounded-t-xl">
          <h1 className="text-2xl font-bold pl-11 text-gray-900">Checkout: {event.title}</h1>
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
            title={onBackToDetails ? "Back to Event Details" : "Close"}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Details</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-teal-600" />
                  <input
                    type="text"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-600"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-teal-600" />
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-600"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-teal-600" />
                  <input
                    type="tel"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-600"
                    required
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Ticket Quantity</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Ticket className="h-5 w-5 text-teal-600" />
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                  disabled={quantity >= MAX_TICKETS_PER_USER}
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                Maximum {MAX_TICKETS_PER_USER} tickets per user
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-3 mb-8">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={selectedPaymentMethod === "wallet"}
                    onChange={handlePaymentMethodChange}
                    className="mr-3"
                  />
                  <span className="w-5 h-5 mr-3 bg-teal-600 rounded"></span>
                  <span className="text-gray-700">Wallet Balance</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={selectedPaymentMethod === "razorpay"}
                    onChange={handlePaymentMethodChange}
                    className="mr-3"
                  />
                  <span className="w-5 h-5 mr-3 bg-teal-600 rounded"></span>
                  <span className="text-gray-700">Razorpay</span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex justify-between">
                    <span>Ticket Price</span>
                    <span>₹{event.ticketPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>₹{processingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmPurchase}
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg mt-6"
                >
                  Confirm Purchase
                </button>
                <div className="text-center text-sm text-gray-500 mt-4">
                  <CreditCard className="h-4 w-4 inline mr-1" />
                  Secure payment • Instant confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}