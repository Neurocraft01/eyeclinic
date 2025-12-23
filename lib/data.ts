
// This is a simple in-memory store for demonstration purposes.
// In a real application, this would be a database.

export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

// New Dynamic Section Types
export type SectionType = "hero" | "features" | "content" | "text-info" | "gallery-preview" | "team" | "services-list";

export interface Section {
  id: string;
  type: SectionType;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  items?: any[];
  settings?: any;
}

export interface PageConfig {
  sections: Section[];
}

export interface SiteSettings {
  clinicName: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface SiteData {
  settings: SiteSettings;
  pages: {
    [slug: string]: PageConfig;
  };
}

export type ContactMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "New" | "Read" | "Replied";
};

// Initial Data
let appointments: Appointment[] = [
  { 
    id: "1",
    name: "John Doe", 
    email: "john@example.com",
    phone: "555-0123",
    service: "Comprehensive Exam", 
    date: "2023-10-24", 
    time: "10:00", 
    message: "Routine checkup",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  },
  { 
    id: "2",
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "555-0124",
    service: "Laser Consultation", 
    date: "2023-10-24", 
    time: "14:30", 
    message: "Interested in LASIK",
    status: "Pending",
    createdAt: new Date().toISOString()
  },
  { 
    id: "3",
    name: "Robert Johnson", 
    email: "robert@example.com",
    phone: "555-0125",
    service: "Contact Lens Fitting", 
    date: "2023-10-25", 
    time: "09:15", 
    message: "First time contacts",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  },
];

let galleryImages: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    alt: "Modern Waiting Area",
    category: "Facility"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    alt: "Advanced Diagnostic Room",
    category: "Equipment"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80",
    alt: "Consultation Room",
    category: "Facility"
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    alt: "Surgical Suite",
    category: "Surgery"
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    alt: "Optical Boutique",
    category: "Optical"
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1584515933487-9d9005c68806?auto=format&fit=crop&w=800&q=80",
    alt: "Eye Examination",
    category: "Care"
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    alt: "Doctor Patient Interaction",
    category: "Care"
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    alt: "High Tech Laser Equipment",
    category: "Equipment"
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1516574187841-693017947984?auto=format&fit=crop&w=800&q=80",
    alt: "Reception Desk",
    category: "Facility"
  }
];

let contactMessages: ContactMessage[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Wonder",
    email: "alice@example.com",
    subject: "General Inquiry",
    message: "Do you accept walk-ins?",
    createdAt: new Date().toISOString(),
    status: "New"
  }
];

// Handlers
export const getAppointments = () => appointments;
export const addAppointment = (appointment: Omit<Appointment, "id" | "createdAt" | "status">) => {
  const newAppointment: Appointment = {
    ...appointment,
    id: Math.random().toString(36).substr(2, 9),
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  appointments = [newAppointment, ...appointments];
  return newAppointment;
};

export const getGalleryImages = () => galleryImages;
export const addGalleryImage = (image: Omit<GalleryItem, "id">) => {
  const newImage: GalleryItem = {
    ...image,
    id: Math.random().toString(36).substr(2, 9)
  };
  galleryImages = [newImage, ...galleryImages];
  return newImage;
};
export const deleteGalleryImage = (id: string) => {
  galleryImages = galleryImages.filter(img => img.id !== id);
};

// Legacy Type for backward compatibility during migration
export type SiteContent = {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
  };
  about: {
    title: string;
    description: string;
  };
  services: {
    title: string;
    description: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
};

// New Dynamic Data Store
let siteData: SiteData = {
  settings: {
    clinicName: "Visionary Eye Clinic",
    address: "123 Vision Street, Medical District, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@visionaryeyeclinic.com",
    workingHours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  },
  pages: {
    home: {
      sections: [
        {
          id: "hero-1",
          type: "hero",
          title: "Your Vision, Our Passion",
          subtitle: "Experience world-class eye care with our team of expert ophthalmologists and state-of-the-art technology.",
          image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80",
          settings: { buttonText: "Book Appointment" }
        },
        {
          id: "services-preview-1",
          type: "features",
          title: "Our Expertise",
          description: "We offer a full range of eye care services, delivered by a team of experienced professionals dedicated to your vision health.",
          items: [
            { title: "Comprehensive Eye Exams", description: "Thorough evaluation of your vision and eye health using state-of-the-art diagnostic technology.", icon: "Eye" },
            { title: "Laser Vision Correction", description: "Advanced LASIK and PRK procedures to reduce or eliminate your dependence on glasses.", icon: "Microscope" },
            { title: "Pediatric Ophthalmology", description: "Specialized care for children's vision, from routine exams to complex condition management.", icon: "Activity" },
            { title: "Optical Boutique", description: "A curated collection of designer frames and premium lenses to suit your style and needs.", icon: "Glasses" }
          ]
        },
        {
          id: "technology-1",
          type: "features",
          title: "Advanced Technology",
          description: "We invest in the latest diagnostic and surgical technology to ensure the highest precision and safety for your vision.",
          settings: { theme: "dark" },
          items: [
            { title: "OCT Imaging", description: "Optical Coherence Tomography provides high-resolution cross-sectional images of the retina.", icon: "ScanEye" },
            { title: "Femtosecond Laser", description: "Blade-free laser technology for precise corneal incisions during cataract and LASIK surgery.", icon: "Zap" },
            { title: "Digital Retinal Photography", description: "High-definition imaging to document and monitor the health of the back of your eye.", icon: "MonitorPlay" },
            { title: "Corneal Topography", description: "Detailed mapping of the surface curvature of the cornea for precise contact lens fitting.", icon: "Microscope" }
          ]
        },
        {
          id: "about-preview-1",
          type: "content",
          title: "Merging Modern Technology with Traditional Care",
          description: "At Visionary Eye Clinic, we believe that the best eye care comes from a perfect blend of advanced medical technology and a warm, patient-centered approach.\n\nFounded by Dr. Sarah Mitchell, a pioneer in ophthalmology with over 25 years of experience, our clinic has grown to become a beacon of excellence in eye health. We don't just treat eyes; we care for people.",
          image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
          items: [
            "State-of-the-art Diagnostic Equipment",
            "Experienced Medical Team",
            "Personalized Treatment Plans",
            "Comfortable & Modern Facility"
          ]
        },
        {
          id: "insurance-1",
          type: "text-info",
          title: "Insurance & Payment Options",
          description: "We believe quality eye care should be accessible. We accept most major insurance plans and offer flexible financing options for elective procedures.",
          items: [
            { text: "Accepted by major insurance providers", icon: "ShieldCheck" },
            { text: "FSA and HSA cards welcome", icon: "CreditCard" },
            { text: "0% financing available via CareCredit", icon: "Wallet" }
          ]
        }
      ]
    },
    about: {
      sections: [
        {
          id: "about-hero",
          type: "hero",
          title: "About Visionary Eye Clinic",
          subtitle: "25 years of dedication to vision, innovation, and patient care.",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
          settings: { buttonText: "Contact Us" }
        },
        {
          id: "about-story",
          type: "content",
          title: "Our Story",
          description: "Over the past 25 years, we have grown from a small practice into a leading eye care center, equipped with the latest technology and staffed by a team of renowned specialists. Despite our growth, our core values remain the same. We treat every patient like family.\n\nWe are proud to have served over 50,000 patients, helping them see the world more clearly and preserving their vision for the future.",
          image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "about-team",
          type: "team",
          title: "Meet Our Specialists",
          items: [
            {
              name: "Dr. Sarah Mitchell",
              role: "Founder & Chief Ophthalmologist",
              image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
              bio: "With over 30 years of experience, Dr. Mitchell is a pioneer in laser vision correction and cataract surgery."
            },
            {
              name: "Dr. James Chen",
              role: "Pediatric Specialist",
              image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
              bio: "Dr. Chen specializes in treating vision problems in children and is known for his gentle approach."
            },
            {
              name: "Dr. Emily Rodriguez",
              role: "Optometrist",
              image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
              bio: "Dr. Rodriguez is an expert in contact lens fittings and managing ocular diseases like glaucoma."
            }
          ]
        }
      ]
    },
    services: {
      sections: [
        {
          id: "services-hero",
          type: "hero",
          title: "Our Services",
          subtitle: "World-class eye care services tailored to your unique needs.",
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
          settings: { buttonText: "Book Appointment" }
        },
        {
          id: "services-list",
          type: "services-list",
          title: "Comprehensive Eye Care",
          description: "We offer a wide range of services to ensure your vision is at its best.",
          items: [
            {
              id: "comprehensive-exams",
              title: "Comprehensive Eye Exams",
              description: "Our comprehensive eye exams go beyond just checking your prescription. We evaluate the overall health of your eyes, checking for signs of glaucoma, cataracts, macular degeneration, and other conditions. We use the latest digital imaging technology to get a detailed view of your retina.",
              icon: "Eye",
            },
            {
              id: "laser-surgery",
              title: "Laser Vision Correction (LASIK/PRK)",
              description: "Experience freedom from glasses and contacts. Our refractive surgery specialists use the most advanced laser technology to reshape your cornea and correct nearsightedness, farsightedness, and astigmatism. We offer free consultations to determine if you are a candidate.",
              icon: "Microscope",
            },
            {
              id: "pediatric",
              title: "Pediatric Ophthalmology",
              description: "Children's vision needs are unique. Our pediatric specialists are trained to diagnose and treat eye conditions in children of all ages, from infants to teens. We make eye exams fun and stress-free, ensuring your child's vision develops correctly.",
              icon: "Activity",
            },
            {
              id: "contact-lenses",
              title: "Contact Lens Fittings",
              description: "Whether you need soft lenses, rigid gas permeable lenses, or specialty lenses for conditions like keratoconus, we have you covered. We ensure a perfect fit and provide training on how to insert, remove, and care for your lenses.",
              icon: "ShieldCheck",
            },
            {
              id: "optical-boutique",
              title: "Optical Boutique",
              description: "Visit our optical boutique to find the perfect frames for your face shape and style. We carry a wide range of designer brands and high-quality lenses, including blue light blocking, anti-reflective, and progressive lenses.",
              icon: "Glasses",
            },
            {
              id: "emergency-care",
              title: "Emergency Eye Care",
              description: "Eye emergencies can happen at any time. We offer same-day appointments for urgent issues like eye infections, foreign bodies, sudden vision loss, and eye injuries. Don't wait—protect your vision.",
              icon: "Clock",
            },
          ]
        }
      ]
    }
  }
};

// Legacy support wrapper
export const getSiteContent = (): SiteContent => {
  const homeHero = siteData.pages.home.sections.find(s => s.type === "hero");
  const aboutHero = siteData.pages.about.sections.find(s => s.type === "hero");
  const aboutStory = siteData.pages.about.sections.find(s => s.id === "about-story");
  
  return {
    home: {
      heroTitle: homeHero?.title || "",
      heroSubtitle: homeHero?.subtitle || "",
      heroButtonText: homeHero?.settings?.buttonText || ""
    },
    about: {
      title: aboutHero?.title || "",
      description: aboutStory?.description || ""
    },
    services: {
      title: "Our Services",
      description: "We offer a wide range of eye care services."
    },
    contact: {
      address: "123 Vision Way, Eye City, EC 12345",
      phone: "(555) 123-4567",
      email: "info@visionaryeye.com"
    }
  };
};

export const updateSiteContent = (newContent: any) => {
  // This function needs to be smarter to handle the new structure
  // For now, if we receive the old structure, we map it to the new one
  if (newContent.home) {
    const hero = siteData.pages.home.sections.find(s => s.type === "hero");
    if (hero) {
      hero.title = newContent.home.heroTitle;
      hero.subtitle = newContent.home.heroSubtitle;
    }
  }
  if (newContent.about) {
    const hero = siteData.pages.about.sections.find(s => s.type === "hero");
    if (hero) hero.title = newContent.about.title;
    
    const story = siteData.pages.about.sections.find(s => s.id === "about-story");
    if (story) story.description = newContent.about.description;
  }
  
  return getSiteContent();
};

// New API methods
export const getPageData = (slug: string) => {
  return siteData.pages[slug] || null;
};

export const getAllSiteData = () => siteData;

export const updateSiteSettings = (settings: SiteSettings) => {
  siteData.settings = settings;
  return siteData.settings;
};

export const updatePageData = (slug: string, data: PageConfig) => {
  siteData.pages[slug] = data;
  return siteData.pages[slug];
};

export const updateAppointment = (id: string, updates: Partial<Appointment>) => {
  appointments = appointments.map(apt => apt.id === id ? { ...apt, ...updates } : apt);
  return appointments.find(apt => apt.id === id);
};

export const deleteAppointment = (id: string) => {
  appointments = appointments.filter(apt => apt.id !== id);
};

export const getContactMessages = () => contactMessages;
export const addContactMessage = (message: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
  const newMessage: ContactMessage = {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    status: "New",
    createdAt: new Date().toISOString()
  };
  contactMessages = [newMessage, ...contactMessages];
  return newMessage;
};

