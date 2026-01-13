import "./globals.css";

export const metadata = {
  title: "CRM App",
  description: "Enterprise CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
