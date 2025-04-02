export interface ScreenRouteType {
  routeName: string;
  icon: string;
  title: string;
}

export interface CategoryItemType {
  icon: string;
  name: string;
  category_id: string;
}

export interface NewProductItemType {
  product_id: number;
  product_name: string;
  description: string;
  price: number,
  quantity: number,
  category: string,
  img: string[],
  modified_date: Date,
  created_date: Date,
  isFavourite: boolean,
}
export interface Category {
  urlImage: string;
  name: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
}
