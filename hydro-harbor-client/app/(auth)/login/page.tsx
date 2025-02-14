import Card from "@/components/card";
import Link from "next/link";
import LoginForm from "./_components/login-form";

export default function Login() {
  return (
    <>
      <Card className="w-80">
        <h1 className="text-black dark:text-white font-semibold text-center text-4xl mb-4">
          Login
        </h1>
        <LoginForm />
        <Link href="/register">Dont have an account? Register here.</Link>
      </Card>
    </>
  );
}
