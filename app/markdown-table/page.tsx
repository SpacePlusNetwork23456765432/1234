'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function MarkdownTableGenerator() {
  const [rows, setRows] = useState(3)
  const [columns, setColumns] = useState(3)
  const [tableData, setTableData] = useState<string[][]>(Array(3).fill(Array(3).fill('')))
  const [markdownTable, setMarkdownTable] = useState('')

  const handleDataChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = tableData.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => j === colIndex ? value : cell) : row
    )
    setTableData(newData)
  }

  const generateTable = () => {
    const header = '| ' + tableData[0].join(' | ') + ' |'
    const separator = '| ' + Array(columns).fill('---').join(' | ') + ' |'
    const body = tableData.slice(1).map(row => '| ' + row.join(' | ') + ' |').join('\n')
    const markdownTableText = [header, separator, ...body].join('\n')
    setMarkdownTable(markdownTableText)
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Markdown Table Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Your Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div>
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  value={rows}
                  onChange={(e) => {
                    const newRows = parseInt(e.target.value)
                    setRows(newRows)
                    setTableData(Array(newRows).fill(Array(columns).fill('')))
                  }}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="columns">Columns</Label>
                <Input
                  id="columns"
                  type="number"
                  value={columns}
                  onChange={(e) => {
                    const newColumns = parseInt(e.target.value)
                    setColumns(newColumns)
                    setTableData(tableData.map(() => Array(newColumns).fill('')))
                  }}
                  min="1"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="p-1">
                          <Input
                            value={cell}
                            onChange={(e) => handleDataChange(rowIndex, colIndex, e.target.value)}
                            placeholder={`Cell ${rowIndex + 1}-${colIndex + 1}`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button onClick={generateTable}>Generate Markdown Table</Button>
            {markdownTable && (
              <div>
                <Label htmlFor="markdownOutput">Generated Markdown</Label>
                <Textarea
                  id="markdownOutput"
                  value={markdownTable}
                  readOnly
                  rows={10}
                  className="font-mono"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

