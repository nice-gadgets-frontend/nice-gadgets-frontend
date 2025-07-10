import products from '../../../../public/gadgets/products.json';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { CartItem } from '../../Molecules/ShopingCartItem/CartItem';
import { CartTotal } from '../../Molecules/ShopingCartItem/CartTotal';

export const CartPage = () => {
  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);

  const itemsInCart = itemsIdsInCart.map((item) => {
    let product = products.find((p) => p.itemId === item.id);

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
    <div className="px-4 py-8 bg-[#0F1121] min-h-screen flex justify-center">
      <div className="w-full max-w-[1040px]">
        <h1 className="text-white text-3xl font-bold mb-6">Cart</h1>

        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-[1fr_288px] 
            gap-6
            items-start
          "
        >
          {/* List of CartItems */}
          <div className="flex flex-col gap-6">
            {itemsInCart.map((item) => (
              <CartItem
                key={item.itemId}
                product={item}
                quantity={item.quantity}
              />
            ))}
          </div>

          {/* CartTotal block */}
          <div className="w-full md:w-auto">
            <CartTotal
              total={total}
              count={itemsInCart.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
