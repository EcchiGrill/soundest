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
  const headers: Record<string, string> = {
    accept: "text/plain",
  };

  const isFormData = body instanceof FormData;

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

  return response.json();
};
