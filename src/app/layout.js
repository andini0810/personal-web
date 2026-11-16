import "./globals.css";

export const metadata = {
  title: "Andini — A Little Introduction",
  description: "A small introduction to Andini and her creative journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
