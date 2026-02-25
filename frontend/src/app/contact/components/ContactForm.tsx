// src/app/contact/components/ContactForm.tsx
"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const subjects = [
  "General Enquiry",
  "Catering & Events",
  "Feedback",
  "Order Issue",
  "Other"
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate submission — replace with your actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // On success:
    setFormState("success");
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-smooth duration-200 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";
  const inputBorder =
    "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700";

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="gpu-fix"
          >
            <span className="inline-block text-orange-600 dark:text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              Send Us a Message
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5">
              We Are{" "}
              <span className="text-orange-600 dark:text-orange-500">
                Listening
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Have a special request, want to book for a group, or need help
              with an order? Fill in the form and we will get back to you as
              soon as we can — usually within a few hours during opening hours.
            </p>

            {/* Response time note */}
            <div className="flex items-start gap-4 p-5 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white shrink-0 mt-0.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  Quick Response Guarantee
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We aim to respond to all messages within 2 hours during
                  opening hours (10 AM – 10 PM, every day).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="gpu-fix"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-8">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-12 gpu-fix"
                  >
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Thanks for reaching out. We will get back to you within 2
                      hours during opening hours.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-md"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 gpu-fix"
                  >
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          Full Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className={`${inputBase} ${inputBorder}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="077 000 0000"
                          className={`${inputBase} ${inputBorder}`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Email Address <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className={`${inputBase} ${inputBorder}`}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Subject <span className="text-orange-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`${inputBase} ${inputBorder}`}
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Message <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        required
                        rows={5}
                        className={`${inputBase} ${inputBorder} resize-none`}
                      />
                    </div>

                    {/* Error state */}
                    {formState === "error" && (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 rounded-xl px-4 py-3 border border-red-100 dark:border-red-900/30">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Something went wrong. Please try again or call us
                        directly.
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-orange-600 to-orange-500 text-white font-bold rounded-xl hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
