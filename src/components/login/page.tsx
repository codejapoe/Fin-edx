import { Link } from "react-router-dom"
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="container-fluid flex h-screen w-screen flex-col items-center justify-center relative">
      <Link to="/" className="absolute top-8 left-8">
        <Button variant="ghost" className="flex items-center gap-2 text-black hover:text-black hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6" />
          Home
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to Fin-Edx</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4 text-black font-medium hover:text-gray-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
