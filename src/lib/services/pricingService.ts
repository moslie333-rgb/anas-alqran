import { supabase } from "@/lib/supabase";

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
  try {
    const { data, error } = await supabase
      .from("pricing_packages")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase fetchPricingPackages warning:", error.message);
      return DEFAULT_PACKAGES;
    }

    const grouped: Record<number, DBPackageItem[]> = { 30: [], 45: [], 60: [] };

    for (const item of data) {
      const dur = Number(item.duration_minutes) || 45;
      if (!grouped[dur]) grouped[dur] = [];
      grouped[dur].push({
        id: item.id,
        duration_minutes: dur,
        sessions_count: Number(item.sessions_count) || 4,
        label: item.label || `${item.sessions_count} حصص شهرياً`,
        price: String(item.price),
        price_note: item.price_note || "ر.ع. / الشهر",
        badge: item.badge || undefined,
        is_featured: Boolean(item.is_featured),
        display_order: item.display_order ?? undefined,
      });
    }

    // Fallback any empty duration bucket to default
    if (!grouped[30] || grouped[30].length === 0) grouped[30] = DEFAULT_PACKAGES[30];
    if (!grouped[45] || grouped[45].length === 0) grouped[45] = DEFAULT_PACKAGES[45];
    if (!grouped[60] || grouped[60].length === 0) grouped[60] = DEFAULT_PACKAGES[60];

    return grouped;
  } catch (err) {
    console.error("fetchPricingPackages error:", err);
    return DEFAULT_PACKAGES;
  }
}

export async function createPricingPackage(
  pkg: DBPackageItem
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("pricing_packages").insert({
      duration_minutes: pkg.duration_minutes || 45,
      sessions_count: pkg.sessions_count,
      label: pkg.label,
      price: pkg.price,
      price_note: pkg.price_note,
      badge: pkg.badge || null,
      is_featured: Boolean(pkg.is_featured),
      display_order: pkg.display_order || 1,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function updatePricingPackage(
  id: string,
  pkg: Partial<DBPackageItem>
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: Record<string, unknown> = {};
    if (pkg.duration_minutes !== undefined) payload.duration_minutes = pkg.duration_minutes;
    if (pkg.sessions_count !== undefined) payload.sessions_count = pkg.sessions_count;
    if (pkg.label !== undefined) payload.label = pkg.label;
    if (pkg.price !== undefined) payload.price = pkg.price;
    if (pkg.price_note !== undefined) payload.price_note = pkg.price_note;
    if (pkg.badge !== undefined) payload.badge = pkg.badge || null;
    if (pkg.is_featured !== undefined) payload.is_featured = Boolean(pkg.is_featured);
    if (pkg.display_order !== undefined) payload.display_order = pkg.display_order;

    const { error } = await supabase
      .from("pricing_packages")
      .update(payload)
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function deletePricingPackage(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("pricing_packages").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
