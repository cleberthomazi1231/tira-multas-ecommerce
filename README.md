# Tira Multa - E-commerce Platform

A Next.js e-commerce platform for traffic ticket appeals (recursos de multas de trânsito) in Brazil. This application allows users to search for legal resources, create accounts, purchase resources, and manage their orders.

## 🚀 Features

- **Resource Search**: Browse and search for traffic ticket appeal resources
- **User Authentication**: Login and registration system
- **Shopping Cart**: Add resources to cart and checkout
- **Payment Integration**: MercadoPago integration for credit card and PIX payments
- **Order Management**: View and download purchased resources
- **PDF Generation**: Download preview and final documents
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 13.4.4 (App Router)
- **Language**: TypeScript 5.1.3
- **Styling**: Tailwind CSS 3.3.2
- **State Management**: Zustand 4.3.8
- **Form Handling**: React Hook Form 7.44.3 + Zod 3.21.4
- **Payment**: MercadoPago SDK
- **Icons**: React Icons 4.9.0
- **UI Components**: Headless UI 1.7.17

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── alterar-dados/     # Edit order data
│   ├── checkout/          # Payment checkout
│   ├── criar-conta/       # User registration
│   ├── efetue-pagamento/  # Payment processing
│   ├── login/             # User login
│   ├── meus-pedidos/      # Order history
│   ├── multa/             # Resource details
│   └── page.tsx           # Homepage
├── shared/
│   ├── components/        # Reusable UI components
│   ├── constants/         # Environment variables
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   └── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   NEXT_PUBLIC_KEY_MP=your_mercadopago_public_key
   NEXT_PUBLIC_MERCHANT_MP=your_mercadopago_merchant_id
   NEXT_PUBLIC_DEFAULT_DEALER=your_default_dealer_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (port 3002)
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_KEY_MP` | MercadoPago Public Key | Yes |
| `NEXT_PUBLIC_MERCHANT_MP` | MercadoPago Merchant ID | Yes |
| `NEXT_PUBLIC_DEFAULT_DEALER` | Default dealer ID | Yes |

## 🚀 Deployment to Vercel

### Prerequisites

- Vercel account
- GitHub repository connected to Vercel

### Step-by-Step Deployment

1. **Prepare your repository**
   - Ensure all code is committed and pushed to GitHub
   - Verify your `package.json` has the correct build script

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add all required environment variables:
     ```
     NEXT_PUBLIC_API_URL=your_production_api_url
     NEXT_PUBLIC_KEY_MP=your_mercadopago_public_key
     NEXT_PUBLIC_MERCHANT_MP=your_mercadopago_merchant_id
     NEXT_PUBLIC_DEFAULT_DEALER=your_default_dealer_id
     ```

4. **Deploy**
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"
   - Your app will be built and deployed automatically

5. **Custom Domain (Optional)**
   - In your Vercel project dashboard, go to Settings → Domains
   - Add your custom domain
   - Configure DNS settings as instructed

### Build Configuration

The project is already configured for Vercel deployment with:
- Next.js 13 App Router
- TypeScript support
- Tailwind CSS optimization
- Image optimization disabled (as per `next.config.js`)

### Post-Deployment

1. **Verify deployment**
   - Check that all pages load correctly
   - Test user registration and login
   - Verify payment integration works

2. **Monitor performance**
   - Use Vercel Analytics to monitor performance
   - Check for any build errors in the Vercel dashboard

## 🔒 Security Considerations

- Environment variables are properly prefixed with `NEXT_PUBLIC_` for client-side access
- API calls use proper error handling
- Payment data is processed through MercadoPago's secure SDK
- User authentication is handled server-side

## 📱 Features Overview

### User Journey

1. **Homepage**: Users can search for traffic ticket resources
2. **Resource Details**: View specific resource information and pricing
3. **Registration/Login**: Create account or login to existing account
4. **Checkout**: Add resources to cart and proceed to payment
5. **Payment**: Choose between credit card or PIX payment methods
6. **Order Management**: View order history and download documents

### Key Components

- **SearchHome**: Resource search functionality
- **Login/Registration**: User authentication system
- **Checkout**: Payment processing with MercadoPago
- **SalesList**: Order history and document downloads
- **Form Components**: Reusable form elements with validation

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all environment variables are set in Vercel
   - Check that all dependencies are properly installed

2. **Payment Issues**
   - Verify MercadoPago credentials are correct
   - Test with MercadoPago sandbox environment first

3. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` is accessible
   - Check CORS settings on your backend

### Development Tips

- Use the development server for local testing
- Check browser console for any JavaScript errors
- Verify all API endpoints are working correctly

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support and questions, please contact the development team.
