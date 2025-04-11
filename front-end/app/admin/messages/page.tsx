"use client"

import type React from "react"

import { useState } from "react"
import { Search, MoreHorizontal, Mail, Phone, Clock, Send, Archive, Trash, Star, StarOff } from "lucide-react"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock messages data
const messages = Array.from({ length: 15 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    id: i + 1,
    subject: i % 3 === 0 ? "Order Inquiry" : i % 3 === 1 ? "Product Question" : "Return Request",
    customer: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    date: date.toISOString().split("T")[0],
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
    message: `This is a sample message ${i + 1}. It contains some text that would be part of a customer inquiry or support request.`,
    status: i % 4 === 0 ? "New" : i % 4 === 1 ? "Replied" : i % 4 === 2 ? "Pending" : "Resolved",
    priority: i % 5 === 0 ? "High" : i % 5 === 1 ? "Medium" : "Low",
    isStarred: i % 7 === 0,
    avatar: `/placeholder.svg?height=40&width=40&text=C${i + 1}`,
  }
})

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])
  const [viewMessage, setViewMessage] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [activeTab, setActiveTab] = useState("inbox")

  // Filter messages based on search term, filters, and active tab
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter
    const matchesTab =
      activeTab === "inbox" ||
      (activeTab === "starred" && message.isStarred) ||
      (activeTab === "sent" && message.status === "Replied") ||
      (activeTab === "archived" && false) // No archived messages in mock data

    return matchesSearch && matchesStatus && matchesPriority && matchesTab
  })

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMessages(filteredMessages.map((m) => m.id))
    } else {
      setSelectedMessages([])
    }
  }

  const handleSelectMessage = (id: number) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter((messageId) => messageId !== id))
    } else {
      setSelectedMessages([...selectedMessages, id])
    }
  }

  const handleViewMessage = (id: number) => {
    setViewMessage(id)
    setReplyText("")
  }

  const handleSendReply = () => {
    // In a real app, you would send the reply to the backend
    console.log(`Sending reply to message ${viewMessage}: ${replyText}`)
    setReplyText("")
    // Close the dialog or show a success message
  }

  const toggleStar = (id: number) => {
    // In a real app, you would update the starred status in the database
    console.log(`Toggling star for message ${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Manage customer inquiries and support requests.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Archive Selected
          </Button>
          <Button variant="outline">
            <Trash className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.status === "New").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.status === "Pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.status === "Resolved").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inbox" onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Replied">Replied</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="inbox" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No messages found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id} className={message.status === "New" ? "font-medium" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMessages.includes(message.id)}
                          onCheckedChange={() => handleSelectMessage(message.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => toggleStar(message.id)} className="h-8 w-8">
                          {message.isStarred ? (
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell
                        className="cursor-pointer hover:underline"
                        onClick={() => handleViewMessage(message.id)}
                      >
                        {message.subject}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.avatar} alt={message.customer} />
                            <AvatarFallback>{message.customer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className={message.status === "New" ? "font-medium" : ""}>{message.customer}</p>
                            <p className="text-xs text-muted-foreground">{message.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{message.date}</p>
                          <p className="text-xs text-muted-foreground">{message.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            message.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : message.status === "Replied"
                                ? "bg-green-100 text-green-800"
                                : message.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            message.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : message.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {message.priority}
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
                            <DropdownMenuItem onClick={() => handleViewMessage(message.id)}>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>View Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              <span>Call Customer</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              <span>Archive</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
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
              Showing <strong>{filteredMessages.length}</strong> of <strong>{messages.length}</strong> messages
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
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          {/* Similar table structure for starred messages */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No starred messages found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      {/* Same row structure as inbox */}
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      </TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.customer}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            message.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : message.status === "Replied"
                                ? "bg-green-100 text-green-800"
                                : message.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            message.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : message.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {message.priority}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredMessages.filter((m) => m.isStarred).length}</strong> of{" "}
              <strong>{messages.filter((m) => m.isStarred).length}</strong> starred messages
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No sent messages found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.customer}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Sent
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <Archive className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No archived messages</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Message Dialog */}
      <Dialog open={!!viewMessage} onOpenChange={(open) => !open && setViewMessage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{messages.find((m) => m.id === viewMessage)?.subject}</DialogTitle>
            <DialogDescription>Message from {messages.find((m) => m.id === viewMessage)?.customer}</DialogDescription>
          </DialogHeader>

          {viewMessage && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={messages.find((m) => m.id === viewMessage)?.avatar} alt="Customer" />
                    <AvatarFallback>{messages.find((m) => m.id === viewMessage)?.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{messages.find((m) => m.id === viewMessage)?.customer}</p>
                    <p className="text-sm text-muted-foreground">{messages.find((m) => m.id === viewMessage)?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {messages.find((m) => m.id === viewMessage)?.date} at{" "}
                    {messages.find((m) => m.id === viewMessage)?.time}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <p>{messages.find((m) => m.id === viewMessage)?.message}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Reply</h3>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="normal">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="normal">Normal Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Textarea
                  placeholder="Type your reply here..."
                  rows={5}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewMessage(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

