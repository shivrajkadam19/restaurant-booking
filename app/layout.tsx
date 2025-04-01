import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { AuthProvider } from "@/context/auth-context"
import { UserNav } from "@/components/user-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Restaurant Table and Menu Booking System",
  description: "Book tables and explore menus at the best restaurants across Maharashtra",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <header className="border-b">
            <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
              <Link href="/" className="font-bold text-xl">
                MahaEats
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium hover:text-primary">
                  Home
                </Link>
                <Link href="/profile" className="text-sm font-medium hover:text-primary">
                  My Bookings
                </Link>
                <Link href="/profile?tab=offers" className="text-sm font-medium hover:text-primary">
                  Offers
                </Link>
                <Link href="/help" className="text-sm font-medium hover:text-primary">
                  Help
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <MobileNav />
                <UserNav />
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t mt-12">
            <div className="container mx-auto py-8 px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">MahaEats</h3>
                  <p className="text-sm text-muted-foreground">
                    Book tables and explore menus at the best restaurants across Maharashtra.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Discover</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Restaurants
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Cuisines
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Districts
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} MahaEats. All rights reserved.
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'