import { 
  Eye, Glasses, Activity, Microscope, ScanEye, Zap, MonitorPlay, 
  ShieldCheck, CreditCard, Wallet, Clock, CheckCircle2, 
  Facebook, Instagram, Twitter, Mail, Phone, MapPin, Menu, X 
} from "lucide-react";

const iconMap: Record<string, any> = {
  Eye, Glasses, Activity, Microscope, ScanEye, Zap, MonitorPlay, 
  ShieldCheck, CreditCard, Wallet, Clock, CheckCircle2,
  Facebook, Instagram, Twitter, Mail, Phone, MapPin, Menu, X
};

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const IconComponent = iconMap[name] || Eye;
  return <IconComponent className={className} />;
};
