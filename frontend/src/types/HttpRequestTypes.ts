export type useHttpType = (
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: any,
  headers?: { [key: string]: string }
) => Promise<{ error?: string; data?: any }>;
