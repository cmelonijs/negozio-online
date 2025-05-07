"use client"
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";

type GraphProps = {
  data: { month: string; total: number }[]; // The data prop that accepts an array of month/total
};

export function Graph({ data }: GraphProps) {
  return (
    <Card className="p-4 flex flex-col justify-between rounded-lg border transition-all duration-300 hover:border-gray-500 dark:hover:border-white">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Sales in the last couple of months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ type: { label: "Bar Chart", color: "blue" }, options: {} }}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Display the first 3 letters of the month
            />
            <Tooltip />
            <Bar dataKey="total" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last few months
        </div>
      </CardFooter>
    </Card>
  );
}
