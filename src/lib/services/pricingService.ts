import { supabase, isSupabaseConfigured } from "../supabase";

export interface DBPackageItem {
  id?: string;
  duration_minutes?: number;
  sessions_count: number;
  label: string;
  price: string;
  price_note: string;
  badge?: string;
  is_featured?: boolean;
  display_order?: number;
}

export const DEFAULT_PACKAGES: Record<number, DBPackageItem[]> = {
  30: [
    { duration_minutes: 30, sessions_count: 4, label: "4 حصص شهرياً", price: "3.5", price_note: "ر.ع. / الشهر" },
    { duration_minutes: 30, sessions_count: 8, label: "8 حصص شهرياً", badge: "الأكثر طلباً", is_featured: true, price: "6.5", price_note: "ر.ع. / الشهر" },
    { duration_minutes: 30, sessions_count: 12, label: "12 حصة شهرياً", badge: "أفضل توفير", price: "9.5", price_note: "ر.ع. / الشهر" },
  ],
  45: [
    { duration_minutes: 45, sessions_count: 4, label: "4 حصص شهرياً", price: "5", price_note: "ر.ع. / الشهر" },
    { duration_minutes: 45, sessions_count: 8, label: "8 حصص شهرياً", badge: "الأكثر طلباً", is_featured: true, price: "9.5", price_note: "ر.ع. / الشهر" },
    { duration_minutes: 45, sessions_count: 12, label: "12 حصة شهرياً", badge: "أفضل توفير", price: "14", price_note: "ر.ع. / الشهر" },
  ],
  60: [
    { duration_minutes: 60, sessions_count: 4, label: "4 حصص شهرياً", price: "6.5", price_note: "ر.ع. / الشهر" },
    { duration_minutes: 60, sessions_count: 8, label: "8 حصص شهرياً", badge: "أفضل قيمة", is_featured: true, price: "12.5", price_note: "ر.ع. / الشهر" },
    { duration_minutes: 60, sessions_count: 12, label: "12 حصة شهرياً", badge: "أفضل توفير", price: "18.5", price_note: "ر.ع. / الشهر" },
  ],
};

export async function fetchPricingPackages(): Promise<Record<number, DBPackageItem[]>> {
  if (!isSupabaseConfigured) {
    return DEFAULT_PACKAGES;
  }

  try {
    const { data, error } = await supabase
      .from("pricing_packages")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_PACKAGES;
    }

    const grouped: Record<number, DBPackageItem[]> = { 30: [], 45: [], 60: [] };

    data.forEach((pkg) => {
      const dur = pkg.duration_minutes || 45;
      if (!grouped[dur]) grouped[dur] = [];
      grouped[dur].push({
        id: pkg.id,
        duration_minutes: pkg.duration_minutes,
        sessions_count: pkg.sessions_count,
        label: pkg.label,
        price: pkg.price,
        price_note: pkg.price_note,
        badge: pkg.badge,
        is_featured: pkg.is_featured,
        display_order: pkg.display_order,
      });
    });

    return grouped;
  } catch {
    return DEFAULT_PACKAGES;
  }
}

export async function createPricingPackage(pkg: DBPackageItem): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("pricing_packages").insert([
      {
        duration_minutes: pkg.duration_minutes || 45,
        sessions_count: pkg.sessions_count || 8,
        label: pkg.label,
        price: pkg.price,
        price_note: pkg.price_note || "ر.ع. / الشهر",
        badge: pkg.badge,
        is_featured: pkg.is_featured ?? false,
        display_order: pkg.display_order || 0,
      },
    ]);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل إضافة الباقة" };
  }
}

export async function updatePricingPackage(id: string, pkg: Partial<DBPackageItem>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase
      .from("pricing_packages")
      .update({
        duration_minutes: pkg.duration_minutes,
        sessions_count: pkg.sessions_count,
        label: pkg.label,
        price: pkg.price,
        price_note: pkg.price_note,
        badge: pkg.badge,
        is_featured: pkg.is_featured,
        display_order: pkg.display_order,
      })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل تعديل الباقة" };
  }
}

export async function deletePricingPackage(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const { error } = await supabase.from("pricing_packages").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل حذف الباقة" };
  }
}
