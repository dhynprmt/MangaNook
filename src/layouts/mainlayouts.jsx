
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
  }, [location.search, searchParams]);

  function handleSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);

    navigate(`/products${params.toString() ? `?${params}` : ""}`);
  }

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (selectedCategory) params.set("category", selectedCategory);

    navigate(`/products${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FC] text-slate-800">
      <Navbar />

      <header className="border-b border-slate-200 bg-white px-6 py-4 sm:px-10 lg:px-16">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative w-full sm:flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <img src="../search.svg" alt="Search" className="h-5 w-5" />
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              className="w-full rounded-xl border border-slate-200 bg-[#F7F8FC] py-3 pl-11 pr-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div className="relative w-full sm:w-56">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-[#F7F8FC] px-4 py-3 outline-none transition focus:border-violet-400 sm:w-56"
            >
              <option value="">All Categories</option>
              <option value="Manga">Manga</option>
              <option value="Figures & Collectibles">Figures & Collectibles</option>
              <option value="Accessories">Accessories</option>
            </select>

            <img src="/bottom.svg" alt="Dropdown" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Search
          </button>
        </form>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 sm:px-10 lg:px-16">
        <Outlet />
      </main>

      <footer className="bg-violet-900 px-6 py-5 text-center text-sm text-slate-300">
        <p>© 2026 E-Commerce Dhyana | Version 1.0</p>
      </footer>
    </div>
  );
}