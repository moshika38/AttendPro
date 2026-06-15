"use client";
import React, { useState } from 'react'

const initialStudentList = [
  { name: 'Amina Patel', grade: '8B', status: 'Present' },
  { name: 'James Carter', grade: '9A', status: 'Absent' },
  { name: 'Lily Nguyen', grade: '10C', status: 'Late' },
  { name: 'Noah Smith', grade: '8A', status: 'Present' },
]

function Students() {
  const [students, setStudents] = useState(initialStudentList)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [modalStudent, setModalStudent] = useState({ name: '', grade: '', status: 'Present' })

  function openEditor(index = -1) {
    if (index >= 0) {
      setModalStudent(students[index])
      setEditingIndex(index)
    } else {
      setModalStudent({ name: '', grade: '', status: 'Present' })
      setEditingIndex(-1)
    }
    setIsEditorOpen(true)
  }

  function closeEditor() {
    setIsEditorOpen(false)
    setEditingIndex(-1)
  }

  function handleSaveStudent(event) {
    event.preventDefault()
    if (!modalStudent.name.trim() || !modalStudent.grade.trim()) {
      return
    }

    if (editingIndex >= 0) {
      setStudents((prev) => prev.map((student, i) => (i === editingIndex ? { ...modalStudent } : student)))
    } else {
      setStudents((prev) => [...prev, { ...modalStudent }])
    }

    closeEditor()
  }

  const studentCount = students.length

  return (
    <>
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {editingIndex >= 0 ? 'Edit student' : 'Add student'}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {editingIndex >= 0
                    ? 'Update this student and save the roster changes.'
                    : 'Enter the new student details and save to the roster.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  value={modalStudent.name}
                  onChange={(event) => setModalStudent((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
                  placeholder="Student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Grade</label>
                <input
                  value={modalStudent.grade}
                  onChange={(event) => setModalStudent((prev) => ({ ...prev, grade: event.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
                  placeholder="e.g. 9A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={modalStudent.status}
                  onChange={(event) => setModalStudent((prev) => ({ ...prev, status: event.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Save student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <header className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Students</p>
              <h1 className="text-3xl font-semibold text-slate-950">Student roster</h1>
            </div>
            <button
              type="button"
              onClick={() => openEditor()}
              className="inline-flex items-center rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Add student
            </button>
          </div>
          <p className="max-w-2xl text-sm text-slate-600">
            Browse your class list, check enrollment details, and review seating groups for today.
          </p>
        </header>

        <section className="grid gap-4">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Active students</h2>
                <p className="mt-1 text-sm text-slate-500">Currently enrolled in your selected class.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="font-semibold text-slate-950">{studentCount}</span> students
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-500">
                <span>Name</span>
                <span>Grade</span>
                <span>Status</span>
                <span className="text-right">Action</span>
              </div>
              {students.map((student, index) => (
                <div key={student.name + index} className={`grid grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-4 px-5 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <div>
                    <p className="font-medium text-slate-950">{student.name}</p>
                  </div>
                  <p className="text-slate-700">{student.grade}</p>
                  <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ${student.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : student.status === 'Absent' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                    {student.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => openEditor(index)}
                    className="justify-self-end rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </>
  )
}

export default Students