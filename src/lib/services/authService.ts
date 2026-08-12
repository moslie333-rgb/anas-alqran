export interface User {
  id: string;
  email?: string;
}

export interface Session {
  user: User;
}

export async function getCurrentUser(): Promise<User | null> {
  return null;
}

export async function getCurrentSession(): Promise<Session | null> {
  return null;
}

export async function loginAdmin(_email: string, _password: string): Promise<{ user: User | null; error: string | null }> {
  return { user: null, error: "المصادقة غير متاحة حالياً" };
}

export async function logoutAdmin(): Promise<void> {
  // No-op
}
