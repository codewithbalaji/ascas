'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Trash2, RefreshCw, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

interface Message {
  text: string
  isUser: boolean
  timestamp: number
}

// Function to convert text with phone numbers to clickable links
const convertPhoneNumbers = (text: string) => {
  // Match Indian phone numbers (assuming they start with +91)
  const phoneRegex = /(\+91\s?[0-9]{10})/g
  
  return text.replace(phoneRegex, (match) => {
    const cleanNumber = match.replace(/\s/g, '')
    return `[${match}](tel:${cleanNumber})`
  })
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your medical assistant specializing in women's health, infertility, gynecology, and obstetrics. How can I help you today?", isUser: false, timestamp: Date.now() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate or load session ID
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId')
    if (savedSessionId) {
      console.log('Using existing session ID:', savedSessionId)
      setSessionId(savedSessionId)
    } else {
      const newSessionId = Math.random().toString(36).substring(2, 15) + 
                           Math.random().toString(36).substring(2, 15)
      console.log('Created new session ID:', newSessionId)
      setSessionId(newSessionId)
      localStorage.setItem('chatSessionId', newSessionId)
    }
  }, [])

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom of messages when new ones arrive
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Update suggestions based on categories
  useEffect(() => {
    const categoryQuestions = {
      fertility: [
        'What causes infertility?',
        'How does IVF treatment work?',
        'What are the success rates of fertility treatments?'
      ],
      pregnancy: [
        'What symptoms should I expect in the first trimester?',
        'How can I manage morning sickness?',
        'What prenatal tests are recommended?'
      ],
      menstrual: [
        'Why are my periods irregular?',
        'How can I manage severe cramps?',
        'Is my menstrual cycle normal?'
      ],
      gynecological: [
        'What are the symptoms of PCOS?',
        'How is endometriosis diagnosed?',
        'What causes ovarian cysts?'
      ]
    }
    
    // Randomly select one question from each category
    const selected = Object.values(categoryQuestions).map(
      questions => questions[Math.floor(Math.random() * questions.length)]
    )
    
    setSuggestions(selected)
  }, [isOpen])

  // Handle sending messages to API
  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput('')
    
    // Add user message with timestamp
    const newUserMessage: Message = {
      text: userMessage,
      isUser: true,
      timestamp: Date.now()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      // Ensure we have a sessionId
      if (!sessionId) {
        console.warn('No session ID available, generating new one')
        const newSessionId = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15)
        setSessionId(newSessionId)
        localStorage.setItem('chatSessionId', newSessionId)
      }
      
      // Get API URL from environment variable or use fallback
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      
      console.log('Sending message with session ID:', sessionId)
      const response = await axios.post(`${apiUrl}/api/chat`, {
        message: userMessage,
        sessionId: sessionId
      })

      if (response.data.success) {
        // Add assistant message with timestamp
        const newAssistantMessage: Message = {
          text: response.data.data,
          isUser: false,
          timestamp: Date.now()
        }
        setMessages(prev => [...prev, newAssistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // Reset chat history
  const resetChat = () => {
    const initialMessage = { 
      text: "Hello! I'm your medical assistant specializing in women's health, infertility, gynecology, and obstetrics. How can I help you today?", 
      isUser: false, 
      timestamp: Date.now() 
    }
    setMessages([initialMessage])
    localStorage.removeItem('chatHistory')
    
    // Generate new session ID
    const newSessionId = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15)
    console.log('Reset chat with new session ID:', newSessionId)
    setSessionId(newSessionId)
    localStorage.setItem('chatSessionId', newSessionId)
  }

  // Custom components for markdown rendering
  const components: Components = {
    h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
    h2: ({ children }) => <h2 className="text-md font-bold mt-2 mb-1">{children}</h2>,
    h3: ({ children }) => <h3 className="font-bold mt-1 mb-1">{children}</h3>,
    p: ({ children }) => <p className="mb-2">{children}</p>,
    ul: ({ children }) => <ul className="mb-2 list-disc list-inside">{children}</ul>,
    ol: ({ children }) => <ol className="mb-2 list-decimal list-inside">{children}</ol>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    a: ({ href, children }) => {
      // Special handling for phone number links
      if (href?.startsWith('tel:')) {
        return (
          <a 
            href={href} 
            className="inline-flex items-center text-pink-600 font-medium hover:underline"
          >
            <Phone size={14} className="mr-1" />
            {children}
          </a>
        )
      }
      
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline"
        >
          {children}
        </a>
      )
    },
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return match ? (
        <SyntaxHighlighter
          // @ts-ignore - Type issue with style, but works correctly
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="px-1 py-0.5 bg-muted rounded text-sm" {...props}>
          {children}
        </code>
      )
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-full sm:w-96"
          >
            <Card className="overflow-hidden border-2 border-pink-100 shadow-lg">
              {/* Header */}
              <div className="bg-pink-600 p-4 flex justify-between items-center">
                <h3 className="text-white font-semibold">Women's Health Assistant</h3>
                <div className="flex items-center gap-2">
                  {messages.length > 1 && (
                    <button
                      onClick={resetChat}
                      className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-pink-700"
                      aria-label="Clear chat history"
                      title="Clear chat history"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-pink-700"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 messages-container bg-gradient-to-b from-pink-50 to-white">
                {messages.length <= 1 && (
                  <div className="text-center text-sm text-muted-foreground mb-4">
                    <p className="mb-3 font-medium">Ask me anything about women&apos;s health or fertility</p>
                    <div className="grid grid-cols-1 gap-2 max-w-[90%] mx-auto">
                      {suggestions.map((question, idx) => (
                        <button
                          key={idx}
                          className="text-left text-xs bg-pink-50 hover:bg-pink-100 p-2 rounded hover:shadow-sm transition-all border border-pink-100"
                          onClick={() => {
                            setInput(question)
                            setTimeout(() => inputRef.current?.focus(), 100)
                          }}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {messages.map((message, index) => {
                  // Process message text to make phone numbers clickable
                  let processedText = message.text
                  if (!message.isUser) {
                    processedText = convertPhoneNumbers(message.text)
                  }

                  return (
                    <div
                      key={index}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      <div
                        className={`max-w-[90%] rounded-lg p-3 shadow-sm ${
                          message.isUser
                            ? 'bg-pink-600 text-white'
                            : 'bg-white border border-pink-100'
                        }`}
                      >
                        <div className={`prose-sm ${message.isUser ? 'text-white' : 'text-gray-800'} max-w-full`}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={components}
                          >
                            {processedText}
                          </ReactMarkdown>
                        </div>
                        <div className={`text-xs ${message.isUser ? 'text-pink-100' : 'text-gray-400'} mt-1`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-white border border-pink-100 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Invisible div for scrolling to bottom */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-pink-100 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex gap-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                >
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 border-pink-200 focus-visible:ring-pink-400"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className='bg-pink-600 hover:bg-pink-700 text-white font-medium shadow-sm'
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </form>
                <div className="mt-2 text-xs text-center text-gray-400">
                  <p>
                    Ask about women&apos;s health, fertility, pregnancy, or reproductive wellness
                  </p>
                  <a 
                    href="tel:+919342521779" 
                    className="inline-flex items-center justify-center mt-2 text-pink-600 hover:text-pink-700 hover:underline font-medium"
                  >
                    <Phone size={14} className="mr-1" />
                    Call Dr. Aishwarya: +91 9342521779
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}