'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Node {
  id: string;
  text: string;
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
}

export default function MindMapCreator() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [newNodeText, setNewNodeText] = useState('')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    const savedMindMap = localStorage.getItem('mindMap')
    if (savedMindMap) {
      const { nodes, edges } = JSON.parse(savedMindMap)
      setNodes(nodes)
      setEdges(edges)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mindMap', JSON.stringify({ nodes, edges }))
  }, [nodes, edges])

  const addNode = () => {
    if (newNodeText) {
      const newNode: Node = {
        id: Date.now().toString(),
        text: newNodeText,
        x: Math.random() * 500,
        y: Math.random() * 500,
      }
      setNodes([...nodes, newNode])
      setNewNodeText('')
    }
  }

  const addEdge = () => {
    if (selectedNode) {
      const newEdge: Edge = {
        source: selectedNode,
        target: nodes[nodes.length - 1].id,
      }
      setEdges([...edges, newEdge])
      setSelectedNode(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mind Map Creator</h1>
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="newNode">New Node</Label>
          <Input
            id="newNode"
            value={newNodeText}
            onChange={(e) => setNewNodeText(e.target.value)}
            placeholder="Enter node text"
          />
        </div>
        <Button onClick={addNode}>Add Node</Button>
        {nodes.length > 1 && (
          <div>
            <Label htmlFor="selectNode">Select Parent Node</Label>
            <select
              id="selectNode"
              value={selectedNode || ''}
              onChange={(e) => setSelectedNode(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a node</option>
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>{node.text}</option>
              ))}
            </select>
            <Button onClick={addEdge} className="mt-2">Connect Nodes</Button>
          </div>
        )}
      </div>
      <div className="border rounded-lg p-4" style={{ height: '500px', position: 'relative' }}>
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${node.x}px`,
              top: `${node.y}px`,
              padding: '5px',
              border: '1px solid black',
              borderRadius: '5px',
              backgroundColor: 'white',
            }}
          >
            {node.text}
          </div>
        ))}
        <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          {edges.map((edge, index) => {
            const source = nodes.find(n => n.id === edge.source)
            const target = nodes.find(n => n.id === edge.target)
            if (source && target) {
              return (
                <line
                  key={index}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="black"
                />
              )
            }
            return null
          })}
        </svg>
      </div>
    </div>
  )
}

