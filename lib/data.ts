export interface CarListing {
  id: string
  title: string
  brand: string
  model: string
  year: number
  pricePerDay: number
  location: string
  imageUrl: string
  description: string
  status: "pending" | "approved" | "rejected"
  submittedBy: string
  submittedAt: string
  lastUpdated: string
}

export interface AuditLog {
  id: string
  action: "approve" | "reject" | "edit"
  carId: string
  adminEmail: string
  timestamp: string
  details?: string
}

// In-memory storage - in production, use a database
const carListings: CarListing[] = [
  {
    id: "1",
    title: "Tesla Model 3 - Electric Sedan",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    pricePerDay: 120,
    location: "San Francisco, CA",
    imageUrl: "https://source.unsplash.com/featured/?tesla,car",
    description: "Eco-friendly electric car with Autopilot. Great for city driving.",
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
    description: "Powerful V8, perfect for weekend getaways or highway cruising.",
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
    description: "Great fuel economy, perfect for city driving and short trips.",
    status: "pending",
    submittedBy: "dave@example.com",
    submittedAt: "2025-07-06T09:15:00Z",
    lastUpdated: "2025-07-06T09:15:00Z",
  },
]

const auditLogs: AuditLog[] = []

export function getCarListings(page = 1, limit = 10, statusFilter?: string) {
  let filtered = carListings

  if (statusFilter && statusFilter !== "all") {
    filtered = carListings.filter((car) => car.status === statusFilter)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    data: filtered.slice(startIndex, endIndex),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  }
}

export function getCarById(id: string): CarListing | undefined {
  return carListings.find((car) => car.id === id)
}

export function updateCarStatus(id: string, status: "approved" | "rejected", adminEmail: string): boolean {
  const carIndex = carListings.findIndex((car) => car.id === id)
  if (carIndex === -1) return false

  carListings[carIndex].status = status
  carListings[carIndex].lastUpdated = new Date().toISOString()

  // Add audit log
  auditLogs.push({
    id: Date.now().toString(),
    action: status === "approved" ? "approve" : "reject",
    carId: id,
    adminEmail,
    timestamp: new Date().toISOString(),
  })

  return true
}

export function updateCar(id: string, updates: Partial<CarListing>, adminEmail: string): boolean {
  const carIndex = carListings.findIndex((car) => car.id === id)
  if (carIndex === -1) return false

  carListings[carIndex] = {
    ...carListings[carIndex],
    ...updates,
    lastUpdated: new Date().toISOString(),
  }

  // Add audit log
  auditLogs.push({
    id: Date.now().toString(),
    action: "edit",
    carId: id,
    adminEmail,
    timestamp: new Date().toISOString(),
    details: JSON.stringify(updates),
  })

  return true
}

export function getAuditLogs(): AuditLog[] {
  return auditLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
