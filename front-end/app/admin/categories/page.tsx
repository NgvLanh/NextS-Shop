"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Plus, Search, Filter, ArrowUpDown, MoreHorizontal, Edit, Trash, Eye, CheckCircle, XCircle } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    slug: "electronics",
    productCount: 124,
    featured: true,
    image: "/placeholder.svg?height=40&width=40&text=Electronics",
  },
  {
    id: 2,
    name: "Clothing",
    description: "Apparel and fashion items",
    slug: "clothing",
    productCount: 98,
    featured: true,
    image: "/placeholder.svg?height=40&width=40&text=Clothing",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Home decor and kitchen appliances",
    slug: "home-kitchen",
    productCount: 76,
    featured: true,
    image: "/placeholder.svg?height=40&width=40&text=Home",
  },
  {
    id: 4,
    name: "Beauty",
    description: "Beauty and personal care products",
    slug: "beauty",
    productCount: 52,
    featured: false,
    image: "/placeholder.svg?height=40&width=40&text=Beauty",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear",
    slug: "sports-outdoors",
    productCount: 43,
    featured: false,
    image: "/placeholder.svg?height=40&width=40&text=Sports",
  },
  {
    id: 6,
    name: "Books",
    description: "Books, e-books, and audiobooks",
    slug: "books",
    productCount: 87,
    featured: false,
    image: "/placeholder.svg?height=40&width=40&text=Books",
  },
  {
    id: 7,
    name: "Toys & Games",
    description: "Toys, games, and entertainment items",
    slug: "toys-games",
    productCount: 65,
    featured: false,
    image: "/placeholder.svg?height=40&width=40&text=Toys",
  },
  {
    id: 8,
    name: "Automotive",
    description: "Car parts and accessories",
    slug: "automotive",
    productCount: 34,
    featured: false,
    image: "/placeholder.svg?height=40&width=40&text=Auto",
  },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<number | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(filteredCategories.map((c) => c.id))
    } else {
      setSelectedCategories([])
    }
  }

  const handleSelectCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id))
    } else {
      setSelectedCategories([...selectedCategories, id])
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategoryToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the category from the database
    console.log(`Deleting category ${categoryToDelete}`)
    setIsDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  const handleEditCategory = (id: number) => {
    setCategoryToEdit(id)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage your product categories and organization.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((c) => c.featured).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.reduce((sum, category) => sum + category.productCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Products per Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(categories.reduce((sum, category) => sum + category.productCount, 0) / categories.length)}
            </div>
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
                placeholder="Search categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
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
                    checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Products
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleSelectCategory(category.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{category.description}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.productCount}</TableCell>
                    <TableCell>
                      {category.featured ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Products</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCategory(category.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)} className="text-red-600">
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
            Showing <strong>{filteredCategories.length}</strong> of <strong>{categories.length}</strong> categories
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

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
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

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category details below.</DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input id="category-name" defaultValue={categories.find((c) => c.id === categoryToEdit)?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  defaultValue={categories.find((c) => c.id === categoryToEdit)?.description}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-slug">Slug</Label>
                <Input id="category-slug" defaultValue={categories.find((c) => c.id === categoryToEdit)?.slug} />
              </div>
              <div className="space-y-2">
                <Label>Category Image</Label>
                <div className="flex items-center gap-4">
                  <Image
                    src={categories.find((c) => c.id === categoryToEdit)?.image || "/placeholder.svg"}
                    alt="Category"
                    width={60}
                    height={60}
                    className="rounded-md border"
                  />
                  <Button variant="outline" size="sm">
                    Change Image
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" defaultChecked={categories.find((c) => c.id === categoryToEdit)?.featured} />
                <Label htmlFor="featured">Featured category</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Fill in the details to create a new category.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-category-name">Category Name</Label>
              <Input id="new-category-name" placeholder="Enter category name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-category-description">Description</Label>
              <Textarea id="new-category-description" placeholder="Enter category description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-category-slug">Slug</Label>
              <Input id="new-category-slug" placeholder="Enter category slug" />
            </div>
            <div className="space-y-2">
              <Label>Category Image</Label>
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="new-featured" />
              <Label htmlFor="new-featured">Featured category</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

