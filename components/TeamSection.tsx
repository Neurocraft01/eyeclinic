
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  title: string;
  items?: TeamMember[];
}

const TeamSection = ({ title, items }: TeamSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark mb-12 text-center">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((doctor, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-64 w-full relative">
                  <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-1">{doctor.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{doctor.role}</p>
                  <p className="text-gray-600 text-sm">{doctor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
