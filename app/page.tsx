import { getPageData } from "@/lib/data";
import SectionRenderer from "@/components/SectionRenderer";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const pageData = await getPageData("home");

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
