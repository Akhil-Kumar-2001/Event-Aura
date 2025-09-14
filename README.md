# Event Aura

Event Aura is a comprehensive event management and ticketing platform built with the MERN stack. It provides event organizers with powerful tools to create, manage, and promote events while offering attendees a seamless booking experience with integrated payment processing.

![GitHub stars](https://img.shields.io/github/stars/Akhil-Kumar-2001/Event-Aura?style=social)
![GitHub forks](https://img.shields.io/github/forks/Akhil-Kumar-2001/Event-Aura?style=social)
![GitHub issues](https://img.shields.io/github/issues/Akhil-Kumar-2001/Event-Aura)
![GitHub license](https://img.shields.io/github/license/Akhil-Kumar-2001/Event-Aura)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About

Event Aura is designed to bridge the gap between event organizers and attendees by providing a unified platform for event management and ticket distribution. The platform supports both free and paid events with secure payment processing, real-time booking management, and comprehensive analytics for organizers.

Whether you're organizing a small workshop, a corporate conference, or a large-scale festival, Event Aura provides the tools you need to manage every aspect of your event efficiently.

---

## Features

### For Event Organizers
- **Event Creation & Management:** Create, edit, and delete events with rich descriptions and media
- **Dashboard Analytics:** Track event performance, attendee statistics, and revenue
- **Attendee Management:** View and manage registered attendees
- **Real-time Updates:** Instant notifications for new bookings and cancellations

### For Attendees
- **Event Discovery:** Browse and search events with advanced filtering options
- **Secure Booking:** Book tickets for free and paid events with Stripe integration
- **Profile Management:** Manage personal information and booking history
- **Mobile-Responsive:** Optimized experience across all devices

### Technical Features
- **JWT Authentication:** Secure user authentication and authorization
- **Role-based Access Control:** Separate interfaces for organizers and attendees
- **Payment Integration:** Seamless Stripe payment processing
- **Form Validation:** Robust client and server-side validation
- **TypeScript Support:** Type-safe development environment
- **Responsive Design:** Mobile-first responsive design approach

---

## Demo

Explore the live platform here:  
**[https://event-aura-ten.vercel.app/](https://event-aura-ten.vercel.app/)**

### Test Credentials
- **Organizer Account:** organizer@example.com / password123
- **Attendee Account:** attendee@example.com / password123

---

## Tech Stack

### Frontend
- **React** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Stripe** - Payment processing

### Development & Deployment
- **ESLint & Prettier** - Code linting and formatting
- **Vercel** - Frontend deployment
- **Render/Railway** - Backend deployment
- **MongoDB Atlas** - Cloud database hosting

---

## Project Structure

```
Event-Aura/
│
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers and business logic
│   │   ├── middleware/     # Authentication and validation middleware
│   │   ├── models/         # MongoDB schemas and models
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic services
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Helper functions and utilities
│   │   └── app.ts          # Express application setup
│   ├── package.json        # Backend dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
│
├── client/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page-level components
│   │   ├── services/       # API service functions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context providers
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Client-side utilities
│   │   └── main.tsx        # React application entry point
│   ├── package.json        # Frontend dependencies and scripts
│   ├── vite.config.ts      # Vite configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
│
└── README.md               # Project documentation
```

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or Atlas account)
- Stripe account for payment processing

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/Akhil-Kumar-2001/Event-Aura.git
cd Event-Aura
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../client
npm install
```

4. **Set up environment variables:**

**Backend (.env file in backend directory):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NODE_ENV=development
```

**Frontend (.env file in client directory):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

5. **Start the development servers:**

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

6. **Access the application:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Usage

### Getting Started
1. **Register an account** by choosing either "Organizer" or "Attendee" role
2. **Complete your profile** with relevant information
3. **For Organizers:** Create your first event from the dashboard
4. **For Attendees:** Browse events and book tickets

### Organizer Workflow
- Create events with detailed information, pricing, and capacity
- Monitor real-time booking statistics and revenue
- Manage attendee information and communications
- Update event details as needed

### Attendee Workflow
- Search and filter events by category, date, and location
- View comprehensive event details and organizer information
- Book tickets with secure payment processing
- Manage your bookings and view ticket history

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Events
- `GET /api/events` - Get all events (with pagination and filters)
- `POST /api/events` - Create new event (organizers only)
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event (organizers only)
- `DELETE /api/events/:id` - Delete event (organizers only)
- `GET /api/events/organizer/:organizerId` - Get events by organizer

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/event/:eventId` - Get event bookings (organizers only)
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/payment/create-intent` - Create payment intent

---

## Environment Variables

### Backend Environment Variables
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/event-aura

# Authentication
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=7d

# Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Payment
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# App Configuration
VITE_APP_NAME=Event Aura
VITE_APP_URL=http://localhost:5173
```

---

## Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes:** `git commit -m 'Add amazing feature'`
5. **Push to the branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Reporting Issues
If you encounter any bugs or have feature requests, please create an issue on GitHub with:
- Clear description of the problem or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **React Community** for the excellent ecosystem and tools
- **MongoDB** for the flexible and scalable database solution
- **Stripe** for secure and reliable payment processing
- **Vercel** for seamless deployment and hosting
- **Open Source Community** for the amazing libraries and frameworks
- **Contributors** who help make this project better

---

## Contact

**Akhil Kumar**
- GitHub: [@Akhil-Kumar-2001](https://github.com/Akhil-Kumar-2001)
- Email: [akhilkumars2001@gmail.com]
- LinkedIn: [Connect with me]([https://linkedin.com/in/your-profile](https://www.linkedin.com/in/akhil-kumar-s-9583762a1/))

---

**⭐ Star this repository if you find it helpful!**

**🚀 [Live Demo](https://event-aura-ten.vercel.app/)** | **📖 [Documentation](#)** | **🐛 [Report Issues](https://github.com/Akhil-Kumar-2001/Event-Aura/issues)**
