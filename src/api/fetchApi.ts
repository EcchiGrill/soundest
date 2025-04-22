interface FetchOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

export const fetchApi = async <T>({
  endpoint,
  method,
  body,
}: FetchOptions): Promise<T> => {
  const headers: Record<string, string> = {};

  const isFormData = body instanceof FormData;

  if (body && !isFormData) {
    headers["content-type"] = "application/json";
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      method,
      headers,
      body: isFormData
        ? (body as FormData)
        : body
        ? JSON.stringify(body)
        : undefined,
    }
  );

  return response.status !== 204 && response.json();
};
