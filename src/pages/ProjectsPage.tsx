import { DARK_PAGE_SHELL } from "@/config/layout";
import { PROJECTS } from "@/data/projects";
import { Link } from "react-router-dom";

export function ProjectsPage() {
  return (
    <div className={DARK_PAGE_SHELL}>
      <div className="project-page-shell flex flex-col py-8 sm:py-10 lg:py-12">
        <header className="w-full border-b border-white/[0.08] pb-10 sm:pb-12">
          <p className="text-sm font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-base">Portfolio</p>
          <h1 className="mt-2 font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-medium tracking-[-0.02em] text-white">
            Projects
          </h1>
          <p className="mt-5 max-w-4xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Completed kitchens, baths, and full-home renovations—documented with the surfaces, cabinetry, and
            finishes specified on each job.
          </p>
          <p className="mt-6">
            <Link
              to="/before-after"
              className="text-sm text-[#b9a086] underline decoration-[#b9a086]/40 underline-offset-4 transition-colors hover:text-[#c9ae88] sm:text-base"
            >
              See before &amp; after transformations →
            </Link>
          </p>
        </header>

        <ul className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:gap-12">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-sm border border-white/[0.08] bg-zinc-900/30 transition-colors hover:border-white/[0.14] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#b9a086]"
              >
                <figure className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="border-t border-white/[0.06] p-5 sm:p-7">
                  <p className="text-sm font-semibold tracking-[0.22em] text-[#b9a086] uppercase sm:text-base">
                    {project.location}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">{project.summary}</p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 transition-colors group-hover:text-[#b9a086] sm:text-base">
                    View project →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
