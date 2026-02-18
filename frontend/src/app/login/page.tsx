"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@contexts/AuthContext";
import { authService } from "@services/authService";
import { ApiError } from "@typings/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/");
    } catch (err) {
      const error = err as ApiError;
      console.error("Login failed:", error);
      if (error.name === "ApiError" && error.details) {
        const serverErrors: Record<string, string> = {};
        error.details.forEach((detail) => {
          if (!serverErrors[detail.field]) {
            serverErrors[detail.field] = detail.message;
          }
        });
        setErrors(serverErrors);
      } else {
        setErrors({ form: error.message || "Login failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-100 via-orange-50 to-white dark:from-gray-900 dark:via-black dark:to-gray-900 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 dark:bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-500 drop-shadow-xs group-hover:scale-105 transition-transform duration-300">
              Kochi Guru Pizza
            </h1>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-white/50 dark:border-gray-800 p-8 rounded-3xl shadow-2xl dark:shadow-orange-900/10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Login
          </h2>

          {errors.form && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 dark:border-red-500 text-red-600 dark:text-red-400"
                    : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200 ${
                  errors.password
                    ? "border-red-500 dark:border-red-500 text-red-600 dark:text-red-400"
                    : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-r from-orange-600 to-orange-500 text-white font-bold rounded-xl hover:from-orange-700 hover:to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-3 shadow-xs hover:shadow-md"
          >
            <Image
              src="/assets/logos/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-bold hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
