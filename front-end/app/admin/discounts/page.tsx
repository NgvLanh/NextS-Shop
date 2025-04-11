"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Edit, Trash, Plus } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// Mock discount data
const discounts = [
  {
    id: 1,
    code: "SUMMER25",
    type: "Percentage",
    value: 25,
    minPurchase: 50,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageLimit: 1000,
    usageCount: 450,
    status: "Active",
    description: "Summer sale discount",
    applicableTo: "All Products",
  },
  {
    id: 2,
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minPurchase: 0,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    usageLimit: 0,
    usageCount: 1250,
    status: "Active",
    description: "New customer discount",
    applicableTo: "All Products",
  },
  {
    id: 3,
    code: "FREESHIP",
    type: "Fixed Amount",
    value: 15,
    minPurchase: 75,
    startDate: "2023-05-15",
    endDate: "2023-12-31",
    usageLimit: 500,
    usageCount: 320,
    status: "Active",
    description: "Free shipping on orders over $75",
    applicableTo: "All Products",
  },
  {
    id: 4,
    code: "FLASH50",
    type: "Percentage",
    value: 50,
    minPurchase: 100,
    startDate: "2023-07-15",
    endDate: "2023-07-16",
    usageLimit: 200,
    usageCount: 200,
    status: "Expired",
    description: "Flash sale discount",
    applicableTo: "Selected Products",
  },
  {
    id: 5,
    code: "HOLIDAY20",
    type: "Percentage",
    value: 20,
    minPurchase: 0,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    usageLimit: 0,
    usageCount: 0,
    status: "Scheduled",
    description: "Holiday season discount",
    applicableTo: "All Products",
  },
  {
    id: 6,
    code: "CLEARANCE",
    type: "Percentage",
    value: 70,
    minPurchase: 0,
    startDate: "2023-08-15",
    endDate: "2023-09-15",
    usageLimit: 0,
    usageCount: 0,
    status: "Scheduled",
    description: "End of season clearance",
    applicableTo: "Selected Categories",
  },
  {
    id: 7,
    code: "LOYALTY25",
    type: "Percentage",
    value: 25,
    minPurchase: 0,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    usageLimit: 0,
    usageCount: 78,
    status: "Active",
    description: "Loyalty program discount",
    applicableTo: "All Products",
  },
]

export default function DiscountsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [discountToDelete, setDiscountToDelete] = useState<number | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [discountToEdit, setDiscountToEdit] = useState<number | null>(null)

  // Filter discounts based on search term and filters
  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch =
      discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || discount.status === statusFilter
    const matchesType = typeFilter === "all" || discount.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDiscounts(filteredDiscounts.map((d) => d.id))
    } else {
      setSelectedDiscounts([])
    }
  }

  const handleSelectDiscount = (id: number) => {
    if (selectedDiscounts.includes(id)) {
      setSelectedDiscounts(selectedDiscounts.filter((discountId) => discountId !== id))
    } else {
      setSelectedDiscounts([...selectedDiscounts, id])
    }
  }

  const handleDeleteDiscount = (id: number) => {
    setDiscountToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the discount from the database
    console.log(`Deleting discount ${discountToDelete}`)
    setIsDeleteDialogOpen(false)
    setDiscountToDelete(null)
  }

  const handleEditDiscount = (id: number) => {
    setDiscountToEdit(id)
    setIsEditDialogOpen(true)
  }

  const activeDiscounts = discounts.filter((d) => d.status === "Active").length
  const scheduledDiscounts = discounts.filter((d) => d.status === "Scheduled").length
  const expiredDiscounts = discounts.filter((d) => d.status === "Expired").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Discounts & Promotions</h2>
          <p className="text-muted-foreground">Create and manage discount codes and promotional offers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Discount
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{discounts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDiscounts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledDiscounts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredDiscounts}</div>
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
                placeholder="Search discounts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Percentage">Percentage</SelectItem>
                <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
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
                    checked={selectedDiscounts.length === filteredDiscounts.length && filteredDiscounts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Code
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Min Purchase</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Start Date
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    End Date
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No discounts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedDiscounts.includes(discount.id)}
                        onCheckedChange={() => handleSelectDiscount(discount.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{discount.code}</TableCell>
                    <TableCell>{discount.type}</TableCell>
                    <TableCell>
                      {discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value.toFixed(2)}`}
                    </TableCell>
                    <TableCell>{discount.minPurchase > 0 ? `$${discount.minPurchase.toFixed(2)}` : "None"}</TableCell>
                    <TableCell>{discount.startDate}</TableCell>
                    <TableCell>{discount.endDate}</TableCell>
                    <TableCell>
                      {discount.usageCount}
                      {discount.usageLimit > 0 ? `/${discount.usageLimit}` : ""}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          discount.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : discount.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {discount.status}
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditDiscount(discount.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteDiscount(discount.id)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
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
            Showing <strong>{filteredDiscounts.length}</strong> of <strong>{discounts.length}</strong> discounts
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Discount Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Discount</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this discount? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Discount Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Discount</DialogTitle>
            <DialogDescription>Create a new discount code or promotion.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="usage">Usage Limits</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="discount-code">Discount Code</Label>
                <Input id="discount-code" placeholder="e.g., SUMMER25" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount-description">Description</Label>
                <Textarea
                  id="discount-description"
                  placeholder="Enter a description for this discount"
                  rows={3}
                  placeholder="Enter a description for this discount"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <RadioGroup defaultValue="percentage">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage">Percentage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Amount</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <div className="flex items-center">
                    <Input id="discount-value" type="number" placeholder="0" min="0" />
                    <span className="ml-2">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="conditions" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="min-purchase">Minimum Purchase Amount ($)</Label>
                <Input id="min-purchase" type="number" placeholder="0" min="0" />
              </div>
              <div className="space-y-2">
                <Label>Applicable To</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-products" />
                    <Label htmlFor="all-products">All Products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="categories" id="categories" />
                    <Label htmlFor="categories">Specific Categories</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="products" id="products" />
                    <Label htmlFor="products">Specific Products</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Customer Eligibility</Label>
                <RadioGroup defaultValue="all-customers">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all-customers" id="all-customers" />
                    <Label htmlFor="all-customers">All Customers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new-customers" id="new-customers" />
                    <Label htmlFor="new-customers">New Customers Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="returning-customers" id="returning-customers" />
                    <Label htmlFor="returning-customers">Returning Customers Only</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>
            <TabsContent value="usage" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="usage-limit">Usage Limit</Label>
                <Input id="usage-limit" type="number" placeholder="0 (unlimited)" min="0" />
                <p className="text-sm text-muted-foreground">Set to 0 for unlimited usage</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="per-customer">Usage Limit Per Customer</Label>
                <Input id="per-customer" type="number" placeholder="0 (unlimited)" min="0" />
                <p className="text-sm text-muted-foreground">Set to 0 for unlimited usage per customer</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="one-time" />
                <Label htmlFor="one-time">One-time use per customer</Label>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Create Discount</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Discount Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Discount</DialogTitle>
            <DialogDescription>Update the discount details.</DialogDescription>
          </DialogHeader>
          {discountToEdit && (
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
                <TabsTrigger value="usage">Usage Limits</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-discount-code">Discount Code</Label>
                  <Input id="edit-discount-code" defaultValue={discounts.find((d) => d.id === discountToEdit)?.code} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-discount-description">Description</Label>
                  <Textarea
                    id="edit-discount-description"
                    defaultValue={discounts.find((d) => d.id === discountToEdit)?.description}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Discount Type</Label>
                    <RadioGroup
                      defaultValue={
                        discounts.find((d) => d.id === discountToEdit)?.type === "Percentage" ? "percentage" : "fixed"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percentage" id="edit-percentage" />
                        <Label htmlFor="edit-percentage">Percentage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed" id="edit-fixed" />
                        <Label htmlFor="edit-fixed">Fixed Amount</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-discount-value">Discount Value</Label>
                    <div className="flex items-center">
                      <Input
                        id="edit-discount-value"
                        type="number"
                        defaultValue={discounts.find((d) => d.id === discountToEdit)?.value}
                        min="0"
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-start-date">Start Date</Label>
                    <Input
                      id="edit-start-date"
                      type="date"
                      defaultValue={discounts.find((d) => d.id === discountToEdit)?.startDate}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-end-date">End Date</Label>
                    <Input
                      id="edit-end-date"
                      type="date"
                      defaultValue={discounts.find((d) => d.id === discountToEdit)?.endDate}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="conditions" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-min-purchase">Minimum Purchase Amount ($)</Label>
                  <Input
                    id="edit-min-purchase"
                    type="number"
                    defaultValue={discounts.find((d) => d.id === discountToEdit)?.minPurchase}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Applicable To</Label>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="edit-all-products" />
                      <Label htmlFor="edit-all-products">All Products</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="categories" id="edit-categories" />
                      <Label htmlFor="edit-categories">Specific Categories</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="products" id="edit-products" />
                      <Label htmlFor="edit-products">Specific Products</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
              <TabsContent value="usage" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-usage-limit">Usage Limit</Label>
                  <Input
                    id="edit-usage-limit"
                    type="number"
                    defaultValue={discounts.find((d) => d.id === discountToEdit)?.usageLimit}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">Set to 0 for unlimited usage</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-usage-count">Current Usage Count</Label>
                  <Input
                    id="edit-usage-count"
                    type="number"
                    defaultValue={discounts.find((d) => d.id === discountToEdit)?.usageCount}
                    disabled
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

