'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit2, Check, X, Save } from 'lucide-react'

export default function RoadmapGenerator() {
  const router = useRouter()
  const [newRoadmapName, setNewRoadmapName] = useState('')
  const [proficiencyLevel, setProficiencyLevel] = useState('')
  const [goalLevel, setGoalLevel] = useState('')
  const [data, setData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [newTopic, setNewTopic] = useState({ topicName: '', daysToComplete: 0 })

  const handleEdit = (id) => {
    setEditingId(id)
  }

  const handleSave = (id) => {
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleChange = (id, field, value) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [field]: field === 'daysToComplete' ? Number(value) : value } : row
    ))
  }

  const handleAddNewTopic = () => {
    if (newTopic.topicName && newTopic.daysToComplete > 0) {
      setData([...data, { id: Date.now(), ...newTopic }])
      setNewTopic({ topicName: '', daysToComplete: 0 })
    }
  }

  const generateRoadmapFromAi = () => {
    // Placeholder for AI generation logic
    console.log('Generating roadmap from AI...')
  }

  const saveRoadmap = () => {
    // Placeholder for save logic
    console.log('Saving roadmap...')
    router.push('/dashboard') // Redirect to dashboard after saving
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Generate New Roadmap</h1>
      <p className="text-muted-foreground mb-6">
        Create your custom roadmap by adding steps below.
      </p>

      <div className="space-y-6">
        <div>
          <Label htmlFor="roadmap-name">Roadmap Name</Label>
          <Input
            id="roadmap-name"
            value={newRoadmapName}
            onChange={(e) => setNewRoadmapName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <Label htmlFor="proficiency-level">Your Proficiency Level</Label>
            <Select onValueChange={setProficiencyLevel} value={proficiencyLevel}>
              <SelectTrigger id="proficiency-level" className="w-full sm:w-[220px] mt-1">
                <SelectValue placeholder="Select Your Proficiency Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your level</SelectLabel>
                  <SelectItem value="naive">Naive</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <Label htmlFor="goal-level">Your Goal Level</Label>
            <Select onValueChange={setGoalLevel} value={goalLevel}>
              <SelectTrigger id="goal-level" className="w-full sm:w-[220px] mt-1">
                <SelectValue placeholder="Select Your Goal Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Goal level</SelectLabel>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant="outline" onClick={generateRoadmapFromAi}>
          Generate Roadmap
        </Button>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Roadmap Steps</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic Name</TableHead>
                <TableHead>Days to Complete</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(topic => (
                <TableRow key={topic.id}>
                  <TableCell>
                    {editingId === topic.id ? (
                      <Input 
                        value={topic.topicName} 
                        onChange={(e) => handleChange(topic.id, 'topicName', e.target.value)} 
                        aria-label="Edit topic name"
                      />
                    ) : topic.topicName}
                  </TableCell>
                  <TableCell>
                    {editingId === topic.id ? (
                      <Input 
                        type="number"
                        value={topic.daysToComplete} 
                        onChange={(e) => handleChange(topic.id, 'daysToComplete', e.target.value)} 
                        aria-label="Edit days to complete"
                      />
                    ) : topic.daysToComplete}
                  </TableCell>
                  <TableCell>
                    {editingId === topic.id ? (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleSave(topic.id)} aria-label="Save changes">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel} aria-label="Cancel editing">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(topic.id)} aria-label="Edit topic">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Input 
                    placeholder="New Topic Name" 
                    value={newTopic.topicName} 
                    onChange={(e) => setNewTopic({ ...newTopic, topicName: e.target.value })} 
                    aria-label="Enter new topic name"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    placeholder="Days to Complete" 
                    value={newTopic.daysToComplete || ''} 
                    onChange={(e) => setNewTopic({ ...newTopic, daysToComplete: Number(e.target.value) })} 
                    aria-label="Enter days to complete"
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={handleAddNewTopic} aria-label="Add new topic">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Topic
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Button onClick={saveRoadmap} className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" /> Save Roadmap
        </Button>
      </div>
    </div>
  )
}