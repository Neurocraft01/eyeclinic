"use client";

import { useState, useEffect } from "react";
import { Users, Calendar, MessageSquare, Settings, LogOut, Plus, Image as ImageIcon, Trash2, FileText, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Appointment, GalleryItem, SiteData, Section, SectionType, ContactMessage } from "@/lib/data";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("appointments");
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial data
    fetch("/api/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data));

    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => setGalleryItems(data));

    fetch("/api/messages")
      .then(res => res.json())
      .then(data => setContactMessages(data));

    fetch("/api/content")
      .then(res => res.json())
      .then(data => setSiteData(data));
  }, []);

  const [newImage, setNewImage] = useState({ src: "", alt: "", category: "Facility" });
  const [isAddingImage, setIsAddingImage] = useState(false);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage.src && newImage.alt) {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImage)
      });
      
      if (response.ok) {
        const addedImage = await response.json();
        setGalleryItems([addedImage, ...galleryItems]);
        setNewImage({ src: "", alt: "", category: "Facility" });
        setIsAddingImage(false);
      }
    }
  };

  const handleDeleteImage = async (id: string) => {
    const response = await fetch(`/api/gallery?id=${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  const handleUpdateStatus = async (id: string, status: "Confirmed" | "Cancelled", email: string, name: string) => {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status } : apt));
      
      // Send email notification
      if (status === "Confirmed") {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: email,
            subject: "Appointment Confirmed - Visionary Eye Clinic",
            message: `Dear ${name},\n\nYour appointment has been confirmed.\n\nThank you,\nVisionary Eye Clinic`
          })
        });
        alert(`Appointment confirmed and email sent to ${email}`);
      }
    }
  };

  const handleUpdatePage = async (slug: string, sections: Section[]) => {
    if (!siteData) return;
    
    const response = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, data: { sections } })
    });

    if (response.ok) {
      const updatedPage = await response.json();
      setSiteData({
        ...siteData,
        pages: {
          ...siteData.pages,
          [slug]: updatedPage
        }
      });
      alert("Page updated successfully!");
    }
  };

  const handleSectionChange = (slug: string, sectionId: string, field: keyof Section, value: any) => {
    if (!siteData) return;
    
    const page = siteData.pages[slug];
    const updatedSections = page.sections.map(s => 
      s.id === sectionId ? { ...s, [field]: value } : s
    );
    
    setSiteData({
      ...siteData,
      pages: {
        ...siteData.pages,
        [slug]: { sections: updatedSections }
      }
    });
  };

  const handleAddSection = (slug: string) => {
    if (!siteData) return;
    
    const newSection: Section = {
      id: `new-section-${Date.now()}`,
      type: "content",
      title: "New Section",
      description: "Section description",
      items: []
    };
    
    const page = siteData.pages[slug];
    const updatedSections = [...page.sections, newSection];
    
    setSiteData({
      ...siteData,
      pages: {
        ...siteData.pages,
        [slug]: { sections: updatedSections }
      }
    });
    setExpandedSection(newSection.id);
  };

  const handleDeleteSection = (slug: string, sectionId: string) => {
    if (!siteData) return;
    if (!confirm("Are you sure you want to delete this section?")) return;
    
    const page = siteData.pages[slug];
    const updatedSections = page.sections.filter(s => s.id !== sectionId);
    
    setSiteData({
      ...siteData,
      pages: {
        ...siteData.pages,
        [slug]: { sections: updatedSections }
      }
    });
  };

  const handleLogout = () => {
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Clinic CMS</h2>
          <p className="text-xs text-gray-400">Management Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "appointments" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </button>
          <button 
            onClick={() => setActiveTab("patients")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "patients" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <Users className="h-5 w-5" />
            <span>Patients</span>
          </button>
          <button 
            onClick={() => setActiveTab("gallery")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "gallery" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <ImageIcon className="h-5 w-5" />
            <span>Gallery</span>
          </button>
          <button 
            onClick={() => setActiveTab("content")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "content" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <FileText className="h-5 w-5" />
            <span>Content</span>
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "messages" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeTab === "settings" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Upcoming Appointments</h3>
                <button className="bg-primary text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-secondary">
                  <Plus className="h-4 w-4" /> New Appointment
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-600">Patient</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Service</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Date & Time</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((apt, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-800 font-medium">{apt.name}</td>
                        <td className="p-4 text-sm text-gray-600">{apt.service}</td>
                        <td className="p-4 text-sm text-gray-600">{apt.date} - {apt.time}</td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${apt.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          {apt.status === "Pending" && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleUpdateStatus(apt.id, "Confirmed", apt.email, apt.name)}
                                className="text-green-600 hover:bg-green-50 p-1 rounded"
                                title="Confirm"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(apt.id, "Cancelled", apt.email, apt.name)}
                                className="text-red-600 hover:bg-red-50 p-1 rounded"
                                title="Cancel"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Gallery Images</h3>
                <button 
                  onClick={() => setIsAddingImage(!isAddingImage)}
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" /> {isAddingImage ? "Cancel" : "Add Image"}
                </button>
              </div>

              {isAddingImage && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                  <h4 className="text-md font-semibold mb-4 text-gray-800">Add New Image</h4>
                  <form onSubmit={handleAddImage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input 
                          type="text" 
                          required
                          placeholder="https://..."
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          value={newImage.src}
                          onChange={(e) => setNewImage({...newImage, src: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title / Alt Text</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Waiting Room"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          value={newImage.alt}
                          onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          value={newImage.category}
                          onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                        >
                          <option value="Facility">Facility</option>
                          <option value="Equipment">Equipment</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Optical">Optical</option>
                          <option value="Care">Care</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                        Save Image
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item, index) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group relative">
                    <div className="aspect-video relative bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => handleDeleteImage(item.id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          title="Delete Image"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{item.alt}</h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "content" && siteData && (
            <div className="space-y-8">
              {Object.entries(siteData.pages).map(([slug, page]) => (
                <div key={slug} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800 capitalize">{slug} Page</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAddSection(slug)}
                        className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4" /> Add Section
                      </button>
                      <button 
                        onClick={() => handleUpdatePage(slug, page.sections)}
                        className="bg-primary text-white px-4 py-1.5 rounded-md text-sm hover:bg-secondary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {page.sections.map((section, index) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div 
                          className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                          onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded uppercase font-bold w-20 text-center">
                              {section.type}
                            </span>
                            <span className="font-medium text-gray-700">
                              {section.title || "Untitled Section"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSection(slug, section.id);
                              }}
                              className="text-red-500 hover:bg-red-100 p-1.5 rounded"
                              title="Delete Section"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            {expandedSection === section.id ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                          </div>
                        </div>
                        
                        {expandedSection === section.id && (
                          <div className="p-4 bg-white border-t border-gray-200 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select 
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={section.type}
                                  onChange={(e) => handleSectionChange(slug, section.id, "type", e.target.value)}
                                >
                                  <option value="hero">Hero</option>
                                  <option value="features">Features</option>
                                  <option value="content">Content</option>
                                  <option value="text-info">Text Info</option>
                                  <option value="team">Team</option>
                                  <option value="services-list">Services List</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                  type="text" 
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={section.title || ""}
                                  onChange={(e) => handleSectionChange(slug, section.id, "title", e.target.value)}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Description</label>
                                <textarea 
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  rows={3}
                                  value={section.description || section.subtitle || ""}
                                  onChange={(e) => {
                                    handleSectionChange(slug, section.id, "description", e.target.value);
                                    handleSectionChange(slug, section.id, "subtitle", e.target.value);
                                  }}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input 
                                  type="text" 
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={section.image || ""}
                                  onChange={(e) => handleSectionChange(slug, section.id, "image", e.target.value)}
                                />
                              </div>
                              
                              {/* JSON Editor for Items */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Items (JSON Format)
                                  <span className="text-xs text-gray-500 ml-2 font-normal">
                                    Edit the array of items for this section. Changes apply on blur.
                                  </span>
                                </label>
                                <textarea 
                                  className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm bg-gray-50"
                                  rows={6}
                                  defaultValue={JSON.stringify(section.items || [], null, 2)}
                                  onBlur={(e) => {
                                    try {
                                      const items = JSON.parse(e.target.value);
                                      handleSectionChange(slug, section.id, "items", items);
                                    } catch (err) {
                                      alert("Invalid JSON format. Changes not saved.");
                                      e.target.value = JSON.stringify(section.items || [], null, 2);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "patients" && (
             <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
               <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
               <p>Patient management module placeholder.</p>
             </div>
          )}

          {activeTab === "messages" && (
             <div className="space-y-6">
               <h3 className="text-lg font-semibold text-gray-700">Inbox Messages</h3>
               <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-100">
                     <tr>
                       <th className="p-4 text-sm font-semibold text-gray-600">From</th>
                       <th className="p-4 text-sm font-semibold text-gray-600">Subject</th>
                       <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                       <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                       <th className="p-4 text-sm font-semibold text-gray-600">Message</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {contactMessages.map((msg, i) => (
                       <tr key={i} className="hover:bg-gray-50">
                         <td className="p-4 text-sm text-gray-800 font-medium">
                           {msg.firstName} {msg.lastName}
                           <div className="text-xs text-gray-500 font-normal">{msg.email}</div>
                         </td>
                         <td className="p-4 text-sm text-gray-600">{msg.subject}</td>
                         <td className="p-4 text-sm text-gray-600">{new Date(msg.createdAt).toLocaleDateString()}</td>
                         <td className="p-4">
                           <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${msg.status === "New" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                             {msg.status}
                           </span>
                         </td>
                         <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={msg.message}>
                           {msg.message}
                         </td>
                       </tr>
                     ))}
                     {contactMessages.length === 0 && (
                       <tr>
                         <td colSpan={5} className="p-8 text-center text-gray-500">No messages found.</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {activeTab === "settings" && siteData && (
             <div className="bg-white p-8 rounded-xl shadow-sm">
               <h3 className="text-xl font-bold text-gray-800 mb-6">General Settings</h3>
               <form onSubmit={(e) => {
                 e.preventDefault();
                 fetch("/api/content", {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({ settings: siteData.settings })
                 }).then(res => {
                   if (res.ok) alert("Settings updated successfully!");
                 });
               }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.clinicName}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, clinicName: e.target.value}})}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.phone}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, phone: e.target.value}})}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.email}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, email: e.target.value}})}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.address}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, address: e.target.value}})}
                     />
                   </div>
                 </div>

                 <h4 className="text-lg font-semibold text-gray-700 mb-4">Working Hours</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Weekdays</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.workingHours.weekdays}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, workingHours: {...siteData.settings.workingHours, weekdays: e.target.value}}})}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Saturday</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.workingHours.saturday}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, workingHours: {...siteData.settings.workingHours, saturday: e.target.value}}})}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Sunday</label>
                     <input 
                       type="text" 
                       className="w-full p-2 border border-gray-300 rounded-md"
                       value={siteData.settings.workingHours.sunday}
                       onChange={(e) => setSiteData({...siteData, settings: {...siteData.settings, workingHours: {...siteData.settings.workingHours, sunday: e.target.value}}})}
                     />
                   </div>
                 </div>

                 <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary">
                   Save Settings
                 </button>
               </form>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
