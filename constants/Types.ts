export interface ScreenRouteType {
  routeName: string;
  icon: string;
  title: string;
}

export interface CategoryItemType {
  icon: string;
  text: string;
  path: string;
}

export interface NewProductItemType {
  name: string;
  price: number;
  numReview: number;
  rating: number;
  path: string;
}
export interface Category {
  urlImage: string;
  name: string;
}
