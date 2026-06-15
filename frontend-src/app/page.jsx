'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/30">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-500">
            Student Attendance System
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-600">
            Log in with your school email to track attendance and view your
            dashboard.
          </p>
        </div>

        <form className="space-y-6" id="form">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="student@school.edu"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />
          </div>

          <button
            type="submit"
            onClick={(e) => handleLogin(e)}
            className="w-full rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <h2 className="mb-3 text-slate-900 font-medium">Login details</h2>
          <p>
            Use your student email and password. There is no account creation or
            password reset on this page.
          </p>
        </div>
      </div>
    </main>
  );
}
