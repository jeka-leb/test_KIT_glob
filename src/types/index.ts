export interface IBook {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

export interface ICartItem extends IBook {
  cartPrice: number;
  cartCount: number;
}
