/** İletişim: header (h-32 / 36 / 40) + çentik / durum çubuğu güvenli alanı */
export const HEADER_BAR_PADDING =
  "pt-[calc(8rem+env(safe-area-inset-top,0px))] sm:pt-[calc(9rem+env(safe-area-inset-top,0px))] lg:pt-[calc(10rem+env(safe-area-inset-top,0px))]";

/** Koyu içerik sayfaları (projeler, katalog, proje detay) — header yüksekliği ile hizalı */
export const DARK_PAGE_SHELL =
  "min-h-screen min-h-[100dvh] bg-[#0c0c0c] text-zinc-100 pb-[max(6rem,env(safe-area-inset-bottom,0px))] pt-[calc(8rem+env(safe-area-inset-top,0px))] sm:pt-[calc(9rem+env(safe-area-inset-top,0px))] lg:pt-[calc(10rem+env(safe-area-inset-top,0px))]";

/** İlk ekran yüksekliği: header çıkıntısını dikkate alır (h-32 / 36 / 40) */
export const MIN_H_FIRST_SCREEN =
  "min-h-[calc(100dvh-8rem)] sm:min-h-[calc(100dvh-9rem)] lg:min-h-[calc(100dvh-10rem)]";
