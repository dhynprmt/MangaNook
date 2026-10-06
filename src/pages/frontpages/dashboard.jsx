
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../../data/product";


export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query)
    );
  });

  const featuredProducts = searchQuery
    ? filteredProducts
    : products.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FCF7FA] text-slate-800">
      {/* Hero Section */}
      <section className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl bg-cover p-8 sm:p-12 md:grid-cols-2"
              style={{ backgroundImage: "url('/hero1.jpeg')" }}
              >
              <div className="absolute inset-0 bg-gradient-to-r from-[#DFF2FF]/90 to-[#EAE2FF]/90"></div>
          <div className="relative z-10">
            <img src="../dinosaur.svg" alt="Dinosaur" className="inline-block h-15 w-15 mr-1 scale-x-[-1]" />
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-violet-600">
              Your little anime corner
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
              Find Your Next
              <span className="block text-violet-600">
                Favorite Treasure!
              </span>
            </h1>

            <p className="mt-4 max-w-lg leading-7 text-slate-600">
              Discover manga, collectible figures, and adorable
              accessories made for every anime fan.
            </p>

            <a
              href="#featured"
              className="inline-block mt-6 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-lg"
            >
              Explore Collection
            </a>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/70 text-8xl shadow-sm sm:h-60 sm:w-60 sm:text-9xl">
              <video
                src="/koin.webm" autoPlay loop muted playsInline className="mx-auto object-contain"/>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section 
          id="categories"
          className="px-6 py-8 sm:px-10 lg:px-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Browse Categories
        </h2>
        <p className="mt-2 text-slate-500">
          A little something for every collection.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Manga",
              icon: "/penguin.svg",
              color: "bg-blue-100",
            },
            {
              name: "Figures & Collectibles",
              icon: "/lion.svg",
              color: "bg-purple-100",
            },
            {
              name: "Accessories",
              icon: "/bear.svg",
              color: "bg-pink-100",
              flip: true,
            },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/products?search=${encodeURIComponent(category.name)}`}
              className={`rounded-2xl ${category.color} p-6 transition hover:-translate-y-1`}
            >
              <img src={category.icon} alt={category.name} className={`inline-block h-15 w-15 mr-1 ${category.flip ? "scale-x-[-1]" : ""}`} />
              <h3 className="mt-3 font-bold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="featured"
        className="px-6 py-10 sm:px-10 lg:px-16"
      >
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {searchQuery ? "Search Results" : "Featured Products"}
          </h2>

          <p className="mt-2 text-slate-500">
            {searchQuery
              ? `Results for "${searchQuery}" — ${filteredProducts.length} product(s) found.`
              : "Take a look at some of our favorite picks."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-4">
                <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1 p-5 flex flex-col">
                <span className="mt-4 inline-block w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-500">
                  {product.category}
                </span>

                <h3 className="mt-2 font-bold">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {product.desc}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="mt-4 font-bold">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </span>

                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#EAE2FF] px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-white"
                  >
                    <img src="../info.svg" alt="Info" className="h-3 w-3" />
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!searchQuery && (
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-violet-300 px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              View All Products
              <img src="../arrow_right.svg" alt="Right Arrow" className="h-5 w-5" />
            </Link>
          </div>
        )}
      </section>

      {/* Bottom Banner */}
      <section className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
        <img src="/kucing.gif" alt="Kucing" className="mx-auto h-30 w-30 object-contain"/>          
          <h2 className="mt-4 text-2xl font-bold text-violet-600">
            Your Collection,<span className="mt-4 text-2xl font-bold text-slate-800"> Your Story</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-500">
            Find something special to make your MangaNook collection
            feel a little more like you.
          </p>
        </div>
      </section>
    </div>
  );
}