import Link from "next/link"
import Image from "next/image"
import { Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "@/data/restaurants"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative h-48 w-full">
          <Image src={restaurant.images[0] || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          {restaurant.featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({restaurant.reviewCount})</span>
            </div>
          </div>
          <p className="text-sm mt-2 line-clamp-2">{restaurant.description}</p>
          <div className="flex items-center mt-3 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{restaurant.address}</span>
          </div>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span className="truncate">{restaurant.openingHours}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <span className="text-sm font-medium">{restaurant.priceRange}</span>
          <span className="text-sm text-primary font-medium">View Menu</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

