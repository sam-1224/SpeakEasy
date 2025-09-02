# SpeakEasy - Language Exchange Platform

SpeakEasy is a full-stack web application designed to connect language learners from around the world. It provides a platform for users to find language exchange partners, communicate via real-time chat, and practice speaking through video calls.

## ✨ Features

- **User Authentication**: Secure signup and login functionality using JWT.
- **Onboarding**: A simple onboarding process for new users to set up their profiles.
- **Find Partners**: Get recommendations for language partners based on native and learning languages.
- **Friend System**: Send, accept, and manage friend requests.
- **Real-time Chat**: Instant messaging powered by the Stream Chat SDK.
- **Video Calling**: Initiate 1-on-1 video calls with friends using the Stream Video SDK.
- **Customizable UI**: Switch between 32 different themes to personalize your experience.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, daisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-time Services**: Stream SDK for Chat and Video
- **State Management**: Zustand & TanStack Query

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB Atlas account (or a local MongoDB instance)
- [Stream](https://getstream.io/) account for API keys

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/sam-1224/SpeakEasy.git](https://github.com/sam-1224/SpeakEasy.git)
    cd SpeakEasy
    ```

2.  **Backend Setup:**

    - Navigate to the backend directory: `cd backend`
    - Create a `.env` file and add the following variables:
      ```
      PORT=5001
      MONGODB_URI=your_mongo_uri
      JWT_SECRET_KEY=your_jwt_secret
      STREAM_API_KEY=your_stream_api_key
      STREAM_API_SECRET=your_stream_api_secret
      NODE_ENV=development
      ```
    - Install dependencies: `npm install`

3.  **Frontend Setup:**
    - Navigate to the frontend directory: `cd frontend`
    - Create a `.env` file and add your Stream API key:
      ```
      VITE_STREAM_API_KEY=your_stream_api_key
      ```
    - Install dependencies: `npm install`

### Running Locally

1.  **Run the backend server** (from the `/backend` directory):
    ```bash
    npm run dev
    ```
2.  **Run the frontend server** (from the `/frontend` directory in a new terminal):
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:5173`.
