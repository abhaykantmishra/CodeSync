"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


// Example data
const chartData = [
  { namekey: "Array", datakey: 275, fill: "var(--color-first)" },
  { namekey: "DP", datakey: 200, fill: "var(--color-second)" },
  { namekey: "Graph", datakey: 187, fill: "var(--color-third)" },
  { namekey: "Two pointer", datakey: 173, fill: "var(--color-fourth)" },
  { namekey: "Sliding window", datakey: 90, fill: "var(--color-fifth)" },
  { namekey: "Other", datakey: 90, fill: "var(--color-sixth)" },

]

// Chart configuration
const chartConfig = {
  datakey: {
    label: "Solved",
  },
  first: {
    label: "Array",
    color: "hsl(var(--chart-1))",
  },
  second: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  third: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  fourth: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  fifth: {
    label: "Akm",
    color: "hsl(var(--chart-5))",
  },
  sixth: {
    label: "Akm",
    color: "hsl(var(--chart-1))",
  },
  other:{
    label: "Akm",
    color: "hsl(var(--chart-6))",
  }
}

// Component with dynamic height
export function Barchart({title="Topic Wise Problems", chartData, height = 260, ...props }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent style={{ height: height}} >
        <ResponsiveContainer  width="100%" height="100%">
        <ChartContainer config={chartConfig} >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="namekey"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <XAxis dataKey="datakey" type="number"  />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="datakey" layout="vertical" radius={1} />
          </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
