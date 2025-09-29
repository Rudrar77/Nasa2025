import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'hi' | 'pt' | 'ru' | 'ar';

interface TranslationDictionary {
  [key: string]: {
    [lang in Language]: string;
  };
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Translation dictionary
const translations: TranslationDictionary = {
  // Navigation
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    zh: '首页',
    ja: 'ホーム',
    hi: 'होम',
    pt: 'Início',
    ru: 'Главная',
    ar: 'الرئيسية'
  },
  'nav.about': {
    en: 'About',
    es: 'Acerca de',
    fr: 'À propos',
    de: 'Über uns',
    zh: '关于',
    ja: 'について',
    hi: 'हमारे बारे में',
    pt: 'Sobre',
    ru: 'О нас',
    ar: 'حول'
  },
  'nav.story': {
    en: 'Solar Story',
    es: 'Historia Solar',
    fr: 'Histoire Solaire',
    de: 'Sonnen Geschichte',
    zh: '太阳故事',
    ja: '太陽の物語',
    hi: 'सौर कहानी',
    pt: 'História Solar',
    ru: 'Солнечная история',
    ar: 'قصة الشمس'
  },
  'nav.solar_system': {
    en: 'Solar System',
    es: 'Sistema Solar',
    fr: 'Système Solaire',
    de: 'Sonnensystem',
    zh: '太阳系',
    ja: '太陽系',
    hi: 'सौर मंडल',
    pt: 'Sistema Solar',
    ru: 'Солнечная система',
    ar: 'النظام الشمسي'
  },
  'nav.space_weather': {
    en: 'Space Weather',
    es: 'Clima Espacial',
    fr: 'Météo Spatiale',
    de: 'Weltraumwetter',
    zh: '太空天气',
    ja: '宇宙天気',
    hi: 'अंतरिक्ष मौसम',
    pt: 'Clima Espacial',
    ru: 'Космическая погода',
    ar: 'طقس الفضاء'
  },
  'nav.adventure': {
    en: 'Adventure',
    es: 'Aventura',
    fr: 'Aventure',
    de: 'Abenteuer',
    zh: '冒险',
    ja: '冒険',
    hi: 'साहसिक',
    pt: 'Aventura',
    ru: 'Приключение',
    ar: 'مغامرة'
  },
  'nav.quiz': {
    en: 'Space Quiz',
    es: 'Quiz Espacial',
    fr: 'Quiz Spatial',
    de: 'Weltraum-Quiz',
    zh: '太空测验',
    ja: '宇宙クイズ',
    hi: 'अंतरिक्ष प्रश्नोत्तरी',
    pt: 'Quiz Espacial',
    ru: 'Космический тест',
    ar: 'اختبار الفضاء'
  },
  'nav.solar_flare': {
    en: 'Solar Defense',
    es: 'Defensa Solar',
    fr: 'Défense Solaire',
    de: 'Sonnenverteidigung',
    zh: '太阳防御',
    ja: '太陽防衛',
    hi: 'सौर रक्षा',
    pt: 'Defesa Solar',
    ru: 'Солнечная защита',
    ar: 'دفاع شمسي'
  },
  'nav.start': {
    en: 'Start',
    es: 'Iniciar',
    fr: 'Commencer',
    de: 'Start',
    zh: '开始',
    ja: 'スタート',
    hi: 'शुरू करें',
    pt: 'Iniciar',
    ru: 'Начать',
    ar: 'ابدأ'
  },

  // Space Weather Story
  'story.title': {
    en: 'The Solar Flare Journey',
    es: 'El Viaje de las Erupciones Solares',
    fr: 'Le Voyage des Éruptions Solaires',
    de: 'Die Reise der Sonneneruptionen',
    zh: '太阳耀斑之旅',
    ja: '太陽フレアの旅',
    hi: 'सौर फ्लेयर यात्रा',
    pt: 'A Jornada das Erupções Solares',
    ru: 'Путешествие солнечных вспышек',
    ar: 'رحلة التوهجات الشمسية'
  },
  'story.chapter1': {
    en: 'The Birth of Our Star',
    es: 'El Nacimiento de Nuestra Estrella',
    fr: 'La Naissance de Notre Étoile',
    de: 'Die Geburt Unseres Sterns',
    zh: '我们恒星的诞生',
    ja: '私たちの星の誕生',
    hi: 'हमारे सितारे का जन्म',
    pt: 'O Nascimento de Nossa Estrela',
    ru: 'Рождение нашей звезды',
    ar: 'ميلاد نجمنا'
  },
  'story.chapter2': {
    en: 'Solar Activity Cycles',
    es: 'Ciclos de Actividad Solar',
    fr: 'Cycles d\'Activité Solaire',
    de: 'Sonnenaktivitätszyklen',
    zh: '太阳活动周期',
    ja: '太陽活動周期',
    hi: 'सौर गतिविधि चक्र',
    pt: 'Ciclos de Atividade Solar',
    ru: 'Циклы солнечной активности',
    ar: 'دورات النشاط الشمسي'
  },

  // Solar System
  'solar.sun': {
    en: 'The Sun',
    es: 'El Sol',
    fr: 'Le Soleil',
    de: 'Die Sonne',
    zh: '太阳',
    ja: '太陽',
    hi: 'सूरज',
    pt: 'O Sol',
    ru: 'Солнце',
    ar: 'الشمس'
  },
  'solar.mercury': {
    en: 'Mercury',
    es: 'Mercurio',
    fr: 'Mercure',
    de: 'Merkur',
    zh: '水星',
    ja: '水星',
    hi: 'बुध',
    pt: 'Mercúrio',
    ru: 'Меркурий',
    ar: 'عطارد'
  },
  'solar.venus': {
    en: 'Venus',
    es: 'Venus',
    fr: 'Vénus',
    de: 'Venus',
    zh: '金星',
    ja: '金星',
    hi: 'शुक्र',
    pt: 'Vênus',
    ru: 'Венера',
    ar: 'الزهرة'
  },
  'solar.earth': {
    en: 'Earth',
    es: 'Tierra',
    fr: 'Terre',
    de: 'Erde',
    zh: '地球',
    ja: '地球',
    hi: 'पृथ्वी',
    pt: 'Terra',
    ru: 'Земля',
    ar: 'الأرض'
  },

  // Common UI elements
  'ui.next': {
    en: 'Next',
    es: 'Siguiente',
    fr: 'Suivant',
    de: 'Weiter',
    zh: '下一个',
    ja: '次へ',
    hi: 'अगला',
    pt: 'Próximo',
    ru: 'Далее',
    ar: 'التالي'
  },
  'ui.previous': {
    en: 'Previous',
    es: 'Anterior',
    fr: 'Précédent',
    de: 'Zurück',
    zh: '上一个',
    ja: '前へ',
    hi: 'पिछला',
    pt: 'Anterior',
    ru: 'Назад',
    ar: 'السابق'
  },
  'ui.loading': {
    en: 'Loading...',
    es: 'Cargando...',
    fr: 'Chargement...',
    de: 'Laden...',
    zh: '加载中...',
    ja: '読み込み中...',
    hi: 'लोड हो रहा है...',
    pt: 'Carregando...',
    ru: 'Загрузка...',
    ar: 'جارٍ التحميل...'
  },

  // Accessibility
  'a11y.skip_to_content': {
    en: 'Skip to main content',
    es: 'Saltar al contenido principal',
    fr: 'Aller au contenu principal',
    de: 'Zum Hauptinhalt springen',
    zh: '跳转到主要内容',
    ja: 'メインコンテンツへスキップ',
    hi: 'मुख्य सामग्री पर जाएं',
    pt: 'Pular para o conteúdo principal',
    ru: 'Перейти к основному содержимому',
    ar: 'تخطي إلى المحتوى الرئيسي'
  },

  // Error messages
  'error.offline': {
    en: 'You are currently offline. Some features may not be available.',
    es: 'Actualmente estás desconectado. Algunas funciones pueden no estar disponibles.',
    fr: 'Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent ne pas être disponibles.',
    de: 'Sie sind derzeit offline. Einige Funktionen sind möglicherweise nicht verfügbar.',
    zh: '您当前处于离线状态。某些功能可能不可用。',
    ja: '現在オフラインです。一部の機能が利用できない可能性があります。',
    hi: 'आप वर्तमान में ऑफ़लाइन हैं। कुछ सुविधाएँ उपलब्ध नहीं हो सकती हैं।',
    pt: 'Você está atualmente offline. Alguns recursos podem não estar disponíveis.',
    ru: 'Вы сейчас в автономном режиме. Некоторые функции могут быть недоступны.',
    ar: 'أنت حاليًا غير متصل. قد لا تكون بعض الميزات متاحة.'
  }
};

const availableLanguages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' }
];

interface MultiLanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const MultiLanguageProvider: React.FC<MultiLanguageProviderProps> = ({
  children,
  defaultLanguage = 'en'
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get from localStorage, fallback to browser language, then default
    const saved = localStorage.getItem('nasa2025_language') as Language;
    if (saved && availableLanguages.some(lang => lang.code === saved)) {
      return saved;
    }

    const browserLang = navigator.language.split('-')[0] as Language;
    if (availableLanguages.some(lang => lang.code === browserLang)) {
      return browserLang;
    }

    return defaultLanguage;
  });

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('nasa2025_language', lang);

    // Update document language attribute
    document.documentElement.lang = lang;

    // Update document direction for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Set initial document attributes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const t = (key: string, params?: Record<string, string>): string => {
    const translation = translations[key]?.[currentLanguage] || translations[key]?.en || key;

    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(`{{${paramKey}}}`, paramValue),
        translation
      );
    }

    return translation;
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a MultiLanguageProvider');
  }
  return context;
};

// Language selector component
export const LanguageSelector: React.FC<{
  className?: string;
  variant?: 'dropdown' | 'buttons';
}> = ({ className = '', variant = 'dropdown' }) => {
  const { currentLanguage, setLanguage, availableLanguages } = useTranslation();

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {availableLanguages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              currentLanguage === lang.code
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={`Switch to ${lang.name}`}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <select
      value={currentLanguage}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
      aria-label="Select language"
    >
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
};

// Translated text component for dynamic content
export const TranslatedText: React.FC<{
  translationKey: string;
  params?: Record<string, string>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}> = ({ translationKey, params, as: Component = 'span', className = '' }) => {
  const { t } = useTranslation();
  const translatedText = t(translationKey, params);

  return React.createElement(Component, { className }, translatedText);
};

// Hook for formatting numbers and dates according to locale
export const useLocaleFormatting = () => {
  const { currentLanguage } = useTranslation();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(currentLanguage).format(num);
  };

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat(currentLanguage, options).format(date);
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat(currentLanguage, {
      style: 'currency',
      currency
    }).format(amount);
  };

  return { formatNumber, formatDate, formatCurrency };
};

// RTL-aware component wrapper
export const RTLWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const { currentLanguage } = useTranslation();
  const isRTL = currentLanguage === 'ar';

  return (
    <div
      className={`${isRTL ? 'rtl' : 'ltr'} ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </div>
  );
};

export default {
  MultiLanguageProvider,
  useTranslation,
  LanguageSelector,
  TranslatedText,
  useLocaleFormatting,
  RTLWrapper
};