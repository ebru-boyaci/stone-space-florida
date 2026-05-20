import { getServiceDetail } from "@/data/serviceDetails";
import { Link, Navigate, useParams } from "react-router-dom";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const detail = slug ? getServiceDetail(slug) : undefined;

  if (!detail) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="service-detail-page min-h-screen min-h-[100dvh] bg-[#e8e4dc] text-zinc-900">
      <div className="service-detail-page__nav-band bg-[#5a5854] pt-[calc(12.5rem+env(safe-area-inset-top,0px))] text-[#f2efe8]">
        <div className="service-page-shell pb-4">
          <Link
            to="/"
            className="text-base text-[#f2efe8]/75 underline decoration-[#f2efe8]/35 underline-offset-4 transition-colors hover:text-[#f2efe8] sm:text-lg"
          >
            ← Home
          </Link>
        </div>
      </div>

      <header className="service-detail-page__hero border-b border-zinc-900/10 bg-[#f2efe8]">
        <div className="service-page-shell py-8 sm:py-10 lg:py-12">
          <div className="service-detail-hero md:grid md:grid-cols-[minmax(0,1fr)_clamp(16rem,36vw,28rem)] md:items-start md:gap-x-10 lg:gap-x-14">
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-[0.28em] text-[#8a7358] uppercase sm:text-base">
                {detail.kicker}
              </p>
              <h1 className="mt-2 font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-[-0.02em] text-zinc-900">
                {detail.title}
              </h1>
              <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-zinc-600 sm:text-xl">
                {detail.summary}
              </p>
            </div>

            <figure className="service-detail-page__cover mx-auto mt-8 w-full max-w-[20rem] md:mx-0 md:mt-0 md:max-w-none md:justify-self-end">
              <div className="overflow-hidden rounded-sm border border-zinc-900/10 bg-[#ebe6dd] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.2)]">
                <img
                  src={detail.coverImage}
                  alt=""
                  className="block h-auto w-full object-contain object-center"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </figure>
          </div>
        </div>
      </header>

      <article className="service-detail-page__body bg-[#f2efe8] pb-[max(6rem,env(safe-area-inset-bottom,0px))]">
        <div className="service-page-shell py-8 sm:py-10">
          <div className="max-w-3xl space-y-5 text-pretty text-lg leading-relaxed text-zinc-700 sm:text-xl sm:leading-relaxed">
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
      </article>
    </div>
  );
}
