import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/ui/footer';
import Header from '../../components/ui/header';

export default function AboutPage() {
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
                  About NextS
                </h1>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Discover our story, mission, and the team behind your favorite
                  online shopping destination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
              <div className='space-y-4'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
                  Our Story
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  From a Small Idea to Your Favorite Shop
                </h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Founded in 2015, NextS began as a small passion project with a
                  simple mission: to provide high-quality products at affordable
                  prices with exceptional customer service.
                </p>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  What started as a tiny online store run from a garage has
                  grown into a beloved shopping destination serving thousands of
                  customers worldwide. Our journey has been defined by our
                  commitment to quality, sustainability, and putting our
                  customers first.
                </p>
              </div>
              <div className='mx-auto w-full max-w-[500px] overflow-hidden rounded-xl'>
                <Image
                  src='/placeholder.svg?height=600&width=800'
                  alt='Our story'
                  width={800}
                  height={600}
                  className='object-cover w-full h-full'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-background px-3 py-1 text-sm'>
                  Our Mission
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Creating a Better Shopping Experience
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  At NextS, we're committed to redefining online shopping
                  through quality, sustainability, and exceptional service.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Star className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Quality First</h3>
                <p className='text-muted-foreground'>
                  We carefully select every product in our catalog to ensure it
                  meets our high standards for quality and durability.
                </p>
              </div>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Star className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Sustainability</h3>
                <p className='text-muted-foreground'>
                  We're committed to reducing our environmental impact through
                  eco-friendly packaging and sustainable sourcing practices.
                </p>
              </div>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Star className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Customer Happiness</h3>
                <p className='text-muted-foreground'>
                  Our dedicated support team works tirelessly to ensure every
                  customer has a positive and memorable shopping experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
                  Our Team
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Meet the People Behind NextS
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our diverse team of passionate individuals works together to
                  bring you the best shopping experience.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Founder & CEO',
                  image: '/placeholder.svg?height=400&width=400&text=Sarah',
                },
                {
                  name: 'Michael Chen',
                  role: 'Head of Product',
                  image: '/placeholder.svg?height=400&width=400&text=Michael',
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Customer Experience',
                  image: '/placeholder.svg?height=400&width=400&text=Emily',
                },
                {
                  name: 'David Kim',
                  role: 'Lead Designer',
                  image: '/placeholder.svg?height=400&width=400&text=David',
                },
                {
                  name: 'Jessica Patel',
                  role: 'Marketing Director',
                  image: '/placeholder.svg?height=400&width=400&text=Jessica',
                },
                {
                  name: 'Robert Wilson',
                  role: 'Operations Manager',
                  image: '/placeholder.svg?height=400&width=400&text=Robert',
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center space-y-4'
                >
                  <div className='overflow-hidden rounded-full'>
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      width={150}
                      height={150}
                      className='aspect-square object-cover'
                    />
                  </div>
                  <div className='space-y-1 text-center'>
                    <h3 className='font-bold'>{member.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-background px-3 py-1 text-sm'>
                  Testimonials
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  What Our Customers Say
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Don't just take our word for it. Here's what our customers
                  have to say about their NextS experience.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  name: 'Alex T.',
                  location: 'New York, NY',
                  quote:
                    'NextS has been my go-to for quality products. Their customer service is unmatched!',
                  rating: 5,
                },
                {
                  name: 'Maria S.',
                  location: 'Los Angeles, CA',
                  quote:
                    'I love how easy it is to find exactly what I need. The website is intuitive and shipping is always fast.',
                  rating: 5,
                },
                {
                  name: 'James L.',
                  location: 'Chicago, IL',
                  quote:
                    "The quality of products I've received has always exceeded my expectations. Highly recommend!",
                  rating: 4,
                },
                {
                  name: 'Sophia R.',
                  location: 'Miami, FL',
                  quote:
                    "NextS offers the perfect balance of quality and affordability. I'm a customer for life!",
                  rating: 5,
                },
                {
                  name: 'Daniel K.',
                  location: 'Seattle, WA',
                  quote:
                    'Their commitment to sustainability is what keeps me coming back. Great products with a conscience.',
                  rating: 5,
                },
                {
                  name: 'Olivia P.',
                  location: 'Austin, TX',
                  quote:
                    'The attention to detail in packaging and product quality is impressive. Never disappointed!',
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className='flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6'
                >
                  <div className='space-y-2'>
                    <div className='flex items-center'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-muted-foreground'>
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <p className='font-medium'>{testimonial.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  NextS by the Numbers
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our growth and impact over the years.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4'>
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '100+', label: 'Countries Served' },
                { number: '5K+', label: 'Products' },
                { number: '99%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-6'
                >
                  <div className='text-3xl font-bold'>{stat.number}</div>
                  <div className='text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Ready to Experience NextS?
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Join thousands of satisfied customers and discover why NextS
                  is the preferred online shopping destination.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/products'>
                  <Button size='lg'>Shop Now</Button>
                </Link>
                <Link href='/contact'>
                  <Button size='lg' variant='outline'>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
