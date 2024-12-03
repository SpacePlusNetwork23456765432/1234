'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PersonalJournal() {
  const [entries, setEntries] = useState([])
  const [newEntry, setNewEntry] = useState({ title: '', content: '', date: '' })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      setEntries([
        { ...newEntry, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] },
        ...entries
      ])
      setNewEntry({ title: '', content: '', date: '' })
    }
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Personal Journal</h1>
      <div className="mb-4 grid gap-2">
        <Input
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          placeholder="Entry Title"
        />
        <Textarea
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          placeholder="Write your journal entry here..."
          className="h-32"
        />
        <Button onClick={addEntry}>Add Entry</Button>
      </div>
      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search entries..."
        />
      </div>
      <div className="space-y-4">
        {filteredEntries.map(entry => (
          <Card key={entry.id}>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <p className="text-sm text-gray-500">{entry.date}</p>
            </CardHeader>
            <CardContent>
              <p>{entry.content}</p>
              <Button variant="destructive" onClick={() => deleteEntry(entry.id)} className="mt-2">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

