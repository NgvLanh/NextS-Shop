import { Check } from 'lucide-react';

type Props = {
  step: number;
};
export default function StepOrder({ step }: Props) {
  return (
    <div className='flex justify-between items-center mb-8'>
      <div className='flex items-center gap-2'>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {step > 1 ? <Check className='h-4 w-4' /> : 1}
        </div>
        <span className={step >= 1 ? 'font-medium' : 'text-muted-foreground'}>
          Giao hàng
        </span>
      </div>
      <div className='h-px w-12 bg-muted'></div>
      <div className='flex items-center gap-2'>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {step > 2 ? <Check className='h-4 w-4' /> : 2}
        </div>
        <span className={step >= 2 ? 'font-medium' : 'text-muted-foreground'}>
          Thanh toán
        </span>
      </div>
      <div className='h-px w-12 bg-muted'></div>
      <div className='flex items-center gap-2'>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {step > 3 ? <Check className='h-4 w-4' /> : 3}
        </div>
        <span className={step >= 3 ? 'font-medium' : 'text-muted-foreground'}>
          Xem lại
        </span>
      </div>
    </div>
  );
}
