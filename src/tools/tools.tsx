import { Product } from "@/Types/ProductType";

export function ParseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function parseProductValue(product: Product) {
  return {
    ...product,
    likes: safeParseJsonArray(product.likes),
    dislikes: safeParseJsonArray(product.dislikes),
    preferences: safeParseJsonArray(product.preferences),
    images: safeParseJsonArray(product.images),
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  };
}

function safeParseJsonArray(value: any): any[] {
  try {
    if (Array.isArray(value)) return value;
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
}
