
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { products } from "../../data/product";
import { useCart } from "../../context/cartcontext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const product = products.find((item) => item.id === Number(id));

  const formattedPrice = product.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-[#FCF7FA] px-6 py-10 text-slate-800 sm:px-10 lg:px-16">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-600"
      >
       <img src="../left.svg" alt="Info" className="h-6 w-6" />
      </Link>

      <div className="mx-auto mt-8 grid max-w-5xl gap-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10 md:grid-cols-2">
        <div className="flex min-h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DFF2FF] to-[#EAE2FF] p-6 sm:min-h-96">
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-80 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            {product.category}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 leading-7 text-slate-500">
            {product.desc}
          </p>

          <p className="mt-6 text-2xl font-extrabold text-violet-700">
            {formattedPrice}
          </p>

          <button
            type="button"
            onClick={() => {
              addToCart(product);
              setShowSuccess(true);
            }}
            
            className="mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-[#EAE2FF] px-5 py-3 text-center font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-white"
          >
            <img src="../cart.svg" alt="Cart Button" className="h-4 w-4" />
            Add to Cart
          </button>

          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
              <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  <img src="../check.svg" alt="Checkmark" className="h-9 w-9" />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-800">
                  Successfully Added!
                </h2>

                <p className="mt-3 text-slate-500">
                  {product.name} has been added to your cart.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/cart"
                    onClick={() => setShowSuccess(false)}
                    className="rounded-full bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                  >
                    View My Cart
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowSuccess(false)}
                    className="rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}