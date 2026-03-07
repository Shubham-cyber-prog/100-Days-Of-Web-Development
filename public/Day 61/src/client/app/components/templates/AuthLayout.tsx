"use client";

import MainLayout from "./MainLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="px-6 py-2 rounded-lg shadow-md">{children}</div>
    </MainLayout>
  );
}
