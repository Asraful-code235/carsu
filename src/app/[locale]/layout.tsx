import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/molecules/presentation/disableDraftMode";
import { HeaderWrapper } from "@/components/organisms/layout/HeaderWrapper";
import { ErrorBoundary } from "@/components/molecules/presentation/ErrorBoundary";
import { FooterWrapper } from "@/components/organisms/layout/FooterWrapper";
import { SanityLive } from "@/sanity/lib/live";
import { locales, isValidLocale, defaultLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Carsu - Car Shop Management",
  description: "Manage your car shop in one powerful app",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  
  // Validate locale
  if (!isValidLocale(localeParam)) {
    notFound();
  }
  
  const locale: Locale = localeParam;
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <ErrorBoundary>
      <HeaderWrapper locale={locale} />
      <main className="bg-white">
        {children}
      </main>
      <FooterWrapper />
      <SanityLive />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </ErrorBoundary>
  );
}
