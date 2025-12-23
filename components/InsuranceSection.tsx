import { CreditCard, ShieldCheck, Wallet, Eye, Glasses, Activity, Microscope, ScanEye, Zap, MonitorPlay } from "lucide-react";

const iconMap: any = {
  Eye, Glasses, Activity, Microscope, ScanEye, Zap, MonitorPlay, ShieldCheck, CreditCard, Wallet
};

interface InsuranceItem {
  text: string;
  icon: string;
}

interface InsuranceSectionProps {
  title: string;
  description: string;
  items?: InsuranceItem[];
}

const InsuranceSection = ({ title, description, items }: InsuranceSectionProps) => {
  const defaultItems = [
    { text: "Accepted by major insurance providers", icon: "ShieldCheck" },
    { text: "FSA and HSA cards welcome", icon: "CreditCard" },
    { text: "0% financing available via CareCredit", icon: "Wallet" }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">{title}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-4">
              {displayItems.map((item, index) => {
                const IconComponent = iconMap[item.icon] || ShieldCheck;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">We Partner With</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for Insurance Logos - Using text for now to avoid broken images */}
                <div className="h-12 flex items-center justify-center border border-gray-200 rounded bg-gray-50 font-bold text-gray-400">BlueCross</div>
                <div className="h-12 flex items-center justify-center border border-gray-200 rounded bg-gray-50 font-bold text-gray-400">Aetna</div>
                <div className="h-12 flex items-center justify-center border border-gray-200 rounded bg-gray-50 font-bold text-gray-400">Cigna</div>
                <div className="h-12 flex items-center justify-center border border-gray-200 rounded bg-gray-50 font-bold text-gray-400">United</div>
                <div className="h-12 flex items-center justify-center border border-gray-200 rounded bg-gray-50 font-bold text-gray-400">Humana</div>
                <div className="h-12 flex items-center justify-center border border-gray-200 rounded bg-gray-50 font-bold text-gray-400">Medicare</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;
