import type {Metadata} from "next";
import dynamic from 'next/dynamic';
import Footer from './components/Footer';
import "./globals.css";

// Dynamically import Navbar to ensure it's client-side rendered if needed
const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Emerald brick of KEK research reports - public",
    description: "KEK.WORKS RESEARCH LAB",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const navbarHeight = '60px'; 

    return (
        <html lang="en" style={{ minHeight: '100%', height: 'auto', overflow: 'visible' }}> 
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className={`antialiased`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> 
            {/* Main container */}
            <div className="min-h-screen bg-[#001800] font-mono text-[#32FF32] relative flex flex-col" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                
                {/* Fixed Navbar at the top */}
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
                    <Navbar />
                </div>

                {/* Main content area with padding to offset the navbar */}
                <main style={{ 
                    paddingTop: navbarHeight, 
                    flex: 1, 
                    position: 'relative', 
                    zIndex: 1
                    }}>
                    {children}
                </main>
                <Footer />
            </div>
        </body>
        </html>
    );
}
