import Categories from '../components/categories';
import FeaturedProducts from '../components/feature-products';
import Footer from '../components/footer';
import Header from '../components/header';
import HeroSection from '../components/hero-section';
import Newsletter from '../components/news-letter';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Categories */}
        <Categories />

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
