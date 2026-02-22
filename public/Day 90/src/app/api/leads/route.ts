import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { LeadStatus } from "@prisma/client";


// GET /api/leads
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const role = session.user.role;

  const leads =
    role === Role.ADMIN
      ? await prisma.lead.findMany()
      : await prisma.lead.findMany({
          where: { ownerId: userId },
        });

  return NextResponse.json(leads);
}

// POST /api/leads
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, phone, source } = body;

  // 🔑 STEP 1: Ensure User exists
  const user = await prisma.user.upsert({
    where: { email: session.user.email! },
    update: {},
    create: {
      email: session.user.email!,
      name: session.user.name ?? "User",
      password: "credentials", // placeholder
      role: session.user.role,
    },
  });

  // 🔑 STEP 2: Create Lead and connect owner
  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone,
      source,
      owner: {
        connect: { id: user.id },
      },
    },
  });

  return NextResponse.json(lead);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { leadId, status } = await req.json();

  if (!Object.values(LeadStatus).includes(status)) {
    return new Response("Invalid status", { status: 400 });
  }

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });

  return Response.json(lead);
}