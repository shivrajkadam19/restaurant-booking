import { Loader2 } from "lucide-react"

export default function ProfileLoading() {
  return (
    <div className="container flex items-center justify-center min-h-[70vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="sr-only">Loading profile</span>
    </div>
  )
}

