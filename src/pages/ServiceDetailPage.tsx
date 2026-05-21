import { HEADER_BAR_PADDING } from "@/config/layout";
import { getServiceDetail } from "@/data/serviceDetails";
import { Link, Navigate, useParams } from "react-router-dom";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const detail = slug ? getServiceDetail(slug) : undefined;

  if (!detail) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="service-detail-page min-h-screen min-h-[100dvh] bg-[#f2efe8] text-zinc-900">
      <div
        className={`service-detail-page__nav-band bg-[#5a5854] ${HEADER_BAR_PADDING}`}
        aria-hidden
      />

      <main className="service-detail-page__main pb-[max(6rem,env(safe-area-inset-bottom,0px))]">
        <div className="service-page-shell py-8 sm:py-10 lg:py-12">
          <Link
            to="/"
            className="mb-6 inline-block text-base text-[#8a7358]/90 underline decoration-[#8a7358]/35 underline-offset-4 transition-colors hover:text-[#8a7358] sm:mb-8 sm:text-lg"
          >
            ← Home
          </Link>

          <div className="service-detail-content">
            <div className="service-detail-content__copy min-w-0">
              <div className="service-detail-page__intro">
                <p className="text-sm font-semibold tracking-[0.28em] text-[#8a7358] uppercase sm:text-base">
                  {detail.kicker}
                </p>
                <h1 className="mt-2 font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-[-0.02em] text-zinc-900">
                  {detail.title}
                </h1>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-600 sm:text-xl">
                  {detail.summary}
                </p>
              </div>

              <div className="mt-8 space-y-5 text-pretty text-lg leading-relaxed text-zinc-700 sm:mt-10 sm:text-xl sm:leading-relaxed">
                {detail.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-10">
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#a88d70] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#968061] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a88d70] sm:text-base"
                >
                  Contact us
                </Link>
              </p>
            </div>

            <figure className="service-detail-page__cover">
              <img
                src={detail.coverImage}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </main>
    </div>
  );
}
