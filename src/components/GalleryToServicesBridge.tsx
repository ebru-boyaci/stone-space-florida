/**
 * Galeri (siyah) ile servis kartları (#262626) arasında kısa, yumuşak renk geçişi.
 */
export function GalleryToServicesBridge() {
  return (
    <div
      className="relative isolate z-[2] -mt-[clamp(11rem,30vh,24rem)] min-h-[clamp(7.5rem,16vh,14rem)] w-full overflow-hidden bg-black sm:-mt-[clamp(12rem,32vh,26rem)] sm:min-h-[clamp(8rem,17vh,15rem)] md:-mt-[clamp(13rem,34vh,28rem)]"
      aria-hidden
    >
      {/* Üst: galeriden gelen sert kesiyi yumuşatan hafif ışık — geçiş üst yarıda başlasın */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] max-h-[15rem] bg-[radial-gradient(ellipse_98%_125%_at_50%_-10%,rgba(255,255,255,0.05),transparent_70%)]" />

      {/* Ana geçiş üstte yoğun: ~yarı yükseklikte #262626’ya oturur, altta düz devam */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#000000_0%,#0b0b0b_9%,#181818_20%,#212121_32%,#262626_42%,#262626_100%)]"
        aria-hidden
      />

      {/* Bronz vurgu — kısa bantta üst-orta */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_50%_45%,rgba(168,141,112,0.12),transparent_55%)]" />

      {/* İnce alt şerit: bir sonraki bölümle piksel mükemmel hizalama */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Alt kavis — organik ayrım (SVG, düşük opaklık) */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(2rem,7vw,3.5rem)] w-full text-[#262626]"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          fillOpacity={0.35}
          d="M0 56C240 20 480 20 720 38s480 18 720-6v64H0V56z"
        />
      </svg>
    </div>
  );
}
