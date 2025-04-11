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
import { ArrowLeft, CreditCard, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PaymentMethodsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<number | null>(null);
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);

  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '1234',
      expMonth: '12',
      expYear: '25',
      name: 'John Doe',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5678',
      expMonth: '06',
      expYear: '24',
      name: 'John Doe',
      isDefault: false,
    },
  ]);

  const handleEditCard = (id: number) => {
    setCardToEdit(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCard = (id: number) => {
    setCardToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (cardToDelete !== null) {
      setPaymentMethods(
        paymentMethods.filter((card) => card.id !== cardToDelete)
      );
      setCardToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const setAsDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  const getCardIcon = (type: string) => {
    return (
      <div className='w-10 h-6 bg-muted rounded flex items-center justify-center text-xs font-medium'>
        {type.substring(0, 4)}
      </div>
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
        <h1 className='text-3xl font-bold'>Payment Methods</h1>
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <div className='flex justify-between items-center p-6 border-b'>
          <h2 className='text-xl font-bold'>Saved Payment Methods</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New Card
          </Button>
        </div>

        {paymentMethods.length === 0 ? (
          <div className='text-center py-12'>
            <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
              <CreditCard className='h-12 w-12 text-muted-foreground' />
            </div>
            <h3 className='text-lg font-medium mb-2'>No payment methods</h3>
            <p className='text-muted-foreground mb-6'>
              You haven't added any payment methods yet.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Add Payment Method
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
            {paymentMethods.map((method) => (
              <div key={method.id} className='border rounded-lg p-4 relative'>
                {method.isDefault && (
                  <div className='absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>
                    Default
                  </div>
                )}
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-8 bg-muted rounded flex items-center justify-center'>
                    <span className='text-xs font-medium'>{method.type}</span>
                  </div>
                  <div>
                    <h3 className='font-medium'>
                      {method.type} ending in {method.last4}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <div className='flex gap-2 mt-4'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleEditCard(method.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='text-red-500 hover:text-red-600 hover:bg-red-50'
                    onClick={() => handleDeleteCard(method.id)}
                  >
                    Delete
                  </Button>
                  {!method.isDefault && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => setAsDefault(method.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Payment Method Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Enter your card details to add a new payment method.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='card-name'>Name on Card</Label>
              <Input id='card-name' placeholder='John Doe' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='card-number'>Card Number</Label>
              <Input id='card-number' placeholder='1234 5678 9012 3456' />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='exp-month'>Expiry Month</Label>
                <Select>
                  <SelectTrigger id='exp-month'>
                    <SelectValue placeholder='MM' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='exp-year'>Expiry Year</Label>
                <Select>
                  <SelectTrigger id='exp-year'>
                    <SelectValue placeholder='YY' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i)
                        .toString()
                        .slice(-2);
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cvc'>CVC</Label>
                <Input id='cvc' placeholder='123' />
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='default-payment'
                className='h-4 w-4 rounded border-gray-300'
              />
              <Label htmlFor='default-payment'>
                Set as default payment method
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Save Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Method Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>Update your card information.</DialogDescription>
          </DialogHeader>
          {cardToEdit && (
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='edit-card-name'>Name on Card</Label>
                <Input
                  id='edit-card-name'
                  defaultValue={
                    paymentMethods.find((c) => c.id === cardToEdit)?.name
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-card-number'>Card Number</Label>
                <Input
                  id='edit-card-number'
                  value={`•••• •••• •••• ${
                    paymentMethods.find((c) => c.id === cardToEdit)?.last4
                  }`}
                  disabled
                />
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-exp-month'>Expiry Month</Label>
                  <Select
                    defaultValue={
                      paymentMethods.find((c) => c.id === cardToEdit)?.expMonth
                    }
                  >
                    <SelectTrigger id='edit-exp-month'>
                      <SelectValue placeholder='MM' />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, '0');
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-exp-year'>Expiry Year</Label>
                  <Select
                    defaultValue={
                      paymentMethods.find((c) => c.id === cardToEdit)?.expYear
                    }
                  >
                    <SelectTrigger id='edit-exp-year'>
                      <SelectValue placeholder='YY' />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i)
                          .toString()
                          .slice(-2);
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-cvc'>CVC</Label>
                  <Input id='edit-cvc' placeholder='123' />
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='edit-default-payment'
                  className='h-4 w-4 rounded border-gray-300'
                  defaultChecked={
                    paymentMethods.find((c) => c.id === cardToEdit)?.isDefault
                  }
                />
                <Label htmlFor='edit-default-payment'>
                  Set as default payment method
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

      {/* Delete Payment Method Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payment method? This action
              cannot be undone.
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
