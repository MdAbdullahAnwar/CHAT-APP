# 💬 Talk-A-Tive - Real-Time Chat Application

A full-stack real-time chat application built with MERN stack, Socket.io, and Cloudinary for media sharing. Connect with friends, family, and colleagues instantly with seamless communication.

![Node](https://img.shields.io/badge/Node.js-v14+-green)
![React](https://img.shields.io/badge/React-v17-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4+-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Socket Events](#-socket-events)
- [Project Structure](#-project-structure)
- [Key Features Explained](#-key-features-explained)
- [Security Features](#-security-features)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### Core Features

- 🔐 **User Authentication** - Secure JWT-based signup/login
- 💬 **Real-time Messaging** - Instant message delivery using Socket.io
- 👥 **One-on-One Chat** - Private conversations between users
- 👨‍👩‍👧‍👦 **Group Chat** - Create and manage group conversations with multiple users
- 📎 **Media Sharing** - Share images and videos via Cloudinary
- ⌨️ **Typing Indicators** - See when someone is typing in real-time
- 🔔 **Notifications** - Real-time message notifications with badge count
- 🔍 **User Search** - Find and connect with other users instantly
- 📱 **Responsive Design** - Modern UI with Chakra UI v3 and gradient styling
- ⏰ **WhatsApp-style Timestamps** - Time display for messages (HH:mm format)

### Additional Features

- 👤 **Profile Management** - View user profiles with avatars
- 🎨 **Modern UI/UX** - Colorful gradients and smooth animations
- 🖼️ **Profile Pictures** - Upload and display user avatars
- 📊 **Chat List** - View all conversations with latest message preview
- 🔄 **Real-time Updates** - Instant UI updates without page refresh
- 🎯 **Guest User Login** - Quick demo access without signup
- 📧 **Email Display** - View user email in profiles
- 🔒 **Protected Routes** - Secure access to chat features
- 🌐 **Cross-platform** - Works on desktop, tablet, and mobile

---

## 📸 Screenshots

### Landing Page

![Landing Page](screenshots/landing-page.png)
_Beautiful hero section with feature highlights and call-to-action_

### Authentication

![Login Page](screenshots/login.png)
_Secure login with gradient design and guest user option_

![Signup Page](screenshots/signup.png)
_User registration with profile photo upload_

### Chat Interface

![Chat Page](screenshots/chat-page.png)
_Main chat interface with sidebar, message area, and user list_

### Group Chat

![Group Chat](screenshots/group-chat.png)
_Create and manage group conversations_

### Media Sharing

![Media Sharing](screenshots/media-sharing.png)
_Share images and videos with preview_

### User Search

![User Search](screenshots/user-search.png)
_Search and connect with users_

### Notifications

![Notifications](screenshots/notifications.png)
_Real-time message notifications with badge count_

---

## 🛠 Tech Stack

### Frontend

- **React 17.0.2** - UI library
- **Chakra UI v1.6.2** - Component library with modern design
- **Socket.io Client 4.1.2** - Real-time bidirectional communication
- **Axios 0.21.1** - HTTP client for API requests
- **React Router v5.2.0** - Client-side routing
- **React Toastify 9.1.3** - Toast notifications
- **Lucide React 0.560.0** - Modern icon library
- **date-fns 4.1.0** - Date formatting and manipulation
- **Vite 4.0.0** - Fast build tool and dev server
- **React Scrollable Feed 1.3.1** - Auto-scrolling chat messages
- **Framer Motion 4** - Animation library
- **React Lottie 1.2.3** - Lottie animations for React
- **React Notification Badge 1.5.1** - Notification badge component
- **Emoji Mart 3.0.1** - Emoji picker component

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io 4.1.2** - Real-time engine
- **JWT (jsonwebtoken)** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Dotenv** - Environment variable management
- **Colors** - Terminal string styling

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas** account or local MongoDB - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary** account - [Sign up](https://cloudinary.com/)
- **npm** or **yarn** package manager

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/talk-a-tive.git
cd "06.Chat App"
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔧 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

**MongoDB URI Example:**

```
mongodb+srv://username:password@cluster.mongodb.net/chat-app?retryWrites=true&w=majority
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

### Cloudinary Setup

1. Create a Cloudinary account at [https://cloudinary.com](https://cloudinary.com)
2. Navigate to **Settings** → **Upload** → **Add upload preset**
3. Set preset name to `chat-app` (or your choice)
4. Set signing mode to **Unsigned**
5. Save the preset
6. Copy your **Cloud Name** from the dashboard
7. Add both values to your `.env` files

---

## ▶️ Running the Application

### Development Mode

#### Start Backend Server

Open **Terminal 1**:

```bash
cd backend
npm start
```

Backend runs on `http://localhost:5000`

#### Start Frontend Development Server

Open **Terminal 2**:

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Deploy

1. Set `NODE_ENV=production` in backend `.env`
2. Copy `frontend/dist` to `backend/frontend/build`
3. Start backend server:

```bash
cd backend
npm start
```

The backend will serve the frontend build in production mode.

---

## 📚 API Documentation

### Authentication Endpoints

#### Register New User

```http
POST /api/user
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "pic": "base64_encoded_image_or_url"
}
```

**Response:**

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "pic": "profile_picture_url",
  "token": "jwt_token"
}
```

#### Login User

```http
POST /api/user/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "pic": "profile_picture_url",
  "token": "jwt_token"
}
```

#### Search Users

```http
GET /api/user?search=john
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "pic": "profile_picture_url"
  }
]
```

---

### Chat Endpoints

#### Create/Access One-on-One Chat

```http
POST /api/chat
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "userId": "other_user_id"
}
```

**Response:**

```json
{
  "_id": "chat_id",
  "chatName": "sender",
  "isGroupChat": false,
  "users": [...],
  "latestMessage": {...}
}
```

#### Fetch All Chats

```http
GET /api/chat
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
  {
    "_id": "chat_id",
    "chatName": "Chat Name",
    "isGroupChat": false,
    "users": [...],
    "latestMessage": {...}
  }
]
```

#### Create Group Chat

```http
POST /api/chat/group
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "name": "Project Team",
  "users": ["user_id_1", "user_id_2", "user_id_3"]
}
```

#### Rename Group

```http
PUT /api/chat/rename
```

**Request Body:**

```json
{
  "chatId": "chat_id",
  "chatName": "New Group Name"
}
```

#### Add User to Group

```http
PUT /api/chat/groupadd
```

**Request Body:**

```json
{
  "chatId": "chat_id",
  "userId": "user_id_to_add"
}
```

#### Remove User from Group

```http
PUT /api/chat/groupremove
```

**Request Body:**

```json
{
  "chatId": "chat_id",
  "userId": "user_id_to_remove"
}
```

---

### Message Endpoints

#### Fetch All Messages

```http
GET /api/message/:chatId
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
  {
    "_id": "message_id",
    "sender": {...},
    "content": "Hello!",
    "chat": {...},
    "media": {
      "url": "cloudinary_url",
      "type": "image"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Send Message

```http
POST /api/message
```

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body (Text Message):**

```json
{
  "content": "Hello, how are you?",
  "chatId": "chat_id"
}
```

**Request Body (Media Message):**

```json
{
  "content": "Check this out!",
  "chatId": "chat_id",
  "media": {
    "url": "cloudinary_url",
    "type": "image"
  }
}
```

**Response:**

```json
{
  "_id": "message_id",
  "sender": {...},
  "content": "Hello, how are you?",
  "chat": {...},
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔌 Socket Events

### Client → Server Events

#### Setup Connection

```javascript
socket.emit("setup", userData);
```

Initialize user connection with user data.

#### Join Chat Room

```javascript
socket.emit("join chat", roomId);
```

Join a specific chat room to receive messages.

#### Typing Indicator

```javascript
socket.emit("typing", roomId);
```

Notify others that user is typing.

#### Stop Typing

```javascript
socket.emit("stop typing", roomId);
```

Notify others that user stopped typing.

#### Send New Message

```javascript
socket.emit("new message", messageData);
```

Broadcast new message to chat participants.

---

### Server → Client Events

#### Connection Established

```javascript
socket.on("connected", () => {
  console.log("Connected to socket.io");
});
```

#### Typing Notification

```javascript
socket.on("typing", () => {
  // Show typing indicator
});
```

#### Stop Typing Notification

```javascript
socket.on("stop typing", () => {
  // Hide typing indicator
});
```

#### Message Received

```javascript
socket.on("message recieved", (newMessage) => {
  // Update chat with new message
});
```

---

## 📁 Project Structure

```
06.Chat App/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── generateToken.js         # JWT token generation
│   ├── controllers/
│   │   ├── chatControllers.js       # Chat CRUD operations
│   │   ├── messageControllers.js    # Message operations
│   │   └── userControllers.js       # User authentication
│   ├── data/
│   │   └── data.js                  # Sample data
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorMiddleware.js       # Error handling
│   ├── models/
│   │   ├── chatModel.js             # Chat schema
│   │   ├── messageModel.js          # Message schema
│   │   └── userModel.js             # User schema
│   ├── routes/
│   │   ├── chatRoutes.js            # Chat endpoints
│   │   ├── messageRoutes.js         # Message endpoints
│   │   └── userRoutes.js            # User endpoints
│   ├── .env                         # Environment variables
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Entry point
│
├── frontend/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── animations/
│   │   │   └── typing.json          # Lottie typing animation
│   │   ├── assets/
│   │   │   └── bg.png               # Background image
│   │   ├── components/
│   │   │   ├── Authentication/
│   │   │   │   ├── Login.jsx        # Login form
│   │   │   │   └── Signup.jsx       # Signup form
│   │   │   ├── miscellaneous/
│   │   │   │   ├── GroupChatModal.jsx        # Create group
│   │   │   │   ├── ProfileModal.jsx          # User profile
│   │   │   │   ├── SideDrawer.jsx            # Search drawer
│   │   │   │   └── UpdateGroupChatModal.jsx  # Edit group
│   │   │   ├── UserAvatar/
│   │   │   │   ├── UserBadgeItem.jsx         # User badge
│   │   │   │   └── UserListItem.jsx          # User list item
│   │   │   ├── ChatBox.jsx          # Chat container
│   │   │   ├── ChatLoading.jsx      # Loading skeleton
│   │   │   ├── MyChats.jsx          # Chat list sidebar
│   │   │   ├── ScrollableChat.jsx   # Message display
│   │   │   ├── SingleChat.jsx       # Chat input area
│   │   │   └── styles.css           # Component styles
│   │   ├── config/
│   │   │   └── ChatLogics.js        # Helper functions
│   │   ├── Context/
│   │   │   └── ChatProvider.jsx     # Global state
│   │   ├── data/
│   │   │   └── messages.js          # Sample messages
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx         # Main chat page
│   │   │   ├── HomePage.jsx         # Auth page
│   │   │   └── LandingPage.jsx      # Landing page
│   │   ├── App.css                  # Global styles
│   │   ├── App.jsx                  # Main component
│   │   ├── index.css                # Base styles
│   │   └── main.jsx                 # Entry point
│   ├── .env                         # Environment variables
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite configuration
│
├── screenshots/                     # Application screenshots
├── .gitignore                       # Git ignore file
├── LICENSE                          # MIT License
└── README.md                        # This file
```

---

## 🎯 Key Features Explained

### Real-time Messaging

Messages are delivered instantly using Socket.io:

1. User sends a message
2. Message saved to MongoDB
3. Socket.io broadcasts to all chat participants
4. UI updates in real-time without refresh

### Media Sharing

Upload and share images/videos:

1. Click paperclip icon in chat input
2. Select image or video file
3. File uploads to Cloudinary
4. Message sent with media URL
5. Images are clickable to open in new tab
6. Videos have playback controls
7. Media messages show 📷 Photo or 🎥 Video in chat list

### Notifications

Real-time notification system:

1. New message arrives via Socket.io
2. If chat is not selected, add to notifications
3. Badge count updates on bell icon
4. Click notification to open chat
5. Notifications cleared when chat is opened
6. Works for both text and media messages

### Typing Indicators

See when someone is typing:

1. User starts typing in input field
2. Socket.io emits "typing" event
3. Other users see typing indicator
4. Indicator disappears after 3 seconds or when user stops typing

### Group Chat Management

Create and manage group conversations:

1. Click "New Group" button
2. Select users and enter group name
3. Add/remove users anytime
4. Rename group
5. Only group admin can modify settings

### User Search

Find and connect with users:

1. Click "Search User" button
2. Enter name or email
3. Results appear instantly
4. Click user to start chat

### WhatsApp-style Timestamps

Smart time display:

- **Today's messages**: HH:mm (e.g., 14:30)
- **Yesterday's messages**: "Yesterday"
- **Older messages**: dd/MM/yyyy (e.g., 15/01/2024)

### Profile Management

View and manage user profiles:

1. Click user avatar to view profile
2. See name, email, and profile picture
3. Upload custom profile photo during signup
4. Profile photos stored on Cloudinary

---

## 🔒 Security Features

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Token Expiry**: Automatic logout after token expires
- **Protected Routes**: Middleware verification for all protected endpoints

### Data Protection

- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Mongoose ORM parameterized queries
- **XSS Protection**: React's built-in escaping
- **CORS Configuration**: Controlled cross-origin access

### Privacy

- **Secure Storage**: Passwords never stored in plain text
- **Environment Variables**: Sensitive data in .env files
- **HTTPS Ready**: Production-ready for SSL/TLS

---

## 🐛 Troubleshooting

### Backend Connection Error

**Problem**: Frontend can't connect to backend

**Solution**:

1. Ensure backend server is running on port 5000
2. Check `vite.config.js` proxy configuration
3. Verify `VITE_API_URL` in frontend `.env`

```bash
# Terminal 1 - Start backend first
cd backend
npm start

# Terminal 2 - Then start frontend
cd frontend
npm run dev
```

---

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB

**Solution**:

1. Check `MONGO_URI` in backend `.env` file
2. Ensure MongoDB Atlas cluster is running
3. Verify IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development)
4. Check username and password in connection string

**Example Connection String**:

```
mongodb+srv://username:password@cluster.mongodb.net/chat-app?retryWrites=true&w=majority
```

---

### Cloudinary Upload Fails

**Problem**: Media upload not working

**Solution**:

1. Verify `CLOUDINARY_CLOUD_NAME` is correct
2. Check `CLOUDINARY_UPLOAD_PRESET` exists in Cloudinary
3. Ensure upload preset is set to **Unsigned**
4. Check both frontend and backend `.env` files

**Steps to Create Upload Preset**:

1. Login to Cloudinary
2. Settings → Upload → Add upload preset
3. Name: `chat-app`
4. Signing Mode: **Unsigned**
5. Save

---

### Socket.io Connection Issues

**Problem**: Real-time features not working

**Solution**:

1. Check Socket.io connection in browser console
2. Verify backend Socket.io configuration in `server.js`
3. Ensure CORS origin matches frontend URL
4. Check firewall settings

**Backend Socket.io Config**:

```javascript
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});
```

---

### JWT Token Errors

**Problem**: "Not authorized, token failed" error

**Solution**:

1. Check `JWT_SECRET` in backend `.env`
2. Clear browser localStorage and login again
3. Verify token is being sent in Authorization header
4. Check token expiry (default: 30 days)

---

### Build Errors

**Problem**: `npm run build` fails

**Solution**:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version (v14+)
4. Clear Vite cache: `rm -rf node_modules/.vite`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@MdAbdullahAnwar](https://github.com/MdAbdullahAnwar)
- Email: crazydeveloper4444@gmail.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Chakra UI](https://chakra-ui.com/) - Component library
- [Socket.io](https://socket.io/) - Real-time engine
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Media storage
- [Express.js](https://expressjs.com/) - Backend framework
- All open-source contributors

---

## 📞 Support

For support, email crazydeveloper4444@gmail.com or open an issue on GitHub.

---

## 🗺 Roadmap

- [ ] Voice messages
- [ ] Video calls
- [ ] Screen sharing
- [ ] Message reactions (emoji)
- [ ] Message editing
- [ ] Message deletion
- [ ] Read receipts
- [ ] Online/offline status
- [ ] Last seen timestamp
- [ ] Message search
- [ ] File sharing (PDF, documents)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] End-to-end encryption
- [ ] Message forwarding
- [ ] Starred messages
- [ ] Chat backup/export
- [ ] Custom emoji
- [ ] Stickers

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ by MD Abdullah Anwar**
