import fs from 'fs/promises';
import path from 'path';

// This is a simple file-based store.
// In a real application, this would be a database.

const DATA_FILE = path.join(process.cwd(), 'data.json');

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    // Return default structure or throw
    throw error;
  }
}

async function writeData(data: any) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data file:", error);
    throw error;
  }
}

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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role?: string; // e.g. "Patient since 2020"
  content: string;
  rating: number;
  image?: string;
};

// Handlers
export const getAppointments = async () => {
  const data = await readData();
  return data.appointments as Appointment[];
};

export const addAppointment = async (appointment: Omit<Appointment, "id" | "createdAt" | "status">) => {
  const data = await readData();
  const newAppointment: Appointment = {
    ...appointment,
    id: Math.random().toString(36).substr(2, 9),
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  data.appointments = [newAppointment, ...data.appointments];
  await writeData(data);
  return newAppointment;
};

export const getGalleryImages = async () => {
  const data = await readData();
  return data.galleryImages as GalleryItem[];
};

export const addGalleryImage = async (image: Omit<GalleryItem, "id">) => {
  const data = await readData();
  const newImage: GalleryItem = {
    ...image,
    id: Math.random().toString(36).substr(2, 9)
  };
  data.galleryImages = [newImage, ...data.galleryImages];
  await writeData(data);
  return newImage;
};

export const deleteGalleryImage = async (id: string) => {
  const data = await readData();
  data.galleryImages = data.galleryImages.filter((img: GalleryItem) => img.id !== id);
  await writeData(data);
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

// Legacy support wrapper
export const getSiteContent = async (): Promise<SiteContent> => {
  const data = await readData();
  const siteData = data.siteData as SiteData;
  
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

export const updateSiteContent = async (newContent: any) => {
  const data = await readData();
  const siteData = data.siteData as SiteData;

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
  
  await writeData(data);
  return getSiteContent();
};

// New API methods
export const getPageData = async (slug: string): Promise<PageConfig | null> => {
  const data = await readData();
  return data.siteData.pages[slug] || null;
};

export const getAllSiteData = async (): Promise<SiteData> => {
  const data = await readData();
  return data.siteData as SiteData;
};

export const updateSiteSettings = async (settings: SiteSettings) => {
  const data = await readData();
  data.siteData.settings = settings;
  await writeData(data);
  return data.siteData.settings;
};

export const updatePageData = async (slug: string, pageData: PageConfig) => {
  const data = await readData();
  data.siteData.pages[slug] = pageData;
  await writeData(data);
  return data.siteData.pages[slug];
};

export const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
  const data = await readData();
  data.appointments = data.appointments.map((apt: Appointment) => apt.id === id ? { ...apt, ...updates } : apt);
  await writeData(data);
  return data.appointments.find((apt: Appointment) => apt.id === id);
};

export const deleteAppointment = async (id: string) => {
  const data = await readData();
  data.appointments = data.appointments.filter((apt: Appointment) => apt.id !== id);
  await writeData(data);
};

export const getContactMessages = async () => {
  const data = await readData();
  return data.contactMessages as ContactMessage[];
};

export const addContactMessage = async (message: Omit<ContactMessage, "id" | "createdAt" | "status">) => {
  const data = await readData();
  const newMessage: ContactMessage = {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    status: "New",
    createdAt: new Date().toISOString()
  };
  data.contactMessages = [newMessage, ...data.contactMessages];
  await writeData(data);
  return newMessage;
};

// Team Handlers
export const getTeamMembers = async () => {
  const data = await readData();
  return (data.teamMembers || []) as TeamMember[];
};

export const addTeamMember = async (member: Omit<TeamMember, "id">) => {
  const data = await readData();
  const newMember: TeamMember = {
    ...member,
    id: Math.random().toString(36).substr(2, 9)
  };
  data.teamMembers = [newMember, ...(data.teamMembers || [])];
  await writeData(data);
  return newMember;
};

export const deleteTeamMember = async (id: string) => {
  const data = await readData();
  data.teamMembers = (data.teamMembers || []).filter((m: TeamMember) => m.id !== id);
  await writeData(data);
};

// Testimonial Handlers
export const getTestimonials = async () => {
  const data = await readData();
  return (data.testimonials || []) as Testimonial[];
};

export const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
  const data = await readData();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Math.random().toString(36).substr(2, 9)
  };
  data.testimonials = [newTestimonial, ...(data.testimonials || [])];
  await writeData(data);
  return newTestimonial;
};

export const deleteTestimonial = async (id: string) => {
  const data = await readData();
  data.testimonials = (data.testimonials || []).filter((t: Testimonial) => t.id !== id);
  await writeData(data);
};
