import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Clock, MapPin, Phone, ChevronLeft } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RestaurantMenu } from "@/components/restaurant-menu"
import { RestaurantReservation } from "@/components/restaurant-reservation"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = getRestaurantById(params.id)

  if (!restaurant) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Link href="/" className="flex items-center text-sm mb-4 text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to restaurants
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={restaurant.images[0] || "/placeholder.svg"}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {restaurant.images.slice(1, 4).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${restaurant.name} image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
              <p className="text-muted-foreground">{restaurant.cuisine}</p>
            </div>
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
              <Star className="h-5 w-5 fill-primary text-primary mr-1" />
              <span className="font-medium">{restaurant.rating}</span>
              <span className="text-sm text-muted-foreground ml-1">({restaurant.reviewCount})</span>
            </div>
          </div>

          <p className="mt-4">{restaurant.description}</p>

          <div className="mt-6 space-y-2">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{restaurant.openingHours}</span>
            </div>
          </div>

          <div className="mt-6">
            <Badge variant="outline" className="mr-2">
              {restaurant.priceRange}
            </Badge>
            <Badge variant="outline">{restaurant.cuisine}</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="menu" className="mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="reservation">Make a Reservation</TabsTrigger>
        </TabsList>
        <TabsContent value="menu" className="mt-6">
          <RestaurantMenu menu={restaurant.menu} />
        </TabsContent>
        <TabsContent value="reservation" className="mt-6">
          <RestaurantReservation restaurant={restaurant} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

