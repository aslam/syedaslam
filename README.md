# Syed Aslam's Personal Blog

A modern, fast, and beautiful personal blog built with [Astro](https://astro.build). This blog showcases modern web development practices, performance optimization, and provides a platform for sharing insights about technology and development.

## ✨ Features

- **🚀 Performance First**: Built with Astro for optimal performance and Core Web Vitals
- **📱 Responsive Design**: Beautiful, mobile-first design that works on all devices
- **🎨 Modern UI**: Clean, professional design with smooth animations and interactions
- **📝 Content Collections**: Type-safe content management with Astro's content collections
- **🔍 SEO Optimized**: Built-in SEO features with sitemap generation
- **📊 RSS Feed**: Automatic RSS feed generation for subscribers
- **🎯 TypeScript**: Full TypeScript support for better development experience
- **📚 MDX Support**: Write content in Markdown with JSX components when needed

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd syedaslam
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

## 📁 Project Structure

```
syedaslam/
├── src/
│   ├── components/          # Reusable UI components
│   ├── content/             # Blog posts and content
│   │   └── blog/           # Blog post markdown files
│   ├── layouts/             # Page layouts
│   ├── pages/               # Astro pages (routes)
│   ├── styles/              # Global CSS styles
│   └── config.ts            # Site constants and configuration
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
└── package.json
```

## ✍️ Writing Blog Posts

### Creating a New Post

1. Create a new markdown file in `src/content/blog/`
2. Use the following frontmatter structure:

```markdown
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: '2024-01-20'
heroImage: '../../assets/your-image.jpg'
---

# Your Post Content

Write your content in Markdown...
```

### Frontmatter Fields

- `title`: The post title (required)
- `description`: Post description for SEO and previews (required)
- `pubDate`: Publication date (required)
- `heroImage`: Hero image path (optional)
- `updatedDate`: Last update date (optional)

### Content Features

- **Markdown Support**: Full Markdown syntax
- **Code Highlighting**: Automatic syntax highlighting with Shiki
- **Images**: Support for hero images and inline images
- **Links**: Internal and external link support

## 🎨 Customization

### Site Configuration

Update `src/config.ts` to customize your site:

```typescript
export const SITE_TITLE = 'Your Name';
export const SITE_DESCRIPTION = 'Your site description';
export const SITE_AUTHOR = 'Your Name';
export const SITE_URL = 'https://yoursite.com';
export const SITE_TWITTER = '@yourtwitter';
export const SITE_GITHUB = 'yourgithub';
```

### Styling

The blog uses CSS custom properties for easy theming. Update `src/styles/global.css`:

```css
:root {
  --accent: #667eea; /* Primary accent color */
  --accent-dark: #5a67d8; /* Darker accent for hover states */
  --black: 15, 18, 25; /* Text color */
  --gray: 96, 115, 159; /* Secondary text */
  --gray-light: 229, 233, 240; /* Light backgrounds */
  --gray-dark: 34, 41, 57; /* Dark text */
}
```

### Components

Customize the look and feel by modifying components in `src/components/`:

- `Header.astro`: Navigation and site header
- `Footer.astro`: Site footer and social links
- `BaseHead.astro`: HTML head meta tags and SEO

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to GitHub Pages

1. Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
  // ... other config
});
```

2. Set up GitHub Actions for automatic deployment

## 📊 Performance Features

- **Zero JavaScript by Default**: Pages load with minimal JavaScript
- **Image Optimization**: Automatic image optimization with Sharp
- **Code Splitting**: Automatic code splitting for better performance
- **Lazy Loading**: Images and components load when needed
- **CSS Optimization**: Minified and optimized CSS output

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run astro`: Run Astro CLI commands

### Adding New Features

- **New Pages**: Create `.astro` files in `src/pages/`
- **New Components**: Create `.astro` files in `src/components/`
- **New Content Types**: Update `src/content.config.ts`
- **Styling**: Add CSS to component files or `global.css`

## 📚 Content Migration from Gridsome

### Key Differences

1. **Content Management**: Gridsome uses GraphQL, Astro uses content collections
2. **Component Syntax**: Vue components vs Astro components
3. **Routing**: File-based routing (similar but different implementation)
4. **Build Process**: Webpack vs Vite

### Migration Steps

1. **Export Content**: Export your Gridsome content as markdown
2. **Update Frontmatter**: Convert to Astro's frontmatter format
3. **Migrate Components**: Convert Vue components to Astro components
4. **Update Images**: Move images to `public/` directory
5. **Test and Optimize**: Ensure everything works and optimize performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts: Atkinson (included in public/fonts/)

## 📞 Contact

- **Website**: [syedaslam.com](https://syedaslam.com)
- **Email**: hello@syedaslam.com
- **Twitter**: [@syedaslam](https://twitter.com/syedaslam)
- **GitHub**: [syedaslam](https://github.com/aslam)

---

**Happy blogging! 🚀**
