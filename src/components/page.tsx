import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b w-full">
        <div className="flex h-16 items-center justify-between px-8 w-full">
          <div className="font-bold text-xl">Fin-Edx</div>
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
          <h1 className="text-5xl font-bold tracking-tight">Master Financial Literacy with Fin-Edx</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to financial freedom starts here. Learn investing, budgeting, and wealth management from
            industry experts and Prepare for your interviews.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                Get Started
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100">
                Browse Courses
              </Button>
            </Link>
          </div>
        </section>

        <section className="container py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">Choose Your Learning Path</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the plan that best fits your financial education goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <Card className="relative border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">Perfect for beginners</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Access to 20+ basic courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Monthly financial tips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Community forum access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Mobile app access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Start Basic Plan</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-black hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-white px-3 py-1 text-sm font-medium rounded-full">Most Popular</span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">For serious learners</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Access to 100+ courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Weekly market analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Live Q&A sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Investment tracking tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Downloadable resources</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Start Pro Plan</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$39</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">For financial professionals</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Unlimited course access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">1-on-1 mentorship sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Advanced portfolio analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Exclusive webinars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom learning paths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">24/7 premium support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Certification programs</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Start Premium Plan</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">All plans include a 7-day free trial. Cancel anytime.</p>
          </div>
        </section>
      </main>
    </div>
  )
}