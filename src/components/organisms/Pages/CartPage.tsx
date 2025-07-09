import products from '../../../../public/gadgets/products.json';
import { CartItem } from '../../Molecules/ShopingCartItem/CartItem';
import { CartTotal } from '../../Molecules/ShopingCartItem/CartTotal';

type CartProduct = {
  itemId: string;
  quantity: number;
};

const mockCart: CartProduct[] = [
  { itemId: 'apple-iphone-11-128gb-yellow', quantity: 1 },
  { itemId: 'apple-iphone-8-64gb-gold', quantity: 2 },
];

export const CartPage = () => {
  const items = mockCart.map(({ itemId, quantity }) => {
    const product = products.find((p) => p.itemId === itemId);
    return {
      ...product!,
      quantity,
    };
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="px-4 py-8 bg-[#0F1121] min-h-screen flex justify-center">
      <div className="w-full max-w-[1040px]">
        <h1 className="text-white text-3xl font-bold mb-6">Cart</h1>

        {/* Grid: 1 колонка мобілка/планшет, 2 колонки від lg (≥1024px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-8">
          {/* Список товарів */}
          <div className="grid gap-6 order-1 lg:order-none">
            {items.map((item) => (
              <CartItem
                key={item.itemId}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* Підсумок замовлення */}
          <div className="order-2 lg:order-none">
            <CartTotal
              total={total}
              count={items.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
