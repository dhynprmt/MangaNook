export default function AdminAbout() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold">About MangaNook</h1>

      <p className="mt-2 text-slate-500">
        Information about the MangaNook store and admin panel.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-violet-600">
          MangaNook Admin Panel
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          MangaNook is an online store that provides manga, figures,
          collectibles, and accessories for anime and manga fans.
        </p>

      </div>
    </div>
  );
}