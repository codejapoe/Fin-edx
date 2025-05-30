import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b w-full">
        <div className="flex h-16 items-center justify-between px-8 w-full">
          <div className="font-bold text-xl">Fin-edx</div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-black hover:text-black hover:bg-gray-100">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-black hover:bg-gray-800 text-white">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <section className="py-24 space-y-8 text-center w-full">
          <h1 className="text-5xl font-bold tracking-tight">Master Financial Literacy with Fin-edx</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to financial freedom starts here. Learn investing, budgeting, and wealth management from
            industry experts.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}