"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSelector } from "@/components/location-selector"
import { RestaurantCard } from "@/components/restaurant-card"
import { getRestaurantsByLocation, getFeaturedRestaurants, type Restaurant } from "@/data/restaurants"

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState("mumbai")
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const locationRestaurants = getRestaurantsByLocation(selectedLocation)
    setRestaurants(locationRestaurants)
    setFilteredRestaurants(locationRestaurants)
  }, [selectedLocation])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRestaurants(restaurants)
    } else {
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredRestaurants(filtered)
    }
  }, [searchQuery, restaurants])

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Table and Menu Booking System</h1>
          <p className="text-muted-foreground mt-1">
            Book tables and explore menus at the best restaurants across Maharashtra
          </p>
        </div>
        <LocationSelector onLocationChange={handleLocationChange} />
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for restaurants, cuisines, or dishes..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Restaurants</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No restaurants found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedRestaurants()
              .filter((restaurant) => restaurant.location === selectedLocation)
              .map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Explore Maharashtra's Culinary Heritage</h3>
              <p className="text-muted-foreground mt-1">Download our app for exclusive local food experiences</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M15.5 8.5L10.5 12L15.5 15.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                App Store
              </Button>
              <Button variant="outline">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <path d="M9.5 7.5V16.5L16.5 12L9.5 7.5Z" fill="currentColor" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

