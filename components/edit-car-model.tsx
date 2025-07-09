"use client";
import type React from "react";
import { useEffect, useState } from "react";
import type { CarListing } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
// import { useFeedback } from "@/contexts/feedback-context";

interface EditCarModalProps {
  car: CarListing | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function EditCarModal({
  car,
  isOpen,
  onClose,
  onUpdate,
}: EditCarModalProps) {
  const [formData, setFormData] = useState<Partial<CarListing>>({});
  const [loading, setLoading] = useState(false);
  //   const { addMessage } = useFeedback();

  // Initialize form data when car changes
  useEffect(() => {
    if (car) {
      setFormData({
        title: car.title,
        brand: car.brand,
        model: car.model,
        year: car.year,
        pricePerDay: car.pricePerDay,
        location: car.location,
        description: car.description,
        status: car.status,
      });
    }
  }, [car]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // addMessage("success", "Car listing updated successfully");
        onUpdate();
        onClose();
      } else {
        // addMessage("error", "Failed to update car listing");
      }
    } catch {
      //   addMessage("error", "An error occurred while updating the car listing");
    } finally {
      setLoading(false);
    }
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-md:min-w-3xl max-h-[90vh] min-h-[70vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Edit Car Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className=" space-y-4 ">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand || ""}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model || ""}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    year: Number.parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricePerDay">Price per Day ($)</Label>
              <Input
                id="pricePerDay"
                type="number"
                value={formData.pricePerDay || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerDay: Number.parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as CarListing["status"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
