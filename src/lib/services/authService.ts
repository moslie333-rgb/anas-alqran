import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  email?: string;
}

export interface Session {
  user: User;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;
    return {
      id: user.id,
      email: user.email,
    };
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.user) return null;
    return {
      user: {
        id: session.user.id,
        email: session.user.email,
      },
    };
  } catch {
    return null;
  }
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: "فشل التحقق من الحساب" };
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      error: null,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { user: null, error: errorMsg };
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error("logoutAdmin error:", err);
  }
}
