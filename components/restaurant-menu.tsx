"use client"
import { useState } from "react"
import type { MenuItem } from "@/data/restaurants"

interface RestaurantMenuProps {
  menu: MenuItem[]
}

export function RestaurantMenu({ menu }: RestaurantMenuProps) {
  const categories = Array.from(new Set(menu.map((item) => item.category)))
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        {selectedItems.length > 0 && <button className="text-blue-500">{selectedItems.length} item(s) selected</button>}
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <ul>
            {menu
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  {/* Ensure the price is displayed with the ₹ symbol */}
                  <div className="font-medium">₹{item.price}</div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

