# Bitcoin Wealth Calculator

A modern, responsive Bitcoin landing page featuring satoshi calculators, interactive price charts, and growth projections. Built for AdSense monetization with strategic ad placement zones.

![Bitcoin Wealth Calculator](https://img.shields.io/badge/Bitcoin-Calculator-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)

## Features

- 🔥 **Real-time Bitcoin Price Display** - Live price updates with 24h change indicators
- 💰 **USD to Satoshi Calculator** - Convert any USD amount to satoshis with quick preset buttons
- 📈 **DCA Calculator** - Dollar Cost Averaging strategy calculator with customizable timeframes
- 📊 **Interactive Price Charts** - Historical Bitcoin price charts (1Y, 5Y, ALL time)
- 🚀 **Growth Projections** - Investment growth calculator with conservative, moderate, and aggressive scenarios
- 🎓 **Educational Content** - Bitcoin learning resources and guides
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🎨 **Dark Theme** - Professional Bitcoin-orange themed design
- 💾 **Database Persistence** - PostgreSQL backend for reliable data storage
- 📊 **AdSense Ready** - Strategic ad placement zones for monetization

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Charts**: Recharts
- **API**: CoinGecko API for Bitcoin price data
- **Build Tool**: Vite
- **Deployment**: Vercel, Railway, or Netlify compatible

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- CoinGecko API access (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bitcoin-wealth-calculator.git
   cd bitcoin-wealth-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## Deployment

### Option 1: Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Railway

1. **Connect GitHub repository to Railway**
2. **Add PostgreSQL service** in Railway
3. **Set environment variables**
4. **Deploy automatically**

### Option 3: Netlify

1. **Connect GitHub repository**
2. **Add external PostgreSQL database** (Supabase, Neon, etc.)
3. **Configure build settings**
4. **Deploy**

## Database Setup

### Using Neon (Recommended for production)

1. **Create account at** [neon.tech](https://neon.tech)
2. **Create new database**
3. **Copy connection string** to `DATABASE_URL`
4. **Run migrations**: `npm run db:push`

### Using Supabase

1. **Create project at** [supabase.com](https://supabase.com)
2. **Get PostgreSQL connection string**
3. **Set `DATABASE_URL`**
4. **Run migrations**: `npm run db:push`

## AdSense Integration

### Ad Placement Zones

The app includes strategically placed ad zones:

1. **Header Banner** (728x90) - Below hero section
2. **Sidebar** (300x250) - Next to price charts
3. **Content Banner** (970x90) - Below educational content

### Implementation Steps

1. **Get AdSense approval** with your custom domain
2. **Replace placeholder divs** with actual AdSense code
3. **Update ad zone styling** in components as needed

Example AdSense integration:
```jsx
// Replace placeholder div with:
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX"
     crossorigin="anonymous"></script>
<ins className="adsbygoogle"
     style={{display: 'block'}}
     data-ad-client="ca-pub-XXXXXXXXX"
     data-ad-slot="XXXXXXXXX"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bitcoin/price` | GET | Current Bitcoin price and market data |
| `/api/bitcoin/history?days=365` | GET | Historical price data |

## Performance Features

- ⚡ **Smart caching** - 1-minute price cache, 5-minute historical cache
- 🗄️ **Database fallback** - Serves cached data when APIs are rate-limited
- 📱 **Responsive design** - Optimized for all device sizes
- 🚀 **Fast loading** - Optimized assets and efficient queries

## Customization

### Branding
- Update colors in `tailwind.config.ts`
- Modify CSS variables in `client/src/index.css`
- Replace logo and favicon in `client/public/`

### Features
- Add new calculators in `client/src/components/`
- Extend database schema in `shared/schema.ts`
- Add new API endpoints in `server/routes.ts`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run db:push` | Push database schema changes |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use for personal and commercial projects.

## Support

- 📧 **Issues**: GitHub Issues
- 📚 **Documentation**: This README
- 💬 **Discussions**: GitHub Discussions

---

**Ready to launch your Bitcoin side hustle?** 🚀

This landing page is optimized for AdSense monetization and designed to convert visitors into engaged users. The calculators and educational content keep users on-site longer, improving ad revenue potential.

Good luck with your Bitcoin website venture!