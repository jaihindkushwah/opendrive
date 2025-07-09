"use client";
import { useRootState } from "@/state/RootProvider";
import React from "react";
import { LogoutBtn } from "./logout";
import { Car } from "lucide-react";

function Header() {
  const { user } = useRootState();
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Car Rental Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name?.split(" ")[0]}
            </span>
            <LogoutBtn />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
