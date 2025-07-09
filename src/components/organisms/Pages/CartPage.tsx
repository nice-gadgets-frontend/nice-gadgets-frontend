import products from '../../../../public/gadgets/products.json';
import { CartItem } from '../../Molecules/ShopingCartItem/CartItem';
import { CartTotal } from '../../Molecules/ShopingCartItem/CartTotal';

const mockCart = [
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
    <div className="flex flex-col items-center px-4 py-8 bg-[#0F1121] min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-6 w-full max-w-[752px]">
        Cart
      </h1>

      <div className="flex flex-col gap-6 w-full items-center">
        {items.map((item) => (
          <CartItem
            key={item.itemId}
            name={item.name}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
          />
        ))}

        <CartTotal
          total={total}
          count={items.length}
        />
      </div>
    </div>
  );
};
