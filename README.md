# Women's Health Assistant Chatbot

A specialized medical chatbot focused on women's health, infertility, gynecology, and obstetrics. This application provides detailed information about reproductive health conditions, treatments, and wellness strategies through an interactive chat interface.

## Features

- **Interactive Chat Interface**: User-friendly chat UI with real-time responses
- **Medical Knowledge Base**: Pre-defined responses for common women's health topics
- **AI Integration**: Gemini AI for handling complex or specific questions
- **Topic Categories**: Specialized information on fertility, pregnancy, menstrual health, PCOS, endometriosis, and more
- **Session Management**: Maintains conversation context for better follow-up responses
- **Mobile Responsive**: Works seamlessly on all device sizes
- **Doctor Contact Integration**: Built-in clinic information and appointment booking

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Framer Motion
- React Markdown
- Axios

### Backend
- Node.js
- Express
- Google Gemini AI API
- RESTful API architecture

## Project Structure

```
project/
│
├── frontend/                # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── chatbot.tsx      # Main chatbot component
│   │   ├── ui/              # UI components
│   │   ├── home/            # Home page components
│   │   └── layout/          # Layout components
│   ├── lib/                 # Utility functions
│   └── hooks/               # Custom React hooks
│
└── backend/                 # Node.js backend server
    ├── controller/          # Request handlers
    │   └── chatController.js # Chat response controller
    ├── routes/              # API routes
    ├── utils/               # Utility functions
    │   └── chatData.js      # Pre-defined chat responses
    └── server.js            # Express server setup
```

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation and Setup

1. Clone the repository
   ```
   git clone <repository-url>
   cd women-health-chatbot
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Set up backend environment variables
   - Create a `.env` file based on `.env.example`
   - Add your Google Gemini API key

4. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

5. Set up frontend environment variables
   - Create a `.env` file in the frontend directory
   - Add `NEXT_PUBLIC_API_URL=http://localhost:4000` (or your backend URL)

### Running the Application

1. Start the backend server (development mode)
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend application (development mode)
   ```
   cd frontend
   npm run dev
   ```

3. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## Deployment

### Frontend
- The frontend can be deployed on Vercel, Netlify, or any Next.js-compatible hosting service
- Set the `NEXT_PUBLIC_API_URL` environment variable to your production backend URL

### Backend
- The backend can be deployed on Vercel, Heroku, or any Node.js-compatible hosting service
- Ensure all environment variables are properly configured in your production environment

## About Dr. Aishwarya Parthasarathy

Dr. Aishwarya is a Gynecologist and fertility specialist based in Chennai. She completed postgraduation from AIIMS, New Delhi, senior residency at JIPMER, Pondicherry, and FNB in reproductive medicine. She also holds MRCOG from the UK. With years of experience and international publications, she is passionate about fertility, laparoscopy, ultrasound, and high-risk pregnancies.

**Clinic Address**: No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87  
**Contact Number**: +91 9342521779

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application provides information for educational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for personalized care.
