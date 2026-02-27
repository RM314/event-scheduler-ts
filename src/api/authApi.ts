const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type PostJsonSuccess<T> = {
  ok: true;
  data: T;
  status: number;
};

type PostJsonFailure = {
  ok: false;
  data: unknown;
  status: number; // 0 bei Network-Error
  error: string;
};

export type LoginUserResult =
  | { ok: true; token: string; message: string }
  | { ok: false; message: string };


export type PostJsonResult<T> = PostJsonSuccess<T> | PostJsonFailure;

type LoginApiData = { token: string } | { error?: string };

async function parseJsonSafe(response: Response) :Promise<unknown> {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

async function postJson<T = unknown>(path: string, payload: unknown) : Promise<PostJsonResult<T>> {
    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await parseJsonSafe(response) as T;

        if (!response.ok) {
            return {
                ok: false,
                data,
                status: response.status,
                error: "Request failed",
            };
        }
        return { ok: true, data, status: response.status };
    } catch {
        return { ok: false, data: {}, status: 0, error: "Network error. Is the backend running?" };
    }
}

export async function loginUser(email :string, password: string) : Promise<LoginUserResult> {
    const result = await postJson<LoginApiData>("/auth/login", { email, password });
    if (result.ok && "token" in result.data) {
    return {
      ok: true,
      token: result.data.token,
      message: "User signed in successfully",
    };
  }


    const apiMsg =
    result.ok
      ? ("error" in result.data && result.data.error) || "Unknown error"
      : result.error;
    return { ok: false, message: apiMsg };
}

type RegisterApiData = { error?: string } | Record<string, unknown>;

export async function registerUser(email: string, password) : Promise<{ ok: boolean; message: string }> {
    const result = await postJson<RegisterApiData>("/users", { email, password });

    if (result.ok) {
        return { ok: true, message: "User created successfully" };
    }

    const msg =
    (typeof (result.data as any)?.error === "string" && (result.data as any).error) ||
    result.error ||
    "Unknown error";

  return { ok: false, message: msg };
}
