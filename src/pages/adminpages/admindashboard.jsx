import { Link } from "react-router-dom";
import { products } from "../../data/product";

export default function AdminDashboard() {
  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your MangaNook store.
          </p>
        </div>

        <Link
          to="/"
          className="w-fit rounded-full bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          View Store
        </Link>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {/* Products */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Total Products
          </p>

          <p className="mt-3 text-3xl font-extrabold text-violet-600">
            {totalProducts}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Products available in store
          </p>
        </div>

        {/* Categories */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Categories
          </p>

          <p className="mt-3 text-3xl font-extrabold text-violet-600">
            {totalCategories}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Product categories
          </p>
        </div>

        {/* Orders */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Orders
          </p>

          <p className="mt-3 text-3xl font-extrabold text-violet-600">
            0
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Orders received
          </p>
        </div>

      </div>

      {/* Recent Products */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Products currently listed in your store.
            </p>
          </div>

          <div
            className="text-sm font-semibold text-violet-600 hover:text-violet-700"
          >
            Manage Products
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <span className="font-semibold">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="font-semibold text-violet-600 hover:text-violet-700"
                      >
                        View
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}