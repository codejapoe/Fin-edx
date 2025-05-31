import { useRef, useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Clock,
  Users,
  Star,
  BookOpen,
  TrendingUp,
  PiggyBank,
  CreditCard,
  BarChart3,
  Target,
  Shield,
  Send,
  Bot,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"

export default function LearnPage() {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)
  const [selectedAI, setSelectedAI] = useState("gemini")
  const [chatInput, setChatInput] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message:
        "Hi! I'm your AI tutor. I can help you with financial questions, course recommendations, and learning guidance. What would you like to know?",
    },
  ])
  const [loading, setLoading] = useState(false)
  const courses = [
    {
      id: 1,
      title: "Personal Finance Fundamentals and Management",
      description: "Master the basics of budgeting, saving, and managing your personal finances effectively.",
      instructor: "Sarah Johnson",
      duration: "4 weeks",
      students: 1250,
      rating: 4.8,
      level: "Beginner",
      price: "Free",
      icon: <PiggyBank className="h-6 w-6" />,
      category: "Personal Finance",
    },
    {
      id: 2,
      title: "Investment Strategies for Beginners",
      description: "Learn the fundamentals of investing, from stocks and bonds to building a diversified portfolio.",
      instructor: "Michael Chen",
      duration: "6 weeks",
      students: 980,
      rating: 4.9,
      level: "Beginner",
      price: "Free",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "Investing",
    },
    {
      id: 3,
      title: "Credit Cards and Debt Management",
      description: "Understand how credit works, build good credit habits, and manage debt effectively.",
      instructor: "Emily Rodriguez",
      duration: "3 weeks",
      students: 750,
      rating: 4.7,
      level: "Beginner",
      price: "Premium",
      icon: <CreditCard className="h-6 w-6" />,
      category: "Credit & Debt",
    },
    {
      id: 4,
      title: "Advanced Portfolio Management",
      description: "Deep dive into advanced investment strategies, risk management, and portfolio optimization.",
      instructor: "David Kim",
      duration: "8 weeks",
      students: 420,
      rating: 4.9,
      level: "Advanced",
      price: "Premium",
      icon: <BarChart3 className="h-6 w-6" />,
      category: "Investing",
    },
    {
      id: 5,
      title: "Retirement Planning Essentials",
      description: "Plan for your future with comprehensive retirement planning strategies and tools.",
      instructor: "Lisa Thompson",
      duration: "5 weeks",
      students: 650,
      rating: 4.8,
      level: "Intermediate",
      price: "Free",
      icon: <Target className="h-6 w-6" />,
      category: "Retirement",
    },
    {
      id: 6,
      title: "Insurance and Risk Management",
      description: "Protect your financial future with the right insurance strategies and risk management techniques.",
      instructor: "Robert Wilson",
      duration: "4 weeks",
      students: 380,
      rating: 4.6,
      level: "Intermediate",
      price: "Premium",
      icon: <Shield className="h-6 w-6" />,
      category: "Insurance",
    },
  ]
  const chatEndRef = useRef<HTMLDivElement>(null)

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message to chat history
    const userMessage = {
        type: "user",
        message: chatInput,
    }
    setChatHistory((prev) => [...prev, userMessage])
    setLoading(true)

    try {
        // Gemini API endpoint and key
        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
        const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            contents: [
                {
                parts: [
                    {
                    text:
                        [
                        "You are a helpful financial literacy tutor. Explain shortly",
                        ...chatHistory.map((msg) => msg.message),
                        chatInput,
                        ].join("\n"),
                    },
                ],
                },
            ],
            }),
        }
        )
        const data = await response.json()
        const aiMessage =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Sorry, I couldn't get a response."

        setChatHistory((prev) => [
        ...prev,
        {
            type: "ai",
            message: aiMessage,
        },
        ])
    } catch (err) {
        setChatHistory((prev) => [
        ...prev,
        {
            type: "ai",
            message: "Sorry, there was an error contacting Gemini.",
        },
        ])
    } finally {
        setLoading(false)
        setChatInput("")
    }
    }

  return (
    <div className="container-fluid min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-8 w-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-xl">
              Fin-Edx
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/learn" className="text-md font-medium text-black">
                Explore
              </Link>
              <Link to="/problem" className="text-md font-medium text-muted-foreground hover:text-black">
                Problems
              </Link>
              <Link to="/contest" className="text-md font-medium text-muted-foreground hover:text-black">
                Contest
              </Link>
              <Link to="/community" className="text-md font-medium text-muted-foreground hover:text-black">
                Store
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>FE</AvatarFallback>
</Avatar>
            <Button variant="outline" className="border-black text-black hover:bg-gray-100">
              Premium
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content with Side Panel */}
      <div className="flex pl-10">
        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${isPanelExpanded ? "pr-10" : "pr-10"} xl:${isPanelExpanded ? "pr-20" : "pr-20"}`}
        >
          <div className="container py-8">
            {/* Welcome Section */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Fin-Edx Explore</h1>
              <p className="text-lg text-muted-foreground">
                Explore our comprehensive courses designed to help you master financial literacy and achieve your
                financial goals.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="default" className="bg-black text-white hover:bg-gray-800">
                All Courses
              </Button>
              <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                Personal Finance
              </Button>
              <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                Investing
              </Button>
              <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                Credit & Debt
              </Button>
              <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                Retirement
              </Button>
              <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
                Insurance
              </Button>
            </div>

            {/* Course Grid - Responsive based on panel state */}
            <div
              className={`grid gap-6 transition-all duration-300 ${
                isPanelExpanded
                  ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
                  : "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              }`}
            >
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        {course.icon}
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          course.level === "Beginner"
                            ? "default"
                            : course.level === "Intermediate"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <p className="text-md text-muted-foreground line-clamp-2">{course.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-md text-muted-foreground">
                      <span>By {course.instructor}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-md">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{course.price}</span>
                      <div className="flex items-center gap-1 text-md text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>5 modules</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/example-1`} className="w-full">
                        <Button
                            className="w-full bg-black hover:bg-gray-800 text-white"
                            disabled={course.price === "Premium"}
                            >
                            {course.price === "Free" ? "Start Learning" : "Enroll Now"}
                        </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* AI Tutor Side Panel */}
        <aside
          className={`hidden xl:block border-l bg-white transition-all duration-300 ${
            isPanelExpanded ? "w-96" : "w-80"
          }`}
        >
          <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black rounded-full">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Fin-Edx AI Tutor</h2>
                    {/* AI Model Selector */}
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">AI Model:</span>
                  <Select value={selectedAI} onValueChange={setSelectedAI}>
                    <SelectTrigger className="w-32 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Gemini</SelectItem>
                      <SelectItem value="chatgpt">ChatGPT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                  className="p-2 hover:bg-gray-100"
                >
                  {isPanelExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          
            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex gap-3 ${chat.type === "user" ? "justify-end" : ""}`}>
                      <div
                        className={`rounded-lg p-3 max-w-[280px] ${
                          chat.type === "user" ? "bg-black text-white ml-auto" : "bg-gray-100"
                        }`}
                      >
                        <div className="text-md">
                          <ReactMarkdown>{chat.message}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-3">
                      <div className="rounded-lg p-3 max-w-[280px] bg-gray-100">
                        <p className="text-md">Thinking...</p>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </ScrollArea>

            {/* Input Area */}
            <form className="p-4 pt-0" onSubmit={handleChatSubmit}>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything"
                  className="flex-1 text-md"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={loading}
                />
                <Button className="bg-black hover:bg-gray-800 text-white px-3" type="submit" disabled={loading || !chatInput.trim()}>
                  <Send className="h-8 w-8" />
                </Button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}
