"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import RoadmapDetail from './roadmap-detail'



export default function RoadmapsPage() {

  const router = useRouter();

  const [roadmaps, setRoadmaps] = useState([
    { id: 1, title: "Web Development Roadmap", totalSteps: 5, totalDays: 90 },
    { id: 2, title: "Data Structures and Algorithms", totalSteps: 10, totalDays: 120 },
    { id: 3, title: "Machine Learning Basics", totalSteps: 7, totalDays: 60 },
  ])
  // const [selectedRoadmap, setSelectedRoadmap] = useState(null)

  const handleClickRoadmap = (roadmap) => {
    
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Existing Roadmaps</h1>
        </div>
        <div className='flex w-full mb-4 mx-1'>
          <Link href="/roadmap/generate" passHref>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Generate New Roadmap
            </Button>
          </Link>
        </div>

        {roadmaps.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            No roadmaps generated yet.
          </div>
        ) : (
          <Table className="border border-zinc-800">
            <TableHeader>
              <TableRow className="hover:bg-zinc-900">
                <TableHead className="text-white">Roadmap Title</TableHead>
                <TableHead className="text-white">Total Steps</TableHead>
                <TableHead className="text-white">Total Days</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roadmaps.map((roadmap) => (
                <TableRow key={roadmap.id} className="hover:bg-zinc-900">
                  <TableCell>{roadmap.title}</TableCell>
                  <TableCell>{roadmap.totalSteps}</TableCell>
                  <TableCell>{roadmap.totalDays}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      onClick={() => {handleClickRoadmap(roadmap)}}
                      className="text-white hover:text-black hover:bg-white"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* {selectedRoadmap && (
          <RoadmapDetail roadmapId={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />
        )} */}
      </div>
    </div>
  )
}