"use client";

import { useTranslations } from "next-intl";
import { useLocale, useRouter, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const currentLanguage = languages.find((l) => l.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-2 text-on-surface text-sm"
        aria-label={t("common.search")}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage?.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 rounded-lg bg-surface-container border border-surface shadow-lg z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  locale === lang.code
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
