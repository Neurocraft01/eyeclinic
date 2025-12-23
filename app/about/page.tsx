import { getPageData } from "@/lib/data";
import SectionRenderer from "@/components/SectionRenderer";

export default function AboutPage() {
  const pageData = getPageData("about");

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      {pageData.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
