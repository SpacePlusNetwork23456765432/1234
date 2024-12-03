'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
]

export default function InspirationalQuoteGenerator() {
  const [quote, setQuote] = useState(quotes[0])

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Inspirational Quote Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Quote of the Moment</CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="italic text-lg mb-2">"{quote.text}"</blockquote>
          <p className="text-right">- {quote.author}</p>
        </CardContent>
      </Card>
      <Button onClick={generateQuote} className="mt-4">Generate New Quote</Button>
    </div>
  )
}

