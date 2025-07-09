"use client";
import { EditCarModal } from "@/components/edit-car-model";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCarListing } from "@/state/CarListingProvider";

export function CarDataTable() {
  const {
    handleStatusChange,
    listings,
    loading,
    editingCar,
    setEditingCar,
    currentPage,
    setCurrentPage,
    statusFilter,
    searchTerm,
    fetchListings,
  } = useCarListing();

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
                  <TableCell>{getStatusBadge(car.status || "")}</TableCell>
                  <TableCell>{car.location}</TableCell>
                  <TableCell>${car.price_per_day}</TableCell>
                  <TableCell>{car.submittedBy || ""}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700 bg-transparent"
                      onClick={() =>
                        handleStatusChange(car.id + "", "approved")
                      }
                      disabled={car.status === "approved"}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() =>
                        handleStatusChange(car.id + "", "rejected")
                      }
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
        car={editingCar as any}
        isOpen={!!editingCar}
        onClose={() => setEditingCar(null)}
        onUpdate={() => fetchListings(currentPage, statusFilter, searchTerm)}
      />
    </Card>
  );
}
