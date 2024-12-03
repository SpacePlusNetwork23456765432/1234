'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function StaticSiteGenerator() {
  const [pages, setPages] = useState([
    { title: 'Home', content: '# Welcome to my site\n\nThis is the home page.' },
    { title: 'About', content: '# About me\n\nThis is the about page.' },
  ])
  const [currentPage, setCurrentPage] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const savedPages = localStorage.getItem('staticSitePages')
    if (savedPages) {
      setPages(JSON.parse(savedPages))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('staticSitePages', JSON.stringify(pages))
  }, [pages])

  useEffect(() => {
    setTitle(pages[currentPage].title)
    setContent(pages[currentPage].content)
  }, [currentPage, pages])

  const updatePage = () => {
    setPages(pages.map((page, index) => 
      index === currentPage ? { ...page, title, content } : page
    ))
  }

  const addPage = () => {
    setPages([...pages, { title: 'New Page', content: '# New Page\n\nAdd your content here.' }])
    setCurrentPage(pages.length)
  }

  const generateSite = () => {
    const html = pages.map(page => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        nav { margin-bottom: 20px; }
        nav a { margin-right: 10px; }
        h1, h2, h3 { color: #2c3e50; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ccc; margin: 0; padding-left: 16px; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    <nav>
        ${pages.map(p => `<a href="${p.title.toLowerCase()}.html">${p.title}</a>`).join('')}
    </nav>
    ${ReactMarkdown({ children: page.content })}
</body>
</html>
    `).join('\n')

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'static-site.html'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Static Site Generator</h1>
      <div className="mb-4 flex space-x-2">
        {pages.map((page, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index)}
            variant={currentPage === index ? 'default' : 'outline'}
          >
            {page.title}
          </Button>
        ))}
        <Button onClick={addPage}>Add Page</Button>
      </div>
      <div className="mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page Title"
          className="mb-2"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Page Content (Markdown)"
          className="h-[300px]"
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <Button onClick={updatePage}>Update Page</Button>
        <Button onClick={generateSite}>Generate Site</Button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        <div className="border p-4 rounded bg-white">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

