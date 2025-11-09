# ASTRA Solar Vehicle Team Management System

A comprehensive team management platform designed specifically for the ASTRA Solar Electric Vehicle project, enabling seamless collaboration across 14 specialized teams working on cutting-edge solar vehicle technology.

## 🌟 Live Demo

**Application URL**: [https://sb-3cvrslybh98w.vercel.run](https://sb-3cvrslybh98w.vercel.run)

### Demo Credentials
- **Admin Access**: 
  - Email: `admin@astra.com`
  - Password: `admin123`
- **Member Registration**: Create account with any email/password (requires admin approval)

## 🚗 Project Overview

ASTRA (Advanced Solar Transportation Research Alliance) is building the future of sustainable transportation. This management system coordinates efforts across all teams involved in designing, building, and testing our solar-powered vehicle.

## ⚡ Key Features

### 🔐 Authentication & Access Control
- **Member Registration**: Secure signup process with admin approval workflow
- **Role-Based Access**: Three permission levels (Member, Team Head, Admin)
- **Admin Dashboard**: Comprehensive user management and approval system
- **Session Management**: Secure JWT-based authentication

### 👥 Team Management (14 Specialized Teams)
Our platform supports collaboration across all ASTRA teams:

| Team | Focus Area | Icon |
|------|------------|------|
| **Transmission** | Powertrain & transmission systems | ⚙️ |
| **Electricals** | Electrical systems & wiring | ⚡ |
| **Design** | Vehicle design & aesthetics | 🎨 |
| **Suspension** | Suspension & chassis systems | 🔧 |
| **Dashboard** | Driver interface & instrumentation | 📊 |
| **Innovation** | Research & development initiatives | 💡 |
| **Business** | Strategy, partnerships & funding | 💼 |
| **Autonomous** | Self-driving & AI systems | 🤖 |
| **Wheel Assembly** | Wheel design & assembly | ⭕ |
| **Brakes** | Braking systems & safety | 🛑 |
| **Solar** | Solar panel integration & efficiency | ☀️ |
| **Steering** | Steering mechanism & control | 🎯 |
| **Media** | Documentation & public relations | 📸 |
| **Report** | Technical documentation & reporting | 📝 |

### 📋 Advanced Task Management
- **Task Assignment**: Team heads can create and assign tasks to members
- **Progress Tracking**: Real-time status updates with visual progress indicators
- **Priority System**: Four-level priority system (Urgent, High, Medium, Low)
- **Due Date Management**: Automatic overdue detection and alerts
- **File Attachments**: Support for progress photos, videos, and documents
- **Team Filtering**: View tasks by team, status, or priority

### 📸 Documentation & File Management
- **Progress Documentation**: Upload photos and videos of work progress
- **Fault Reporting**: Document issues with visual evidence
- **Team-Specific Storage**: Organized file storage by team and project
- **Media Gallery**: Visual timeline of project development
- **File Type Support**: Images, videos, and technical documents

### 📢 Communication System
- **General Announcements**: System-wide updates for all team members
- **Team-Specific Messages**: Targeted communications for individual teams
- **Priority Notifications**: High-priority alerts for urgent updates
- **Real-Time Updates**: Instant notification system for new announcements

### 📊 Analytics & Reporting
- **Dashboard Analytics**: Real-time statistics on tasks, teams, and progress
- **Team Performance**: Metrics for individual and team productivity
- **Project Milestones**: Track major project deliverables and deadlines
- **Resource Allocation**: Monitor team workload and resource distribution

## 🛠 Technology Stack

### Frontend
- **Next.js 15**: React-based framework with server-side rendering
- **TypeScript**: Type-safe development with enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Modern component library built on Radix UI primitives

### Backend
- **Next.js API Routes**: Serverless API endpoints for data management
- **Client-side Storage**: LocalStorage-based data persistence (demo implementation)
- **File Upload Handling**: Integrated file management system

### Authentication & Security
- **JWT-based Sessions**: Secure token-based authentication
- **Role-based Access Control**: Fine-grained permission system
- **Input Validation**: Comprehensive form validation and sanitization
- **CSRF Protection**: Built-in security measures

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm package manager
- Modern web browser with JavaScript enabled

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd astra-team-management

# Install dependencies
pnpm install

# Build the application
pnpm run build --no-lint

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:3000`

## 📱 User Guide

### For Team Members
1. **Registration**: Sign up with your email and select your team
2. **Approval**: Wait for admin approval (you'll see a pending status)
3. **Dashboard Access**: Once approved, access your personalized dashboard
4. **Task Management**: View assigned tasks, update progress, and upload files
5. **Team Collaboration**: Communicate with team members and view announcements

### For Team Heads
1. **Task Assignment**: Create and assign tasks to team members
2. **Progress Monitoring**: Track team performance and task completion
3. **Resource Management**: Manage team workload and priorities
4. **Reporting**: Generate progress reports and documentation

### For Administrators
1. **User Approval**: Review and approve/deny new member registrations
2. **System Management**: Oversee all teams and system-wide operations
3. **Analytics**: Access comprehensive system analytics and reports
4. **Announcements**: Send system-wide and team-specific communications

## 🔧 API Documentation

### Authentication Endpoints
```bash
# Member Registration
POST /api/auth/signup
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Full Name",
  "team": "solar"
}

# Member Login
POST /api/auth/login
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Management Endpoints
```bash
# Get Pending Users (Admin only)
GET /api/users/pending

# Approve/Deny User (Admin only)
POST /api/users/pending
Content-Type: application/json
{
  "userId": "user-id",
  "action": "approve" // or "deny"
}
```

## 🎯 Project Goals

The ASTRA Solar Vehicle Team Management System aims to:

1. **Streamline Collaboration**: Enable seamless communication across 14 specialized teams
2. **Enhance Productivity**: Provide tools for efficient task management and progress tracking
3. **Ensure Quality**: Facilitate comprehensive documentation and review processes
4. **Maintain Security**: Implement robust access control and data protection measures
5. **Support Innovation**: Create an environment conducive to cutting-edge solar vehicle development

## 🌱 Future Enhancements

### Planned Features
- **Email Notifications**: Automated email alerts for task assignments and deadlines
- **Real-time Chat**: Integrated messaging system for team communication
- **Calendar Integration**: Project timeline and milestone tracking
- **Mobile App**: Native mobile application for on-the-go access
- **Advanced Analytics**: Machine learning-powered insights and predictions
- **External Integrations**: CAD software integration and IoT device connectivity

### Technical Improvements
- **Database Migration**: Move from localStorage to production-ready database
- **Cloud Storage**: Implement cloud-based file storage with CDN
- **Performance Optimization**: Advanced caching and performance monitoring
- **Scalability**: Microservices architecture for large-scale deployment

## 🤝 Contributing

We welcome contributions from the ASTRA community! Please follow these guidelines:

1. **Code Standards**: Follow TypeScript and React best practices
2. **Testing**: Include comprehensive tests for new features
3. **Documentation**: Update documentation for any new functionality
4. **Security**: Ensure all contributions meet security standards

## 📄 License

This project is proprietary software developed for the ASTRA Solar Vehicle project. All rights reserved.

## 📞 Support

For technical support or questions about the system:
- **Technical Issues**: Contact the development team
- **User Account Issues**: Contact system administrators
- **Feature Requests**: Submit through the internal feedback system

## 🏆 Acknowledgments

Special thanks to all ASTRA team members who contributed to the requirements and testing of this system:
- Engineering teams for technical specifications
- Design team for UI/UX guidance  
- Project managers for workflow optimization
- Beta testers for feedback and bug reports

---

**Building the Future of Solar Transportation** 🚗⚡🌞

*ASTRA Team Management System - Powering collaboration for sustainable innovation*
