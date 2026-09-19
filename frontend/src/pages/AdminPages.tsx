import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentManager } from "../components/admin/ContentManager";
import { api } from "../services/api";
type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  createdAt: string;
};
export function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const d = new FormData(e.currentTarget);
    try {
      await api.login(String(d.get("email")), String(d.get("password")));
      navigate("/admin");
    } catch (x) {
      setError(x instanceof Error ? x.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="grid min-h-screen place-items-center bg-ink p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-white p-8"
      >
        <p className="text-sm font-extrabold uppercase tracking-widest text-brand">
          Avnture admin
        </p>
        <h1 className="mt-3 text-3xl font-bold">Secure sign in</h1>
        <label className="mt-8 block text-sm font-bold">
          Email
          <input
            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4"
            name="email"
            type="email"
            required
            autoComplete="username"
          />
        </label>
        <label className="mt-5 block text-sm font-bold">
          Password
          <input
            className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </label>
        {error && (
          <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>
        )}
        <button className="button-primary mt-6 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
export function AdminDashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    Promise.all([api.me(), api.adminList<Lead>("leads")])
      .then(([u, l]) => {
        setUser(u);
        setLeads(l);
      })
      .catch(() => nav("/admin/login"));
  }, [nav]);
  async function status(id: string, value: string) {
    try {
      await api.updateLead(id, value);
      setLeads((xs) =>
        xs.map((x) => (x._id === id ? { ...x, status: value } : x)),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update");
    }
  }
  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-shell flex h-20 items-center justify-between">
          <div>
            <p className="font-extrabold">Avnture Technologies</p>
            <p className="text-sm text-slate-500">Content & enquiries</p>
          </div>
          <button
            className="button-secondary"
            onClick={async () => {
              await api.logout();
              nav("/admin/login");
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      <div className="container-shell py-10">
        <h1 className="text-3xl font-bold">
          Welcome{user ? `, ${user.name}` : ""}
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["New leads", leads.filter((x) => x.status === "new").length],
            ["All enquiries", leads.length],
            ["Qualified", leads.filter((x) => x.status === "qualified").length],
          ].map(([a, b]) => (
            <div className="card p-6" key={a}>
              <p className="text-sm font-bold text-slate-500">{a}</p>
              <p className="mt-3 text-4xl font-black">{b}</p>
            </div>
          ))}
        </div>
        <section className="mt-10 card overflow-hidden">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold">Incoming enquiries</h2>
            {error && <p className="mt-2 text-red-700">{error}</p>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  {["Contact", "Service", "Received", "Status"].map((x) => (
                    <th className="px-6 py-4" key={x}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((x) => (
                  <tr className="border-t border-slate-100" key={x._id}>
                    <td className="px-6 py-4">
                      <strong>{x.name}</strong>
                      <br />
                      <a href={`mailto:${x.email}`}>{x.email}</a>
                      <br />
                      <a href={`tel:${x.phone}`}>{x.phone}</a>
                    </td>
                    <td className="px-6 py-4">{x.service}</td>
                    <td className="px-6 py-4">
                      {new Date(x.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label={`Status for ${x.name}`}
                        className="rounded-lg border border-slate-300 px-3 py-2"
                        value={x.status}
                        onChange={(e) => status(x._id, e.target.value)}
                      >
                        {[
                          "new",
                          "contacted",
                          "qualified",
                          "proposal-sent",
                          "won",
                          "lost",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {!leads.length && (
                  <tr>
                    <td className="px-6 py-10 text-slate-500" colSpan={4}>
                      No enquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <ContentManager />
      </div>
    </main>
  );
}
