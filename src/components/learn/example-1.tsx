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
  Play,
  Pause,
  Volume2,
  Maximize,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  Download,
  Share,
} from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"

export default function Example1() {
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [selectedText, setSelectedText] = useState("")
  const [askAIButtonPos, setAskAIButtonPos] = useState<{ top: number; left: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock course data - in real app, this would come from API based on params.id
  const course = {
    title: "Personal Finance Fundamentals",
    instructor: "Sarah Johnson",
    totalLessons: 5,
    duration: "4 weeks",
  }

  const lessons = [
    { id: 1, title: "Introduction to Personal Finance", duration: "15:30", completed: true },
    { id: 2, title: "Setting Financial Goals", duration: "12:45", completed: true },
    { id: 3, title: "Creating a Budget", duration: "18:20", completed: false },
    { id: 4, title: "Emergency Fund Basics", duration: "14:15", completed: false },
    { id: 5, title: "Understanding Credit Scores", duration: "16:40", completed: false },
    { id: 6, title: "Debt Management Strategies", duration: "20:10", completed: false },
    { id: 7, title: "Introduction to Investing", duration: "22:30", completed: false },
    { id: 8, title: "Types of Investment Accounts", duration: "17:25", completed: false },
    { id: 9, title: "Risk and Return", duration: "19:15", completed: false },
    { id: 10, title: "Building a Portfolio", duration: "25:40", completed: false },
    { id: 11, title: "Tax Planning Basics", duration: "21:20", completed: false },
    { id: 12, title: "Financial Planning for the Future", duration: "18:50", completed: false },
  ]

  const currentLessonData = lessons.find((lesson) => lesson.id === currentLesson)

  const lectureNotes = `
  I. Core Concepts & Principles
Definition of Finance: Mathematics plus money. It's the systematic study of financial transactions.
Importance of Finance: The "lifeblood" of all business, crucial for understanding how successful individuals manage wealth and make decisions.
Fundamental Challenges: Valuation of assets and management of assets.
Key Elements: Time and risk are central to finance, differentiating it from basic microeconomics.
Principles of Finance:
No such thing as a free lunch.
Individuals prefer more money to less, money now to money later, and less risk to more risk (other things equal).
All agents act to further their own self-interest.
(Three additional principles to be covered in the final lecture).
II. Course Structure & Topics
Four Components of the Economy: Households, financial intermediaries, non-financial corporations, and capital markets.
Framework for Financial Analysis: Using accounting (balance sheet and income statement) as the foundation.
Corporate Financial Decisions: Analyzing cash flows related to raising capital, investing in assets, operations, reinvestment, and returning cash to investors.
Personal Financial Decision-Making: Applying the corporate finance framework to individual household financial management, including real investment, consumption, financing, savings, and risk management.
Key Topics:
Valuation of assets (stocks, bonds, futures, forwards, and options).
Risk.
Corporate finance applications (capital budgeting, risk management).
III. Course Requirements & Grading
Readings: Brealey, Myers, and Allen textbook (Chapters 1 and 2 for the next class).
Class Participation: Active engagement is encouraged.
Case Study: 10% of the grade.
Midterm Exam: 25% of the grade.
Final Exam: 55% of the grade (cumulative).
Problem Sets: Not mandatory, but a problem package with solutions will be provided.
Exam Content: Over 50% of exam points will be directly from the provided problem package.
IV. How to Succeed in the Course
Apply theories to practical situations.
Consider attending the "Practice of Finance" pro seminar.
Skim lecture notes in advance.
Take detailed notes during lectures.
Review lectures afterwards.
Work on assignments both in groups and individually.
Ask questions.
Connect the material to your own life.`

   useEffect(() => {
    function handleSelection() {
      const selection = window.getSelection()
      if (selection && selection.toString().trim()) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        setSelectedText(selection.toString())
        setAskAIButtonPos({
          top: rect.top + window.scrollY - 40, // 40px above selection
          left: rect.left + window.scrollX,
        })
      } else {
        setSelectedText("")
        setAskAIButtonPos(null)
      }
    }
    document.addEventListener("selectionchange", handleSelection)
    return () => document.removeEventListener("selectionchange", handleSelection)
  }, [])

  function handleAskAI() {
    setChatInput(chatInput+selectedText)
    setSelectedText("")
    setAskAIButtonPos(null)
    // Optionally focus the input
    inputRef.current?.focus()
  }

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
              <Link to="/dashboard" className="text-md font-medium text-muted-foreground hover:text-black">
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
          <div className="flex items-center gap-4 mb-4">
            <Link to="/learn">
              <Button variant="ghost" size="sm" className="text-black hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Courses
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {course.instructor}</span>
                <span>•</span>
                <span>{course.totalLessons} lessons</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video and Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                  {/* Video placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                      </div>
                      <p className="text-lg font-medium">{currentLessonData?.title}</p>
                      <p className="text-sm text-gray-300">{currentLessonData?.duration}</p>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1 bg-white/20 rounded-full h-1">
                        <div className="bg-white rounded-full h-1 w-1/3"></div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
{askAIButtonPos && selectedText && (
        <button
          style={{
            position: "absolute",
            top: askAIButtonPos.top,
            left: askAIButtonPos.left,
            zIndex: 1000,
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            padding: "6px 14px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          onClick={handleAskAI}
        >
          Ask AI
        </button>
      )}

            {/* Lesson Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                disabled={currentLesson === 1}
                onClick={() => setCurrentLesson(currentLesson - 1)}
                className="border-gray-300"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Badge variant="secondary" className="px-4 py-2">
                Module {currentLesson} of {course.totalLessons}
              </Badge>
              <Button
                className="bg-black hover:bg-gray-800 text-white"
                disabled={currentLesson === course.totalLessons}
                onClick={() => setCurrentLesson(currentLesson + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Lecture Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Lecture Notes
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{lectureNotes}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          </div>
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
                </div>
              </div>
            </ScrollArea>

            {/* Input Area (add ref to input) */}
      <form className="p-4 pt-0" onSubmit={handleChatSubmit}>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
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
