"use client";
import { carService } from "@/services/car/service";
import { CarListing } from "@/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { throttle } from "lodash";

interface CarListingContextProps {
  listings: PaginatedResponse;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  editingCar: CarListing | null;
  setEditingCar: React.Dispatch<React.SetStateAction<CarListing | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  fetchListings: (
    page?: number,
    status?: string,
    search?: string
  ) => Promise<void>;
  handleStatusChange: (
    carId: string,
    status: "approved" | "rejected"
  ) => Promise<void>;
  setListings: React.Dispatch<React.SetStateAction<PaginatedResponse>>;
}
export const CarListingContext = React.createContext<CarListingContextProps>(
  {} as CarListingContextProps
);

export interface CarListingProviderProps {
  children: React.ReactNode;
}

export function useCarListing() {
  if (!CarListingContext) {
    throw new Error("useCarListing must be used within a CarListingProvider");
  }
  return useContext(CarListingContext);
}

interface PaginatedResponse {
  data: CarListing[];
  total: number;
  page: number;
  totalPages: number;
}

export function CarListingProvider({ children }: CarListingProviderProps) {
  const [listings, setListings] = useState<PaginatedResponse>({
    data: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<CarListing | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchListings = async (page = 1, status = "all", search = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(status !== "all" && { status }),
        ...(search && { search }),
      });
      const response = await carService.getCars(params.toString());
      if (response.data) {
        const data = await response.data;
        setListings(data);
      } else {
        toast.error("Failed to fetch car listings");
      }
    } catch {
      toast.error("An error occurred while fetching listings");
    } finally {
      setLoading(false);
    }
  };
  const throttledFetch = useCallback(
    throttle((page: number, status: string, search: string) => {
      fetchListings(page, status, search);
    }, 500),
    []
  );

  useEffect(() => {
    throttledFetch(currentPage, statusFilter, searchTerm);
  }, [currentPage, statusFilter, searchTerm]);

  const handleStatusChange = async (
    carId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const response = await carService.updateCarListingStatusById(
        carId,
        status
      );
      if (response.data) {
        toast.success(`Car listing ${status} successfully`);
        fetchListings(currentPage, statusFilter, searchTerm);
      } else {
        toast.error("Failed to update car listing status");
      }
    } catch {
      toast.error("An error occurred while updating the car listing status");
    }
  };
  return (
    <CarListingContext.Provider
      value={{
        handleStatusChange,
        listings,
        setListings,
        loading,
        setLoading,
        editingCar,
        setEditingCar,
        currentPage,
        setCurrentPage,
        statusFilter,
        setStatusFilter,
        searchTerm,
        setSearchTerm,
        fetchListings,
      }}
    >
      {children}
    </CarListingContext.Provider>
  );
}
