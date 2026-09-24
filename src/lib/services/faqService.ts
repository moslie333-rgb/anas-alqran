import { supabase } from "@/lib/supabase";

export interface FAQItem {
  id?: string;
  q: string;
  a: string;
  display_order?: number;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "ماذا تشمل الحصة التجريبية المجانية؟",
    a: "تشمل تقييماً مباشراً 1 لـ 1 مع معلم معتمد لمعرفة مستوى الطفل الحالي في القراءة والتجويد وتحديد الخطة الدراسية المناسبة.",
  },
  {
    q: "هل المواعيد مناسبة لجدول المدارس في الخليج؟",
    a: "نعم، نقدم مرونة كاملة في اختيار الأوقات الصباحية والمسائية بما يتناسب مع توقيت السعودية، الإمارات، قطر، وباقي دول الخليج.",
  },
  {
    q: "كيف يمكنني متابعة حفظ وتطور طفلي؟",
    a: "نرسل تقريراً دراسياً شهرياً شاملاً عبر الواتساب يوضح عدد الصفحات المحفوظة، مستوى التجويد، وتوصيات المعلم.",
  },
  {
    q: "من هم المعلمون في أكاديمية أنس القرآن؟",
    a: "نُخبة مختارة بعناية من خريجي الأزهر الشريف أصحاب الإجازات القرآنية والخبرة التربوية في التعامل مع الأطفال.",
  },
  {
    q: "هل يمكن تغيـير الموعد أو المعلم إذا لزم الأمر؟",
    a: "نعم بالتأكيد، يمكنك تعديل المواعيد أو طلب تغيير المعلم في أي وقت بسهولة عبر تواصل مباشر مع مشرف الأكاديمية.",
  },
];

export async function fetchFAQs(): Promise<FAQItem[]> {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase fetchFAQs warning:", error.message);
      return DEFAULT_FAQS;
    }

    return data.map((item) => ({
      id: item.id,
      q: item.question || item.q || "",
      a: item.answer || item.a || "",
      display_order: item.display_order ?? undefined,
    }));
  } catch (err) {
    console.error("fetchFAQs error:", err);
    return DEFAULT_FAQS;
  }
}

export async function createFAQ(faq: {
  q: string;
  a: string;
  display_order?: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("faqs").insert({
      question: faq.q,
      answer: faq.a,
      display_order: faq.display_order || 1,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function updateFAQ(
  id: string,
  faq: { q: string; a: string; display_order?: number }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("faqs")
      .update({
        question: faq.q,
        answer: faq.a,
        display_order: faq.display_order,
      })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

export async function deleteFAQ(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
