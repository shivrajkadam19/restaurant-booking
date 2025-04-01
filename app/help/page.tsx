import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground mb-8">Find answers to common questions about TableSpot</p>

        <div className="relative mb-8">
          <Input placeholder="Search for answers..." className="pl-4 pr-10" />
          <Button className="absolute right-1 top-1 h-8 w-8 p-0" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Reservations</CardTitle>
              <CardDescription>Managing your restaurant bookings</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="#reservations" className="text-primary text-sm hover:underline">
                View articles
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Account</CardTitle>
              <CardDescription>Managing your TableSpot account</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="#account" className="text-primary text-sm hover:underline">
                View articles
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Payments</CardTitle>
              <CardDescription>Payment methods and billing</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="#payments" className="text-primary text-sm hover:underline">
                View articles
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Technical Issues</CardTitle>
              <CardDescription>Troubleshooting common problems</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="#technical" className="text-primary text-sm hover:underline">
                View articles
              </Link>
            </CardFooter>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4" id="reservations">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I make a reservation?</AccordionTrigger>
            <AccordionContent>
              To make a reservation, search for a restaurant, select your preferred date and time, and specify the
              number of guests. Review your details and confirm the booking. You'll receive a confirmation email with
              all the details.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How can I cancel or modify my reservation?</AccordionTrigger>
            <AccordionContent>
              You can cancel or modify your reservation by going to "My Bookings" in your profile. Find the reservation
              you want to change, and select either "Cancel" or "Modify." Changes are subject to the restaurant's
              cancellation policy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Are there any fees for using TableSpot?</AccordionTrigger>
            <AccordionContent>
              TableSpot is completely free for diners to use. We never charge any fees for making reservations through
              our platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What happens if I'm late for my reservation?</AccordionTrigger>
            <AccordionContent>
              Policies vary by restaurant. Generally, restaurants hold reservations for 15 minutes past the reservation
              time. If you're running late, we recommend calling the restaurant directly to inform them.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How do I redeem an offer or promotion?</AccordionTrigger>
            <AccordionContent>
              To redeem an offer, select the offer from the "Offers" section in your profile. Some offers are
              automatically applied when you make a reservation, while others provide a code that you'll need to show to
              the restaurant staff.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Still need help?</h3>
          <p className="mb-4">Our support team is available to assist you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>Contact Support</Button>
            <Button variant="outline">Live Chat</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

