interface AuthErrorLike {
  code?: string;
  status?: number;
  message?: string;
}

const codeMessages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা লিখুন।",
  INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
  SESSION_EXPIRED: "আপনার সেশনের মেয়াদ শেষ হয়েছে। আবার সাইন ইন করুন।",
  PROVIDER_NOT_FOUND: "এই মাধ্যমে সাইন ইন এখন চালু নেই।",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "এই অ্যাকাউন্ট আগেই যুক্ত করা আছে।",
  FAILED_TO_CREATE_USER: "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
  FAILED_TO_UPDATE_USER: "তথ্য হালনাগাদ করা যায়নি। আবার চেষ্টা করুন।",
};

export const NETWORK_ERROR_MESSAGE =
  "ইন্টারনেট সংযোগে সমস্যা হয়েছে। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।";

const LINK_FAILED_MESSAGE =
  "এই ইমেইল দিয়ে আগে অন্য পদ্ধতিতে অ্যাকাউন্ট খোলা আছে। আগের পদ্ধতিতে সাইন ইন করুন।";

const oauthErrorMessages: Record<string, string> = {
  account_not_linked: LINK_FAILED_MESSAGE,
  unable_to_link_account: LINK_FAILED_MESSAGE,
  email_does_not_match: LINK_FAILED_MESSAGE,
  account_already_linked_to_different_user:
    "এই অ্যাকাউন্ট আগেই অন্য ব্যবহারকারীর সাথে যুক্ত আছে।",
  email_not_found:
    "আপনার অ্যাকাউন্টে কোনো ইমেইল পাওয়া যায়নি। অন্য পদ্ধতিতে সাইন ইন করুন।",
  email_not_verified: "আপনার ইমেইল যাচাই করা নেই। ইমেইল যাচাই করে আবার চেষ্টা করুন।",
  access_denied: "সাইন ইন বাতিল করা হয়েছে।",
  oauth_provider_not_found: "এই মাধ্যমে সাইন ইন এখন চালু নেই।",
};

/** A safe, localized message for an OAuth error code from the callback URL. */
export function getOAuthErrorMessage(code: string): string {
  return oauthErrorMessages[code] ?? "সাইন ইন সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।";
}

/** Maps an auth client error to a message that is safe to show to the user. */
export function getAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
  fallback = "কিছু একটা সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
): string {
  if (!error) return fallback;
  if (error.code && codeMessages[error.code]) return codeMessages[error.code]!;
  if (error.status === 429)
    return "অনেকবার চেষ্টা করা হয়েছে। এক মিনিট পর আবার চেষ্টা করুন।";
  if (error.status === 401 || error.status === 403)
    return "আপনাকে এই কাজের অনুমতি দেওয়া হয়নি।";
  if (error.status && error.status >= 500) {
    return "সার্ভারে সাময়িক সমস্যা হচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }
  return fallback;
}
