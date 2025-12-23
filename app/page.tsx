import { getPageData } from "@/lib/data";
import SectionRenderer from "@/components/SectionRenderer";

export default function Home() {
  const pageData = getPageData("home");

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {pageData.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
