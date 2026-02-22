import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const role = session.user.role;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <p>Welcome, {session.user.email}</p>
      <p>Role: {role}</p>

      {role === Role.ADMIN && (
        <section>
          <h2>Admin Panel</h2>
          <p>Manage users & system settings</p>
        </section>
      )}

      {(role === Role.ADMIN || role === Role.MANAGER) && (
        <section>
          <h2>Manager View</h2>
          <p>View team performance</p>
        </section>
      )}

      {role === Role.SALES && (
        <section>
          <h2>Sales View</h2>
          <p>Your assigned leads</p>
        </section>
      )}
    </main>
  );
}
