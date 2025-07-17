import { CheckoutTotal } from '../../../Molecules/CheckoutTotal/CheckoutTotal';
import { DeliveryInfoSection } from '../../../Molecules/DeliveryInfoSection/DeliveryInfoSection';
import { InCartItemsCheckoutSection } from '../../../Molecules/InCartItemsCheckoutSection/InCartItemsCheckoutSection';

export const CheckoutPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-[var(--color-surface-3)]">
      <div
        className="
    w-full
    max-w-[1200px]
    mx-auto
    grid
    grid-cols-1
    gap-6
    px-4
    sm:grid-cols-1
    md:grid-cols-12
    md:px-6
    lg:grid-cols-24
    lg:gap-4
    lg:px-0
    items-start
  "
        style={{ margin: '0 auto' }}
      >
        <div
          className="
        col-span-1
        md:col-span-7
        lg:col-span-14
        flex flex-col
      "
        >
          <DeliveryInfoSection />
        </div>
        <div
          className="
        col-span-1
        md:col-span-5
        lg:col-span-10
        flex flex-col gap-6
      "
        >
          <InCartItemsCheckoutSection />
          <CheckoutTotal />
        </div>
      </div>
    </div>
  );
};
