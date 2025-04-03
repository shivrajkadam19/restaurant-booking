"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import type { Restaurant } from "@/data/restaurants"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

interface RestaurantReservationProps {
  restaurant: Restaurant
}

export function RestaurantReservation({ restaurant }: RestaurantReservationProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("19:00")
  const [guests, setGuests] = useState("2")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { user} = useAuth();
  const router = useRouter()

  console.log(user)
  const handleSubmit = async () => {
    if (!user) {
      alert("Please Login first");
      router.push("/sign-in");
      return;
    }

    if (!date || !time || !guests) return;

    setIsSubmitting(true);
    
    // Debugging: Log the request data before sending
    console.log("Sending booking request:", {
        userId: user._id,
        restaurantName: restaurant.name,
        date,
        time,
        guests,
    });

    const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: user._id,
            restaurantName: restaurant.name,
            date,
            time,
            guests,
        }),
    });

    if (response.ok) {
        console.log("Booking response:", await response.json());
        setIsSuccess(true);
    } else {
        const errorResponse = await response.json();
        console.error("Failed to reserve table:", errorResponse);
        alert("Failed to reserve table: " + errorResponse.error);
    }

    setIsSubmitting(false);
};



  const timeSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reserve a Table</CardTitle>
        <CardDescription>Book your table at {restaurant.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="text-lg font-medium mb-2">Reservation Confirmed!</h3>
            <p className="text-muted-foreground">
              Your table for {guests} {Number.parseInt(guests) === 1 ? "person" : "people"} has been reserved at{" "}
              {restaurant.name} on {date && format(date, "EEEE, MMMM d, yyyy")} at {time}.
            </p>
            <Button className="mt-4" onClick={() => setIsSuccess(false)}>
              Make Another Reservation
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Guests</label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "person" : "people"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
      {!isSuccess && (
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={!date || !time || !guests || isSubmitting}>
            {isSubmitting ? "Processing..." : "Reserve Table"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

