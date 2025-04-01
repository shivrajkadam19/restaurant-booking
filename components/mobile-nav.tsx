"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Menu, User, Home, History, Tag, Settings, LogOut, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {user && (
          <div className="flex items-center mt-6 mb-4">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>My Account</span>
              </Link>
              <Link
                href="/profile?tab=orders"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <History className="h-5 w-5" />
                <span>My Bookings</span>
              </Link>
              <Link
                href="/profile?tab=offers"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <Tag className="h-5 w-5" />
                <span>Offers</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Sign Up</span>
              </Link>
            </>
          )}

          <Link
            href="/help"
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Link>

          {user && (
            <>
              <Separator className="my-2" />
              <Link
                href="/profile?tab=settings"
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 px-4 py-2 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  signOut()
                  setOpen(false)
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

