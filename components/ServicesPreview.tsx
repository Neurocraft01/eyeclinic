import Link from "next/link";
import { Icon } from "./Icon";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServicesPreviewProps {
  title: string;
  description: string;
  items?: ServiceItem[];
}

const ServicesPreview = ({ title, description, items }: ServicesPreviewProps) => {
  const defaultServices = [
    {
      title: "Comprehensive Eye Exams",
      description: "Thorough evaluation of your vision and eye health using state-of-the-art diagnostic technology.",
      icon: "Eye",
    },
    {
      title: "Laser Vision Correction",
      description: "Advanced LASIK and PRK procedures to reduce or eliminate your dependence on glasses.",
      icon: "Microscope",
    },
    {
      title: "Pediatric Ophthalmology",
      description: "Specialized care for children's vision, from routine exams to complex condition management.",
      icon: "Activity",
    },
    {
      title: "Optical Boutique",
      description: "A curated collection of designer frames and premium lenses to suit your style and needs.",
      icon: "Glasses",
    },
  ];

  const displayServices = items && items.length > 0 ? items : defaultServices;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.map((service, index) => {
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon name={service.icon} className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href="/services" 
                  className="text-primary font-medium hover:text-secondary inline-flex items-center transition-colors"
                >
                  Learn more &rarr;
                </Link>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services" 
            className="inline-block px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
