"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@contexts/AuthContext";
import { ThemeProvider } from "@contexts/ThemeContext";
import FloatingThemeToggle from "@components/FloatingThemeToggle";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <FloatingThemeToggle />
        <Toaster
          position="top-right"
          containerStyle={{
            top: 80
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff"
            },
            success: {
              duration: 3000,
              style: {
                background: "#10b981",
                color: "#fff"
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#10b981"
              }
            },
            error: {
              duration: 4000,
              style: {
                background: "#ef4444",
                color: "#fff"
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#ef4444"
              }
            }
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};
