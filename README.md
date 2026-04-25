# Fuad Adebara Portfolio

A luxury, high-end personal portfolio website built with React, Vite, Tailwind CSS, Framer Motion, and Firebase.

## 🚀 Features

- **Premium Design**: Modern, sleek aesthetic with a White & Orange color theme.
- **Dynamic Content**: Managed via Firebase Firestore.
- **Interactive**: Framer Motion animations for smooth scroll and element interactions.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Contact Form**: Direct integration with Firebase to receive messages.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Firebase (Firestore).

## 📦 Setup & Deployment

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   The application uses Firebase. The configuration is stored in `firebase-applet-config.json`. To use your own Firebase project, update this file with your config.

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Build**:
   ```bash
   npm run build
   ```

## 📐 Data Structure (Firestore)

- **projects**: Portfolio items.
- **skills**: Technical proficiency levels.
- **services**: Professional services offered.
- **testimonials**: Client feedback.
- **submissions**: Contact form messages.

## 🚀 Deployment to Vercel

This project is optimized for deployment on [Vercel](https://vercel.com).

### Steps to Deploy:

1. **Push to GitHub**: Push your codebase to a GitHub repository.
2. **Import to Vercel**: Connect your GitHub account to Vercel and import the project.
3. **Configure Environment Variables**:
   - In the Vercel dashboard, go to the **Settings > Environment Variables** tab.
   - Add any required environment variables (e.g., Firebase config if not using the `firebase-applet-config.json` directly).
   - *Note*: If you are using Google Gemini, add `GEMINI_API_KEY`.
4. **Deploy**: Click **Deploy**. Vercel will automatically detect the Vite setup and handle the build process.

### Custom Domain

You can easily add a custom domain in the Vercel settings for your project.

### Handling Routes

The project includes a `vercel.json` file which ensures that all frontend routes are correctly redirected to `index.html`, enabling seamless client-side navigation.
