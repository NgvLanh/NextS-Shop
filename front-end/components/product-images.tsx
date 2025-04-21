import Image from 'next/image';
import { ProductType } from '../lib/types';

export default function ProductImages({
  product,
  selectedImage,
  setSelectedImage,
}: {
  product: ProductType;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}) {
  return (
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
  );
}
