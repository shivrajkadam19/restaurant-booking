"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { User, Settings, History, Tag, LogOut, CreditCard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock order history
const orderHistory = [
  {
    id: "ORD-001",
    date: "2023-05-15",
    restaurant: "Pratap's The Misal House",
    items: ["Puneri Misal Pav", "Sol Kadhi"],
    total: 180,
    status: "Completed",
  },
  {
    id: "ORD-002",
    date: "2023-06-02",
    restaurant: "Aaswad",
    items: ["Maharashtrian Thali", "Piyush"],
    total: 430,
    status: "Completed",
  },
  {
    id: "ORD-003",
    date: "2023-06-20",
    restaurant: "Gajanan Vada Pav",
    items: ["Classic Vada Pav", "Cutting Chai"],
    total: 40,
    status: "Completed",
  },
]

// Mock offers
const offers = [
  {
    id: "1",
    title: "20% Off Your First Order",
    description: "Use code WELCOME20 at checkout",
    expiryDate: "2023-12-31",
    restaurant: "Any restaurant",
    code: "WELCOME20",
  },
  {
    id: "2",
    title: "Free Dessert with Orders Over ₹300",
    description: "Automatically applied at checkout",
    expiryDate: "2023-10-15",
    restaurant: "Shreyas Restaurant",
    code: "SWEETTREAT",
  },
  {
    id: "3",
    title: "Buy One Get One Free on Vada Pav",
    description: "Every Tuesday and Wednesday",
    expiryDate: "2023-11-30",
    restaurant: "Gajanan Vada Pav",
    code: "BOGOPAV",
  },
]

export default function ProfilePage() {

  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const router = useRouter()
  const { user, signOut } = useAuth()

  const [activeTab, setActiveTab] = useState("profile")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/booking?userId=${user._id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data.orders))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    setName(user.name)
    setEmail(user.email)
    setPhone("+91 98765 43210") // Mock data
    setAddress("123 Main St, Mumbai, Maharashtra 400001") // Mock data

    if (tabParam && ["profile", "orders", "offers", "settings"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam, user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Member since January 2023</p>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-2">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <History className="mr-2 h-4 w-4" />
                Order History
              </Button>
              <Button
                variant={activeTab === "offers" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("offers")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Offers
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </CardContent>
        </Card>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and reservations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{order.restaurant}</h3>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">₹{order.total.toFixed(2)}</span>
                            <p className="text-xs text-muted-foreground">{order.id}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">{order.items.join(", ")}</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {order.status}
                          </span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and reservations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <div key={order._id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{order.restaurantName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString()} at {order.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium">Guests: {order.guests}</span>
                              {/* <p className="text-xs text-muted-foreground">ID: {order._id}</p> */}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No orders found.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="offers">
              <Card>
                <CardHeader>
                  <CardTitle>Available Offers</CardTitle>
                  <CardDescription>Special discounts and promotions for you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {offers.map((offer) => (
                      <div key={offer.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{offer.title}</h3>
                            <p className="text-sm">{offer.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Valid until {offer.expiryDate} • {offer.restaurant}
                            </p>
                          </div>
                          <div className="bg-primary/10 px-3 py-2 rounded text-primary font-mono text-sm">
                            {offer.code}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your orders and reservations.
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about special offers and promotions.
                        </p>
                      </div>
                      <Switch id="marketing" checked={marketingEnabled} onCheckedChange={setMarketingEnabled} />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">UPI - user@bank</p>
                          <p className="text-xs text-muted-foreground">Default payment method</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

