"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Update the locations array to ensure it only includes the specified cities
const locations = [
  { value: "mumbai", label: "Mumbai" },
  { value: "pune", label: "Pune" },
  { value: "nagpur", label: "Nagpur" },
  { value: "nashik", label: "Nashik" },
  { value: "amravati", label: "Amravati" },
  { value: "akola", label: "Akola" },
  { value: "chandrapur", label: "Chandrapur" },
  { value: "sambhajinagar", label: "Chh. Sambhaji Nagar" },
]

interface LocationSelectorProps {
  onLocationChange: (location: string) => void
}

export function LocationSelector({ onLocationChange }: LocationSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("mumbai")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full md:w-[200px] justify-between">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            {locations.find((location) => location.value === value)?.label || "Select location"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    onLocationChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === location.value ? "opacity-100" : "opacity-0")} />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

