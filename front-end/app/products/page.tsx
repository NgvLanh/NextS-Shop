'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';
import CategoryCheckbox from '../../components/category-checkbox';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PaginationCustom from '../../components/pagination-custom';
import ProductCard from '../../components/product-card';
import { CategoryType, ProductType } from '../../lib/types';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('products', 'GET');
      setAllProducts(result.data);
      setProducts(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('categories', 'GET');
      const all = {
        id: 0,
        name: 'Tất cả',
      };
      setCategory([all, ...result.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = (
    categories: CategoryType[],
    search: string,
    sort: string
  ) => {
    setCurrentPage(1);
    setSelectedCategories(categories);
    const categoryIds = categories.map((c) => c.id);
    const shouldFetch = categoryIds.length === 0 || categoryIds.includes(0);

    let filtered = allProducts;

    if (!shouldFetch) {
      filtered = filtered.filter((p) => categoryIds.includes(p.category.id));
    }

    if (search.trim() !== '') {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(lowerSearch)
      );
    }

    switch (sort) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'newest':
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'feature':
        filtered = [...filtered].sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
    }

    setProducts(filtered);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          <div className='flex flex-col md:flex-row gap-8 mx-4 lg:mx-0'>
            {/* Filters Sidebar */}
            <div className='w-full md:w-1/5 space-y-6'>
              <div>
                <h3 className='font-medium text-lg mb-4'>Danh mục</h3>
                <div className='space-y-2'>
                  {category.map((category) => (
                    <CategoryCheckbox
                      key={category.id}
                      category={category}
                      selectedCategories={selectedCategories}
                      onChange={(categories) =>
                        filterProducts(categories, '', '')
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className='font-medium text-lg mb-4'>Khoảng giá</h3>
                <div className='space-y-4'>
                  <Slider defaultValue={[0, 1000]} max={1000} step={1} />
                  <div className='flex items-center justify-between'>
                    <div className='text-sm'>0₫</div>
                    <div className='text-sm'>1.000₫</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='font-medium text-lg mb-4'>Đánh giá</h3>
                <div className='space-y-2'>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className='flex items-center'>
                      <input
                        type='checkbox'
                        id={`rating-${rating}`}
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className='ml-2 text-sm'
                      >
                        {rating} Sao trở lên
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button className='w-full'>Áp dụng bộ lọc</Button>
            </div>

            {/* Products Grid */}
            <div className='w-full md:w-4/5'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-2xl font-bold'>Tất cả sản phẩm</h1>
                <div className='flex items-center gap-4 w-full sm:w-auto'>
                  <Input
                    placeholder='Tìm kiếm sản phẩm...'
                    className='max-w-xs'
                    onChange={(e) => filterProducts([], e.target.value, '')}
                  />
                  <Select
                    defaultValue='featured'
                    onValueChange={(e) => filterProducts([], '', e)}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Sắp xếp theo' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='featured'>Nổi bật</SelectItem>
                      <SelectItem value='price-low'>
                        Giá: Thấp đến Cao
                      </SelectItem>
                      <SelectItem value='price-high'>
                        Giá: Cao đến Thấp
                      </SelectItem>
                      <SelectItem value='newest'>Mới nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className='flex justify-center mt-10'>
                <PaginationCustom
                  data={products}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
