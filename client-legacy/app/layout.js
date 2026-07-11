import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "CricNova AI",
  description: "Cricket Intelligence Platform",
  verification: {
    google: "uFmG0BJs2abDk_YwHxB5OFDzmhBBPz8tR0orPJtb7UA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}