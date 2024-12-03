'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
}

const reverseMorseCodeMap: { [key: string]: string } = Object.entries(morseCodeMap).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

export default function MorseCodeTranslator() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  const textToMorse = (input: string) => {
    return input.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ')
  }

  const morseToText = (input: string) => {
    return input.split(' ').map(code => reverseMorseCodeMap[code] || code).join('')
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    setMorse(textToMorse(newText))
  }

  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    constnewMorse = e.target.value
    setMorse(newMorse)
    setText(morseToText(newMorse))
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Morse Code Translator</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="text">Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to convert to Morse code"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="morse">Morse Code</Label>
          <Textarea
            id="morse"
            value={morse}
            onChange={handleMorseChange}
            placeholder="Enter Morse code to convert to text"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

