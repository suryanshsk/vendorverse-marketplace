export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Is VendorVerse free to use for customers?",
    answer: "Yes, customers can browse and buy products for free. Only vendors need to subscribe to a plan to list and sell products on the platform.",
  },
  {
    question: "How do I become a vendor?",
    answer: "Register on VendorVerse, select the Vendor role during signup, fill in your store details, and await admin approval. Once approved, you can start listing products.",
  },
  {
    question: "Which payment methods are supported?",
    answer: "VendorVerse supports UPI, credit/debit cards, net banking, and digital wallets through Razorpay and Stripe payment gateways.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bcrypt for password hashing, JWT-based authentication, and HTTPS is enforced in production to ensure your data stays safe.",
  },
];
