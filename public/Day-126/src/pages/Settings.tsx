import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Building, Shield } from "lucide-react";

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your profile and preferences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 space-y-6"
        >
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" defaultValue="Alex Chen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" defaultValue="alex@company.dev" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org">Organization</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="org" className="pl-10" placeholder="Your company" defaultValue="Acme Corp" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="role" className="pl-10" placeholder="Developer" defaultValue="Team Admin" disabled />
              </div>
            </div>
          </div>

          <Button className="gradient-primary text-primary-foreground font-semibold">
            Save Changes
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Notifications
          </h3>
          <p className="text-sm text-muted-foreground">Email notifications for critical issues and weekly reports are enabled by default.</p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
