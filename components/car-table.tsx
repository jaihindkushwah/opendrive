"use client";

import { useState, useEffect } from "react";
import type { CarListing } from "@/lib/data";
import { EditCarModal } from "@/components/edit-car-model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, LogOut, Search, Filter } from "lucide-react";
import { useRootState } from "@/state/RootProvider";

interface PaginatedResponse {
  data: CarListing[];
  total: number;
  page: number;
  totalPages: number;
}

export const carListings = [
  {
    id: "1",
    title: "Tesla Model 3 - Electric Sedan",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    pricePerDay: 120,
    location: "San Francisco, CA",
    imageUrl: "https://source.unsplash.com/featured/?tesla,car",
    description:
      "Eco-friendly electric car with Autopilot. Great for city driving.",
    status: "pending",
    submittedBy: "john@example.com",
    submittedAt: "2025-07-05T10:00:00Z",
    lastUpdated: "2025-07-05T10:00:00Z",
  },
  {
    id: "2",
    title: "Ford Mustang GT - Sport Coupe",
    brand: "Ford",
    model: "Mustang GT",
    year: 2021,
    pricePerDay: 150,
    location: "Los Angeles, CA",
    imageUrl: "https://source.unsplash.com/featured/?mustang,car",
    description:
      "Powerful V8, perfect for weekend getaways or highway cruising.",
    status: "approved",
    submittedBy: "emma@example.com",
    submittedAt: "2025-07-03T15:30:00Z",
    lastUpdated: "2025-07-04T09:45:00Z",
  },
  {
    id: "3",
    title: "Toyota Corolla - Reliable Daily Driver",
    brand: "Toyota",
    model: "Corolla",
    year: 2019,
    pricePerDay: 45,
    location: "Austin, TX",
    imageUrl: "https://source.unsplash.com/featured/?toyota,corolla",
    description: "Reliable, fuel-efficient and budget-friendly.",
    status: "rejected",
    submittedBy: "alex@example.com",
    submittedAt: "2025-07-02T12:20:00Z",
    lastUpdated: "2025-07-06T08:00:00Z",
  },
  {
    id: "4",
    title: "BMW X5 - Luxury SUV",
    brand: "BMW",
    model: "X5",
    year: 2023,
    pricePerDay: 200,
    location: "New York, NY",
    imageUrl: "https://source.unsplash.com/featured/?bmw,x5",
    description: "Spacious luxury SUV with premium features and smooth ride.",
    status: "pending",
    submittedBy: "maria@example.com",
    submittedAt: "2025-07-07T11:10:00Z",
    lastUpdated: "2025-07-07T11:10:00Z",
  },
  {
    id: "5",
    title: "Honda Civic - Compact and Efficient",
    brand: "Honda",
    model: "Civic",
    year: 2020,
    pricePerDay: 55,
    location: "Chicago, IL",
    imageUrl: "https://source.unsplash.com/featured/?honda,civic",
    description:
      "Great fuel economy, perfect for city driving and short trips.",
    status: "pending",
    submittedBy: "dave@example.com",
    submittedAt: "2025-07-06T09:15:00Z",
    lastUpdated: "2025-07-06T09:15:00Z",
  },
];

export function CarDataTable() {
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
  //   const { addMessage } = useFeedback();
  const { user } = useRootState();

  const fetchListings = async (page = 1, status = "all", search = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(status !== "all" && { status }),
        ...(search && { search }),
      });

      const response = await fetch(`/api/cars?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        // addMessage("error", "Failed to fetch car listings");
      }
    } catch {
      //   addMessage("error", "An error occurred while fetching listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(currentPage, statusFilter, searchTerm);
  }, [currentPage, statusFilter, searchTerm]);

  const handleStatusChange = async (
    carId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const response = await fetch(`/api/cars/${carId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // addMessage("success", `Car listing ${status} successfully`);
        fetchListings(currentPage, statusFilter, searchTerm);
      } else {
        // addMessage("error", `Failed to ${status} car listing`);
      }
    } catch {
      //   addMessage("error", "An error occurred while updating the car status");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };
  return (
    <Card>
      <CardContent className="px-2 p-1">
        <Table>
          <TableCaption>Car rental listings management</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Car</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price / Day</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </TableCell>
              </TableRow>
            ) : listings.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No car listings found
                </TableCell>
              </TableRow>
            ) : (
              listings.data.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">
                        {car.brand} {car.model}
                      </div>
                      <div className="text-sm text-gray-500">({car.year})</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(car.status)}</TableCell>
                  <TableCell>{car.location}</TableCell>
                  <TableCell>${car.pricePerDay}</TableCell>
                  <TableCell>{car.submittedBy}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700 bg-transparent"
                      onClick={() => handleStatusChange(car.id, "approved")}
                      disabled={car.status === "approved"}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => handleStatusChange(car.id, "rejected")}
                      disabled={car.status === "rejected"}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 hover:text-blue-700 bg-transparent"
                      onClick={() => setEditingCar(car)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                Showing {(currentPage - 1) * 10 + 1} to{" "}
                {Math.min(currentPage * 10, listings.total)} of {listings.total}{" "}
                listings
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-3 text-sm">
                    Page {currentPage} of {listings.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(listings.totalPages, prev + 1)
                      )
                    }
                    disabled={currentPage === listings.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <EditCarModal
        car={editingCar}
        isOpen={!!editingCar}
        onClose={() => setEditingCar(null)}
        onUpdate={() => fetchListings(currentPage, statusFilter, searchTerm)}
      />
    </Card>
  );
}
