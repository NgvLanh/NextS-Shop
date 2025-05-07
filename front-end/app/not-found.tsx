import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4'>
      <h1 className='text-6xl font-extrabold mb-4'>404</h1>
      <h2 className='text-3xl font-semibold mb-2'>Không tìm thấy</h2>
      <p className='text-lg mb-4'>Không tìm thấy tài nguyên được yêu cầu</p>
      <Link href='/' className='px-4 py-2'>
        <Button>Về trang chủ</Button>
      </Link>
    </div>
  );
}
