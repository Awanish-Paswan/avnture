import type { BlogPost, Project } from "../types";
const base = import.meta.env.VITE_API_URL || "";
const adminTokenKey = "avnture_admin_token";
const adminToken = () =>
  typeof window === "undefined"
    ? null
    : window.sessionStorage.getItem(adminTokenKey);
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = adminToken();
  const response = await fetch(`${base}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(body.message || "Something went wrong. Please try again.");
  return body.data;
}
export const api = {
  projects: () => request<Project[]>("/api/projects"),
  project: (slug: string) => request<Project>(`/api/projects/${slug}`),
  posts: () => request<BlogPost[]>("/api/blog"),
  post: (slug: string) => request<BlogPost>(`/api/blog/${slug}`),
  createLead: (data: Record<string, string>) =>
    request<{ id: string }>("/api/leads", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: async (email: string, password: string) => {
    const data = await request<{ name: string; role: string; token: string }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    );
    window.sessionStorage.setItem(adminTokenKey, data.token);
    return data;
  },
  logout: async () => {
    try {
      return await request("/api/auth/logout", { method: "POST" });
    } finally {
      window.sessionStorage.removeItem(adminTokenKey);
    }
  },
  me: () => request<{ name: string; role: string }>("/api/auth/me"),
  adminList: <T>(resource: string) =>
    request<T[]>(`/api/${resource}?admin=true`),
  updateLead: (id: string, status: string) =>
    request(`/api/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  createContent: <T>(resource: "projects" | "blog", data: object) =>
    request<T>(`/api/${resource}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateContent: <T>(resource: "projects" | "blog", id: string, data: object) =>
    request<T>(`/api/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteContent: (resource: "projects" | "blog", id: string) =>
    request(`/api/${resource}/${id}`, { method: "DELETE" }),
  uploadImage: async (file: File) => {
    const form = new FormData();
    form.append("image", file);
    const token = adminToken();
    const response = await fetch(`${base}/api/uploads/images`, {
      method: "POST",
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(body.message || "The image could not be uploaded.");
    return body.data as {
      url: string;
      storage: "local" | "cloudinary";
      width: number;
      height: number;
      bytes: number;
    };
  },
};
