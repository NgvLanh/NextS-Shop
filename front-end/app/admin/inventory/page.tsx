"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  AlertTriangle,
  RefreshCw,
  Plus,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock inventory data
const inventory = Array.from({ length: 20 }, (_, i) => {
  const stock =
    i % 5 === 0 ? 0 : i % 3 === 0 ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 100) + 20

  return {
    id: i + 1,
    sku: `SKU-${1000 + i}`,
    name: `Product Name ${i + 1}`,
    category: i % 4 === 0 ? "Electronics" : i % 4 === 1 ? "Clothing" : i % 4 === 2 ? "Home & Kitchen" : "Beauty",
    price: 99.99 + i * 10,
    stock,
    status: stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "In Stock",
    reorderPoint: 10,
    lastUpdated: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    image: `/placeholder.svg?height=40&width=40&text=P${i + 1}`,
  }
})

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isUpdateStockDialogOpen, setIsUpdateStockDialogOpen] = useState(false)
  const [itemToUpdate, setItemToUpdate] = useState<number | null>(null)
  const [newStockAmount, setNewStockAmount] = useState<string>("")
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false)

  // Filter inventory based on search term and filters
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(filteredInventory.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleUpdateStock = (id: number) => {
    const item = inventory.find((item) => item.id === id)
    if (item) {
      setItemToUpdate(id)
      setNewStockAmount(item.stock.toString())
      setIsUpdateStockDialogOpen(true)
    }
  }

  const confirmUpdateStock = () => {
    // In a real app, you would update the stock in the database
    console.log(`Updating stock for item ${itemToUpdate} to ${newStockAmount}`)
    setIsUpdateStockDialogOpen(false)
    setItemToUpdate(null)
  }

  const lowStockCount = inventory.filter((item) => item.status === "Low Stock").length
  const outOfStockCount = inventory.filter((item) => item.status === "Out of Stock").length
  const inStockCount = inventory.filter((item) => item.status === "In Stock").length
  const totalItems = inventory.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">Track and manage your product inventory levels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsAdjustmentDialogOpen(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Adjust Stock
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by product name or SKU..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Product
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Stock
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    No inventory items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </div>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStock(item.id)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            <span>Update Stock</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Product</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            <span>Set Reorder Point</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredInventory.length}</strong> of <strong>{inventory.length}</strong> items
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Update Stock Dialog */}
      <Dialog open={isUpdateStockDialogOpen} onOpenChange={setIsUpdateStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
            <DialogDescription>Update the stock quantity for this product.</DialogDescription>
          </DialogHeader>
          {itemToUpdate && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Image
                  src={inventory.find((item) => item.id === itemToUpdate)?.image || "/placeholder.svg"}
                  alt="Product"
                  width={60}
                  height={60}
                  className="rounded-md border"
                />
                <div>
                  <p className="font-medium">{inventory.find((item) => item.id === itemToUpdate)?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    SKU: {inventory.find((item) => item.id === itemToUpdate)?.sku}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-stock">Current Stock</Label>
                <Input id="current-stock" value={inventory.find((item) => item.id === itemToUpdate)?.stock} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-stock">New Stock Quantity</Label>
                <Input
                  id="new-stock"
                  type="number"
                  value={newStockAmount}
                  onChange={(e) => setNewStockAmount(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStockDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpdateStock}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Adjustment Dialog */}
      <Dialog open={isAdjustmentDialogOpen} onOpenChange={setIsAdjustmentDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Inventory Adjustment</DialogTitle>
            <DialogDescription>Adjust inventory levels for multiple products at once.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="add" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="add">Add Stock</TabsTrigger>
              <TabsTrigger value="remove">Remove Stock</TabsTrigger>
              <TabsTrigger value="set">Set Stock</TabsTrigger>
            </TabsList>
            <TabsContent value="add" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Products</Label>
                <div className="max-h-[300px] overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Add Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>
                            <Input type="number" min="0" className="w-20" placeholder="0" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adjustment-reason">Reason for Adjustment</Label>
                <Select>
                  <SelectTrigger id="adjustment-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">New Purchase</SelectItem>
                    <SelectItem value="return">Customer Return</SelectItem>
                    <SelectItem value="correction">Inventory Correction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="remove" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Products</Label>
                <div className="max-h-[300px] overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Remove Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>
                            <Input type="number" min="0" max={item.stock} className="w-20" placeholder="0" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="removal-reason">Reason for Removal</Label>
                <Select>
                  <SelectTrigger id="removal-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="damage">Damaged Goods</SelectItem>
                    <SelectItem value="loss">Lost or Stolen</SelectItem>
                    <SelectItem value="correction">Inventory Correction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="set" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Products</Label>
                <div className="max-h-[300px] overflow-y-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>New Stock Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>
                            <Input type="number" min="0" className="w-20" placeholder={item.stock.toString()} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="set-reason">Reason for Adjustment</Label>
                <Select>
                  <SelectTrigger id="set-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audit">Inventory Audit</SelectItem>
                    <SelectItem value="correction">Inventory Correction</SelectItem>
                    <SelectItem value="recount">Physical Recount</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Apply Adjustments</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

