"use client";

import { CarListingProvider } from "@/state/CarListingProvider";
import { CarDataTable } from "./car-table";
import DashboardFilter from "./dashboard-filter";

export default function DashboardPage() {
  return (
    <CarListingProvider>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardFilter />
        <CarDataTable />
      </div>
    </div>
    </CarListingProvider>
  );
}
