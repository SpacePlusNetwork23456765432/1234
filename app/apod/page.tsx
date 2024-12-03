'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const API_KEY = 'DEMO_KEY' // Replace with your NASA API key

export default function AstronomyPictureOfTheDay() {
  const [apod, setApod] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAPOD()
  }, [])

  const fetchAPOD = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch APOD')
      }
      const data = await response.json()
      setApod(data)
    } catch (err) {
      setError('An error occurred while fetching the Astronomy Picture of the Day.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Astronomy Picture of the Day</h1>
      {apod && (
        <Card>
          <CardHeader>
            <CardTitle>{apod.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {apod.media_type === 'image' ? (
              <img src={apod.url} alt={apod.title} className="w-full h-auto mb-4" />
            ) : (
              <iframe
                width="100%"
                height="315"
                src={apod.url}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="mb-4"
              ></iframe>
            )}
            <p className="text-sm text-gray-500 mb-2">Date: {apod.date}</p>
            <p>{apod.explanation}</p>
          </CardContent>
        </Card>
      )}
      <Button onClick={fetchAPOD} className="mt-4">Refresh</Button>
    </div>
  )
}

