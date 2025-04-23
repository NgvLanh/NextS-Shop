import type { Metadata } from 'next';
import { ToastProvider } from '../components/ui/toast';
import { Toaster } from '../components/ui/toaster';
import { CartProvider } from '../contexts/CartContext';
import { UserProvider } from '../contexts/UserContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextS',
  description: 'Created with Lanh and AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <UserProvider>
          <CartProvider>
            <ToastProvider>
              {children}
              <Toaster />
            </ToastProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
