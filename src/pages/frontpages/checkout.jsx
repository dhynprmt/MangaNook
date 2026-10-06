
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartcontext";

export default function Checkout() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [error, setError] = useState("");

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const shippingCost = cartItems.length > 0 ? 5000 : 0;
  const grandTotal = totalPrice + shippingCost;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add a product first.");
      return;
    }

    const order = {
      orderNumber: `MN-${Date.now().toString().slice(-8)}`,
      customer: { ...formData },
      items: cartItems.map((item) => ({ ...item })),
      totalItems,
      subtotal: totalPrice,
      shippingCost,
      grandTotal,
      createdAt: new Date().toLocaleString("id-ID"),
    };

    clearCart();

    navigate("/ordersuccess", {
      state: { order },
    });
  }

  return (
    <div className="min-h-screen bg-[#FCF7FA] px-6 py-10 text-slate-800 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-600"
        >
          <img src="../left.svg" alt="Info" className="h-6 w-6" />
        </Link>

        <div className="mt-6">
          <p className="font-semibold text-violet-600">
            MANGANOOK CHECKOUT
          </p>
          <h1 className="flex items-center gap-1 mt-2 text-3xl font-bold sm:text-4xl">
            Complete Your Order
            <img src="/jellyfish.svg" alt="Jellyfish" className="h-12 w-12" />
          </h1>
          <p className="mt-3 text-slate-500">
            Just a few details before your manga goodies arrive!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]"
        >
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">
              Shipping Information
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter the details of the person receiving the order.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-2 block text-sm font-semibold">
                  Full Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  autoComplete="street-address"
                  rows={3}
                  placeholder="Street name, house number, and other details"
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-semibold">
                  City / Regency
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level2"
                  placeholder="Enter your city"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="mb-2 block text-sm font-semibold">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="e.g. 811xx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-bold">
                Payment Method
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Choose how you would like to pay.
              </p>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="mt-1 accent-violet-600"
                />
                <span>
                  <span className="block font-semibold">
                    QRIS
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Scan the QR code to complete your payment.
                  </span>
                </span>
              </label>

              <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-violet-200">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === "bank"}
                  onChange={handleChange}
                  className="mt-1 accent-violet-600"
                />
                <span>
                  <span className="block font-semibold">
                    Bank Transfer
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Simulated payment.
                  </span>
                </span>
              </label>
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="flex gap-3">
                    <div className="block h-18 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-1">
                      <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex justify-between text-slate-500">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-violet-600">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700"
            >
              Place Order
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Demo checkout only. No real payment will be processed.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}