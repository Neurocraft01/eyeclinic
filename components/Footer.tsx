import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { getAllSiteData } from "@/lib/data";

const Footer = async () => {
  const { settings } = await getAllSiteData();

  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-accent">{settings.clinicName}</h3>
            <p className="text-gray-300 text-sm mb-4">
              Providing world-class eye care with over 25 years of experience. 
              Where modern technology meets compassionate care.
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks.facebook && (
                <a href={settings.socialLinks.facebook} className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a href={settings.socialLinks.instagram} className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a href={settings.socialLinks.twitter} className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/admin/login" className="text-gray-500 hover:text-gray-400 transition-colors text-xs">Staff Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services#comprehensive-exams" className="text-gray-300 hover:text-white transition-colors">Comprehensive Eye Exams</Link></li>
              <li><Link href="/services#laser-surgery" className="text-gray-300 hover:text-white transition-colors">Laser Eye Surgery</Link></li>
              <li><Link href="/services#pediatric" className="text-gray-300 hover:text-white transition-colors">Pediatric Ophthalmology</Link></li>
              <li><Link href="/services#contact-lenses" className="text-gray-300 hover:text-white transition-colors">Contact Lenses</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span className="text-gray-300">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-gray-300">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-gray-300">{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.clinicName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
