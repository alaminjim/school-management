
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Pencil, Eye, Users, Phone, MapPin, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteStudentAction, getStudentsAction } from "../-actions";
import { Student } from "../students.type";
import ViewDetailsModal from "./ViewDetailsModal";
import StudentUpdateModal from "./StudentUpdateModal";
import { confirmDelete, showSuccess, showError } from "@/core/utils/swal.utils";

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const result = await getStudentsAction();
      if (result.success) {
        setStudents(Array.isArray(result.data) ? result.data : []);
      } else {
        showError("Failed to load student records. ❌");
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete();
    if (!isConfirmed) return;

    setDeletingId(id);
    const result = await deleteStudentAction(id);

    if (result?.success) {
      await showSuccess("Student has been deleted successfully! 🗑️");
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } else {
      showError(result?.message || "Could not delete student. ⚠️");
    }
    setDeletingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <Loader2 className="animate-spin text-green-600 dark:text-emerald-500" size={40} />
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 animate-pulse">
          Loading Roster... ⏳
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

      {/* 🏷️ Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-3 bg-green-55 dark:bg-green-950/30 border border-green-150/30 dark:border-green-900/20 rounded-2xl">
            <Users className="text-green-600 dark:text-emerald-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-800 dark:text-white">
              Student Roster 🧑‍🎓
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.15em]">
              Manage your academic database
            </p>
          </div>
        </div>

        <div className="bg-green-50/50 dark:bg-green-950/20 px-4 py-2 rounded-xl border border-green-150/50 dark:border-green-900/30 self-start sm:self-auto shadow-xs">
          <span className="text-xs sm:text-sm font-bold text-green-700 dark:text-emerald-400">
            Total: {students.length} Students Registered
          </span>
        </div>
      </div>

      {/* 📱 Mobile Responsive Cards & 🖥️ Desktop Table Wrapper */}
      {students.length > 0 ? (
        <>
          {/* 📱 Mobile View (Cards) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {students.map((student) => (
              <div 
                key={student.id} 
                className="bg-white dark:bg-gray-950 p-5 rounded-[2rem] border border-gray-150 dark:border-white/5 shadow-xs flex flex-col gap-4"
              >
                {/* Upper info */}
                <div className="flex items-center gap-3">
                  {student.picture ? (
                    <img
                      src={student.picture}
                      alt=""
                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-white/10"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white font-bold text-lg">
                      {student.name?.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-bold text-gray-800 dark:text-gray-100 text-base truncate">
                      {student.name}
                    </span>
                    <span className="text-[10px] font-bold text-green-600 dark:text-emerald-400 uppercase tracking-wider">
                      {student.gender} • Enrolled
                    </span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5 font-mono">
                    <IdCard size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">ID: {student.studentId}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{student.district || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 font-mono text-gray-500">
                    <Phone size={14} className="text-gray-400 shrink-0" />
                    <span>{student.guardianPhone || "No Phone"}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-white/5">
                  <ActionBtn icon={<Eye size={16} />} color="text-green-600 bg-green-50 dark:bg-green-950/30" onClick={() => setViewingStudent(student)} />
                  <ActionBtn icon={<Pencil size={16} />} color="text-teal-600 bg-teal-50 dark:bg-teal-950/30" onClick={() => setEditingStudent(student)} />
                  <ActionBtn
                    icon={deletingId === student.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    color="text-red-600 bg-red-50 dark:bg-red-950/30"
                    onClick={() => handleDelete(student.id)}
                    disabled={deletingId === student.id}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 🖥️ Desktop View (Table) */}
          <div className="hidden md:block rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-gray-900 shadow-xl shadow-green-950/[0.01] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase text-[10px] font-black tracking-wider">
                    <th className="p-6">Student Info</th>
                    <th className="p-6">Gender / ID</th>
                    <th className="p-6 hidden lg:table-cell">Location</th>
                    <th className="p-6">Phone</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {students.map((student) => (
                    <tr key={student.id} className="group hover:bg-green-500/[0.01] dark:hover:bg-white/5 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {student.picture ? (
                              <img
                                src={student.picture}
                                alt=""
                                className="h-12 w-12 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-white/10"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white font-bold">
                                {student.name?.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 dark:text-gray-100 text-base">
                              {student.name}
                            </span>
                            <span className="text-[10px] font-bold text-green-600 dark:text-emerald-400 uppercase opacity-70 tracking-wider">
                              Enrolled Student
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {student.gender}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            ID: {student.studentId}
                          </span>
                        </div>
                      </td>

                      <td className="p-6 hidden lg:table-cell text-gray-600 dark:text-gray-400 font-medium">
                        {student.district}
                      </td>

                      <td className="p-6 font-mono text-xs text-gray-500 font-semibold">
                        {student.guardianPhone}
                      </td>

                      <td className="p-6">
                        <div className="flex justify-end gap-3">
                          <ActionBtn icon={<Eye size={16} />} color="text-green-600 bg-green-50 dark:bg-green-950/30" onClick={() => setViewingStudent(student)} />
                          <ActionBtn icon={<Pencil size={16} />} color="text-teal-600 bg-teal-50 dark:bg-teal-950/30" onClick={() => setEditingStudent(student)} />
                          <ActionBtn
                            icon={deletingId === student.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                            color="text-red-600 bg-red-50 dark:bg-red-950/30"
                            onClick={() => handleDelete(student.id)}
                            disabled={deletingId === student.id}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* 📭 Empty State */
        <div className="rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-gray-900 py-16 sm:py-20 text-center flex flex-col items-center space-y-3 shadow-xl shadow-green-950/[0.01]">
          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-green-50 dark:bg-green-950/20 border border-green-100/50 dark:border-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-emerald-400">
            <Users size={28} />
          </div>
          <p className="font-bold text-gray-500 uppercase tracking-widest text-[10px] sm:text-xs font-sans">
            No students found in the roster 🔍
          </p>
        </div>
      )}

      {/* 🪟 Modals */}
      {viewingStudent && <ViewDetailsModal student={viewingStudent} onClose={() => setViewingStudent(null)} />}

      {editingStudent && (
        <StudentUpdateModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={(updated) => {
            setStudents((prev) =>
              prev.map((s) => (s.id === updated.id ? updated : s))
            );
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
}

function ActionBtn({ icon, color, onClick, disabled = false }: any) {
  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={disabled}
      className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl transition-all duration-300 hover:scale-110 active:scale-90 border border-transparent hover:border-current/10 cursor-pointer ${color}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

