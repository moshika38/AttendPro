"use client";
import React, { useState, useEffect } from 'react'

function Students() {
  const [students, setStudents] = useState([])
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [modalStudent, setModalStudent] = useState({ name: '', email: '', studentClass: 'Class A' })


  useEffect(() => {
    async function getStudents() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setStudents(data.map((student) => ({
            ...student,
            studentClass: student.studentClass || student.class || student.status || 'Class A',
          })));
        } else {
          alert("Error: " + (data.response || data.error || "Unable to load students"));
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        alert("Network error loading students.");
      }
    }
    getStudents();
  }, [])

  function openEditor(index = -1) {
    if (index >= 0) {
      const existing = students[index]
      setModalStudent({
        id: existing.id || existing._id || null,
        name: existing.name || '',
        email: existing.email || existing.grade || '',
        studentClass: existing.studentClass || existing.class || existing.status || 'Class A',
      })
      setEditingIndex(index)
    } else {
      setModalStudent({ name: '', email: '', studentClass: 'Class A' })
      setEditingIndex(-1)
    }
    setIsEditorOpen(true)
  }

  function closeEditor() {
    setIsEditorOpen(false)
    setEditingIndex(-1)
  }

  async function handleSaveStudent(event) {
    event.preventDefault()
    if (!modalStudent.name.trim() || !modalStudent.email.trim()) {
      return
    }

    if (editingIndex >= 0) {
      const studentId = students[editingIndex].id || students[editingIndex]._id;

      try {
        const response = await fetch(`http://127.0.0.1:5000/api/students/${studentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: modalStudent.name,
            email: modalStudent.email,
            class: modalStudent.studentClass
          }),
        });

        if (response.ok) {
          setStudents((prev) => prev.map((student, i) =>
            i === editingIndex
              ? { ...student, ...modalStudent, class: modalStudent.studentClass, studentClass: modalStudent.studentClass }
              : student
          ))
          closeEditor()
          alert("Updated successfully");
        } else {
          alert("Failed to update student in database");
        }
      } catch (e) {
        console.error("Failed to update student:", e);
        alert("Network error updating student");
      }

    } else {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: modalStudent.name,
            email: modalStudent.email,
            class: modalStudent.studentClass
          }),
        });

        await response.json();

        if (response.ok) {
          setStudents((prev) => [...prev, { ...modalStudent, studentClass: modalStudent.studentClass }])
          closeEditor()
        } else {
          alert("Failed to add students");
        }
      } catch (e) {
        console.error("Failed to add students:", e);
        alert("Failed to add students");
      }
    }
  }


  async function handleDelete(id) {
    const response = await fetch(`http://127.0.0.1:5000/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setStudents((prev) => prev.filter((student) => (student.id || student._id) !== id));
      alert("Student deleted!");
    } else {
      alert("Failed to delete student");
    }
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
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  value={modalStudent.email}
                  onChange={(event) => setModalStudent((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
                  placeholder="student@school.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Class</label>
                <select
                  value={modalStudent.studentClass}
                  onChange={(event) => setModalStudent((prev) => ({ ...prev, studentClass: event.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-950"
                >
                  <option>Class A</option>
                  <option>Class B</option>
                  <option>Class C</option>
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
                <span>Email</span>
                <span>Class</span>
                <span className="text-right">Action</span>
              </div>
              {students.map((student, index) => (
                <div key={student.name + index} className={`grid grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-4 px-5 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <div>
                    <p className="font-medium text-slate-950">{student.name}</p>
                  </div>
                  <p className="text-slate-700">{student.email || student.grade}</p>
                  <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ${student.studentClass === 'Class A' || student.class === 'Class A' || student.status === 'Section A' ? 'bg-emerald-100 text-emerald-700' : student.studentClass === 'Class B' || student.class === 'Class B' || student.status === 'Section B' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                    {student.studentClass || student.class || student.status}
                  </span>
                  <div className="justify-self-end inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditor(index)}
                      className="rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Are you sure?")) { handleDelete(student.id); }
                      }}
                      className="rounded-3xl border border-rose-500 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </>
  )
}

export default Students;