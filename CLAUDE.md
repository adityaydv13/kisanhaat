# KisanHaat

Agricultural marketplace platform connecting farmers and contractors for crop trading, bidding, machinery rental, and payments.

## Project Structure

```
kisanhaat/
├── client/                          # React (Vite) frontend
│   ├── src/
│   │   ├── component/               # Shared components (Navbar, Footer, CreatePost, FetchPosts, etc.)
│   │   ├── pages/                   # Page-level components (Home, Profile, LoginandSignup, etc.)
│   │   └── rental/rentalcomponents/ # Machinery rental feature (MachineryList, MachineryDetail, etc.)
│   └── vite.config.js
├── server/KisaanHaat-Backend/       # Express.js backend
│   ├── config/db.js                 # MongoDB connection
│   ├── controllers/                 # Route handlers (auth, post, crop/bids, payment)
│   ├── middleware/authMiddleware.js  # JWT authentication middleware
│   ├── models/                      # Mongoose schemas (User, Post, Bid)
│   ├── routes/                      # Express route definitions
│   ├── rentalbackend/               # Machinery rental backend (controllers, models, routes)
│   ├── utils/                       # Payment integration (Razorpay)
│   └── index.js                     # Server entry point
└── package.json                     # Root package (minimal, server deps)
```

## Tech Stack

- **Frontend:** React 19 + Vite + Tailwind CSS + React Router
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT + Google OAuth (google-auth-library)
- **Payments:** Razorpay

## Running Locally

```bash
# Server (from server/KisaanHaat-Backend/)
npm install
npm start          # runs on PORT 5000

# Client (from client/)
npm install
npm run dev        # runs on localhost:5173
```

## Environment Variables

### Server (`server/KisaanHaat-Backend/.env`)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `PORT` - Server port (default: 5000)
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `FRONTEND_URL`, `BACKEND_URL`
- `USER`, `PASS` - Gmail credentials for contact form (nodemailer)

### Client (`client/.env`)
- `VITE_API_URL` - Backend base URL (e.g., `http://localhost:5000`)
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_RAZORPAY_KEY_ID` - Razorpay public key

## API Endpoints

### Auth (`/api/auth` and `/api/users`)
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/profile` - Get user (protected)
- `PUT /api/auth/update` - Update user (protected)
- `DELETE /api/users/:id` - Delete account (protected)
- `POST /api/auth/send-otp` / `POST /api/auth/verify-otp` - OTP flow

### Posts (`/api/posts`)
- `POST /` - Create post (protected)
- `GET /` - Get all posts
- `GET /my-posts` - Get user's posts (protected)
- `GET /:id` / `PUT /:id` / `DELETE /:id` - CRUD by ID

### Bids (`/api/crops/bids`)
- `POST /` - Place bid (protected)
- `GET /received` - Bids on my crops (protected)
- `GET /mybids` - My submitted bids (protected)
- `PATCH /:bidId` - Accept/reject bid (protected)

### Machinery (`/api/machinery`)
- `GET /` - List/search machinery
- `POST /` - Add machine (protected)
- `POST /cart` - Add to cart

### Hire (`/api/hire`, `/api/hires`, `/api/deletehire`)
- `POST /api/hire` - Create hire request (protected)
- `GET /api/hire/my-requests` - Requests for my machines (protected)
- `PUT /api/hire/:hireId` - Approve/reject (protected)
- `GET /api/hires/my-hires` - My hired machines (protected)
- `DELETE /api/hires/:id` or `/api/deletehire/:id` - Delete hire (protected)

### Payments (Razorpay)
- `POST /api/pay/razorpay/create` - Create order
- `POST /api/pay/razorpay/verify` - Verify payment

### Contact
- `POST /api/enquiries` - Submit enquiry

## Key Models

- **User:** name, email, password (hashed), role (farmer/contractor), phone, otp, otpExpiry
- **Post:** userId, farmerName, mobileNumber, description, plants[], amount, quantity, itemType, imagePath, isActive
- **Bid:** postId, bidderId, ownerId, bidAmount, status (PENDING/ACCEPTED/REJECTED)
- **Machine:** name, price, location, description, ownerId, imageUrl
- **Hire:** machineId, requester, hireDate, returnDate, status (pending/approved/rejected)

## Conventions

- Auth uses JWT with `{ userId, role, name }` payload
- Protected routes use `authMiddleware` which sets `req.user`
- Client stores `token`, `user` (JSON), `userId`, `role` in localStorage
- Posts use `itemType` (vegetables/rice/fruits/pulses) to map to image paths
- Bid status is UPPERCASE, Hire status is lowercase
