import { CraftShowcaseSection } from "@/components/CraftShowcaseSection";
import { FeatureValueGrid } from "@/components/FeatureValueGrid";
import { HeroWithCollage } from "@/components/HeroCollage";
import { ProductsSpotlightSection } from "@/components/ProductsSpotlightSection";
import { ScrollGallery } from "@/components/ScrollGallery";
import { ScrollRevealTextSection } from "@/components/ScrollRevealTextSection";
import { ServicesMarqueeBand } from "@/components/ServicesMarqueeBand";
import { ServicesJourneySection } from "@/components/ServicesJourneySection";
import { StoneSpacesMarquee } from "@/components/StoneSpacesMarquee";

type HomeSectionsProps = {
  homeEntranceKey: number;
  onHeroFirstGesture: () => void;
  onHeroUnlockDocument: () => void;
  onHeroRest: () => void;
};

export function HomeSections({
  homeEntranceKey,
  onHeroFirstGesture,
  onHeroUnlockDocument,
  onHeroRest,
}: HomeSectionsProps) {
  return (
    <>
      <HeroWithCollage
        homeEntranceKey={homeEntranceKey}
        onHeroFirstGesture={onHeroFirstGesture}
        onHeroUnlockDocument={onHeroUnlockDocument}
        onHeroRest={onHeroRest}
      >
        <p className="-mt-2 mb-6 max-w-[min(100%,32rem)] px-2 text-center text-[0.8rem] font-medium tracking-[0.28em] text-white/40 uppercase sm:-mt-3 sm:mb-10 sm:text-lg sm:tracking-[0.38em]">
          Stone Spaces · Florida
        </p>
        <h1 className="relative mx-auto mt-0 grid w-full max-w-[min(98vw,96rem)] place-items-center px-2 sm:mt-1 sm:px-1">
          <span className="col-start-1 row-start-1 max-w-full -translate-y-1 text-center font-hero-serif text-[clamp(3.35rem,20vw,17.25rem)] font-medium leading-[0.9] tracking-[-0.03em] text-hero-serif [text-shadow:0_4px_48px_rgba(0,0,0,0.55)] sm:text-[clamp(6.45rem,26.5vw,17.25rem)] sm:-translate-y-2">
            Surfaces
          </span>
          <span className="col-start-1 row-start-1 z-[2] mt-[clamp(5.25rem,17vw,15.5rem)] max-w-[min(96vw,64rem)] text-center font-hero-script text-[clamp(3.35rem,15vw,13rem)] leading-[0.85] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.65)] sm:mt-[clamp(9.25rem,23.5vw,15.5rem)] sm:text-[clamp(5.45rem,20.5vw,13rem)] sm:ml-[clamp(-0.25rem,-1.5vw,0.75rem)]">
            refined
          </span>
        </h1>
      </HeroWithCollage>

      <ScrollGallery />
      <ProductsSpotlightSection />
      <ServicesJourneySection />
      <ServicesMarqueeBand />
      <FeatureValueGrid />
      <CraftShowcaseSection />
      <ScrollRevealTextSection />
      <StoneSpacesMarquee />
    </>
  );
}
