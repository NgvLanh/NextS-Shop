'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Percent,
  Search,
  Settings,
  ShoppingBag,
  Tag,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className='h-5 w-5' />,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: <ShoppingBag className='h-5 w-5' />,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: <Package className='h-5 w-5' />,
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: <Users className='h-5 w-5' />,
  },
  {
    title: 'Inventory',
    href: '/admin/inventory',
    icon: <Package className='h-5 w-5' />,
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: <Tag className='h-5 w-5' />,
  },
  {
    title: 'Discounts',
    href: '/admin/discounts',
    icon: <Percent className='h-5 w-5' />,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: <BarChart3 className='h-5 w-5' />,
  },
  {
    title: 'Messages',
    href: '/admin/messages',
    icon: <MessageSquare className='h-5 w-5' />,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings className='h-5 w-5' />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='flex min-h-screen bg-muted/20'>
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-20 hidden flex-col border-r bg-background md:flex ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300`}
      >
        <div className='flex h-16 items-center border-b px-4'>
          <Link href='/admin' className='flex items-center gap-2'>
            {isSidebarOpen ? (
              <span className='text-xl font-bold'>NextS Admin</span>
            ) : (
              <span className='text-xl font-bold'>SN</span>
            )}
          </Link>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle sidebar</span>
          </Button>
        </div>
        <nav className='flex-1 overflow-auto p-4'>
          <ul className='space-y-2'>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted ${
                    pathname === item.href ? 'bg-muted font-medium' : ''
                  }`}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='border-t p-4'>
          <div
            className={`flex ${
              isSidebarOpen ? 'items-center gap-3' : 'justify-center'
            }`}
          >
            <Avatar>
              <AvatarImage
                src='/placeholder.svg?height=40&width=40'
                alt='Admin'
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div>
                <p className='text-sm font-medium'>Admin User</p>
                <p className='text-xs text-muted-foreground'>admin@NextS.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden fixed top-4 left-4 z-40'
          >
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 p-0'>
          <div className='flex h-16 items-center border-b px-4'>
            <Link href='/admin' className='flex items-center gap-2'>
              <span className='text-xl font-bold'>NextS Admin</span>
            </Link>
          </div>
          <nav className='flex-1 overflow-auto p-4'>
            <ul className='space-y-2'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted ${
                      pathname === item.href ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='border-t p-4'>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage
                  src='/placeholder.svg?height=40&width=40'
                  alt='Admin'
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>Admin User</p>
                <p className='text-xs text-muted-foreground'>admin@NextS.com</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main
        className={`flex-1 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        } transition-all duration-300`}
      >
        <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
          <div className='w-full flex items-center gap-4 md:gap-8'>
            <form className='flex-1 md:max-w-sm'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='w-full rounded-lg bg-background pl-8 md:w-[300px]'
                />
              </div>
            </form>
            <div className='ml-auto flex items-center gap-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='icon' className='relative'>
                    <Bell className='h-5 w-5' />
                    <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                      3
                    </span>
                    <span className='sr-only'>Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>New order received</DropdownMenuItem>
                  <DropdownMenuItem>
                    Low stock alert: Product #1234
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Customer message: Order #5678
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='rounded-full'>
                    <Avatar>
                      <AvatarImage
                        src='/placeholder.svg?height=40&width=40'
                        alt='Admin'
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className='sr-only'>User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className='p-4 md:p-6'>{children}</div>
      </main>
    </div>
  );
}
