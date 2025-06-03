"use client";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { fetchProducts } from "@/Constants/products";
import { useEffect, useState } from "react";
import { Products } from "@/types/types";

const chartConfig = {
  count: {
    label: "count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AppBarChart = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        // Sort products by quantity in descending order
        const sortedProducts = data.sort((a, b) => b.count - a.count);
        // Limit to top 5 products
        setProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Most sold items</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={products}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            domain={[
              0,
              (dataMax: number) => {
                const padded = dataMax * 1.1;
                return Math.ceil(padded / 5) * 5; // rounds up to next multiple of 5
              },
            ]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="count" fill="var(--chart-1)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
