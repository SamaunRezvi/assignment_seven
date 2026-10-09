export const siteConfig = {
  name: "বাজার দর",
  nameEn: "BazarDor",
  tagline: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
  disclaimer: "সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।",
  locale: "bn-BD",
  timeZone: "Asia/Dhaka",
  allProductsAnchor: "সব-পণ্য",
} as const;

export const routes = {
  home: "/",
  signIn: "/signin",
  signUp: "/signup",
  profile: "/profile",
  profileUpdate: "/profile/update",
  category: (slug: string) => `/category/${encodeURIComponent(slug)}`,
  product: (slug: string) => `/product/${encodeURIComponent(slug)}`,
} as const;

export const sortOptions = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
] as const;
