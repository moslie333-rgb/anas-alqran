import { supabase, isSupabaseConfigured } from "../supabase";

export interface AcademySettings {
  id?: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  whatsapp_number: string;
  whatsapp_url: string;
  instagram_url: string;
  facebook_url: string;
  trust_certified_teachers_count: string;
  trust_completed_lessons_count: string;
  trust_satisfaction_rating: string;
}

export const DEFAULT_ACADEMY_SETTINGS: AcademySettings = {
  hero_title: "نُنشِئ طِفلَك على حُبِّ القرآن الكَريم بصُحبَةِ مُعَلِّمينَ مُعتَمَدين",
  hero_subtitle: "دروس أونلاين خاصة 1 لـ 1 تجمع بين روعة التلاوة، إتقان الأحكام، والبيئة التربوية المحفزة لطفلك في بيتك.",
  hero_image_url: "/images/hero.jpg",
  whatsapp_number: "+96890618718",
  whatsapp_url: "https://wa.me/+96890618718",
  instagram_url: "https://www.instagram.com/anasalquran.om?igsh=Z3QycGRndjQzemlm",
  facebook_url: "https://www.facebook.com/share/1T7FFijVQz/",
  trust_certified_teachers_count: "معلمون معتمدون من الأزهر",
  trust_completed_lessons_count: "+300 حصة",
  trust_satisfaction_rating: "4.9 / 5",
};

export async function fetchAcademySettings(): Promise<AcademySettings> {
  if (!isSupabaseConfigured) {
    return DEFAULT_ACADEMY_SETTINGS;
  }

  try {
    const { data, error } = await supabase
      .from("academy_settings")
      .select("*")
      .single();

    if (error || !data) {
      return DEFAULT_ACADEMY_SETTINGS;
    }

    return data as AcademySettings;
  } catch {
    return DEFAULT_ACADEMY_SETTINGS;
  }
}

export async function updateAcademySettings(settings: Partial<AcademySettings>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const current = await fetchAcademySettings();
    if (current.id) {
      const { error } = await supabase
        .from("academy_settings")
        .update(settings)
        .eq("id", current.id);
      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase
        .from("academy_settings")
        .insert([{ ...DEFAULT_ACADEMY_SETTINGS, ...settings }]);
      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "فشل حفظ إعدادات الأكاديمية" };
  }
}
