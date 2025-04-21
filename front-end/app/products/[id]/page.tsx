'use client';

import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import { Button } from '../../../components/ui/button';
import { ProductType } from '../../../lib/types';
import { ApiRequest, ApiResponse } from '../../../services/apiRequest';

export default function ProductDetailPage() {
  const params = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductType>({} as ProductType);

  useEffect(() => {
    fetchProductById(params.id ?? '');
  }, []);

  const fetchProductById = async (productId: string | string[]) => {
    try {
      const result = await ApiRequest<ApiResponse>(
        `products/${productId}`,
        'GET'
      );
      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Mock product data
  // const product = {
  //   id: params.id,
  //   name: `Product Name ${params.id}`,
  //   description:
  //     'This is a detailed description of the product. It includes information about the materials, features, and benefits of the product. The description is designed to help customers make an informed purchasing decision.',
  //   price: 99.99,
  //   discount: 129.99,
  //   rating: 4.5,
  //   reviews: 128,
  //   stock: 10,
  //   images: [
  //     `/placeholder.svg?height=600&width=600&text=Product+${params.id}`,
  //     `/placeholder.svg?height=600&width=600&text=Product+${params.id}+View+2`,
  //     `/placeholder.svg?height=600&width=600&text=Product+${params.id}+View+3`,
  //     `/placeholder.svg?height=600&width=600&text=Product+${params.id}+View+4`,
  //   ],
  //   colors: ['Red', 'Blue', 'Black'],
  //   sizes: ['S', 'M', 'L', 'XL'],
  // };

  const incrementQuantity = () => {
    // if (quantity < product.stock) {
    //   setQuantity(quantity + 1);
    // }
  };

  const decrementQuantity = () => {
    // if (quantity > 1) {
    //   setQuantity(quantity - 1);
    // }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          {/* Breadcrumbs */}
          <div className='flex items-center gap-1 text-sm mb-6'>
            <Link
              href='/'
              className='text-muted-foreground hover:text-foreground'
            >
              Trang chủ
            </Link>
            <span className='text-muted-foreground'>/</span>
            <Link
              href='/products'
              className='text-muted-foreground hover:text-foreground'
            >
              Sản phẩm
            </Link>
            <span className='text-muted-foreground'>/</span>
            <span>{product.name}</span>
          </div>

          <div className='grid md:grid-cols-2 gap-8 lg:gap-16'>
            {/* Product Images */}
            <div className='space-y-4'>
              <div className='overflow-hidden rounded-lg border'>
                <Image
                  src={product.images?.[selectedImage] || '/placeholder.svg'}
                  alt={''}
                  width={600}
                  height={600}
                  className='object-cover w-full aspect-square'
                />
              </div>
              <div className='flex gap-2 overflow-auto pb-2'>
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    className={`relative overflow-hidden rounded border ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${product.name} view ${index + 1}`}
                      width={100}
                      height={100}
                      className='object-cover w-20 h-20'
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className='space-y-6'>
              <div>
                <h1 className='text-3xl font-bold'>{product.name}</h1>
                <div className='flex items-center gap-2 mt-2'>
                  <div className='flex items-center'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(1)
                            ? 'text-yellow-400 fill-yellow-400'
                            : i < 5
                            ? 'text-yellow-400 fill-yellow-400 opacity-50'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-muted-foreground'>
                    {5} ({0} reviews)
                  </span>
                </div>
              </div>

              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold'>${product.price}</span>
                {/* {product.discount && (
                  <span className='text-lg text-muted-foreground line-through'>
                    ${product.discount.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className='text-sm font-medium text-green-600'>
                    Save ${(product.discount - product.price).toFixed(2)}
                  </span>
                )} */}
              </div>

              <p className='text-muted-foreground'>{product.description}</p>

              <div className='space-y-4'>
                <div>
                  <h3 className='font-medium mb-2'>Color</h3>
                  <div className='flex gap-2'>
                    {product.attributes?.Color.map((color) => (
                      <button
                        key={color}
                        className='border rounded-md px-3 py-1 text-sm hover:border-primary'
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='font-medium mb-2'>Size</h3>
                  <div className='flex gap-2'>
                    {product.attributes?.Size.map((size) => (
                      <button
                        key={size}
                        className='border rounded-md px-3 py-1 text-sm hover:border-primary'
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='font-medium mb-2'>Quantity</h3>
                  <div className='flex items-center'>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <span className='w-12 text-center'>{quantity}</span>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={incrementQuantity}
                      disabled={quantity >= product.inventory}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                    <span className='ml-4 text-sm text-muted-foreground'>
                      {product.inventory} available
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Button className='flex-1' size='lg'>
                  <ShoppingCart className='mr-2 h-5 w-5' />
                  Add to Cart
                </Button>
                <Button variant='outline' size='lg'>
                  <Heart className='mr-2 h-5 w-5' />
                  Add to Wishlist
                </Button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t'>
                <div className='flex items-center gap-2'>
                  <Truck className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm'>Free shipping over $50</span>
                </div>
                <div className='flex items-center gap-2'>
                  <RotateCcw className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm'>30-day returns</span>
                </div>
                <div className='flex items-center gap-2'>
                  <ShieldCheck className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm'>2-year warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className='mt-16'>
            {/* <Tabs defaultValue='description'>
              <TabsList className='w-full justify-start border-b rounded-none'>
                <TabsTrigger value='description'>Description</TabsTrigger>
                <TabsTrigger value='specifications'>Specifications</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value='description' className='py-6'>
                <div className='space-y-4'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl,
                    eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                    ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
                    nisl sit amet nisl.
                  </p>
                  <p>
                    Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
                    nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod,
                    nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget
                    aliquam nisl nisl sit amet nisl.
                  </p>
                  <ul className='list-disc pl-5 space-y-2'>
                    <li>High-quality materials for durability</li>
                    <li>Ergonomic design for comfort</li>
                    <li>Versatile functionality for various uses</li>
                    <li>Easy to clean and maintain</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value='specifications' className='py-6'>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='border rounded-lg p-4'>
                      <h3 className='font-medium mb-2'>Dimensions</h3>
                      <p className='text-sm text-muted-foreground'>
                        10 x 5 x 3 inches
                      </p>
                    </div>
                    <div className='border rounded-lg p-4'>
                      <h3 className='font-medium mb-2'>Weight</h3>
                      <p className='text-sm text-muted-foreground'>1.5 lbs</p>
                    </div>
                    <div className='border rounded-lg p-4'>
                      <h3 className='font-medium mb-2'>Materials</h3>
                      <p className='text-sm text-muted-foreground'>
                        Premium quality materials
                      </p>
                    </div>
                    <div className='border rounded-lg p-4'>
                      <h3 className='font-medium mb-2'>Warranty</h3>
                      <p className='text-sm text-muted-foreground'>
                        2 years limited warranty
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='reviews' className='py-6'>
                <div className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-medium'>Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>

                  <div className='border rounded-lg p-6'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h4 className='font-medium'>John Doe</h4>
                        <div className='flex items-center mt-1'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 5
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        2 days ago
                      </span>
                    </div>
                    <p className='mt-4'>
                      Great product! Exactly as described and arrived quickly.
                      Would definitely recommend.
                    </p>
                  </div>

                  <div className='border rounded-lg p-6'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h4 className='font-medium'>Jane Smith</h4>
                        <div className='flex items-center mt-1'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        1 week ago
                      </span>
                    </div>
                    <p className='mt-4'>
                      Good quality for the price. Shipping was fast and the
                      product works as expected.
                    </p>
                  </div>

                  <div className='flex justify-center'>
                    <Button variant='outline'>Load More Reviews</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs> */}
          </div>

          {/* Related Products */}
          <div className='mt-16'>
            {/* <h2 className='text-2xl font-bold mb-6'>You May Also Like</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Link
                  href={`/products/${Number.parseInt(params.id) + i + 1}`}
                  key={i}
                  className='group'
                >
                  <div className='overflow-hidden rounded-lg border bg-background'>
                    <div className='relative aspect-square overflow-hidden'>
                      <Image
                        src={`/placeholder.svg?height=400&width=400&text=Related+${
                          i + 1
                        }`}
                        alt={`Related Product ${i + 1}`}
                        width={400}
                        height={400}
                        className='object-cover transition-transform group-hover:scale-105'
                      />
                      <div className='absolute top-2 right-2'>
                        <Button
                          size='icon'
                          variant='ghost'
                          className='h-8 w-8 rounded-full bg-white'
                        >
                          <Heart className='h-4 w-4' />
                          <span className='sr-only'>Add to wishlist</span>
                        </Button>
                      </div>
                    </div>
                    <div className='p-4'>
                      <h3 className='font-medium'>Related Product {i + 1}</h3>
                      <p className='text-sm text-muted-foreground'>Category</p>
                      <div className='mt-2 flex items-center justify-between'>
                        <span className='font-medium'>$89.99</span>
                        <Button size='sm' variant='secondary'>
                          <ShoppingCart className='mr-2 h-4 w-4' />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
