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
  return DEFAULT_FAQS;
}

export async function createFAQ(_faq: { q: string; a: string; display_order?: number }): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function updateFAQ(_id: string, _faq: { q: string; a: string; display_order?: number }): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}

export async function deleteFAQ(_id: string): Promise<{ success: boolean; error?: string }> {
  return { success: true };
}
