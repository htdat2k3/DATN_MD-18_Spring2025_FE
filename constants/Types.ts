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
  rating: number,
  current_images: string[],
  modified_date: Date,
  created_date: Date,
  isFavourite: boolean,
}

export interface ProductPopular {
  product_id: number;
  product_name: string;
  category_id: number;
  description: string;
  total_quantity: number; // Assuming quantity is numeric
  image_url: string;
  rating: number;
}

export interface ProductVariant {
  variant_id: number;
  size_name: string;
  color_name: string;
  price: number;
  quantity: number;
}

export interface ProductDetail {
  product_id: number;
  product_name: string;
  description: string;
  images: string[],
  category_id: number;
  modified_date: Date;
  created_date: Date;
  variants: ProductVariant[]
}

export interface PairProduct {
  color_name: string,
  size_name: string
}

export interface CartItem {
  cart_id: number;
  color_name: string;
  price: number;
  product_id: number;
  product_image: string;
  product_name: string;
  quantity: number;
  size_name: string;
  stock: number;
  variant_id: number;
};

/**
 *
 * {"order_id":8,"user_id":1,
 * "total_price":1855555,
 * "discount_amount":0,"final_price":1855555,
 * "voucher_id":null,"status":"pending",
 * "payment_method":"paypal","shipping_address":"","shipping_fee":10000,
 * "created_date":"2025-03-23T15:43:40.000Z","modified_date":"2025-03-23T15:43:40.000Z","total_quantity":"18"}
 */

export interface Order {
  order_id: number,
  created_date: Date,
  total_quantity: number,
  final_price: number,
  status: string
}
/**
 *
 *  "product_id": 1,
            "user_id": 1,
            "product_name": "Áo cộc",
            "description": "áo",
            "category_id": 1,
            "image_urls": [
                "images/1742615152518.PNG",
                "",
                "images/1742615152520.PNG",
                "",
                "images/1742615152521.PNG",
                ""
            ],
            "total_records": 1
 */

export interface ProductFavourite {
  product_id: number;
  user_id: number;
  product_name: string;
  description: string;
  category_id: number;
  image_urls: string[];
  total_records: number;
}
/**
 * 
 *  "review_id": 1,
            "user_name": "vuongnguyen",
            "product_id": 1,
            "content": "zzllslzlslsls",
            "number_of_stars": 4,
            "created_date": "2025-03-22T07:48:47.000Z",
            "modified_date": "2025-03-22T07:48:47.000Z"
 */

export interface ProductReview {
  review_id: number;
  product_id: number;
  product_name: string,
  user_name: string;
  product_image: string;
  content: string;
  number_of_stars: number;
  created_date: Date;
  modified_date: Date;
}

export interface PairValueProduct {
  price: number,
  quantity: number,
  variant_id: number
}

/*

"review_id": 1,
            "user_name": "vuongnguyen",
            "product_id": 1,
            "content": "zzllslzlslsls",
            "number_of_stars": 4,
            "created_date": "2025-03-22T07:48:47.000Z",
            "modified_date": "2025-03-22T07:48:47.000Z"
 */

export interface ReviewProduct {
  review_id: number,
  user_name: string,
  content: string,
  number_of_stars: number,
  created_date: Date,
  modified_date: Date
}

export interface Category {
  urlImage: string;
  name: string;
}

export interface Notification {
  notification_id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_date: Date;
}

/**
 *
 */

export interface UserOrder {
  full_name: string;
  phone_number: string;
  address: string;
}

export interface ProductOrder {
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  size_name: string;
  color_name: string;
}

export interface MergedOrder {
  order_id: number;
  payment_method: string;
  discount_amount: number,
  created_date: Date,
  user: UserOrder;
  products: ProductOrder[];
}