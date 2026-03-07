import { AppLayout } from "@/components/AppLayout";
import { FileUploadZone } from "@/components/FileUploadZone";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Zap } from "lucide-react";

const UploadPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Upload Code</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload files or connect a repository for AI-powered review</p>
        </motion.div>

        <FileUploadZone />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">or connect</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* GitHub Connect */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Github className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-card-foreground">Connect GitHub Repository</h3>
              <p className="text-sm text-muted-foreground">Import code directly from your repositories</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              Connect
            </Button>
          </div>
        </motion.div>

        {/* Analyze Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button size="lg" className="w-full gap-2 gradient-primary text-primary-foreground font-semibold h-12 text-base">
            <Zap className="h-5 w-5" />
            Analyze with AI
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default UploadPage;
