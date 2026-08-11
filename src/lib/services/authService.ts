import { supabase } from "../supabase";
import { User, Session } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

export async function loginAdmin(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { user: null, error: error.message };
    }
    return { user: data.user, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || "خطأ أثناء تسجيل الدخول عبر Supabase Auth" };
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch {
    // Ignore error
  }
}
