import type {Metadata} from "next";
// import localFont from "next/font/local";
import "./globals.css";

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
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className={`antialiased`}>
            <div className="min-h-screen bg-[#001800] font-mono text-[#32FF32] relative overflow-hidden flex flex-col">
                {/* Background gradient with brighter green and dark green lines */}
                <div className="background-gradient absolute inset-0"/>

                {/* CRT screen effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,51,0,0.2)_0%,_rgba(0,25,0,0.8)_100%)]"/>

                {/* 5px height scanline effect */}
                <div className="scanline-effect absolute inset-0 pointer-events-none overflow-hidden"/>

                {/* Vignette effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"/>

                {children}
            </div>
        </body>
        </html>
    );
}
