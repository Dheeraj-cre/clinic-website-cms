Clinic Website CMS – Complete Project Documentation

## Live Demo
Live Website: https://clinic-website-cms.vercel.app/

1. Project Overview
This project is a real-world Clinic Website CMS that allows an admin to manage website content such as doctors, services, appointments, gallery, and contact inquiries without changing code.

2. Project Workflow
User visits clinic website → views services → books appointment.
Admin logs into CMS → manages doctors, services, appointments, gallery, and content.
Frontend fetches data from backend APIs → data stored in MongoDB.

3. Modules (Total 9 Modules)
1. Authentication Module (Admin Login)
2. Dashboard Module
3. Doctor Profile Module
4. Services Management Module
5. Appointment Management Module
6. Gallery Management Module
7. Content Management Module (Pages)
8. Contact / Inquiry Module
9. Settings Module

4. Database Design (MongoDB Collections)
Admin Collection: name, email, password, role
Doctor Collection: name, qualification, experience, specialization, image
Services Collection: title, description, image, isActive
Appointments Collection: patientName, phone, email, problem, date, status
Gallery Collection: imageUrl, uploadedAt
Pages Collection: pageName, content
Contacts Collection: name, email, message, createdAt

5. ERD Explanation
Admin manages Doctors, Services, Gallery, and Content.
Users create Appointments and Contact messages.
All entities are connected through Admin control and APIs.

6.TECHNOLOGY STACK

Frontend:
- React.js
- React Router
- Axios
- CSS

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary

DEPLOYMENT:
- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

7. API Workflow
Frontend sends request using Axios → Backend API processes request → Database stores/retrieves data → Response sent back to frontend.

8. Development Timeline
UI Design: 2 days
Frontend Development: 4 days
Backend & APIs: 4 days
Authentication & Security: 2 days
Testing & Deployment: 2 days
Total Time: 12–14 days

9. Future Enhancements
Online payments, WhatsApp/SMS notifications, multi-admin roles, analytics dashboard.
