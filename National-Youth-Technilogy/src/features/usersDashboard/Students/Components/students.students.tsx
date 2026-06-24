/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CloudUpload, CheckCircle2, UserCircle, Shield, FileText } from "lucide-react";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { IStudentFormInput } from "../students.type";
import { createStudentSchema } from "../students.schema";
import { addStudentSelfAction } from "../-actions";
import { STUDENT_FORM_FIELDS } from "../student-form";
import { showSuccess, showError } from "@/core/utils/swal.utils";

export default function StudentAddForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IStudentFormInput>({
    resolver: zodResolver(createStudentSchema as any),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
        setValue("picture", imageUrl);
      }
    } catch (err) {
      showError("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: IStudentFormInput) => {
    try {
      if (!uploadedImageUrl) return showError("Please upload photo first!");

      const result = await addStudentSelfAction({
        ...data,
        picture: uploadedImageUrl,
      });

      if (result.success) {
        await showSuccess(result.message || "Admission Successful! 🎓");
        reset();
        setPreview(null);
        setUploadedImageUrl(null);
      } else {
        showError(result.message || "Failed to add student.");
      }
    } catch (err) {
      showError("Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-gray-50/50 dark:bg-transparent min-h-screen">
      <div className="bg-white dark:bg-gray-900 shadow-xl shadow-green-950/[0.01] dark:shadow-none border border-gray-150 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
        
        {/* Top Header */}
        <div className="text-center py-10 border-b border-gray-100 dark:border-white/5 px-4 space-y-2">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">
            Student Enrollment System
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 uppercase">
            Bangladesh National Youth Technical Institute
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-slate-700 dark:text-white uppercase tracking-wide font-sans">
            Admission & Registration Form
          </h2>
          <div className="w-12 h-1 bg-green-600 rounded-full mx-auto mt-3" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-10 space-y-10"
        >
          {/* Form Content Block */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 px-6 font-black text-base uppercase tracking-wider rounded-2xl shadow-md flex items-center gap-2.5">
              <FileText size={18} />
              <span>Personal Details</span>
            </div>

            <div className="border-b border-emerald-500/30 pb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider font-sans">
                About the Applicant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              {STUDENT_FORM_FIELDS.filter((f) => f.name !== "picture").map(
                (field, i) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                      {i + 1}. {field.label}{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    {field.type === "select" ? (
                      <select
                        {...register(field.name as any)}
                        className="w-full h-11 px-3 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-white/5 rounded-xl outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10 transition-all font-semibold"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        {...register(field.name as any)}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="h-11 bg-gray-50 dark:bg-gray-950 border-gray-150 dark:border-white/5 rounded-xl focus-visible:ring-2 focus-visible:ring-green-500/10 focus-visible:border-green-500/50 transition-all text-sm font-semibold"
                      />
                    )}

                    {errors[field.name as keyof IStudentFormInput] && (
                      <p className="text-[10px] text-red-500 font-bold italic">
                        {errors[field.name as keyof IStudentFormInput]?.message}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Verification Box & Profile Photo Upload */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end justify-between border-t border-gray-100 dark:border-white/5 pt-8">
            <div className="flex-1 space-y-3 max-w-2xl">
              <p className="text-xs font-bold text-green-600 dark:text-emerald-400 uppercase border-b border-dashed border-green-200 dark:border-green-800/40 pb-1 flex items-center gap-1.5 font-sans">
                <Shield size={14} />
                Security & Data Verification
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed font-sans font-light">
                Please double-check all fields before submitting. Once processed, academic documents, student IDs, and credentials will be generated automatically matching the spelling provided above.
              </p>
            </div>

            {/* Photo upload container */}
            <div className="w-full md:w-48 shrink-0 flex flex-col items-center">
              <div className="relative w-36 h-44 border-2 border-dashed border-gray-250 dark:border-white/10 rounded-2xl bg-gray-50 dark:bg-gray-950 flex items-center justify-center overflow-hidden group transition-all hover:border-green-500/40 cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500 space-y-2">
                    <UserCircle size={44} className="mx-auto" />
                    <span className="text-[9px] font-black uppercase tracking-wider block font-sans">
                      Student Photo
                    </span>
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
                    <Loader2 className="animate-spin text-green-600" />
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
              </div>
              <div className="mt-3 text-center">
                <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider font-sans ${uploadedImageUrl ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-500"}`}>
                  {uploadedImageUrl ? "Ready to Submit" : "Upload Picture"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Submission */}
          <div className="pt-8 border-t border-gray-100 dark:border-white/5 text-center">
            <Button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-black px-16 py-6 text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-green-600/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
