import { waitlist, type Waitlist, type InsertWaitlist } from "@shared/schema";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  isEmailRegistered(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private waitlist: Map<number, Waitlist>;
  private currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.currentId = 1;
  }

  async createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentId++;
    const waitlistEntry = {
      id,
      email: entry.email,
      fullName: entry.fullName,
      interests: entry.interests,
      location: entry.location,
      profession: entry.profession
    };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    return Array.from(this.waitlist.values()).some(
      (entry) => entry.email === email,
    );
  }
}

export const storage = new MemStorage();