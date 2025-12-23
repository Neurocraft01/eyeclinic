import { getPageData } from "@/lib/data";
import SectionRenderer from "@/components/SectionRenderer";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const pageData = await getPageData("about");

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
