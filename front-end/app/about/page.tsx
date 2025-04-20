import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/footer';
import Header from '../../components/header';

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
                  Giới thiệu về NextS
                </h1>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Khám phá câu chuyện, sứ mệnh và đội ngũ đứng sau điểm đến mua
                  sắm trực tuyến yêu thích của bạn.
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
                  Câu chuyện của chúng tôi
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Từ một ý tưởng nhỏ đến cửa hàng yêu thích của bạn
                </h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Được thành lập vào năm 2015, NextS bắt đầu như một dự án đam
                  mê nhỏ với sứ mệnh đơn giản: cung cấp các sản phẩm chất lượng
                  cao với giá cả phải chăng và dịch vụ khách hàng xuất sắc.
                </p>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Những gì bắt đầu như một cửa hàng trực tuyến nhỏ từ một nhà để
                  xe đã phát triển thành một điểm đến mua sắm được yêu thích
                  phục vụ hàng ngàn khách hàng trên toàn thế giới. Hành trình
                  của chúng tôi được định hình bởi cam kết về chất lượng, bền
                  vững và đặt khách hàng lên hàng đầu.
                </p>
              </div>
              <div className='mx-auto w-full max-w-[500px] overflow-hidden rounded-xl'>
                <Image
                  src='https://plus.unsplash.com/premium_photo-1726754536800-0acef93c5ad3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl0dGxlJTIwdGhpbmdzfGVufDB8fDB8fHww'
                  alt='Câu chuyện của chúng tôi'
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
                  Sứ mệnh của chúng tôi
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Tạo ra trải nghiệm mua sắm tốt hơn
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Tại NextS, chúng tôi cam kết định nghĩa lại mua sắm trực tuyến
                  thông qua chất lượng, bền vững và dịch vụ xuất sắc.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Star className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Chất lượng hàng đầu</h3>
                <p className='text-muted-foreground'>
                  Chúng tôi cẩn thận chọn từng sản phẩm trong danh mục của mình
                  để đảm bảo nó đáp ứng tiêu chuẩn cao về chất lượng và độ bền.
                </p>
              </div>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Star className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Bền vững</h3>
                <p className='text-muted-foreground'>
                  Chúng tôi cam kết giảm tác động môi trường thông qua bao bì
                  thân thiện với môi trường và các phương pháp nguồn cung bền
                  vững.
                </p>
              </div>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Star className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold'>Hạnh phúc của khách hàng</h3>
                <p className='text-muted-foreground'>
                  Đội ngũ hỗ trợ tận tâm của chúng tôi làm việc không mệt mỏi để
                  đảm bảo mỗi khách hàng có trải nghiệm mua sắm tích cực và đáng
                  nhớ.
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
                  Đội ngũ của chúng tôi
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Gặp gỡ những người đứng sau NextS
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Đội ngũ đa dạng của chúng tôi gồm những cá nhân đam mê làm
                  việc cùng nhau để mang đến cho bạn trải nghiệm mua sắm tốt
                  nhất.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  name: 'Nguyễn Văn Lành',
                  role: 'Người sáng lập & CEO',
                  image: '/placeholder.svg?height=400&width=400&text=Sarah',
                },
                {
                  name: 'Nguyễn Văn Lành',
                  role: 'Trưởng phòng sản phẩm',
                  image: '/placeholder.svg?height=400&width=400&text=Michael',
                },
                {
                  name: 'Nguyễn Văn Lành',
                  role: 'Trải nghiệm khách hàng',
                  image: '/placeholder.svg?height=400&width=400&text=Emily',
                },
                {
                  name: 'Nguyễn Văn Lành',
                  role: 'Trưởng nhóm thiết kế',
                  image: '/placeholder.svg?height=400&width=400&text=David',
                },
                {
                  name: 'Nguyễn Văn Lành',
                  role: 'Giám đốc Marketing',
                  image: '/placeholder.svg?height=400&width=400&text=Jessica',
                },
                {
                  name: 'Nguyễn Văn Lành',
                  role: 'Quản lý vận hành',
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
                  Lời chứng thực
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Những gì khách hàng của chúng tôi nói
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Đừng chỉ nghe chúng tôi nói. Đây là những gì khách hàng của
                  chúng tôi nói về trải nghiệm NextS của họ.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  name: 'Nguyễn Văn Lành',
                  location: 'New York, NY',
                  quote:
                    'NextS đã trở thành nơi tôi tin tưởng để mua các sản phẩm chất lượng. Dịch vụ khách hàng của họ không ai sánh kịp!',
                  rating: 5,
                },
                {
                  name: 'Nguyễn Văn Lành',
                  location: 'Los Angeles, CA',
                  quote:
                    'Tôi thích cách dễ dàng để tìm chính xác những gì tôi cần. Trang web rất trực quan và giao hàng luôn nhanh chóng.',
                  rating: 5,
                },
                {
                  name: 'Nguyễn Văn Lành',
                  location: 'Chicago, IL',
                  quote:
                    'Chất lượng của các sản phẩm tôi nhận được luôn vượt quá mong đợi của tôi. Rất khuyến khích!',
                  rating: 4,
                },
                {
                  name: 'Nguyễn Văn Lành',
                  location: 'Miami, FL',
                  quote:
                    'NextS cung cấp sự cân bằng hoàn hảo giữa chất lượng và giá cả phải chăng. Tôi là khách hàng suốt đời!',
                  rating: 5,
                },
                {
                  name: 'Nguyễn Văn Lành',
                  location: 'Seattle, WA',
                  quote:
                    'Cam kết của họ đối với bền vững là lý do tôi tiếp tục quay lại. Sản phẩm tuyệt vời với lương tâm.',
                  rating: 5,
                },
                {
                  name: 'Nguyễn Văn Lành',
                  location: 'Austin, TX',
                  quote:
                    'Sự chú ý đến chi tiết trong đóng gói và chất lượng sản phẩm rất ấn tượng. Không bao giờ thất vọng!',
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
                  NextS qua các con số
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Sự phát triển và ảnh hưởng của chúng tôi qua các năm.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4'>
              {[
                { number: '50K+', label: 'Khách hàng hài lòng' },
                { number: '100+', label: 'Quốc gia phục vụ' },
                { number: '5K+', label: 'Sản phẩm' },
                { number: '99%', label: 'Tỷ lệ hài lòng' },
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
                  Sẵn sàng trải nghiệm NextS?
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Tham gia hàng ngàn khách hàng hài lòng và khám phá lý do tại
                  sao NextS là điểm đến mua sắm trực tuyến được ưa chuộng.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/products'>
                  <Button size='lg'>Mua sắm ngay</Button>
                </Link>
                <Link href='/contact'>
                  <Button size='lg' variant='outline'>
                    Liên hệ với chúng tôi
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
