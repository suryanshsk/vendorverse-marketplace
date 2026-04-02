export interface Product {
  id: number;
  name: string;
  vendor: string;
  price: number;
  original: number;
  category: string;
  emoji: string;
  rating: number;
  reviews: number;
  badge: string | null;
}

export const products: Product[] = [
  { id: 1, name: "Wireless Earbuds Pro", vendor: "TechZone India", price: 2499, original: 3200, category: "electronics", emoji: "🎧", rating: 4.7, reviews: 234, badge: "BESTSELLER" },
  { id: 2, name: "Smart Watch Ultra", vendor: "WearTech", price: 8999, original: 12000, category: "electronics", emoji: "⌚", rating: 4.8, reviews: 187, badge: "NEW" },
  { id: 3, name: "Running Shoes X3", vendor: "SportGear Hub", price: 3499, original: 5000, category: "sports", emoji: "👟", rating: 4.6, reviews: 312, badge: "SALE" },
  { id: 4, name: "Mechanical Keyboard", vendor: "TechZone India", price: 4799, original: 6000, category: "electronics", emoji: "⌨️", rating: 4.9, reviews: 98, badge: null },
  { id: 5, name: "Linen Kurta Set", vendor: "EthnicHaat", price: 1299, original: 1800, category: "fashion", emoji: "👘", rating: 4.4, reviews: 156, badge: "NEW" },
  { id: 6, name: "Yoga Mat Premium", vendor: "SportGear Hub", price: 899, original: 1200, category: "sports", emoji: "🧘", rating: 4.5, reviews: 203, badge: null },
  { id: 7, name: "Minimalist Table Lamp", vendor: "HomeDecorWorld", price: 1599, original: 2200, category: "home", emoji: "💡", rating: 4.6, reviews: 89, badge: null },
  { id: 8, name: "Full Stack Handbook", vendor: "TechBooks India", price: 599, original: 899, category: "books", emoji: "📚", rating: 4.8, reviews: 445, badge: "BESTSELLER" },
  { id: 9, name: "Smart Phone 13 Pro", vendor: "MobileXpress", price: 24999, original: 29999, category: "electronics", emoji: "📱", rating: 4.7, reviews: 567, badge: "HOT" },
  { id: 10, name: "Cotton Casual Tee", vendor: "FashionFirst", price: 499, original: 799, category: "fashion", emoji: "👕", rating: 4.3, reviews: 892, badge: "SALE" },
  { id: 11, name: "Bamboo Desk Organizer", vendor: "HomeDecorWorld", price: 799, original: 1100, category: "home", emoji: "🗂️", rating: 4.5, reviews: 134, badge: null },
  { id: 12, name: "Design Patterns Book", vendor: "TechBooks India", price: 749, original: 999, category: "books", emoji: "📖", rating: 4.9, reviews: 278, badge: "NEW" },
];

export const categories = ["All Products", "Electronics", "Fashion", "Home & Living", "Sports", "Books"];

export const categoryMap: Record<string, string> = {
  "All Products": "all",
  "Electronics": "electronics",
  "Fashion": "fashion",
  "Home & Living": "home",
  "Sports": "sports",
  "Books": "books",
};
