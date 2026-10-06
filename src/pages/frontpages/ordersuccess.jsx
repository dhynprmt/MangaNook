
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCF7FA] px-6">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">
            No Order Found
          </h1>
          <p className="mt-3 text-slate-500">
            You have not placed an order in this session.
          </p>
          <Link
            to="/"
            className="m-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-600"
          >
            <img src="../left.svg" alt="Info" className="h-6 w-6" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-6 py-12 text-slate-800">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
          <img src="/check.svg" alt="Check" className="h-10 w-10" />
        </div>

        <p className="mt-6 font-semibold tracking-widest text-violet-600">
          MANGANOOK
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Order Placed Successfully!
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
          Thank you for shopping with MangaNook! Your order has been
          recorded in this demo.
        </p>

        <div className="mt-8 rounded-2xl bg-violet-50 p-5 text-left">
          <div className="flex flex-wrap justify-between gap-2">
            <span className="text-sm text-slate-500">Order Number</span>
            <span className="font-bold text-violet-700">
              {order.orderNumber}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2">
            <span className="text-sm text-slate-500">Order Date</span>
            <span className="text-sm font-medium">
              {order.createdAt}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2">
            <span className="text-sm text-slate-500">Payment Method</span>
            <span className="font-medium">
              {order.customer.paymentMethod === "qris"
                ? "QRIS"
                : "Bank Transfer (Demo)"}
            </span>
          </div>
        </div>

        <div className="mt-8 text-left">
          <h2 className="text-lg font-bold">Order Details</h2>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span>{formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-4 text-lg font-bold">
              <span>Total Paid / Due</span>
              <span className="text-violet-600">
                {formatPrice(order.grandTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-100 p-5 text-left">
          <h2 className="font-bold">Shipping To</h2>
          <p className="mt-2 font-medium">{order.customer.fullName}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {order.customer.address}, {order.customer.city},{" "}
            {order.customer.postalCode}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {order.customer.phone}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {order.customer.email}
          </p>
        </div>

        <Link
          to="/products"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700"
        >
          Continue Shopping
        </Link>

        <Link
          to="/"
          className="mt-4 inline-flex font-medium text-slate-500 transition hover:text-violet-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}