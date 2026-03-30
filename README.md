QuickKart – Full Stack E-Commerce Platform

🌐 Live Demo
🛍️ User Website
https://quickkart-frontend-cdi7.onrender.com
⚙️ Admin Dashboard
https://quickkart-admin-qe91.onrender.com

⭐ Project Highlights
🚀 Full-stack MERN E-commerce application
💳 Integrated Razorpay payment gateway
🔐 Secure authentication using JWT
🛠️ Admin dashboard for product & order management
☁️ Cloudinary for image uploads
📱 Fully responsive UI


🧑‍💻 Tech Stack
Frontend
React.js
Tailwind CSS
Axios
Backend
Node.js
Express.js
Database
MongoDB
Tools & Services
Cloudinary
Razorpay
JWT Authentication


🏗️ System Architecture
User → React Frontend → Express API → MongoDB
                      ↓
                Cloudinary (Images)
                      ↓
                Razorpay (Payments)

                
📁 Folder Structure
QuickKart/
│
├── frontend/      # User Website
├── admin/         # Admin Panel
├── backend/       # Server & APIs
│
└── README.md

⚙️ Installation Guide
Clone Repo
git clone https://github.com/raj-pratap0099/quickkart.git
cd quickkart
Setup Frontend
cd frontend
npm install
npm run dev
Setup Admin Panel
cd admin
npm install
npm run dev
Setup Backend
cd backend
npm install
npm start


🔑 Environment Variables

Create .env in backend:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET_KEY=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
