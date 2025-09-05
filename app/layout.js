import { Geist, Geist_Mono, Inter, Poppins, Roboto_Slab,Asimovian } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "./Component/Wrapper";
import Navbar from "./Component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const asimovian = localFont({
  src: "../public/Asimovian-Regular.ttf",
  variable: "--font-asimovian",
  
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Prajwal Neupane | Software Engineer Portfolio",
  description:
    "Official portfolio of Prajwal Neupane, a passionate software engineer and web developer specializing in JavaScript, Next.js, and full-stack development.",
  keywords: [
    "Prajwal Neupane",
    "Software Engineer",
    "Web Developer",
    "Next.js Portfolio",
    "JavaScript Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Prajwal Neupane" }],
  openGraph: {
    title: "Prajwal Neupane | Software Engineer Portfolio",
    description:
      "Showcasing projects, skills, and achievements of Prajwal Neupane. Specializing in modern web technologies like Next.js, React, and Node.js.",
    url: "https://prajwal003.vercel.app",
    siteName: "Prajwal Neupane Portfolio",
    images: [
      {
        url: "https://prajwal003.vercel.app/Home.jpg",
        width: 1200,
        height: 630,
        alt: "Prajwal Neupane Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajwal Neupane | Software Engineer Portfolio",
    description:
      "Web developer portfolio of Prajwal Neupane, showcasing projects, skills, and achievements.",
    images: ["https://prajwal003.vercel.app/Home.jpg"],
    creator: "@prajwalN003",
  },
  metadataBase: new URL("https://prajwal003.vercel.app"),
  alternates: {
    canonical: "https://prajwal003.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${asimovian.variable} ${inter.variable} ${poppins.variable} ${robotoSlab.variable} antialiased`}
      >
        <Wrapper>
          <Navbar/>
            <div className="py-24">
              {children}
            </div>
        </Wrapper>
      </body>
    </html>
  );
}
