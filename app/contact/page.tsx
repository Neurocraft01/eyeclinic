"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";

// Force dynamic rendering to ensure we get the latest settings
// export const dynamic = 'force-dynamic'; // Cannot use export in client component

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content").then(res => res.json()).then(data => setSettings(data.settings));
  }, []);

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <div className="bg-secondary py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto px-4">
          We are here to help. Reach out to us for any questions or to schedule a visit.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark text-lg">Our Location</h3>
                  <p className="text-gray-600">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark text-lg">Phone Number</h3>
                  <p className="text-gray-600">{settings.phone}</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9am-6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark text-lg">Email Address</h3>
                  <p className="text-gray-600">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark text-lg">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: {settings.workingHours.weekdays}</p>
                  <p className="text-gray-600">Saturday: {settings.workingHours.saturday}</p>
                  <p className="text-gray-600">Sunday: {settings.workingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-dark mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Message sent successfully! We will get back to you soon.");
        setFormData({ firstName: "", lastName: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors" 
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors" 
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          id="email" 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors" 
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <select 
          id="subject" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
        >
          <option>General Inquiry</option>
          <option>Appointment Question</option>
          <option>Feedback</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea 
          id="message" 
          rows={4} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors" 
          placeholder="How can we help you?"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary text-white font-medium py-3 rounded-md hover:bg-secondary transition-colors shadow-sm disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
