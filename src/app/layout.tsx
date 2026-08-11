import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anasquran.com"),
  title: "أنس القرآن | أكاديمية تعليم القرآن الكريم للأطفال والعائلات في الخليج",
  description: "أكاديمية دولية لتعليم القرآن الكريم والتجويد والقاعدة النورانية للأطفال 1 لـ 1 أونلاين بصحبة نخبة من المعلمين المعتمدين من الأزهر الشريف.",
  keywords: ["تعليم القرآن للأطفال", "أكاديمية قرآن أونلاين", "حفظ القرآن الخليج", "معلم قرآن خصوصي", "التجويد والقاعدة النورانية"],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "أنس القرآن | التعليم القرآني الرقمي الأرقى للأطفال",
    description: "رحلة إيمانية مخصصة لطفلك مع أفضل معلمي القرآن المعتمدين في الخليج العربي.",
    images: ["/images/logo.png"],
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#07111F] text-white selection:bg-[#4A7DFF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
