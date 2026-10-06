import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#F7F8FC] text-slate-800">

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 md:block">
        <h1 className="text-2xl font-extrabold text-violet-600">
          MangaNook
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Admin Panel
        </p>

        <nav className="mt-8 space-y-2">
          <Link
            to="/admin"
            className="block rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-600"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/about"
            className="block rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-600"
          >
            About
          </Link>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Content */}
        <main className="flex-1 p-6 sm:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-violet-900 px-6 py-4 text-center text-sm text-slate-300">
          © 2026 Dhyana
        </footer>

      </div>
    </div>
  );
}