import { DARK_PAGE_SHELL } from "@/config/layout";
import { MaterialSwatchLightbox } from "@/components/MaterialSwatchLightbox";
import {
  ProjectVideoOrientationProbe,
  ProjectWalkthroughVideo,
  type VideoOrientation,
} from "@/components/ProjectWalkthroughVideo";
import { getProject, PROJECT_SLUG_REDIRECTS } from "@/data/projects";
import { resolveMaterialSwatches } from "@/data/materialSwatches";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function MaterialsSpecified({
  materials,
}: {
  materials: { category: string; name: string }[];
}) {
  const [preview, setPreview] = useState<{ src: string; label: string } | null>(null);

  return (
    <section className="mt-8 sm:mt-10" aria-labelledby="materials-heading">
      <h2
        id="materials-heading"
        className="text-sm font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-base"
      >
        Materials specified
      </h2>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {materials.map((m, index) => {
          const swatches = resolveMaterialSwatches(m.name);

          return (
            <div
              key={m.category}
              className={`rounded-sm border border-white/[0.08] bg-zinc-900/25 px-5 py-5 sm:px-6 sm:py-6 ${
                materials.length % 2 === 1 && index === materials.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <dt className="text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase sm:text-base">
                {m.category}
              </dt>
              <dd className="mt-3">
                {swatches.length > 0 ? (
                  <ul className="flex flex-wrap gap-3">
                    {swatches.map((swatch) => (
                      <li key={swatch.label} className="flex min-w-[4.5rem] flex-col items-center gap-2">
                        <button
                          type="button"
                          className="group block overflow-hidden rounded-sm border border-white/[0.12] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] transition-colors hover:border-[#b9a086]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9a086]"
                          onClick={() => setPreview({ src: swatch.image, label: swatch.label })}
                          aria-label={`Enlarge ${swatch.label}`}
                        >
                          <img
                            src={swatch.image}
                            alt=""
                            className="h-16 w-16 object-cover object-center transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                        <span className="max-w-[5.5rem] text-center text-xs leading-snug text-zinc-400 sm:text-sm">
                          {swatch.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-lg font-medium text-white sm:text-xl">{m.name}</span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>

      {preview ? (
        <MaterialSwatchLightbox
          label={preview.label}
          src={preview.src}
          onClose={() => setPreview(null)}
        />
      ) : null}
    </section>
  );
}

function ProjectFeaturedImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="project-detail-feature mx-auto mt-8 w-full md:mx-0 md:mt-0 md:w-full md:justify-self-stretch md:self-start">
      <div className="project-detail-feature__frame overflow-hidden rounded-sm border border-white/[0.08] bg-zinc-900/40 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]">
        <img src={src} alt={alt} className="block h-auto w-full object-cover" loading="eager" decoding="async" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-base text-zinc-500 md:text-right sm:text-lg">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ProjectIntro({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  return (
    <>
      <p className="text-sm font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-base">
        {project.kicker}
      </p>
      <h1 className="mt-2 font-serif text-[clamp(2.35rem,5vw,3.75rem)] font-medium tracking-[-0.02em] text-white">
        {project.title}
      </h1>
      <p className="mt-2 text-base tracking-wide text-zinc-500 sm:text-lg">{project.location}</p>
      <div className="mt-5 space-y-5 text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl sm:leading-relaxed">
        {project.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (slug && PROJECT_SLUG_REDIRECTS[slug]) {
    return <Navigate to={`/projects/${PROJECT_SLUG_REDIRECTS[slug]}`} replace />;
  }

  const project = slug ? getProject(slug) : undefined;

  const [videoLayout, setVideoLayout] = useState<VideoOrientation | "pending">("pending");

  useEffect(() => {
    setVideoLayout(project?.videoOrientation ?? "pending");
  }, [project?.slug, project?.videoOrientation]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const hasVideo = Boolean(project.video);
  const resolvedLayout: VideoOrientation | null =
    videoLayout !== "pending" ? videoLayout : (project.videoOrientation ?? null);
  const isPortrait = hasVideo && resolvedLayout === "portrait";
  const isLandscape = hasVideo && resolvedLayout === "landscape";
  const singleImageHero = !hasVideo && project.gallery.length === 1;
  const featuredImage = singleImageHero ? project.gallery[0] : null;
  const showGallery = project.gallery.length > 1 || (project.gallery.length === 1 && hasVideo);

  const handleOrientation = (orientation: VideoOrientation) => {
    setVideoLayout(orientation);
  };

  return (
    <div className={DARK_PAGE_SHELL}>
      <div className="project-page-shell relative flex flex-col">
        {hasVideo && project.video && videoLayout === "pending" && !project.videoOrientation ? (
          <ProjectVideoOrientationProbe src={project.video} onOrientation={handleOrientation} />
        ) : null}

        <header className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <Link
            to="/projects"
            className="text-base text-zinc-500 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-zinc-300 sm:text-lg"
          >
            ← All projects
          </Link>

          {isPortrait && project.video ? (
            <div className="project-detail-hero project-detail-hero--split mt-6 md:grid md:items-start">
              <div className="min-w-0">
                <ProjectIntro project={project} />
                <MaterialsSpecified materials={project.materials} />
              </div>
              <ProjectWalkthroughVideo
                src={project.video}
                title={project.title}
                hint={project.videoOrientation}
                layout={videoLayout}
                onOrientation={handleOrientation}
              />
            </div>
          ) : singleImageHero && featuredImage ? (
            <div className="project-detail-hero project-detail-hero--split mt-6 md:grid md:items-start">
              <div className="min-w-0">
                <ProjectIntro project={project} />
                <MaterialsSpecified materials={project.materials} />
              </div>
              <ProjectFeaturedImage
                src={featuredImage.src}
                alt={featuredImage.alt}
                caption={featuredImage.caption}
              />
            </div>
          ) : (
            <div className="mt-6 min-w-0">
              <ProjectIntro project={project} />
              <MaterialsSpecified materials={project.materials} />
            </div>
          )}
        </header>

        {isLandscape && project.video ? (
          <section className="mt-10 border-b border-white/[0.08] pb-10 sm:mt-12 sm:pb-12">
            <ProjectWalkthroughVideo
              src={project.video}
              title={project.title}
              hint={project.videoOrientation}
              layout={videoLayout}
              onOrientation={handleOrientation}
            />
          </section>
        ) : null}

        {showGallery ? (
          <section className="mt-12 sm:mt-14" aria-labelledby="gallery-heading">
            <h2
              id="gallery-heading"
              className="text-sm font-semibold tracking-[0.28em] text-[#b9a086] uppercase sm:text-base"
            >
              Gallery
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12">
              {project.gallery.map((item, index) => (
                <li
                  key={item.id}
                  className={
                    item.orientation === "landscape" ? "sm:col-span-2 flex justify-center" : undefined
                  }
                >
                  <figure
                    className={`overflow-hidden rounded-sm border border-white/[0.08] bg-zinc-900/40 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] ${
                      item.orientation === "landscape"
                        ? "project-gallery__figure--landscape w-full"
                        : "w-full"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`block h-auto ${
                        item.orientation === "landscape"
                          ? "project-gallery__img--landscape w-full"
                          : "w-full"
                      }`}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <figcaption className="border-t border-white/[0.06] px-4 py-3.5 text-base text-zinc-400 sm:px-5 sm:py-4 sm:text-lg">
                      {item.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
