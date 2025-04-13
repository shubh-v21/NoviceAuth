# NoviceAuth

A modern authentication application built with Next.js, NextAuth, MongoDB, and Tailwind CSS.

## Features

- **User Authentication**: Login and registration with email/password or Google
- **Email Verification**: OTP-based email verification for new accounts
- **Password Reset**: Secure password reset flow with email notifications
- **Google OAuth**: Seamless Google authentication
- **Form Validation**: Using Zod for robust form validation
- **Responsive Design**: Clean and modern UI with Tailwind CSS
- **Protected Routes**: Middleware-based route protection

## Tech Stack

- **Frontend & Backend**: Next.js
- **Authentication**: NextAuth.js (v4.24.11)
- **Database**: MongoDB Atlas
- **Form Validation**: Zod
- **Styling**: Tailwind CSS
- **Email Service**: Nodemailer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Google OAuth credentials (for Google authentication)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
SMTP_EMAIL=your_email_for_sending_emails
SMTP_PASSWORD=your_email_app_password
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Flow

### Registration

1. User enters email and password
2. System creates a new user with unverified status
3. OTP is sent to the user's email
4. User verifies email by entering the OTP
5. User can now log in

### Login

1. User enters email and password
2. System verifies credentials and email verification status
3. User is redirected to dashboard upon successful login

### Google Authentication

1. User clicks "Continue with Google"
2. Google OAuth flow is initiated
3. For new users, a new account is created with `isGoogleAuth` set to true
4. For existing users, they are logged in directly

### Password Reset

1. User requests password reset
2. System sends a reset link to the user's email
3. User clicks the link and enters a new password
4. Password is updated and user can log in with the new credentials

## Project Structure

```
novice-auth/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── [...nextauth]/
│   │   │       ├── register/
│   │   │       ├── verify-otp/
│   │   │       ├── forgot-password/
│   │   │       └── reset-password/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   └── NextAuthProvider.js
│   ├── lib/
│   │   └── dbConnect.js
│   ├── models/
│   │   └── User.js
│   ├── utils/
│   │   ├── nodemailerUtility.js
│   │   └── sendVerificationEmail.js
│   └── middleware.js
├── .env
├── package.json
└── README.md
```

## License

MIT
