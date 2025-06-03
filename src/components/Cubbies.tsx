"use client";

import React, { useEffect, useState } from "react";
import { fetchCubbies } from "@/Constants/cubbies";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Cubby } from "@/types/types";

const statusColors: Record<string, string> = {
  true: "bg-red-500",
  false: "bg-green-500",
};

const PAGE_SIZE = 24;

const Cubbies = ({ title }: { title: string }) => {

    const [cubbies, setCubbies] = useState<Cubby[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCubbies();
                setCubbies(data);
                console.log("Fetched cubbies:", data);
            } catch (error) {
                console.error("Error fetching cubbies:", error);
            }
        };
        fetchData();
    }, []);

    const pages = Array.from({ length: Math.ceil(cubbies.length / PAGE_SIZE) }, (_, i) =>
      cubbies.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE)
    );
    
  return (
    <div>
        <h1 className="text-lg font-medium mb-6">{title}</h1>
        <TooltipProvider>
        <Carousel className="w-full">
            <CarouselContent>
            {pages.map((pageCubbies, pageIndex) => (
                <CarouselItem key={pageIndex}>
                <div>
                    <div className="grid grid-cols-6 grid-rows-4 gap-4 mb-4">
                    {pageCubbies.map((cubby) => (
                        <Tooltip key={cubby.cubbyid}>
                        <TooltipTrigger asChild>
                            <div
                                className={`flex items-center justify-center h-20 w-20 rounded shadow cursor-pointer transition-all duration-200 ${statusColors[cubby.occupied] || "bg-gray-200"}`}
                            >
                                <span className="text-xl font-bold text-white">{cubby.cubbyid}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            Remaining Items: {cubby.remaining_items ? cubby.remaining_items : "Free Cubby"}<br />
                            Order Id: {cubby.orderid ? cubby.occupied : "No Order"}<br />
                        </TooltipContent>
                        </Tooltip>
                    ))}
                    </div>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
        </Carousel>
        </TooltipProvider>
    </div>
    );
};

export default Cubbies;