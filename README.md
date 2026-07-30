# React Native WhatsApp Clone with Meta AI 📱✨

A modern, feature-rich WhatsApp Clone developed using React Native, TypeScript, and Expo. The application recreates the core user experience of WhatsApp while integrating a simulated Meta AI Assistant capable of responding to engineering-related prompts. The project emphasizes clean architecture, reusable components, responsive UI design, and realistic messaging behavior suitable for learning React Native application development.

---

## 📂 Project Directory Architecture

Based on the official repository mapping, the module tree is strictly separated into modular sub-systems inside the `client` directory:

```text
WHATSAPP/
├── client/                      # Main frontend workspace application
│   ├── .expo/                   # Expo configuration dependency metadata
│   ├── apis/                    # Client-side endpoint configurations
│   ├── assets/                  # Media resources, fonts, and local static assets
│   ├── components/              # Shared UI modular components (e.g., Typing loaders)
│   ├── screens/                 # Core view controllers and viewport paths
│   │   ├── AddContactModelScreen.tsx  # Dynamic reference model for new entries
│   │   ├── CallsScreen.tsx            # Voice and video history dashboard view
│   │   ├── ChatScreen.tsx             # Main peer messaging feed with color-state ticks
│   │   ├── CommunitiesScreen.tsx      # Group updates & community dashboard controller
│   │   ├── HomeScreen.tsx             # Parent landing page anchoring main structural tabs
│   │   ├── MetaAiScreen.tsx           # Contextual AI viewport with randomized responses
│   │   ├── ProfileScreen.tsx          # User credentials & state customization screen
│   │   ├── SettingsScreen.tsx         # Preference panels and device variables routing
│   │   ├── SplashScreen.tsx           # Launch optimization frame animation
│   │   └── UpdatesScreen.tsx          # Custom Status timelines and Channels grid panel
│   ├── App.tsx                  # Application entry point & Navigation hub orchestration
│   ├── app.json                 # Native Expo app specifications and package versions
│   ├── tsconfig.json            # Strict TypeScript compilation rules mapping
│   └── package.json             # Core dependency management nodes
├── AGENTS.md                    # Environment setup notes
└── README.md                    # Central repository manual
🚀 Key Implementations1. Peer-to-Peer Chat Engine (ChatScreen.tsx)Dynamic Layout Spacing: Eliminated hardcoded view constraints by mapping a fluid flex: 1 structure on the message container. This safely locks text inputs immediately flush above active native keyboard states on both iOS and Android views.WhatsApp Double-Tick Simulation: Replaced legacy question marks with MaterialCommunityIcons standard check-all. Outgoing strings instantly verify their runtime state by dynamically matching color schemas:status: 'sent' | 'delivered' $\rightarrow$ Rendered as standard WhatsApp Gray (#8696a0).status: 'read' $\rightarrow$ Re-rendered fluidly as vivid WhatsApp Light Blue (#53bdeb).Expanded Messaging Database: Packed with 10+ distinct dynamic automated variations addressing software testing conversations, system design bugs, and local deployment logic checks.2. Meta AI Smart Simulation (MetaAiScreen.tsx)Theme Integration: Mimics Meta's standalone artificial intelligence aesthetic with signature deep-violet sparkle rings (#A855F7) and custom fluid text-wrapped conversational cells.Asynchronous Parallel Animations: The typing status features an interactive triple-dot structural pulse powered directly by an optimized Animated.parallel sequence running native driver tasks smoothly.LLM Testing Arrays: Includes an expanded database of over 10 engineering-oriented conversational AI responses that intelligently address full-stack questions, database caching, state updates, and error handlers.⚡ Setup & Execution InstructionsPrerequisitesEnsure your workstation has Node.js (v18+) installed alongside the global execution utility for Expo CLI.Execution StepsNavigate into the workspace client directory:Bashcd WHATSAPP/client
Install node dependencies safely:Bashnpm install
Verify core packages and assets compilation status:Bashnpx expo install @expo/vector-icons
Launch local bundler system:Bashnpx expo start
Simulate live rendering parameters:Scan the generated console QR code with your hardware device via Expo Go (Android/iOS).Alternatively, smash a for Android Emulator or i for running direct pipelines on an iOS Simulator.⚙️ Layout Adjustments NoteThe codebase relies cleanly on software-only responsiveness constraints. There are no static height subtractions or screen offsets, preventing broken text overlays or empty white space bugs when swapping screen configurations.
