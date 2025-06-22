<div align="center">
  <h1>ClearCut</h1>
  <p>Clarity for the emotionally overwhelmed. Whether it's heartbreak, burnout, or betrayal — ClearCut helps you reset.</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

## 🌟 Features

- **Multi-Track Healing**: Choose from different recovery tracks based on your emotional needs
- **7-Day Reset Program**: Structured daily guidance for emotional recovery
- **Personalized Experience**: Tailored content based on your specific situation
- **Secure & Private**: Your data stays yours with end-to-end encryption
- **Responsive Design**: Works seamlessly across all devices

## 🚀 Track Options

1. **Breakup/Divorce** - Heal from heartbreak and reclaim your identity
2. **Job Loss/Toxicity** - Recover from workplace trauma and rebuild confidence
3. **Family Trauma** - Process abandonment and childhood wounds
4. **Betrayal** - Navigate trust issues and emotional pain
5. **Burnout** - Recover from emotional exhaustion
6. **Identity Crisis** - Find yourself again after major life changes

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ with TypeScript
- **Styling**: Bootstrap 5 + SCSS
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Authentication
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Animation**: Framer Motion
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- MongoDB Atlas account
- Firebase project

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/clearcut.git
   cd clearcut
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables
   ```bash
   cp .env.local.example .env.local
   ```
   Update the values in `.env.local` with your configuration.

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Environment Variables

1. Copy the example environment file and update the values:
   ```bash
   cp env.example .env.local
   ```

2. Update the values in `.env.local` with your Firebase configuration. You can find these values in your Firebase Console under Project Settings.

### Firebase Setup Instructions

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings (gear icon)
4. Under "Your apps" section, add a new web app
5. Copy the configuration object and update the values in `.env.local`
6. Enable authentication methods in Firebase Console:
   - Go to Authentication > Sign-in method
   - Enable Email/Password and Google sign-in

### Required Environment Variables

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_random_string
```

## 📂 Project Structure

```
clearcut/
├── components/         # Reusable UI components
├── lib/                # Utility functions and configurations
├── modules/            # Feature modules
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   └── ...
├── public/            # Static files
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/clearcut](https://github.com/yourusername/clearcut)
