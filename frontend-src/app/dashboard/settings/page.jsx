import React from 'react'

function Settings() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Settings</p>
            <h1 className="text-3xl font-semibold text-slate-950">Application preferences</h1>
          </div>
          <button className="inline-flex items-center rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
            Save changes
          </button>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">
          Configure notifications, attendance defaults, and student roster settings for a smoother classroom experience.
        </p>
      </header>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">General settings</h2>
            <p className="mt-1 text-sm text-slate-500">Control the app behavior and defaults for your school.</p>
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Default attendance mode</p>
              <p className="mt-2 text-sm text-slate-500">Automatically set attendance to present when no status is selected.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Notification preferences</p>
              <p className="mt-2 text-sm text-slate-500">Receive an alert when attendance is not completed by class time.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-900">Default class section</p>
              <p className="mt-2 text-sm text-slate-500">Set the default roster to load when opening attendance.</p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">User preferences</h2>
            <p className="mt-1 text-sm text-slate-500">Personalize how the dashboard appears and behaves.</p>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-5">
              <div>
                <p className="text-sm font-medium text-slate-900">Notifications</p>
                <p className="mt-1 text-sm text-slate-500">Enable push alerts for attendance reminders.</p>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                Enabled
              </button>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-5">
              <div>
                <p className="text-sm font-medium text-slate-900">Dark mode</p>
                <p className="mt-1 text-sm text-slate-500">Switch the interface appearance.</p>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                Off
              </button>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-5">
              <div>
                <p className="text-sm font-medium text-slate-900">Weekly summary</p>
                <p className="mt-1 text-sm text-slate-500">Get a weekly attendance overview email.</p>
              </div>
              <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
                On
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Settings