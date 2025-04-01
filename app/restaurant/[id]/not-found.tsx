import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RestaurantNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Restaurant Not Found</h1>
      <p className="text-muted-foreground mb-8">The restaurant you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link href="/">Browse Restaurants</Link>
      </Button>
    </div>
  )
}

