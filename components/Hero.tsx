"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  image?: string;
  buttonText?: string;
}

const Hero = ({ title, subtitle, image, buttonText }: HeroProps) => {
  return (
    <section className="relative h-[85vh] flex items-center bg-dark text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${image || "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80"}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-8 text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Celebrating 25 Years of Excellence
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            {title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link 
              href="/book-appointment" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg text-dark bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {buttonText || "Book Consultation"}
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 backdrop-blur-sm text-base font-semibold rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
