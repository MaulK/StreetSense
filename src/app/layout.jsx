import './globals.css';
import { Outfit } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata = {
  title: 'StreetSense - Empower Your Community',
  description: 'StreetSense empowers you to report local issues, track their progress, and see the real impact you\'re making in your community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
