import Image from "next/image";
import { getGalleryImages } from "@/lib/data";

export const metadata = {
  title: "Gallery - Visionary Eye Clinic",
  description: "Take a tour of our modern facility and see our advanced equipment.",
};

// Force dynamic rendering so we always get the latest data
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-dark py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Our Facility</h1>
        <p className="text-lg max-w-2xl mx-auto px-4 text-gray-300 relative z-10">
          Experience our state-of-the-art clinic designed for your comfort and care.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">
                  {image.category}
                </span>
                <h3 className="text-white text-lg font-semibold">
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
