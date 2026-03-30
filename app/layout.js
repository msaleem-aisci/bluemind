import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google"; // New Premium Font

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "BlueMind",
  description: "Portfolio of a Deep Learning Engineer & Researcher.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Applied #131314 as the global background here */}
      <body
        className={`${jakarta.className} antialiased bg-[#131314] text-slate-300`}
      >
        {children}
      </body>
    </html>
  );
}
