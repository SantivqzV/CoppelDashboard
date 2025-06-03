"use client";
import React from "react";
import AppBarChart from "@/components/AppBarChart";
import CardList from "@/components/CardList";
import Cubbies from "@/components/Cubbies";
import BarChartOrders from "@/components/BarChartOrders";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top two: side by side on md+, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppBarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <Cubbies title="Available Cubbies" />
        </div>
      </div>
      {/* Bottom two: stacked */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <BarChartOrders />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title="Operators" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;