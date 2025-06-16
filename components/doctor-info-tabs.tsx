"use client"

import { Badge } from "@/components/ui/badge"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Edit3, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Doctor {
  id: string
  name: string
  address?: string
  contact?: string
  services?: string[]
  clinicImages?: string[]
  // Add more fields as needed for reviews, etc.
}

interface DoctorInfoTabsProps {
  doctor: Doctor
}

// Mock patient stories/reviews
const mockReviews = [
  {
    id: "r1",
    patientName: "Anonymous",
    timeAgo: "3 years ago",
    title: "Visited for Stomach pain",
    content:
      "I was having severe stomach ache on Sunday 14th Feb 21 since 4 PM. I consulted in Emergency clinic of the hospital at 2 AM on night of 14th/15th. There was next day on 15th Feb pain...",
    isVerified: true,
  },
  {
    id: "r2",
    patientName: "Tejas Bonde",
    timeAgo: "1.5 years ago",
    title: "Visited for Stomach pain",
    content: "Excellent care and attention to detail. Dr. Gidmare is very knowledgeable.",
    isVerified: true,
  },
  {
    id: "r3",
    patientName: "Priya S.",
    timeAgo: "6 months ago",
    title: "Routine Checkup",
    content: "Very professional and friendly. Made me feel comfortable throughout the visit.",
    isVerified: false,
  },
]

export function DoctorInfoTabs({ doctor }: DoctorInfoTabsProps) {
  return (
    <Tabs defaultValue="overview" className="mt-8">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="reviews">Patient Stories ({mockReviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Clinic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {doctor.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-gray-700">{doctor.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(doctor.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline"
                  >
                    View in map
                  </a>
                </div>
              </div>
            )}
            {doctor.contact && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Contact</h4>
                  <p className="text-gray-700">{doctor.contact}</p>
                </div>
              </div>
            )}
            {/* Add more overview details like timings, etc. */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="services" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            {doctor.services && doctor.services.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {doctor.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No specific services listed.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="gallery" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Clinic Images</CardTitle>
          </CardHeader>
          <CardContent>
            {doctor.clinicImages && doctor.clinicImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {doctor.clinicImages.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc || "/placeholder.svg"}
                    alt={`Clinic image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images available.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Patient Stories & Reviews</CardTitle>
              <CardDescription>These stories represent patient opinion and experiences.</CardDescription>
            </div>
            <Button variant="outline" className="bg-orange-100 border-orange-400 text-orange-600 hover:bg-orange-200">
              <Edit3 className="mr-2 h-4 w-4" /> Write a review
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{review.patientName}</p>
                    <p className="text-xs text-gray-500">{review.timeAgo}</p>
                  </div>
                  {review.isVerified && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <h5 className="font-medium text-gray-700 mb-1">{review.title}</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.content.length > 150 ? `${review.content.substring(0, 150)}... ` : review.content}
                  {review.content.length > 150 && (
                    <button className="text-teal-600 hover:underline text-sm">Read more</button>
                  )}
                </p>
              </div>
            ))}
            <div className="mt-6 text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
