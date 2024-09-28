"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Sample description
export const description = "A simple area chart"

// Example data
const chartData = [
  { date: "January", rating: 186 },
  { date: "February", rating: 305 },
  { date: "March", rating: 237 },
  { date: "April", rating: 73 },
  { date: "May", rating: 209 },
  { date: "June", rating: 214 },
]

// Chart configuration
const chartConfig = {
  rating: {
    label: "Rating",
    color: "hsl(var(--chart-1))",
  },
} 

// Component with dynamic height
export function Areachart({ height = 300, chartdata }) {
  return (
    <Card>
      <CardContent style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig} >
          <AreaChart
            data={chartdata}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="rating"
              type="natural"
              fill="var(--color-rating)"
              fillOpacity={0.4}
              stroke="var(--color-rating)"
              dot={{
                fill: "var(--color-rating)",
              }}
              activeDot={{
                r: 6,
              }}

            />
          </AreaChart>
        </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
