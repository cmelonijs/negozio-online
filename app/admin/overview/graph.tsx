"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

type GraphProps = {
  data: { month: string; total: number }[]; 
};

export function Graph({ data }: GraphProps) {
  return (
    <Card className="p-4 flex flex-col justify-between rounded-lg border transition-all duration-300 hover:border-gray-500 dark:hover:border-white">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Sales in the last couple of months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{ type: { label: "Bar Chart" }, options: {} }}
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `$${value}`} 
            />

            <Bar dataKey="total" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
