# Visionary Eye Clinic Website

A modern, professional eye clinic website built with Next.js 14, React, TypeScript, and Tailwind CSS. Features a public-facing website with comprehensive information about eye care services and a secure admin dashboard for content management.

## 🌟 Features

### Public Website
- **Modern & Professional Design**: Clean, medical-grade aesthetic with responsive layouts
- **Home Page**: Hero section, services preview, and about section
- **Services**: Comprehensive list of eye care offerings
- **About Us**: Clinic history, mission, and team profiles
- **Contact**: Contact form and clinic information
- **Book Appointment**: Online appointment scheduling form
- **WhatsApp Integration**: Floating WhatsApp button for instant communication
- **AI Chatbot**: Interactive chatbot for answering common questions
- **SEO Optimized**: Includes sitemap.xml and robots.txt

### Admin Dashboard (CMS)
- **Secure Login**: Staff-only access at `/admin/login`
- **Dynamic Page Builder**: 
  - Add, remove, and reorder sections on any page
  - Edit text, images, and content directly
  - **JSON Editor**: Advanced control for complex lists (services, team members, etc.)
- **Dashboard**: Manage appointments, patients, and messages
- **Content Management**: Full CMS capabilities for clinic content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Modern web browser

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd eyeclinic
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🔐 Admin Access

Access the admin dashboard at `/admin/login`

**Default Credentials**:
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Important**: Change these credentials in production!

## 🎨 Customization

### Colors
Edit the color scheme in `tailwind.config.ts`:
```typescript
colors: {
  primary: "#005f73",    // Main brand color
  secondary: "#0a9396",  // Secondary color
  accent: "#94d2bd",     // Accent color
  neutral: "#e9d8a6",    // Neutral color
  dark: "#001219",       // Dark color
}
```

### WhatsApp Integration
Update the phone number in `components/WhatsAppButton.tsx`:
```typescript
const phoneNumber = "15551234567"; // Replace with your number
```

### Images
- All images are sourced from Unsplash (placeholders)
- Replace with actual clinic photos in production
- Images are optimized using Next.js Image component

### Chatbot Responses
Customize chatbot logic in `components/Chatbot.tsx`

## 📁 Project Structure

```
eyeclinic/
├── app/
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard
│   ├── book-appointment/# Appointment booking
│   ├── contact/         # Contact page
│   ├── services/        # Services page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles
│   ├── robots.ts        # SEO robots
│   └── sitemap.ts       # SEO sitemap
├── components/          # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Chatbot.tsx
│   ├── WhatsAppButton.tsx
│   └── ...
├── public/              # Static assets
├── .github/             # GitHub configuration
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🛠️ Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Animations**: Framer Motion
- **Forms**: React Hook Form (ready for integration)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Notes

- Admin credentials are currently hardcoded for demo purposes
- Implement proper authentication (JWT, OAuth, etc.) for production
- Add environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting on forms

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 📧 Support & Contact

For questions or support, contact:
- **Email**: info@visionaryeyeclinic.com
- **Phone**: +1 (555) 123-4567

## 📄 License

This project is proprietary software developed for Visionary Eye Clinic.

---

**Built with ❤️ using Next.js and modern web technologies**
