import { getPageData } from "@/lib/data";
import SectionRenderer from "@/components/SectionRenderer";

export const metadata = {
  title: "Our Services - Visionary Eye Clinic",
  description: "Explore our comprehensive eye care services including exams, surgery, and pediatric care.",
};

// Force dynamic rendering so we always get the latest data
export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const pageData = await getPageData("services");

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
