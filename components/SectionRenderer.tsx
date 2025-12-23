
import { Section } from "@/lib/data";
import Hero from "./Hero";
import AboutPreview from "./AboutPreview";
import ServicesPreview from "./ServicesPreview";
import TechnologySection from "./TechnologySection";
import InsuranceSection from "./InsuranceSection";
import TeamSection from "./TeamSection";
import ServicesList from "./ServicesList";

interface SectionRendererProps {
  section: Section;
}

const SectionRenderer = ({ section }: SectionRendererProps) => {
  switch (section.type) {
    case "hero":
      return (
        <Hero
          title={section.title || ""}
          subtitle={section.subtitle || ""}
          image={section.image}
          buttonText={section.settings?.buttonText}
        />
      );
    case "services-list":
      return (
        <ServicesList
          title={section.title || ""}
          description={section.description}
          items={section.items}
        />
      );
    case "features":
      // We have two types of feature sections: Services and Technology
      // We can distinguish them by ID or maybe add a subtype later.
      // For now, let's use ID convention or just check if it has "technology" in ID.
      if (section.id.includes("technology")) {
        return (
          <TechnologySection
            title={section.title || ""}
            description={section.description || ""}
            items={section.items}
          />
        );
      }
      return (
        <ServicesPreview
          title={section.title || ""}
          description={section.description || ""}
          items={section.items}
        />
      );
    case "content":
      return (
        <AboutPreview
          title={section.title || ""}
          description={section.description || ""}
          image={section.image}
          items={section.items}
        />
      );
    case "text-info":
      return (
        <InsuranceSection
          title={section.title || ""}
          description={section.description || ""}
          items={section.items}
        />
      );
    case "team":
      return (
        <TeamSection
          title={section.title || ""}
          items={section.items}
        />
      );
    default:
      return null;
  }
};

export default SectionRenderer;
