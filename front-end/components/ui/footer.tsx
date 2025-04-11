import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t'>
      <div className='container mx-auto flex flex-col gap-8 py-8 md:py-12'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Shop</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/products' className='hover:underline'>
                  All Products
                </Link>
              </li>
              <li>
                <Link href='/categories' className='hover:underline'>
                  Categories
                </Link>
              </li>
              <li>
                <Link href='/new-arrivals' className='hover:underline'>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href='/best-sellers' className='hover:underline'>
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Account</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/login' className='hover:underline'>
                  Login
                </Link>
              </li>
              <li>
                <Link href='/register' className='hover:underline'>
                  Register
                </Link>
              </li>
              <li>
                <Link href='/account' className='hover:underline'>
                  My Account
                </Link>
              </li>
              <li>
                <Link href='/orders' className='hover:underline'>
                  Order History
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Information</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/about' className='hover:underline'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:underline'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='/faq' className='hover:underline'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/shipping' className='hover:underline'>
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Contact</h3>
            <ul className='space-y-2 text-sm'>
              <li>123 Shopping St, City</li>
              <li>contact@NextS.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} NextS. All rights reserved.
          </p>
          <div className='flex gap-4'>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Terms
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Privacy
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
