import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface AboutPreviewProps {
  title: string;
  description: string;
  image?: string;
  items?: string[];
}

const AboutPreview = ({ title, description, image, items }: AboutPreviewProps) => {
  const defaultItems = [
    "State-of-the-art Diagnostic Equipment",
    "Experienced Medical Team",
    "Personalized Treatment Plans",
    "Comfortable & Modern Facility"
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
               {/* Placeholder for an actual image */}
               <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                  <Image 
                    src={image || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"}
                    alt="Doctor examining patient" 
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-4xl font-bold text-primary">25+</div>
                <div className="text-sm text-gray-600 font-medium leading-tight">Years of<br/>Experience</div>
              </div>
              <p className="text-xs text-gray-500">Serving our community with dedication and care since 1999.</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              {title}
            </h2>
            <div className="text-lg text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
              {description}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {displayItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-3 bg-dark text-white font-medium rounded-md hover:bg-primary transition-colors duration-300"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
