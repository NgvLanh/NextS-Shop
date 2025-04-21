import { Star } from 'lucide-react';
import { ProductType } from '../lib/types';

export default function CartRate({ product }: { product: ProductType }) {
  return (
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
  );
}
