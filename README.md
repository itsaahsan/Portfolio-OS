# Portfolio OS 🍎

<div align="center">

![Portfolio OS](https://img.shields.io/badge/Portfolio-OS-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)

**An interactive macOS-style portfolio website that stands out from the crowd**

[Live Demo](https://portfolio-os.vercel.app) • [Report Bug](https://github.com/itsaahsan/portfolio-os/issues) • [Request Feature](https://github.com/itsaahsan/portfolio-os/issues)

</div>

---

## Preview

<div align="center">

<img src="/Screenshot%202026-02-28%20231947.png" alt="Portfolio OS Preview" width="700" />

</div>

---

## 🌟 Overview

Portfolio OS is a unique, interactive portfolio website that replicates the macOS desktop experience. Built with modern web technologies, it offers recruiters and hiring managers an unforgettable way to explore my skills, projects, and experience.

### Why Portfolio OS?

In a sea of traditional portfolios, **stand out** with an experience that:
- 🎨 Demonstrates attention to detail and design sensibility
- 💻 Showcases full-stack development capabilities
- 🚀 Provides an interactive, memorable user experience
- 📱 Works seamlessly across devices with responsive fallback

---

## ✨ Features

### 🖥️ Desktop Environment
- **macOS Big Sur Design**: Pixel-perfect recreation of macOS aesthetics
- **Beautiful Wallpapers**: Multiple gradient wallpapers with right-click to change
- **Realistic Dock**: Magnification animation exactly like macOS
- **Functional Menu Bar**: Live time, date, and system icons
- **Dark/Light Mode**: Toggle between themes seamlessly

### 🪟 Window Management
- **Draggable Windows**: Smooth drag-to-move functionality
- **Resizable Windows**: Drag edges and corners to resize
- **Window Controls**: Red (close), Yellow (minimize), Green (maximize) buttons
- **Multiple Windows**: Open and manage multiple apps simultaneously
- **Focus Management**: Click to bring windows to front
- **Position Memory**: Windows remember their last position

### 📱 Applications

#### About Me
- Personal bio and story
- Skills with animated progress bars
- Statistics (2000+ hours, 12+ certificates, 6+ projects)
- Download resume button

#### Projects
- Grid view of all projects
- Detailed project cards with screenshots
- Tech stack tags
- GitHub and Live Demo links
- Full project detail modal

#### Terminal
- Fully functional command-line interface
- Commands: `whoami`, `skills`, `projects`, `contact`, `education`, `help`, and more
- Tab autocomplete
- Command history (↑/↓ arrows)
- Easter eggs (`neofetch`, `matrix`, `sudo`)

#### Certificates
- Grid of all certifications
- Harvard CS50, DeepLearning.AI, Google, Meta, and more
- Full-screen certificate preview
- Verification links

#### Contact
- Contact form with validation
- Social media links
- Direct email link
- Success confirmation

#### Music Player
- Lofi playlist for coding vibes
- Play/pause, next/previous controls
- Progress bar
- Volume control
- Animated equalizer

#### Safari
- Browser preview for live projects
- Quick links to project demos
- Navigation controls
- URL bar

#### Finder
- File explorer interface
- Navigate folders
- Download resume
- View certificates

### 🎨 Animations & Interactions
- **Boot Animation**: macOS-style startup sequence
- **Window Animations**: Smooth open/close with spring physics
- **Dock Magnification**: Icons scale on hover
- **Icon Bounce**: Click animation like macOS
- **Skill Bars**: Animated progress fills
- **Transitions**: Smooth everywhere

### 📱 Mobile Responsive
- Simplified mobile view
- All essential information accessible
- "Best viewed on desktop" notice
- Touch-optimized interactions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Vite** | Build Tool |
| **date-fns** | Date Formatting |
| **Heroicons** | Icon Library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itsaahsan/portfolio-os.git
   cd portfolio-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
portfolio-os/
├── public/
│   └── apple-icon.svg
├── src/
│   ├── components/
│   │   ├── apps/
│   │   │   ├── AboutApp.tsx
│   │   │   ├── ProjectsApp.tsx
│   │   │   ├── TerminalApp.tsx
│   │   │   ├── CertificatesApp.tsx
│   │   │   ├── ContactApp.tsx
│   │   │   ├── MusicApp.tsx
│   │   │   ├── SafariApp.tsx
│   │   │   └── FinderApp.tsx
│   │   ├── common/
│   │   │   ├── Window.tsx
│   │   │   ├── ContextMenu.tsx
│   │   │   └── BootScreen.tsx
│   │   ├── layout/
│   │   │   ├── MenuBar.tsx
│   │   │   ├── Dock.tsx
│   │   │   ├── Desktop.tsx
│   │   │   └── MobileFallback.tsx
│   ├── context/
│   │   ├── WindowContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   ├── useDraggable.ts
│   │   ├── useResizable.ts
│   │   └── useTerminal.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── projects.ts
│   │   ├── certificates.ts
│   │   ├── skills.ts
│   │   ├── personalInfo.ts
│   │   └── music.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── package.json
```

---

## 🎮 Terminal Commands

| Command | Description |
|---------|-------------|
| `whoami` | Shows name and title |
| `skills` | Lists technical skills |
| `projects` | Lists all projects |
| `contact` | Shows contact information |
| `education` | Shows certificates |
| `github` | Opens GitHub |
| `linkedin` | Opens LinkedIn |
| `email` | Shows email address |
| `help` | Shows all commands |
| `clear` | Clears terminal |
| `theme` | Toggles dark/light mode |
| `neofetch` | System information (easter egg) |
| `matrix` | Matrix reference (easter egg) |

**Pro Tips:**
- Use `Tab` for autocomplete
- Use `↑`/`↓` for command history
- Try `sudo` for a surprise 😄

---

## 🎨 Customization

### Update Personal Information

Edit `src/data/personalInfo.ts`:
```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your@email.com',
  // ... more fields
};
```

### Add Projects

Edit `src/data/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 'your-project',
    name: 'Your Project',
    description: 'Description',
    techStack: ['React', 'Node.js'],
    imageUrl: '/path/to/image.jpg',
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...',
  },
];
```

### Add Certificates

Edit `src/data/certificates.ts`:
```typescript
export const certificates: Certificate[] = [
  {
    id: 'your-cert',
    name: 'Certificate Name',
    issuer: 'Issuer',
    date: '2024',
    imageUrl: '/path/to/cert.jpg',
  },
];
```

### Change Default Wallpaper

Edit `src/components/layout/Desktop.tsx`:
```typescript
const [wallpaper, setWallpaper] = useState<WallpaperType>('your-preference');
```

---

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Option 3: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Deploy

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Performance | 95+ |
| Accessibility | 90+ |
| Best Practices | 95+ |
| SEO | 90+ |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Apple Inc. for macOS design inspiration
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All open-source contributors

---

## 📬 Contact

**Amimul Ahsan**

- 📧 Email: itsaahsan@gmail.com
- 💼 LinkedIn: [linkedin.com/in/itsaahsan](https://linkedin.com/in/itsaahsan)
- 🐙 GitHub: [github.com/itsaahsan](https://github.com/itsaahsan)
- 🌐 Portfolio: [itsaahsan.com](https://itsaahsan.com)

---

<div align="center">

**Made with ❤️ and lots of ☕**

If you like this project, please ⭐ the repository!

</div>
