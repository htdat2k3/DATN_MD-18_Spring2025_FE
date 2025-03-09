import { CategoryItemType, NewProductItemType } from "./Types";

export const CategoryData: CategoryItemType[] = Array(10).fill({
  icon: "tshirt",
  text: "Áo",
  path: "/temp",
});

export const NewProductData: NewProductItemType[] = Array(4).fill({
  name: "Áo ba lỗ thể thao",
  price: 500000,
  numReview: 13,
  rating: 3,
  path: "/product-details/abc123",
});

export const ColorSelectorList: string[] = [
  "#808080",
  "#FFA500",
  "#00A65E",
  "#F9CCC6",
];
