"use client"
import React, { useEffect, useState } from 'react'

const classOptions = ['All', 'Class A', 'Class B', 'Class C']


function Attendance() {
  const [students, setStudents] = useState([])
  const [selectedClass, setSelectedClass] = useState("All")
  const [attendance, setAttendance] = useState([])

  const [totPresent, setTotPresent] = useState(0)
  const [totAbsent, setTotAbsent] = useState(0)
  const [totLate, setTotLate] = useState(0)

  const today = new Date().toISOString().slice(0, 10)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
  const statusStyle = {
    Present: "bg-slate-950 text-slate-100",
    Absent: "bg-rose-400 text-slate-950",
    Late: "bg-amber-400 text-slate-950"
  }

  useEffect(() => {
    const updateTotals = () => {
      setTotPresent(attendance.filter(item => item.status === "Present").length)
      setTotAbsent(attendance.filter(item => item.status === "Absent").length)
      setTotLate(attendance.filter(item => item.status === "Late").length)
    }
    updateTotals()
  }, [attendance])

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await fetch(`${apiUrl}/api/students`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()
        if (response.ok) {
          setStudents(data)
        } else {
          alert("Error: " + (data.response || data.error || "Unable to load students"))
        }
      } catch (error) {
        console.error("Failed to fetch students:", error)
        alert("Network error loading students.")
      }
    }

    async function getAttendance() {
      try {
        const response = await fetch(`${apiUrl}/api/attendance?date=${encodeURIComponent(today)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()
        if (response.ok) {
          setAttendance(data)
        } else {
          alert("Error: " + (data.response || data.error || "Unable to load attendance"))
        }
      } catch (error) {
        console.error("Failed to fetch attendance:", error)
        alert("Network error loading attendance.")
      }
    }

    getStudents()
    getAttendance()
  }, [apiUrl, today])


  async function saveAttendance(record) {
    try {
      const url = record.id
        ? `${apiUrl}/api/attendance/${record.id}`
        : `${apiUrl}/api/attendance`
      const method = record.id ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to save attendance")
      }
      return data
    } catch (error) {
      console.error("Failed to save attendance:", error)
      return null
    }
  }

  async function updateStatus(id, status) {
    const existing = attendance.find(a => a.student_id === id)
    const record = existing
      ? { ...existing, status }
      : { student_id: id, date: today, status }

    setAttendance(prev => {
      const exists = prev.some(a => a.student_id === id)
      return exists
        ? prev.map(a => (a.student_id === id ? record : a))
        : [...prev, record]
    })

    const saved = await saveAttendance(record)
    if (saved?.id) {
      setAttendance(prev =>
        prev.map(a =>
          a.student_id === saved["student_id"] ? { ...a, id: saved.id } : a
        )
      )
    }
  }

  async function markAll(status) {
    const filteredStudents =
      selectedClass === "All"
        ? students
        : students.filter(student => student.class === selectedClass)

    const records = filteredStudents.map(student => ({
      student_id: student.id,
      date: today,
      status,
    }))

    setAttendance(records)

    await Promise.all(
      records.map(async (record) => {
        const saved = await saveAttendance(record)
        if (saved?.id) {
          setAttendance((prev) =>
            prev.map((a) =>
              a.student_id === saved["student_id"]
                ? { ...a, id: saved.id }
                : a
            )
          )
        }
      })
    )
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
              <p className="mt-3 text-3xl font-semibold text-slate-950">{totPresent}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Absent</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{totAbsent}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Late</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{totLate}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">Quick action</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => markAll("Present")}
                  type="button"
                  className="rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Mark all present
                </button>
                <button
                  onClick={() => markAll("Late")}
                  type="button"
                  className="rounded-3xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Mark all late
                </button>
                <button
                  onClick={() => markAll("Absent")}
                  type="button"
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
              <label className="sr-only" htmlFor="class-select">Class</label>
              <select
                id="class-select"
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
              >


                {classOptions.map((option) => (
                  <option key={option} value={option} >
                    {option}
                  </option>
                ))}

              </select>
              <span className="text-sm text-slate-500">Class</span>
            </div>

            <div className="w-full sm:w-80">
              <label className="sr-only" htmlFor="student-search">Search students</label>
              <input
                id="student-search"
                placeholder="Search student"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] ml-2 ">Students list</p>
          </div>

          <div className="mt-6 space-y-3">



            {students.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                No matching students found.
              </div>
            ) : (
              students.filter(student => selectedClass === "All" || student.class === selectedClass).map((student) => {
                const current = attendance.find(a => a.student_id === student.id)
                const currentStatus = current ? current.status : ""

                return (
                  <div key={student.id} className="flex flex-row items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                    <p className="w-8 text-sm font-medium text-slate-500">{student.id}</p>
                    <p className="flex-1 px-4 font-medium text-slate-950">{student.name}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStatus(student.id, "Present")}
                        className={`rounded-3xl px-3 py-2 text-xs font-semibold transition border border-slate-200 ${currentStatus === "Present" ? statusStyle.Present : "bg-white text-slate-700 hover:bg-slate-100"}`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, "Absent")}
                        className={`rounded-3xl px-3 py-2 text-xs font-semibold transition border border-slate-200 ${currentStatus === "Absent" ? statusStyle.Absent : "bg-white text-slate-700 hover:bg-slate-100"}`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, "Late")}
                        className={`rounded-3xl px-3 py-2 text-xs font-semibold transition border border-slate-200 ${currentStatus === "Late" ? statusStyle.Late : "bg-white text-slate-700 hover:bg-slate-100"}`}
                      >
                        Late
                      </button>
                    </div>
                  </div>
                )
              })
            )}

          </div>


        </article>
      </section>
    </div >
  )
}

export default Attendance