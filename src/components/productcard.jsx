import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article
      className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <p className="mt-4 inline-block w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase text-violet-500">
        {product.category}
      </p>

      <h2 className="mt-2 font-bold">
        {product.name}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {product.desc}
      </p>

      <div className="mt-auto">
        <p className="mt-4 font-bold">
          {product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-[#EAE2FF] px-5 py-3 text-center font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-white"
        >
          <img
            src="../info.svg"
            alt="Info"
            className="h-4 w-4"
          />
          Details
        </Link>
      </div>
    </article>
  );
}