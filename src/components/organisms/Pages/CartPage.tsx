import products from '../../../../public/gadgets/products.json';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { CartItem } from '../../Molecules/ShopingCartItem/CartItem';
import { CartTotal } from '../../Molecules/ShopingCartItem/CartTotal';

export const CartPage = () => {
  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);

  const itemsInCart = itemsIdsInCart.map((item) => {
    let product = products.find((p) => p.itemId === item.id);

    // workaround for broken data
    if (!product) {
      product = { ...product!, itemId: item.id };
    }

    return {
      ...product!,
      quantity: item.quantity,
    };
  });

  const total = itemsInCart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0,
  );

  return (
    <div className="flex flex-col items-center px-4 py-8 bg-[#0F1121] min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-6 w-full max-w-[752px]">
        Cart
      </h1>

      <div className="flex flex-col gap-6 w-full items-center">
        {itemsInCart.map((item) => (
          <CartItem
            key={item.itemId}
            product={item}
            quantity={item.quantity}
          />
        ))}

        <CartTotal
          total={total}
          count={itemsInCart.length}
        />
      </div>
    </div>
  );
};
