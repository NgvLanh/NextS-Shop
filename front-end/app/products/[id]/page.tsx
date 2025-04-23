'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartBreakcrumbs from '../../../components/cart-breadcrumbs';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import ProductImages from '../../../components/product-images';
import ProductInfo from '../../../components/product-info';
import { ProductType, VariantType } from '../../../lib/types';
import { ApiRequest, ApiResponse } from '../../../services/apiRequest';

export default function ProductDetailPage() {
  const params = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductType>({} as ProductType);
  const [attributes, setAttributes] = useState<object>({});
  const [variants, setVariants] = useState<VariantType[]>();
  const [variant, setVariant] = useState<VariantType>({} as VariantType);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

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
      setAttributes(result.data?.attributes);
      setVariants(result.data?.variants);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          {/* Breadcrumbs */}
          <CartBreakcrumbs product={product} />

          <div className='grid md:grid-cols-2 gap-8 lg:gap-16'>
            {/* Product Images */}
            <ProductImages
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            {/* Product Info */}
            <ProductInfo
              product={product}
              attributes={attributes}
              variants={variants}
            />
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
