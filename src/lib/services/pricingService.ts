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
  return DEFAULT_PACKAGES;
}

export async function createPricingPackage(_pkg: DBPackageItem): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function updatePricingPackage(_id: string, _pkg: Partial<DBPackageItem>): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function deletePricingPackage(_id: string): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}
