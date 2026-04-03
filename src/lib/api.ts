export type ApiResult<T> = {
  ok: boolean;
  data?: T;
  message?: string;
};

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      credentials: "include",
      ...init,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        message: payload?.message || "Request failed.",
      };
    }

    return {
      ok: true,
      data: payload as T,
      message: payload?.message,
    };
  } catch {
    return {
      ok: false,
      message: "Network request failed.",
    };
  }
}
