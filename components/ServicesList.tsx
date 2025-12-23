import { Icon } from "./Icon";

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesListProps {
  title: string;
  description?: string;
  items?: ServiceItem[];
}

const ServicesList = ({ title, description, items }: ServicesListProps) => {
  if (!items) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">{title}</h2>}
          {description && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {items.map((service, index) => {
          return (
            <div key={service.id || index} id={service.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={service.icon} className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesList;
