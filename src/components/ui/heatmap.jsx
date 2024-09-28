"use client"

import React from 'react'
import { format, subDays, eachDayOfInterval, getDay, startOfWeek, addWeeks } from 'date-fns'
import * as Tooltip from '@radix-ui/react-tooltip'

const weekDays = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const staticData = [
  3, 0, 1, 4, 0, 2, 1, 0, 3, 1, 2, 0, 4, 2, 1, 3, 0, 2, 1, 4, 0, 3, 2, 1, 0,
  2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2, 1, 4, 0, 2, 3, 1, 0, 4, 2, 1,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 1, 4, 0, 2, 1, 0, 3, 1, 2, 0, 4, 2, 1, 3, 0, 2, 1, 4, 0, 3, 2, 1, 0,
  3, 0, 1, 4, 0, 2, 1, 0, 3, 1, 2, 0, 4, 2, 1, 3, 0, 2, 1, 4, 0, 3, 2, 1, 0,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 5, 6, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 5, 6, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 5, 6, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 0, 5, 6, 3, 0, 4, 2, 1, 0, 3, 2,
  3, 0, 2, 1, 4, 0, 3, 2, 1, 0, 2, 3, 1, 4, 3, 7,
]

const getColor = (count) => {
  if (count === 0) return '#161b22'
  if (count === 1) return '#0e4429'
  if (count === 2) return '#006d32'
  if (count === 3) return '#26a641'
  return '#39d353'
}

export default function Heatmap() {
  const endDate = new Date()
  const startDate = subDays(endDate, 364)
  const contributionData = staticData
  
  const weeks = Math.ceil(contributionData.length / 7)
  const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 1 })

  return (
    <div className="w-fit rounded-lg text-[#7d8590] overflow-hidden">
      <h2 className="text-lg font-semibold mb-2 text-white">
        {contributionData.reduce((sum, count) => sum + count, 0)}  Problem solved in the last year
      </h2>
      <div className="flex overflow-x-auto pb-4">
        <div className="flex-shrink-0 flex flex-col justify-between mr-2 text-xs sticky left-0 z-10">
          {weekDays.map((day, index) => (
            <div key={index} className="h-[12px] flex items-center">
              {day}
            </div>
          ))}
        </div>
        <div className='flex flex-col'>
          <div className="flex-grow relative">
            <div className="flex">
              {Array.from({ length: weeks }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px] space-x-[0.5px]">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const date = addWeeks(startOfWeekDate, weekIndex)
                    const currentDate = new Date(date.setDate(date.getDate() + dayIndex))
                    const dataIndex = Math.floor((weekIndex * 7 + dayIndex))
                    const count = contributionData[dataIndex] || 0
                    
                    return (
                      <Tooltip.Provider key={dayIndex}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div
                              className="w-[11px] h-[14px]  "
                              style={{ backgroundColor: getColor(count) }}
                            />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-[#161b22] border border-[#30363d] text-white p-2 rounded text-xs"
                              sideOffset={5}
                            >
                              {count} contributions on {format(currentDate, 'MMM d, yyyy')}
                              <Tooltip.Arrow className="fill-[#30363d]" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs overflow-x-auto">
          <div className="flex items-center space-x-8 ">
            {Array.from({ length: 12 }).map((_, index) => {
              const date = new Date(endDate.getFullYear(), endDate.getMonth() - 11 + index, 1)
              return (
                <div key={index} className="flex-shrink-0">
                  {format(date, 'MMM')}
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}