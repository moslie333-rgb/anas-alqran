import { supabase } from "@/lib/supabase";

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
  try {
    const { data, error } = await supabase
      .from("academy_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase fetchAcademySettings:", error.message);
      return DEFAULT_ACADEMY_SETTINGS;
    }

    return {
      id: data.id,
      hero_title: data.hero_title || DEFAULT_ACADEMY_SETTINGS.hero_title,
      hero_subtitle: data.hero_subtitle || DEFAULT_ACADEMY_SETTINGS.hero_subtitle,
      hero_image_url: data.hero_image_url || DEFAULT_ACADEMY_SETTINGS.hero_image_url,
      whatsapp_number: data.whatsapp_number || DEFAULT_ACADEMY_SETTINGS.whatsapp_number,
      whatsapp_url: data.whatsapp_url || DEFAULT_ACADEMY_SETTINGS.whatsapp_url,
      instagram_url: data.instagram_url || DEFAULT_ACADEMY_SETTINGS.instagram_url,
      facebook_url: data.facebook_url || DEFAULT_ACADEMY_SETTINGS.facebook_url,
      trust_certified_teachers_count:
        data.trust_certified_teachers_count || DEFAULT_ACADEMY_SETTINGS.trust_certified_teachers_count,
      trust_completed_lessons_count:
        data.trust_completed_lessons_count || DEFAULT_ACADEMY_SETTINGS.trust_completed_lessons_count,
      trust_satisfaction_rating:
        data.trust_satisfaction_rating || DEFAULT_ACADEMY_SETTINGS.trust_satisfaction_rating,
    };
  } catch (err) {
    console.error("fetchAcademySettings error:", err);
    return DEFAULT_ACADEMY_SETTINGS;
  }
}

export async function updateAcademySettings(
  settings: Partial<AcademySettings>
): Promise<{ success: boolean; error?: string }> {
  try {
    const updatePayload: Record<string, unknown> = {
      ...settings,
      updated_at: new Date().toISOString(),
    };
    delete updatePayload.id;

    if (settings.id) {
      const { error } = await supabase
        .from("academy_settings")
        .update(updatePayload)
        .eq("id", settings.id);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    }

    const { data: existing } = await supabase
      .from("academy_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await supabase
        .from("academy_settings")
        .update(updatePayload)
        .eq("id", existing.id);

      if (error) return { success: false, error: error.message };
      return { success: true };
    }

    const { error: insertError } = await supabase
      .from("academy_settings")
      .insert(updatePayload);

    if (insertError) return { success: false, error: insertError.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
