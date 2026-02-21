import { Metadata } from "next";
import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Login - Kochi Guru Pizza",
  description:
    "Login to your Kochi Guru Pizza account to order delicious wood-fired pizzas, fresh pasta, and more.",
  openGraph: {
    title: "Login - Kochi Guru Pizza",
    description: "Login to your Kochi Guru Pizza account."
  }
};

export default function LoginPage() {
  return <LoginForm />;
}
