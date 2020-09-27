import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.product.data.productTitle,
          imageUrl: i.product.data.productImageUrl,
          price: i.product.data.productPrice,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
