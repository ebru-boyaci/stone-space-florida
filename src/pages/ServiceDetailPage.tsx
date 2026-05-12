import { getServiceDetail } from "@/data/serviceDetails";
import { Link, Navigate, useParams } from "react-router-dom";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const detail = slug ? getServiceDetail(slug) : undefined;

  if (!detail) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] pb-[max(6rem,env(safe-area-inset-bottom,0px))] pt-[calc(12.5rem+env(safe-area-inset-top,0px))] text-zinc-100">
      <div className="mx-auto flex w-full max-w-[min(96vw,80rem)] flex-col pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:px-8 lg:px-10">
        <header className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-sm">{detail.kicker}</p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,2.85rem)] font-medium tracking-[-0.02em] text-white">
            {detail.title}
          </h1>
          <div className="mt-3 max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]">
            {detail.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#b9a086] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1816] transition-colors hover:bg-[#c9b59a] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#b9a086]"
            >
              Contact us
            </Link>
            <Link to="/" className="text-sm text-zinc-500 underline decoration-zinc-600 underline-offset-4 hover:text-zinc-300">
              Back to home
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
