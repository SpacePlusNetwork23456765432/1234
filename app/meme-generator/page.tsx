'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function MemeGenerator() {
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateMeme = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx && image) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.font = '30px Impact'
        ctx.textAlign = 'center'

        ctx.fillText(topText, canvas.width / 2, 40)
        ctx.strokeText(topText, canvas.width / 2, 40)

        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20)
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20)
      }
      img.src = image
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Meme Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Your Meme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topText">Top Text</Label>
              <Input
                id="topText"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="Enter top text"
              />
            </div>
            <div>
              <Label htmlFor="bottomText">Bottom Text</Label>
              <Input
                id="bottomText"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="Enter bottom text"
              />
            </div>
            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <Button onClick={generateMeme}>Generate Meme</Button>
          </div>
          {image && (
            <div className="mt-4">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

