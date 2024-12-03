'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const shortenUrl = () => {
    const shortCode = generateShortCode()
    setShortUrl(`https://short.url/${shortCode}`)
    // In a real application, you would save this mapping to a database
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">URL Shortener</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="longUrl">Long URL</Label>
          <Input
            id="longUrl"
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
          />
        </div>
        <Button onClick={shortenUrl}>Shorten URL</Button>
        {shortUrl && (
          <div className="mt-4">
            <Label htmlFor="shortUrl">Shortened URL</Label>
            <Input id="shortUrl" value={shortUrl} readOnly />
          </div>
        )}
      </div>
    </div>
  )
}

