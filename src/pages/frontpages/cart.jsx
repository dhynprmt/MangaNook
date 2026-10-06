
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartcontext";

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="min-h-screen bg-[#FCF7FA] px-6 py-10 text-slate-800 sm:px-10 lg:px-16">
      <h1 className="flex items-center gap-1 text-3xl font-extrabold">
        <img src="../deer.svg" alt="Deer" className="h-12 w-12" />
        My Shopping Cart</h1>

      <p className="mt-2 text-slate-500">
        Review your items before checking out.
      </p>

      {cartItems.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
          <img src="../cart.svg" alt="Empty Cart" className="mx-auto h-16 w-16" />

          <h2 className="mt-5 text-xl font-bold">
            Your cart is empty
          </h2>

          <p className="mt-2 text-slate-500">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
              <div className="block h-32 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-1">
                <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain"
                />
              </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase text-violet-500">
                    {item.category}
                  </p>

                  <h2 className="mt-1 font-bold">{item.name}</h2>

                  <p className="mt-2 font-semibold">
                    {formatPrice(item.price)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="w-6 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    aria-label={`Increase quantity of ${item.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg hover:bg-violet-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold sm:w-32 sm:text-right">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-5 flex justify-between gap-3 text-slate-500">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-4 flex justify-between gap-3 text-slate-500">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="my-5 border-t border-slate-100" />

            <div className="flex justify-between gap-3 text-lg font-extrabold">
              <span>Total</span>
              <span className="text-violet-700">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 block rounded-full bg-violet-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="mt-3 block text-center text-sm font-medium text-violet-600 hover:text-violet-800"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}