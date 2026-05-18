import './globals.css';
import { Outfit } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata = {
  title: 'StreetSense - Empower Your Community',
  description: 'StreetSense empowers you to report local issues, track their progress, and see the real impact you\'re making in your community.',
};

import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const isLoggedIn = !!session?.value;

  return (
    <html lang="en" className={outfit.className}>
      <body>
        <Navbar isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
