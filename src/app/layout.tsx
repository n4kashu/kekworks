import type {Metadata} from "next";
import dynamic from 'next/dynamic';
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
        <html lang="en" style={{ height: '100%', overflow: 'hidden' }}> 
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className={`antialiased`} style={{ height: '100%', overflow: 'hidden' }}> 
            {/* Main container */}
            <div className="min-h-screen bg-[#001800] font-mono text-[#32FF32] relative flex flex-col" style={{ height: '100%', overflow: 'hidden' }}>
                
                {/* Background effects */}
                <div className="background-gradient absolute inset-0"/>
                {/* CRT screen effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,51,0,0.2)_0%,_rgba(0,25,0,0.8)_100%)]"/>
                {/* 5px height scanline effect */}
                <div className="scanline-effect absolute inset-0 pointer-events-none overflow-hidden"/>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"/>
                
                {/* Fixed Navbar at the top */}
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
                    <Navbar />
                </div>

                {/* Main content area with padding to offset the navbar */}
                <main style={{ 
                    paddingTop: navbarHeight, 
                    height: '100%', 
                    position: 'relative', 
                    zIndex: 1,
                    overflow: 'hidden' 
                    }}>
                    {children}
                </main>
            </div>
        </body>
        </html>
    );
}
