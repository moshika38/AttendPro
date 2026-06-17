

function Dashboard() {
 
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Welcome back to</p>
            <h1 className="text-3xl font-semibold text-slate-950">Dashboard</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-950 px-4 py-3 text-sm text-slate-100 shadow-lg">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Live attendance tracking
          </div>
        </div>

        <p className="max-w-2xl text-sm text-slate-600">
          A quick view of attendance summaries, student counts, and recent activity for your class or school.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Students</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">128</h2>
          <p className="mt-2 text-sm text-slate-500">Total enrolled students</p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Today Present</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">102</h2>
          <p className="mt-2 text-sm text-slate-500">Students marked present</p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Today Absent</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">26</h2>
          <p className="mt-2 text-sm text-slate-500">Students marked absent</p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Attendance Rate</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">80%</h2>
          <p className="mt-2 text-sm text-slate-500">Average attendance today</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Recent Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Latest attendance updates and notes.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-800">Ms. Johnson marked attendance for Class 10A.</p>
              <p className="mt-2 text-xs text-slate-500">5 minutes ago</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-800">20 students were marked present in Class 9B.</p>
              <p className="mt-2 text-xs text-slate-500">25 minutes ago</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-800">Attendance summary report is ready to review.</p>
              <p className="mt-2 text-xs text-slate-500">Yesterday</p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-sm ring-1 ring-slate-800">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="mt-5 space-y-3">
            <button className="w-full rounded-3xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
              Mark attendance
            </button>
            <button className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800">
              Add new student
            </button>
            <button className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800">
              View reports
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Dashboard