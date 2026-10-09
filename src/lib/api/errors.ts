export type ApiErrorKind =
  "network" | "timeout" | "not-found" | "client" | "server" | "invalid-response";

const userMessages: Record<ApiErrorKind, string> = {
  network: "ইন্টারনেট সংযোগে সমস্যা হয়েছে। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
  timeout: "সার্ভার সাড়া দিতে বেশি সময় নিচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
  "not-found": "আপনি যে তথ্যটি খুঁজছেন তা পাওয়া যায়নি।",
  client: "অনুরোধটি সঠিক নয়। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।",
  server: "সার্ভারে সাময়িক সমস্যা হচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
  "invalid-response":
    "সার্ভার থেকে অপ্রত্যাশিত তথ্য এসেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
};

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, options: { status?: number; cause?: unknown } = {}) {
    super(userMessages[kind], { cause: options.cause });
    this.name = "ApiError";
    this.kind = kind;
    this.status = options.status;
  }

  get isRetryable(): boolean {
    return this.kind === "network" || this.kind === "timeout" || this.kind === "server";
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** Returns a message that is always safe to show to the user. */
export function getUserMessage(error: unknown): string {
  return isApiError(error) ? error.message : userMessages.server;
}
