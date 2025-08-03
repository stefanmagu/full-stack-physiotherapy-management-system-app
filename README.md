# 🏥 Full-Stack MERN Physiotherapy Management System

<div align="center">

**A comprehensive healthcare management platform built with the MERN stack**

💻 **MongoDB • Express.js • React • Node.js** 💻

</div>

---

## 🎯 **System Overview**

This sophisticated **MERN stack healthcare management platform** consists of **three interconnected applications**:

| 🏥 **Frontend Portal** | 👨‍💼 **Admin Dashboard** | ⚙️ **Backend API** |
|:---:|:---:|:---:|
| **Patient-facing interface** | **Management & Analytics Hub** | **Core Business Logic** |
| React 18 + Vite | React 18 + Chart.js | Node.js + Express |
| Appointment booking | Admin & Physiotherapist panels | MongoDB + JWT Auth |
| Payment integration | Analytics & reporting | Payment processing |
| Profile management | User management | Cloudinary integration |

### 🎭 **Multi-Role Architecture**
- 👤 **Patients**: Register, book appointments, make payments, leave reviews
- 🏥 **Physiotherapists**: Manage schedules, track earnings, view analytics
- 👨‍💼 **Administrators**: Oversee entire system, manage users, generate reports

### 🚀 **Key Highlights**
- 🏗️ **MERN Stack Architecture** (MongoDB, Express.js, React, Node.js)
- 📱 **Responsive Design** with Tailwind CSS
- 💳 **Dual Payment Gateways** (Stripe & Razorpay)
- 📊 **Real-time Analytics** with interactive charts
- 🔒 **Enterprise-grade Security** with JWT authentication
- ☁️ **Cloud Integration** with Cloudinary for media management

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Multi-Role Authentication System
- **Patients**: Register, login, and manage personal profiles
- **Physiotherapists**: Professional login with dedicated dashboard
- **Administrators**: Full system management capabilities

### 👤 Patient Features
- **Profile Management**: Update personal information, profile picture, and contact details
- **Physiotherapist Discovery**: Browse available physiotherapists with detailed profiles
- **Appointment Booking**: Book appointments with preferred time slots
- **Payment Integration**: Secure payments via Stripe and Razorpay
- **Appointment History**: View past and upcoming appointments
- **Reviews & Ratings**: Rate and review physiotherapists after appointments
- **Appointment Management**: Cancel appointments when needed

### 🏥 Physiotherapist Features
- **Professional Dashboard**: Comprehensive overview with analytics and charts
- **Appointment Management**: View, confirm, complete, and cancel appointments
- **Profile Management**: Update professional information, fees, and availability
- **Patient Management**: Track patient history and treatment progress
- **Earnings Tracking**: Monitor income and payment status
- **Schedule Management**: Set availability and manage time slots
- **Performance Analytics**: View appointment trends and predictions

### 👨‍💼 Administrator Features
- **System Dashboard**: Complete overview of platform statistics
- **Physiotherapist Management**: Add, remove, and manage physiotherapist accounts
- **Appointment Oversight**: Monitor all system appointments
- **User Management**: Oversee patient accounts and activities
- **Analytics & Reports**: Comprehensive system analytics with Chart.js
- **Content Management**: Manage platform content and settings

### 🚀 Technical Features
- **MERN Stack Architecture**: Full JavaScript ecosystem from database to UI
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live data synchronization across all platforms
- **Image Management**: Cloudinary integration for image storage
- **Secure Authentication**: JWT-based authentication system
- **Payment Processing**: Multiple payment gateway support
- **Data Visualization**: Interactive charts and analytics
- **Email Notifications**: Automated appointment confirmations
- **Search & Filter**: Advanced search functionality

## 🛠 Tech Stack

### 🏗️ MERN Stack Foundation
- **MongoDB** - NoSQL database for flexible data storage
- **Express.js** - Web application framework for Node.js
- **React 18** - Modern UI library for interactive frontends
- **Node.js** - JavaScript runtime for server-side development

### Frontend Technologies
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Chart.js** - Data visualization (Admin panel)
- **React Chart.js 2** - React wrapper for Chart.js

### Backend & Database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload middleware
- **Stripe** - Payment processing
- **Razorpay** - Payment gateway
- **CORS** - Cross-origin resource sharing
- **Validator** - Data validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Nodemon** - Development server auto-restart

## 📁 Project Structure

```
LICENTA-app/
├── 📁 backend/              # Node.js/Express API server
│   ├── 📁 config/           # Database and service configurations
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   └── mongodb.js       # MongoDB connection
│   ├── 📁 controllers/      # Business logic
│   │   ├── adminController.js
│   │   ├── physiotherapistController.js
│   │   └── userController.js
│   ├── 📁 middleware/       # Authentication and file upload
│   │   ├── authAdmin.js
│   │   ├── authPhysiotherapist.js
│   │   ├── authUser.js
│   │   └── multer.js
│   ├── 📁 models/           # Database schemas
│   │   ├── appointmentModel.js
│   │   ├── physiotherapistModel.js
│   │   └── userModel.js
│   ├── 📁 routes/           # API routes
│   │   ├── adminRoute.js
│   │   ├── physiotherapistRoute.js
│   │   └── userRoute.js
│   ├── package.json
│   └── server.js            # Main server file
├── 📁 frontend/             # Patient-facing React application
│   ├── 📁 public/           # Static assets
│   ├── 📁 src/
│   │   ├── 📁 assets/       # Images and icons
│   │   ├── 📁 components/   # Reusable React components
│   │   ├── 📁 context/      # React Context providers
│   │   ├── 📁 pages/        # Page components
│   │   ├── App.jsx          # Main App component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # React entry point
│   ├── package.json
│   └── vite.config.js       # Vite configuration
├── 📁 admin/                # Admin & Physiotherapist panel
│   ├── 📁 public/           # Static assets
│   ├── 📁 src/
│   │   ├── 📁 assets/       # Images and icons
│   │   ├── 📁 components/   # Shared components
│   │   ├── 📁 context/      # Context providers
│   │   ├── 📁 pages/        # Admin and Physiotherapist pages
│   │   │   ├── 📁 Admin/    # Admin-specific pages
│   │   │   └── 📁 Physiotherapist/ # Physiotherapist pages
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json             # Root package.json
└── README.md               # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account
- Stripe account (for payments)
- Razorpay account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/physiotherapy-management-system.git
cd physiotherapy-management-system
```

### 2. Install Dependencies

**Install root dependencies:**
```bash
npm install
```

**Install backend dependencies:**
```bash
cd backend
npm install
```

**Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

**Install admin panel dependencies:**
```bash
cd ../admin
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/physiotherapy_db
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server Configuration
PORT=4001

# Admin Credentials
ADMIN_EMAIL=admin@physiotherapy.com
ADMIN_PASSWORD=admin123
```

### 4. Start the Applications

**Start the backend server:**
```bash
cd backend
npm run server
# or for production
npm start
```

**Start the frontend (Patient portal):**
```bash
cd frontend
npm run dev
```

**Start the admin panel:**
```bash
cd admin
npm run dev
```

### 5. Access the Applications

- **Patient Portal**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:4001

## 🔧 Environment Variables

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/physiotherapy_db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `RAZORPAY_KEY_ID` | Razorpay key ID | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | `your_razorpay_secret` |
| `PORT` | Backend server port | `4001` |
| `ADMIN_EMAIL` | Default admin email | `admin@example.com` |
| `ADMIN_PASSWORD` | Default admin password | `securepassword` |

## 💻 Usage

### For Patients
1. **Registration**: Create an account with email and password
2. **Profile Setup**: Complete your profile with personal information
3. **Browse Physiotherapists**: View available physiotherapists and their specialties
4. **Book Appointments**: Select preferred date and time slots
5. **Make Payments**: Pay online via Stripe or Razorpay
6. **Manage Appointments**: View, reschedule, or cancel appointments
7. **Leave Reviews**: Rate and review physiotherapists after sessions

### For Physiotherapists
1. **Login**: Use provided credentials to access the physiotherapist panel
2. **Dashboard Overview**: View appointments, earnings, and analytics
3. **Manage Profile**: Update professional information, fees, and availability
4. **Handle Appointments**: Confirm, complete, or cancel appointments
5. **Track Patients**: Monitor patient history and treatment progress
6. **View Analytics**: Access performance metrics and future predictions

### For Administrators
1. **System Login**: Access admin panel with administrator credentials
2. **Dashboard Management**: Monitor overall system performance
3. **User Management**: Oversee patient and physiotherapist accounts
4. **Add Physiotherapists**: Onboard new physiotherapy professionals
5. **System Analytics**: View comprehensive reports and statistics
6. **Content Management**: Manage platform settings and content

## 📚 API Documentation

### Authentication Endpoints

#### User Authentication
```http
POST /api/user/register
POST /api/user/login
```

#### Physiotherapist Authentication
```http
POST /api/physiotherapist/login
```

#### Admin Authentication
```http
POST /api/admin/login
```

### Appointment Management

#### User Appointments
```http
GET /api/user/appointments
POST /api/user/book-appointment
POST /api/user/cancel-appointment
POST /api/user/payment/stripe
POST /api/user/payment/razorpay
```

#### Physiotherapist Appointments
```http
GET /api/physiotherapist/appointments
POST /api/physiotherapist/complete-appointment
POST /api/physiotherapist/cancel-appointment
```

### Profile Management
```http
GET /api/user/profile
POST /api/user/update-profile
GET /api/physiotherapist/profile
POST /api/physiotherapist/update-profile
```

### Admin Operations
```http
GET /api/admin/appointments
POST /api/admin/add-physiotherapist
GET /api/admin/physiotherapists
GET /api/admin/dashboard
```

## 🎨 Key Features in Detail

### 📊 Analytics Dashboard
- Real-time appointment statistics
- Revenue tracking and forecasting
- Patient engagement metrics
- Physiotherapist performance analytics
- Interactive charts using Chart.js

### 💳 Payment Integration
- **Stripe**: International card payments
- **Razorpay**: Local payment methods
- Secure payment processing
- Payment history tracking
- Refund management

### 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Secure API endpoints
- Data validation and sanitization

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interfaces
- Fast loading times
- Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
