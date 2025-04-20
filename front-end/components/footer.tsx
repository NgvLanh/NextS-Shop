import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t'>
      <div className='container mx-auto flex flex-col gap-8 py-8 md:py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='hidden md:block space-y-4'>
            <h3 className='text-lg font-medium'>Cửa hàng</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/products' className='hover:underline'>
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href='/categories' className='hover:underline'>
                  Danh mục
                </Link>
              </li>
              <li>
                <Link href='/new-arrivals' className='hover:underline'>
                  Hàng mới về
                </Link>
              </li>
              <li>
                <Link href='/best-sellers' className='hover:underline'>
                  Bán chạy nhất
                </Link>
              </li>
            </ul>
          </div>
          <div className='hidden md:block space-y-4'>
            <h3 className='text-lg font-medium'>Tài khoản</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/login' className='hover:underline'>
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href='/register' className='hover:underline'>
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link href='/account' className='hover:underline'>
                  Tài khoản của tôi
                </Link>
              </li>
              <li>
                <Link href='/orders' className='hover:underline'>
                  Lịch sử đơn hàng
                </Link>
              </li>
            </ul>
          </div>
          <div className='hidden md:block space-y-4'>
            <h3 className='text-lg font-medium'>Thông tin</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/about' className='hover:underline'>
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:underline'>
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href='/faq' className='hover:underline'>
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href='/shipping' className='hover:underline'>
                  Vận chuyển & Đổi trả
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4 md:text-left text-center'>
            <h3 className='text-lg font-medium'>Liên hệ</h3>
            <ul className='space-y-2 text-sm'>
              <li>123 Phố Mua Sắm, Thành phố</li>
              <li>contact@NextS.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row items-center justify-between'>
          <p className='text-sm text-muted-foreground text-center'>
            © {new Date().getFullYear()} NextS. Mọi quyền được bảo lưu.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Điều khoản
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-foreground'
            >
              Bảo mật
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
