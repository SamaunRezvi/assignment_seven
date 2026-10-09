import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

type Method = "GET" | "POST";

function handle(method: Method) {
  return async (request: Request): Promise<Response> => {
    try {
      return await toNextJsHandler(getAuth())[method](request);
    } catch (error) {
      console.error(
        "[auth] Request failed:",
        error instanceof Error ? error.message : "unknown error",
      );
      return Response.json(
        { code: "AUTH_UNAVAILABLE", message: "Authentication is temporarily unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  };
}

export const GET = handle("GET");
export const POST = handle("POST");
