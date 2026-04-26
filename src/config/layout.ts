/** Sabit header satırı yüksekliği — `Header` içindeki `h-32 sm:h-36 lg:h-40` ile aynı kalmalı */
export const HEADER_BAR_TOP = "top-32 sm:top-36 lg:top-40";

/** İletişim tam ekranında içeriği header altına hizalamak için padding (HEADER_BAR_TOP ile eşleşir) */
export const HEADER_BAR_PADDING = "pt-32 sm:pt-36 lg:pt-40";

/** İlk ekran yüksekliği: header çıkıntısını dikkate alır (h-32 / 36 / 40) */
export const MIN_H_FIRST_SCREEN =
  "min-h-[calc(100dvh-8rem)] sm:min-h-[calc(100dvh-9rem)] lg:min-h-[calc(100dvh-10rem)]";
