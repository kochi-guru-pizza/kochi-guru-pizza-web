// src/app/register/page.tsx
import { Metadata } from "next";
import RegisterForm from "./components/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up - Kochi Guru Pizza",
  description:
    "Create a Kochi Guru Pizza account to order delicious wood-fired pizzas, fresh pasta, and more.",
  openGraph: {
    title: "Sign Up - Kochi Guru Pizza",
    description: "Create your Kochi Guru Pizza account."
  }
};

export default function RegisterPage() {
  return <RegisterForm />;
}
