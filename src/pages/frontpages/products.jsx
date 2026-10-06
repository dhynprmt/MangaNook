
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../../data/product";
import ProductCard from "../../components/productcard";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FCF7FA] px-6 py-10 text-slate-800 sm:px-10 lg:px-16">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-600"
      >
       <img src="../left.svg" alt="Info" className="h-6 w-6" />
      </Link>
      <h1 className="flex items-center gap-1 text-3xl font-extrabold">
        <img src="../squirrel.svg" alt="Squirrel" className="h-12 w-12 scale-x-[-1]" />
        All Products</h1>

      <p className="mt-2 text-slate-500">
        Explore the MangaNook collection.
      </p>

      <p className="mt-5 text-sm text-slate-500">
        {filteredProducts.length} product found
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>


      {filteredProducts.length === 0 && (
        <p className="mt-8 text-center text-slate-500">
          Produk tidak ditemukan. Coba kata kunci lain, ya!
        </p>
      )}
    </div>
  );
}