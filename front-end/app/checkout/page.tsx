'use client';

import { useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PaymentInfo from '../../components/payment-info';
import ReviewOrder from '../../components/review-order';
import ShippingInfo from '../../components/shipping-info';
import StepOrder from '../../components/step-order';
import { useCart } from '../../contexts/CartContext';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cartItems } = useCart();
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          <h1 className='text-3xl font-bold mb-8'>Thanh toán</h1>
          <StepOrder step={step} />
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='md:col-span-2'>
              {step === 1 && (
                <ShippingInfo
                  nextStep={nextStep}
                  shippingData={shippingData}
                  setShippingData={setShippingData}
                />
              )}
              {step === 2 && (
                <PaymentInfo prevStep={prevStep} nextStep={nextStep} />
              )}
            </div>

            <div className='md:col-span-1'>
              <ReviewOrder cartItems={cartItems} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
