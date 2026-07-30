# WhatsApp Clone with Meta AI

A modern **WhatsApp Clone** built with **React Native**, **TypeScript**, and **Expo**, featuring a polished messaging experience and an integrated **Meta AI Assistant** simulation. The application replicates the core user interface and interactions of WhatsApp while demonstrating scalable mobile application architecture, reusable components, responsive layouts, and smooth animations.

> **Note:** This project is developed for educational and portfolio purposes only and is not affiliated with WhatsApp or Meta.

---

## ✨ Features

### 💬 Chat System
- Realistic WhatsApp-inspired chat interface
- Send and receive messages
- Automated reply simulation
- Dynamic message rendering
- Timestamp support
- Keyboard-aware message input
- Smooth scrolling conversation view
- Responsive chat layout

### ✔ Message Status Indicators
- WhatsApp-style double tick indicators
- Dynamic message states:
  - Sent
  - Delivered
  - Read
- Blue read receipts
- Gray delivery indicators

### 🤖 Meta AI Assistant
- Dedicated AI chat screen
- Animated typing indicator
- Engineering-focused responses
- Simulated conversational experience
- Modern Meta AI inspired interface

### 📞 Calls
- Voice call history
- Video call history
- Missed calls
- Incoming and outgoing calls

### 🔄 Updates
- Status updates
- Recent updates
- Viewed updates
- Channels section

### 👥 Communities
- Community dashboard
- Announcement channels
- Group overview

### 👤 Profile
- User information
- About section
- Profile customization

### ⚙ Settings
- Account
- Privacy
- Chats
- Notifications
- Storage
- Help
- Linked Devices

### ➕ Contact Management
- Add new contacts
- Contact management interface

### 🚀 Splash Screen
- Animated application launch screen

---

# 📱 Screens

| Screen | Description |
|---------|-------------|
| Splash Screen | Application launch animation |
| Home Screen | Main navigation hub |
| Chat Screen | Individual conversations |
| Calls Screen | Voice and video call history |
| Updates Screen | Status updates and Channels |
| Communities Screen | Community management |
| Meta AI Screen | AI Assistant simulation |
| Profile Screen | User profile |
| Settings Screen | App settings |
| Add Contact Screen | Add new contacts |

---

# 🛠 Tech Stack

## Frontend
- React Native
- TypeScript
- Expo

## Navigation
- React Navigation

## UI Components
- React Native
- Expo Vector Icons
- Material Community Icons

## Animation
- React Native Animated API

## State Management
- React Hooks
- useState
- useEffect

---

# 📂 Project Structure

```text
WHATSAPP/
├── client/
│   ├── apis/
│   ├── assets/
│   ├── components/
│   ├── screens/
│   │   ├── AddContactModelScreen.tsx
│   │   ├── CallsScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── CommunitiesScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── MetaAiScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   └── UpdatesScreen.tsx
│   ├── App.tsx
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
├── AGENTS.md
└── README.md
```

---

# 🏗 Architecture

The application follows a modular architecture where each screen is isolated into its own module, making the project easier to maintain and extend.

```
App
│
├── Splash Screen
│
└── Home Screen
     ├── Chats
     ├── Updates
     ├── Communities
     ├── Calls
     ├── Meta AI
     ├── Profile
     └── Settings
```

---

# 💬 Chat Module

The chat screen closely mimics the WhatsApp messaging experience.

### Features

- Dynamic message rendering
- Responsive chat bubbles
- Keyboard-safe layout
- Auto-reply simulation
- WhatsApp-style delivery ticks
- Timestamp support
- Scrollable conversations

### Message Status

| Status | Indicator |
|---------|-----------|
| Sent | Gray Double Tick |
| Delivered | Gray Double Tick |
| Read | Blue Double Tick |

---

# 🤖 Meta AI Assistant

The project includes a simulated Meta AI assistant designed to imitate conversational AI.

### Supported Topics

- React Native
- TypeScript
- JavaScript
- Node.js
- Express.js
- MongoDB
- REST APIs
- State Management
- Error Handling
- Software Engineering Concepts

### Features

- Animated typing indicator
- Random AI responses
- Responsive conversation layout
- Modern AI interface

---

# 📱 Responsive Design

The application is fully responsive across Android and iOS devices.

Design considerations include:

- Flexbox layouts
- Keyboard-aware views
- Adaptive spacing
- Scrollable content
- Safe Area support
- Dynamic sizing

---

# ⚡ Performance Optimizations

- Reusable UI components
- Optimized rendering
- Modular architecture
- Lightweight animations
- Clean folder organization
- Efficient local state updates

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- npm
- Expo CLI (optional)
- Expo Go (Android or iOS)

---

## Installation

Clone the repository.

```bash
git clone https://github.com/your-username/whatsapp-clone.git
```

Navigate to the project.

```bash
cd WHATSAPP/client
```

Install dependencies.

```bash
npm install
```

Install Expo vector icons.

```bash
npx expo install @expo/vector-icons
```

Start the development server.

```bash
npx expo start
```

---

# ▶ Running the App

### Android

```bash
Press a
```

or scan the QR code using **Expo Go**.

### iOS

```bash
Press i
```

or scan the QR code using **Expo Go**.

### Web

```bash
Press w
```

---

# 📦 Main Dependencies

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Vector Icons
- React Native Gesture Handler
- React Native Reanimated
- React Native Safe Area Context

---

# 🚀 Future Enhancements

- Firebase Authentication
- Socket.IO real-time messaging
- Push Notifications
- Voice Messages
- Image & File Sharing
- Group Chats
- Online Presence
- Dark Mode
- Message Search
- Voice & Video Calling
- Emoji Reactions
- Cloud Storage Integration
- AI API Integration (OpenAI / Meta)

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- React Native Development
- TypeScript
- Expo
- Mobile UI Design
- Component-Based Architecture
- Navigation
- State Management
- Responsive Layouts
- Animations
- Reusable Components
- Software Architecture

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⚠ Disclaimer

This project is created solely for educational and portfolio purposes. It is not affiliated with, endorsed by, or sponsored by **WhatsApp** or **Meta**. All trademarks and brand names belong to their respective owners.
