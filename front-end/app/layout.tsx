import type { Metadata } from 'next';
import { ToastProvider } from '../components/ui/toast';
import { Toaster } from '../components/ui/toaster';
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
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
