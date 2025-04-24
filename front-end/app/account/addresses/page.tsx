'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AddressType } from '../../../lib/types';
import { ApiRequest, ApiResponse } from '../../../services/apiRequest';

export default function AddressesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<number | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  // Mock addresses data
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('addresses', 'GET');
      setAddresses(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditAddress = (id: number) => {
    setAddressToEdit(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteAddress = (id: number) => {
    setAddressToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete !== null) {
      setAddresses(
        addresses.filter((address) => address.id !== addressToDelete)
      );
      setAddressToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const setAsDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <div className='container mx-auto py-8'>
      <div className='flex items-center gap-4 mb-8'>
        <Link href='/account'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>My Addresses</h1>
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <div className='flex justify-between items-center p-6 border-b'>
          <h2 className='text-xl font-bold'>Shipping & Billing Addresses</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New Address
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
          {addresses.map((address) => (
            <div key={address.id} className='border rounded-lg p-4 relative'>
              {address.isDefault && (
                <div className='absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>
                  Default
                </div>
              )}
              <h3 className='font-medium mb-2'>
                {address.fullName || address.fullName}
              </h3>
              <p className='text-sm text-muted-foreground'>
                {/* {address.fullName}
                <br />
                {address.street || address.address}
                <br />
                {address.city}, {address.state} {address.zip}
                <br />
                {address.country}
                <br /> */}
                {address.phone}
              </p>
              <div className='flex gap-2 mt-4'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handleEditAddress(address.id)}
                >
                  Edit
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  className='text-red-500 hover:text-red-600 hover:bg-red-50'
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Delete
                </Button>
                {!address.isDefault && (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setAsDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>
              Enter the details for your new address.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='address-type'>Address Type</Label>
                <Select defaultValue='home'>
                  <SelectTrigger id='address-type'>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='home'>Home</SelectItem>
                    <SelectItem value='work'>Work</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='full-name'>Full Name</Label>
                <Input id='full-name' placeholder='John Doe' />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='street-address'>Street Address</Label>
              <Input id='street-address' placeholder='123 Main St' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='apt'>Apartment, Suite, etc. (optional)</Label>
              <Input id='apt' placeholder='Apt 4B' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='city'>City</Label>
                <Input id='city' placeholder='New York' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='state'>State/Province</Label>
                <Input id='state' placeholder='NY' />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='zip'>ZIP/Postal Code</Label>
                <Input id='zip' placeholder='10001' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='country'>Country</Label>
                <Select defaultValue='us'>
                  <SelectTrigger id='country'>
                    <SelectValue placeholder='Select country' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='us'>United States</SelectItem>
                    <SelectItem value='ca'>Canada</SelectItem>
                    <SelectItem value='uk'>United Kingdom</SelectItem>
                    <SelectItem value='au'>Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input id='phone' placeholder='+1 (555) 123-4567' />
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='default-address'
                className='h-4 w-4 rounded border-gray-300'
              />
              <Label htmlFor='default-address'>Set as default address</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Update your address information.
            </DialogDescription>
          </DialogHeader>
          {addressToEdit && (
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-address-type'>Address Type</Label>
                  <Select
                    defaultValue={addresses
                      .find((a) => a.id === addressToEdit)
                      ?.type.toLowerCase()}
                  >
                    <SelectTrigger id='edit-address-type'>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='home'>Home</SelectItem>
                      <SelectItem value='work'>Work</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-full-name'>Full Name</Label>
                  <Input
                    id='edit-full-name'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.name
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-street-address'>Street Address</Label>
                <Input
                  id='edit-street-address'
                  defaultValue={
                    addresses.find((a) => a.id === addressToEdit)?.street
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-apt'>
                  Apartment, Suite, etc. (optional)
                </Label>
                <Input
                  id='edit-apt'
                  defaultValue={
                    addresses.find((a) => a.id === addressToEdit)?.apt
                  }
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-city'>City</Label>
                  <Input
                    id='edit-city'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.city
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-state'>State/Province</Label>
                  <Input
                    id='edit-state'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.state
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-zip'>ZIP/Postal Code</Label>
                  <Input
                    id='edit-zip'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.zip
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-country'>Country</Label>
                  <Select defaultValue='us'>
                    <SelectTrigger id='edit-country'>
                      <SelectValue placeholder='Select country' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='us'>United States</SelectItem>
                      <SelectItem value='ca'>Canada</SelectItem>
                      <SelectItem value='uk'>United Kingdom</SelectItem>
                      <SelectItem value='au'>Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-phone'>Phone Number</Label>
                <Input
                  id='edit-phone'
                  defaultValue={
                    addresses.find((a) => a.id === addressToEdit)?.phone
                  }
                />
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='edit-default-address'
                  className='h-4 w-4 rounded border-gray-300'
                  defaultChecked={
                    addresses.find((a) => a.id === addressToEdit)?.isDefault
                  }
                />
                <Label htmlFor='edit-default-address'>
                  Set as default address
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Address Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='bg-red-500 hover:bg-red-600'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
