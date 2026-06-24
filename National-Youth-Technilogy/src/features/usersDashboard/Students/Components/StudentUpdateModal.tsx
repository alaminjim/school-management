/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Props, Student } from "../students.type";
import { updateStudentSchema } from "../students.schema";
import { updateStudentAction } from "../-actions";
import { STUDENT_FORM_FIELDS } from "../student-form";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { showSuccess, showError } from "@/core/utils/swal.utils";

export default function StudentUpdateModal({
  student,
  onClose,
  onUpdated,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(student.picture || "");
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(updateStudentSchema as any),
    defaultValues: student,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        setValue("picture", url);
        setPreviewUrl(url);
      }
    } catch (err) {
      await showError("Photo upload failed! Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: Student) => {
    setIsSubmitting(true);
    try {
      const result = await updateStudentAction(student.id, data);
      if (result.success) {
        await showSuccess("Student profile updated successfully! 🎉");
        onUpdated(result.data || { ...student, ...data });
        onClose();
      } else {
        await showError(result.message || "Failed to update profile.");
      }
    } catch (err) {
      await showError("A server error occurred. Please try later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] shadow-2xl flex flex-col transition-all">
        {/* ── Header ── */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-emerald-50/50 dark:bg-emerald-950/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <UserCircle
                className="text-[#059669] dark:text-emerald-400"
                size={24}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Edit Student
              </h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                Update student profile information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/20 text-gray-400 hover:text-[#059669] dark:hover:text-emerald-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <form
            id="update-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Profile Picture */}
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-emerald-200 dark:border-emerald-900/40 rounded-[2rem] bg-emerald-50/30 dark:bg-emerald-950/10">
              <div className="relative group">
                <div
                  className="h-24 w-24 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl"
                  style={{ boxShadow: "0 0 0 3px rgba(5,150,105,0.2)" }}
                >
                  <img
                    src={previewUrl || "/placeholder-user.png"}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center">
                    <Loader2 className="text-white animate-spin" size={20} />
                  </div>
                )}
              </div>
              <label className="mt-4 cursor-pointer group/label">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-[#059669] dark:text-emerald-400 text-xs font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
                  Change Photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STUDENT_FORM_FIELDS.filter((f) => f.name !== "picture").map(
                (field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        {...register(field.name as keyof Student)}
                        className="w-full rounded-2xl h-12 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 px-4 text-sm font-medium outline-none dark:text-gray-100 transition-all focus:ring-2 focus:ring-[#059669]/40 focus:border-[#059669] dark:focus:border-emerald-600"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-white dark:bg-gray-900"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={field.type}
                        {...register(field.name as keyof Student)}
                        className="rounded-2xl h-12 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-[#059669]/40 focus:border-[#059669] dark:focus:border-emerald-600"
                      />
                    )}
                    {errors[field.name as keyof Student] && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {(errors[field.name as keyof Student] as any)?.message}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </form>
        </div>

        {/* ── Footer ── */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex gap-4 bg-emerald-50/30 dark:bg-emerald-950/10">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-2xl h-12 font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
          >
            Cancel
          </Button>
          <Button
            form="update-form"
            type="submit"
            disabled={isSubmitting || uploadingImage}
            className="flex-1 rounded-2xl h-12 font-bold text-white transition-all active:scale-95"
            style={{
              background:
                isSubmitting || uploadingImage
                  ? "#6b7280"
                  : "linear-gradient(135deg, #059669, #047857)",
              boxShadow:
                isSubmitting || uploadingImage
                  ? "none"
                  : "0 4px 14px rgba(5,150,105,0.35)",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} /> Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
