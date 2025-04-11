'use client';

import type React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../../components/ui/footer';
import Header from '../../components/ui/header';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Contact Us
                </h1>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  We'd love to hear from you. Get in touch with our team for any
                  questions, feedback, or support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='space-y-8'>
                <div>
                  <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                    Get in Touch
                  </h2>
                  <p className='mt-4 text-muted-foreground'>
                    Have a question, feedback, or need assistance with an order?
                    We're here to help. Fill out the form or use one of our
                    contact methods below.
                  </p>
                </div>

                <div className='grid gap-4'>
                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <MapPin className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Visit Us</h3>
                      <p className='text-sm text-muted-foreground'>
                        123 Shopping Street
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <Phone className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Call Us</h3>
                      <p className='text-sm text-muted-foreground'>
                        Customer Service: +1 (555) 123-4567
                        <br />
                        Sales Inquiries: +1 (555) 987-6543
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <Mail className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Email Us</h3>
                      <p className='text-sm text-muted-foreground'>
                        Customer Support: support@NextS.com
                        <br />
                        General Inquiries: info@NextS.com
                        <br />
                        Business Opportunities: partners@NextS.com
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <Clock className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Business Hours</h3>
                      <p className='text-sm text-muted-foreground'>
                        Monday - Friday: 9:00 AM - 6:00 PM EST
                        <br />
                        Saturday: 10:00 AM - 4:00 PM EST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border overflow-hidden'>
                  <Image
                    src='/placeholder.svg?height=400&width=600&text=Map'
                    alt='Office location map'
                    width={600}
                    height={400}
                    className='w-full h-[300px] object-cover'
                  />
                </div>
              </div>

              <div className='space-y-8'>
                <div className='rounded-lg border p-6'>
                  <h3 className='text-xl font-bold mb-4'>Send Us a Message</h3>

                  {formSubmitted ? (
                    <div className='flex flex-col items-center justify-center py-12 text-center'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4'>
                        <CheckCircle className='h-6 w-6 text-primary' />
                      </div>
                      <h4 className='text-lg font-medium mb-2'>
                        Message Sent!
                      </h4>
                      <p className='text-muted-foreground'>
                        Thank you for reaching out. We'll get back to you as
                        soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <Label htmlFor='first-name'>First Name</Label>
                          <Input id='first-name' required />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='last-name'>Last Name</Label>
                          <Input id='last-name' required />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' required />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='phone'>Phone (Optional)</Label>
                        <Input id='phone' type='tel' />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='subject'>Subject</Label>
                        <Input id='subject' required />
                      </div>

                      <div className='space-y-2'>
                        <Label>Inquiry Type</Label>
                        <RadioGroup
                          defaultValue='customer-service'
                          className='flex flex-col space-y-1'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                              value='customer-service'
                              id='customer-service'
                            />
                            <Label
                              htmlFor='customer-service'
                              className='font-normal'
                            >
                              Customer Service
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                              value='order-status'
                              id='order-status'
                            />
                            <Label
                              htmlFor='order-status'
                              className='font-normal'
                            >
                              Order Status
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                              value='product-inquiry'
                              id='product-inquiry'
                            />
                            <Label
                              htmlFor='product-inquiry'
                              className='font-normal'
                            >
                              Product Inquiry
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='feedback' id='feedback' />
                            <Label htmlFor='feedback' className='font-normal'>
                              Feedback
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='other' id='other' />
                            <Label htmlFor='other' className='font-normal'>
                              Other
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea id='message' rows={5} required />
                      </div>

                      <Button type='submit' className='w-full'>
                        <Send className='mr-2 h-4 w-4' />
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>

                <div className='rounded-lg border p-6'>
                  <h3 className='text-xl font-bold mb-4'>
                    Frequently Asked Questions
                  </h3>
                  <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>
                        How can I track my order?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can track your order by logging into your account
                        and visiting the "Order History" section. Alternatively,
                        you can use the tracking number provided in your
                        shipping confirmation email.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>
                        What is your return policy?
                      </AccordionTrigger>
                      <AccordionContent>
                        We offer a 30-day return policy for most items. Products
                        must be in their original condition with all tags and
                        packaging. Some exceptions apply for certain product
                        categories.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                      <AccordionTrigger>
                        How long does shipping take?
                      </AccordionTrigger>
                      <AccordionContent>
                        Standard shipping typically takes 3-5 business days
                        within the continental US. Express shipping options are
                        available at checkout for faster delivery.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                      <AccordionTrigger>
                        Do you ship internationally?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes, we ship to over 100 countries worldwide.
                        International shipping times vary by location, typically
                        ranging from 7-21 business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-5'>
                      <AccordionTrigger>
                        How can I cancel or modify my order?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can request order cancellations or modifications by
                        contacting our customer service team within 1 hour of
                        placing your order. After this window, we may not be
                        able to make changes as orders are processed quickly.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connect with Us */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Connect With Us
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Follow us on social media for the latest updates, promotions,
                  and more.
                </p>
              </div>
              <div className='flex gap-4'>
                {[
                  'Facebook',
                  'Twitter',
                  'Instagram',
                  'Pinterest',
                  'YouTube',
                ].map((platform, index) => (
                  <Link
                    key={index}
                    href='#'
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors'
                  >
                    <span className='sr-only'>{platform}</span>
                    <div className='h-5 w-5 rounded-full bg-muted'></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Stay Updated
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Subscribe to our newsletter for the latest product updates,
                  exclusive offers, and more.
                </p>
              </div>
              <div className='mx-auto w-full max-w-sm space-y-2'>
                <form className='flex gap-2'>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    className='max-w-lg flex-1'
                  />
                  <Button type='submit'>Subscribe</Button>
                </form>
                <p className='text-xs text-muted-foreground'>
                  By subscribing, you agree to our{' '}
                  <Link href='/terms' className='underline underline-offset-2'>
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='underline underline-offset-2'
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
