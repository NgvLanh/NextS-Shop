'use client';

import type React from 'react';
import { z } from 'zod';

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
import Footer from '../../components/footer';
import Header from '../../components/header';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'Vui lòng nhập tên của bạn'),
  lastName: z.string().min(1, 'Vui lòng nhập họ của bạn'),
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Vui lòng nhập chủ đề'),
  message: z.string().min(1, 'Vui lòng nhập tin nhắn của bạn'),
});

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get('first-name') as string,
      lastName: formData.get('last-name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0]] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
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
                  Liên hệ với chúng tôi
                </h1>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Chúng tôi rất mong nhận được phản hồi từ bạn. Hãy liên hệ với
                  đội ngũ của chúng tôi nếu bạn có bất kỳ câu hỏi, ý kiến hoặc
                  cần hỗ trợ.
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
                    Liên hệ
                  </h2>
                  <p className='mt-4 text-muted-foreground'>
                    Bạn có câu hỏi, ý kiến hoặc cần hỗ trợ với đơn hàng? Chúng
                    tôi luôn sẵn sàng giúp đỡ. Điền vào biểu mẫu hoặc sử dụng
                    một trong các phương thức liên hệ dưới đây.
                  </p>
                </div>

                <div className='grid gap-4'>
                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <MapPin className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Đến thăm chúng tôi</h3>
                      <p className='text-sm text-muted-foreground'>
                        123 Shopping Street
                        <br />
                        New York, NY 10001
                        <br />
                        Hoa Kỳ
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <Phone className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Gọi cho chúng tôi</h3>
                      <p className='text-sm text-muted-foreground'>
                        Dịch vụ khách hàng: +1 (555) 123-4567
                        <br />
                        Yêu cầu bán hàng: +1 (555) 987-6543
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <Mail className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Email cho chúng tôi</h3>
                      <p className='text-sm text-muted-foreground'>
                        Hỗ trợ khách hàng: support@NextS.com
                        <br />
                        Yêu cầu chung: info@NextS.com
                        <br />
                        Cơ hội kinh doanh: partners@NextS.com
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <Clock className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium'>Giờ làm việc</h3>
                      <p className='text-sm text-muted-foreground'>
                        Thứ Hai - Thứ Sáu: 9:00 AM - 6:00 PM EST
                        <br />
                        Thứ Bảy: 10:00 AM - 4:00 PM EST
                        <br />
                        Chủ Nhật: Đóng cửa
                      </p>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border overflow-hidden'>
                  <Image
                    src='/placeholder.svg?height=400&width=600&text=Map'
                    alt='Bản đồ vị trí văn phòng'
                    width={600}
                    height={400}
                    className='w-full h-[300px] object-cover'
                  />
                </div>
              </div>

              <div className='space-y-8'>
                <div className='rounded-lg border p-6'>
                  <h3 className='text-xl font-bold mb-4'>
                    Gửi tin nhắn cho chúng tôi
                  </h3>

                  {formSubmitted ? (
                    <div className='flex flex-col items-center justify-center py-12 text-center'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4'>
                        <CheckCircle className='h-6 w-6 text-primary' />
                      </div>
                      <h4 className='text-lg font-medium mb-2'>
                        Tin nhắn đã được gửi!
                      </h4>
                      <p className='text-muted-foreground'>
                        Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có
                        thể.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <Label htmlFor='first-name'>Tên</Label>
                          <Input id='first-name' name='first-name' required />
                          {formErrors['firstName'] && (
                            <p className='text-red-500 text-sm'>
                              {formErrors['firstName']}
                            </p>
                          )}
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='last-name'>Họ</Label>
                          <Input id='last-name' name='last-name' required />
                          {formErrors['lastName'] && (
                            <p className='text-red-500 text-sm'>
                              {formErrors['lastName']}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' name='email' type='email' required />
                        {formErrors['email'] && (
                          <p className='text-red-500 text-sm'>
                            {formErrors['email']}
                          </p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='phone'>Số điện thoại (Tùy chọn)</Label>
                        <Input id='phone' name='phone' type='tel' />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='subject'>Chủ đề</Label>
                        <Input id='subject' name='subject' required />
                        {formErrors['subject'] && (
                          <p className='text-red-500 text-sm'>
                            {formErrors['subject']}
                          </p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <Label>Loại yêu cầu</Label>
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
                              Dịch vụ khách hàng
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
                              Trạng thái đơn hàng
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
                              Yêu cầu sản phẩm
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='feedback' id='feedback' />
                            <Label htmlFor='feedback' className='font-normal'>
                              Phản hồi
                            </Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='other' id='other' />
                            <Label htmlFor='other' className='font-normal'>
                              Khác
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message'>Tin nhắn</Label>
                        <Textarea
                          id='message'
                          name='message'
                          rows={5}
                          required
                        />
                        {formErrors['message'] && (
                          <p className='text-red-500 text-sm'>
                            {formErrors['message']}
                          </p>
                        )}
                      </div>

                      <Button type='submit' className='w-full'>
                        <Send className='mr-2 h-4 w-4' />
                        Gửi tin nhắn
                      </Button>
                    </form>
                  )}
                </div>

                <div className='rounded-lg border p-6'>
                  <h3 className='text-xl font-bold mb-4'>Câu hỏi thường gặp</h3>
                  <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>
                        Làm thế nào để tôi theo dõi đơn hàng của mình?
                      </AccordionTrigger>
                      <AccordionContent>
                        Bạn có thể theo dõi đơn hàng của mình bằng cách đăng
                        nhập vào tài khoản và truy cập phần "Lịch sử đơn hàng".
                        Ngoài ra, bạn có thể sử dụng số theo dõi được cung cấp
                        trong email xác nhận giao hàng.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>
                        Chính sách đổi trả của bạn là gì?
                      </AccordionTrigger>
                      <AccordionContent>
                        Chúng tôi cung cấp chính sách đổi trả trong vòng 30 ngày
                        cho hầu hết các sản phẩm. Sản phẩm phải ở tình trạng ban
                        đầu với tất cả các thẻ và bao bì. Một số ngoại lệ áp
                        dụng cho các danh mục sản phẩm nhất định.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                      <AccordionTrigger>
                        Thời gian giao hàng là bao lâu?
                      </AccordionTrigger>
                      <AccordionContent>
                        Giao hàng tiêu chuẩn thường mất từ 3-5 ngày làm việc
                        trong nội địa Hoa Kỳ. Các tùy chọn giao hàng nhanh có
                        sẵn tại trang thanh toán để giao hàng nhanh hơn.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                      <AccordionTrigger>
                        Bạn có giao hàng quốc tế không?
                      </AccordionTrigger>
                      <AccordionContent>
                        Có, chúng tôi giao hàng đến hơn 100 quốc gia trên toàn
                        thế giới. Thời gian giao hàng quốc tế thay đổi tùy theo
                        địa điểm, thường từ 7-21 ngày làm việc.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-5'>
                      <AccordionTrigger>
                        Làm thế nào để tôi hủy hoặc sửa đổi đơn hàng của mình?
                      </AccordionTrigger>
                      <AccordionContent>
                        Bạn có thể yêu cầu hủy hoặc sửa đổi đơn hàng bằng cách
                        liên hệ với đội ngũ dịch vụ khách hàng của chúng tôi
                        trong vòng 1 giờ sau khi đặt hàng. Sau thời gian này,
                        chúng tôi có thể không thể thực hiện thay đổi vì đơn
                        hàng được xử lý nhanh chóng.
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
                  Kết nối với chúng tôi
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Theo dõi chúng tôi trên mạng xã hội để cập nhật những thông
                  tin mới nhất, khuyến mãi và nhiều hơn nữa.
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
                  Cập nhật thông tin
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Đăng ký nhận bản tin của chúng tôi để cập nhật sản phẩm mới
                  nhất, ưu đãi độc quyền và nhiều hơn nữa.
                </p>
              </div>
              <div className='mx-auto w-full max-w-sm space-y-2'>
                <form className='flex gap-2'>
                  <Input
                    type='email'
                    placeholder='Nhập email của bạn'
                    className='max-w-lg flex-1'
                  />
                  <Button type='submit'>Đăng ký</Button>
                </form>
                <p className='text-xs text-muted-foreground'>
                  Bằng cách đăng ký, bạn đồng ý với{' '}
                  <Link href='/terms' className='underline underline-offset-2'>
                    Điều khoản & Điều kiện
                  </Link>{' '}
                  và{' '}
                  <Link
                    href='/privacy'
                    className='underline underline-offset-2'
                  >
                    Chính sách bảo mật
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
