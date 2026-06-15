"use client"
import React, { useMemo, useState } from 'react'

const classOptions = ['All', '8A', '8B', '9A', '10C']
const initialStudents = [
  { name: 'Amina Patel', grade: '8', section: 'B', status: 'Present', classKey: '8B' },
  { name: 'James Carter', grade: '8', section: 'B', status: 'Absent', classKey: '8B' },
  { name: 'Lily Nguyen', grade: '10', section: 'C', status: 'Late', classKey: '10C' },
  { name: 'Noah Smith', grade: '8', section: 'B', status: 'Present', classKey: '8B' },
  { name: 'Mia Johnson', grade: '9', section: 'A', status: 'Present', classKey: '9A' },
]

function Attendance() {
  const [students, setStudents] = useState(initialStudents)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesClass = selectedClass === 'All' || student.classKey === selectedClass
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter
      return matchesClass && matchesSearch && matchesStatus
    })
  }, [students, searchQuery, selectedClass, statusFilter])

  const counts = useMemo(() => {
    return students.reduce(
      (acc, student) => {
        acc[student.status] = (acc[student.status] || 0) + 1
        return acc
      },
      { Present: 0, Absent: 0, Late: 0 }
    )
  }, [students])

  function markAllPresent() {
    setStudents((prev) => prev.map((student) => ({ ...student, status: 'Present' })))
  }

  function changeStudentStatus(index, status) {
    setStudents((prev) => prev.map((student, idx) => (idx === index ? { ...student, status } : student)))
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Attendance</p>
            <h1 className="text-3xl font-semibold text-slate-950">Mark today&apos;s attendance</h1>
          </div>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">
          Select a class, search for a student, and update attendance status directly below.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Attendance session</h2>
              <p className="mt-1 text-sm text-slate-500">Morning class · 10:00 AM</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Open</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Present</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{counts.Present}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Absent</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{counts.Absent}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Late</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{counts.Late}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">Quick action</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={markAllPresent}
                  className="rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Mark all present
                </button>
                <button
                  type="button"
                  onClick={() => setStudents((prev) => prev.map((student) => ({ ...student, status: 'Late' })))}
                  className="rounded-3xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Mark all late
                </button>
                <button
                  type="button"
                  onClick={() => setStudents((prev) => prev.map((student) => ({ ...student, status: 'Absent' })))}
                  className="rounded-3xl bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-300"
                >
                  Mark all absent
                </button>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Student roster</h2>
              <p className="mt-1 text-sm text-slate-500">Search, filter, and update the roster one student at a time.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="class-select">
                Class
              </label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
              >
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-slate-500">Class</span>
            </div>

            <div className="w-full sm:w-80">
              <label className="sr-only" htmlFor="student-search">
                Search students
              </label>
              <input
                id="student-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search student"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Filter by status</p>
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Present', 'Absent', 'Late'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatusFilter(option)}
                  className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === option
                      ? 'bg-slate-950 text-slate-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {filteredStudents.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                No matching students found.
              </div>
            ) : (
              filteredStudents.map((student, index) => (
                <div
                  key={`${student.name}-${index}`}
                  className="rounded-3xl bg-slate-50 px-4 py-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-950">{student.name}</p>
                      <p className="text-sm text-slate-500">Grade {student.grade} · Section {student.section}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${student.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : student.status === 'Absent' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                        {student.status}
                      </span>
                      <div className="flex items-center gap-2">
                        {['Present', 'Absent', 'Late'].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => changeStudentStatus(students.indexOf(student), status)}
                            className={`rounded-3xl px-3 py-2 text-xs font-semibold transition ${
                              student.status === status
                                ? 'bg-slate-950 text-slate-100'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  )
}

export default Attendance