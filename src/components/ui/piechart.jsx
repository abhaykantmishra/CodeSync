"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "A donut chart with text"

const chartData = [
  { namekey: "chrome", datakey: 275, fill: "var(--color-chrome)" },
  { namekey: "safari", datakey: 200, fill: "var(--color-safari)" },
  { namekey: "firefox", datakey: 287, fill: "var(--color-firefox)" },
  { namekey: "edge", datakey: 173, fill: "var(--color-edge)" },
  { namekey: "other", datakey: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  easy: {
    label: "Easy",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  hard: {
    label: "Hard",
    color: "hsl(var(--chart-3))",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function Piechart({className,header,chartdata}) {
  const totalData = React.useMemo(() => {
    return chartdata.reduce((acc, curr) => acc + curr.datakey, 0)
  }, [])

  return (
    <Card className="flex flex-col">
        <p className="text-md font-semibold text-center mt-1 mb-0">{header}</p>
        <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartdata}
              dataKey="datakey"
              nameKey="namekey"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalData.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
