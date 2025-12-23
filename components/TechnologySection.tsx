import { Microscope, ScanEye, MonitorPlay, Zap, Eye, Glasses, Activity, ShieldCheck, CreditCard, Wallet } from "lucide-react";

const iconMap: any = {
  Eye, Glasses, Activity, Microscope, ScanEye, Zap, MonitorPlay, ShieldCheck, CreditCard, Wallet
};

interface TechItem {
  title: string;
  description: string;
  icon: string;
}

interface TechnologySectionProps {
  title: string;
  description: string;
  items?: TechItem[];
}

const TechnologySection = ({ title, description, items }: TechnologySectionProps) => {
  const defaultTechnologies = [
    {
      title: "OCT Imaging",
      description: "Optical Coherence Tomography provides high-resolution cross-sectional images of the retina.",
      icon: "ScanEye",
    },
    {
      title: "Femtosecond Laser",
      description: "Blade-free laser technology for precise corneal incisions during cataract and LASIK surgery.",
      icon: "Zap",
    },
    {
      title: "Digital Retinal Photography",
      description: "High-definition imaging to document and monitor the health of the back of your eye.",
      icon: "MonitorPlay",
    },
    {
      title: "Corneal Topography",
      description: "Detailed mapping of the surface curvature of the cornea for precise contact lens fitting.",
      icon: "Microscope",
    },
  ];

  const displayTechnologies = items && items.length > 0 ? items : defaultTechnologies;

  return (
    <section className="py-20 bg-dark text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-accent blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTechnologies.map((tech, index) => {
            const IconComponent = iconMap[tech.icon] || ScanEye;
            return (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 text-accent">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
