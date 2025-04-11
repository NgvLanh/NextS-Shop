'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Bell,
  DollarSign,
  Globe,
  Lock,
  Store,
  Truck,
  Upload,
  User,
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
        <p className='text-muted-foreground'>
          Manage your store settings and preferences.
        </p>
      </div>

      <Tabs defaultValue='general' className='space-y-4'>
        <TabsList className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='store'>Store</TabsTrigger>
          <TabsTrigger value='payments'>Payments</TabsTrigger>
          <TabsTrigger value='shipping'>Shipping</TabsTrigger>
          <TabsTrigger value='taxes'>Taxes</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='users'>Users</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='integrations'>Integrations</TabsTrigger>
          <TabsTrigger value='advanced'>Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value='general' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='store-name'>Store Name</Label>
                <Input id='store-name' defaultValue='NextS' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='store-description'>Store Description</Label>
                <Textarea
                  id='store-description'
                  defaultValue='Your favorite online shopping destination for quality products at affordable prices.'
                  rows={3}
                />
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='store-email'>Store Email</Label>
                  <Input
                    id='store-email'
                    type='email'
                    defaultValue='contact@NextS.com'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='store-phone'>Store Phone</Label>
                  <Input
                    id='store-phone'
                    type='tel'
                    defaultValue='+1 (555) 123-4567'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='store-address'>Store Address</Label>
                <Textarea
                  id='store-address'
                  defaultValue='123 Shopping Street, New York, NY 10001, United States'
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Store Logo & Branding</CardTitle>
              <CardDescription>
                Customize your store's visual identity
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Store Logo</Label>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-20 w-20'>
                    <AvatarImage
                      src='/placeholder.svg?height=80&width=80&text=Logo'
                      alt='Store Logo'
                    />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <Button variant='outline'>
                    <Upload className='mr-2 h-4 w-4' />
                    Upload Logo
                  </Button>
                </div>
              </div>
              <div className='space-y-2'>
                <Label>Favicon</Label>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage
                      src='/placeholder.svg?height=40&width=40&text=Fav'
                      alt='Favicon'
                    />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <Button variant='outline'>
                    <Upload className='mr-2 h-4 w-4' />
                    Upload Favicon
                  </Button>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='primary-color'>Primary Color</Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='primary-color'
                    defaultValue='#000000'
                    className='w-32'
                  />
                  <div className='h-10 w-10 rounded-md bg-black'></div>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='secondary-color'>Secondary Color</Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='secondary-color'
                    defaultValue='#ffffff'
                    className='w-32'
                  />
                  <div className='h-10 w-10 rounded-md border bg-white'></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>
                Configure your store's regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='timezone'>Timezone</Label>
                  <Select defaultValue='america-new_york'>
                    <SelectTrigger id='timezone'>
                      <SelectValue placeholder='Select timezone' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='america-new_york'>
                        America/New York (UTC-05:00)
                      </SelectItem>
                      <SelectItem value='america-los_angeles'>
                        America/Los Angeles (UTC-08:00)
                      </SelectItem>
                      <SelectItem value='europe-london'>
                        Europe/London (UTC+00:00)
                      </SelectItem>
                      <SelectItem value='asia-tokyo'>
                        Asia/Tokyo (UTC+09:00)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='date-format'>Date Format</Label>
                  <Select defaultValue='mm-dd-yyyy'>
                    <SelectTrigger id='date-format'>
                      <SelectValue placeholder='Select date format' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='mm-dd-yyyy'>MM/DD/YYYY</SelectItem>
                      <SelectItem value='dd-mm-yyyy'>DD/MM/YYYY</SelectItem>
                      <SelectItem value='yyyy-mm-dd'>YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='currency'>Currency</Label>
                  <Select defaultValue='usd'>
                    <SelectTrigger id='currency'>
                      <SelectValue placeholder='Select currency' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='usd'>USD ($)</SelectItem>
                      <SelectItem value='eur'>EUR (€)</SelectItem>
                      <SelectItem value='gbp'>GBP (£)</SelectItem>
                      <SelectItem value='jpy'>JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='language'>Language</Label>
                  <Select defaultValue='en'>
                    <SelectTrigger id='language'>
                      <SelectValue placeholder='Select language' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='es'>Spanish</SelectItem>
                      <SelectItem value='fr'>French</SelectItem>
                      <SelectItem value='de'>German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-multilingual'>
                    Enable Multilingual Support
                  </Label>
                  <Switch id='enable-multilingual' />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Allow customers to view your store in multiple languages
                </p>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value='store' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Store Configuration</CardTitle>
              <CardDescription>
                Configure how your store operates
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='store-status'>Store Status</Label>
                  <Switch id='store-status' defaultChecked />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Enable or disable your store for customers
                </p>
              </div>
              <Separator />
              <div className='space-y-2'>
                <Label>Maintenance Mode</Label>
                <div className='flex items-center justify-between'>
                  <div>
                    <p>Put your store in maintenance mode</p>
                    <p className='text-sm text-muted-foreground'>
                      Only administrators will be able to access the store
                    </p>
                  </div>
                  <Switch id='maintenance-mode' />
                </div>
              </div>
              <Separator />
              <div className='space-y-2'>
                <Label>Inventory Management</Label>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <p>Track inventory</p>
                    <Switch id='track-inventory' defaultChecked />
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>Allow backorders</p>
                    <Switch id='allow-backorders' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>Hide out of stock products</p>
                    <Switch id='hide-out-of-stock' />
                  </div>
                </div>
              </div>
              <Separator />
              <div className='space-y-2'>
                <Label>Customer Accounts</Label>
                <RadioGroup defaultValue='optional'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='required' id='required' />
                    <Label htmlFor='required'>Required for checkout</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='optional' id='optional' />
                    <Label htmlFor='optional'>
                      Optional (guest checkout allowed)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your store for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='meta-title'>Meta Title</Label>
                <Input
                  id='meta-title'
                  defaultValue='NextS - Your Online Shopping Destination'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='meta-description'>Meta Description</Label>
                <Textarea
                  id='meta-description'
                  defaultValue='Shop the latest trends and discover premium quality products at affordable prices. Free shipping on orders over $50.'
                  rows={3}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='meta-keywords'>Meta Keywords</Label>
                <Input
                  id='meta-keywords'
                  defaultValue='online shopping, ecommerce, fashion, electronics, home goods'
                />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-sitemap'>Generate Sitemap</Label>
                  <Switch id='enable-sitemap' defaultChecked />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Automatically generate and update your store's sitemap
                </p>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-robots'>Enable robots.txt</Label>
                  <Switch id='enable-robots' defaultChecked />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Allow search engines to crawl your store
                </p>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs would follow the same pattern */}
        <TabsContent value='payments' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure the payment options available to your customers
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='payment-credit-card' defaultChecked />
                  <Label htmlFor='payment-credit-card'>Credit Card</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='payment-paypal' defaultChecked />
                  <Label htmlFor='payment-paypal'>PayPal</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='payment-apple-pay' />
                  <Label htmlFor='payment-apple-pay'>Apple Pay</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='payment-google-pay' />
                  <Label htmlFor='payment-google-pay'>Google Pay</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='payment-bank-transfer' />
                  <Label htmlFor='payment-bank-transfer'>Bank Transfer</Label>
                </div>
              </div>
              <Separator />
              <div className='space-y-2'>
                <Label>Payment Gateway</Label>
                <Select defaultValue='stripe'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select payment gateway' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='stripe'>Stripe</SelectItem>
                    <SelectItem value='paypal'>PayPal</SelectItem>
                    <SelectItem value='square'>Square</SelectItem>
                    <SelectItem value='authorize'>Authorize.net</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='api-key'>API Key</Label>
                <Input id='api-key' type='password' value='••••••••••••••••' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='secret-key'>Secret Key</Label>
                <Input
                  id='secret-key'
                  type='password'
                  value='••••••••••••••••'
                />
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        {[
          'shipping',
          'taxes',
          'notifications',
          'users',
          'security',
          'integrations',
          'advanced',
        ].map((tab) => (
          <TabsContent key={tab} value={tab} className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
                </CardTitle>
                <CardDescription>Configure your {tab} settings</CardDescription>
              </CardHeader>
              <CardContent className='h-[300px] flex items-center justify-center'>
                <div className='text-center'>
                  {tab === 'shipping' && (
                    <Truck className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  {tab === 'taxes' && (
                    <DollarSign className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  {tab === 'notifications' && (
                    <Bell className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  {tab === 'users' && (
                    <User className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  {tab === 'security' && (
                    <Lock className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  {tab === 'integrations' && (
                    <Globe className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  {tab === 'advanced' && (
                    <Store className='mx-auto h-16 w-16 text-muted-foreground/50' />
                  )}
                  <p className='mt-2 text-muted-foreground'>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} settings will
                    be displayed here
                  </p>
                </div>
              </CardContent>
              <CardFooter className='flex justify-end'>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
