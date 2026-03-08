import { AppLayout } from "@/components/AppLayout";
import { CodeViewer } from "@/components/CodeViewer";
import { IssuesList, type Issue } from "@/components/IssuesList";
import { QualityScore } from "@/components/QualityScore";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleCode = [
  { number: 1, content: 'import express from "express";' },
  { number: 2, content: 'import { query } from "./db";' },
  { number: 3, content: "" },
  { number: 4, content: "const app = express();" },
  { number: 5, content: "" },
  { number: 6, content: 'app.get("/users", async (req, res) => {' },
  { number: 7, content: "  const userId = req.query.id;", comment: { message: "Unsanitized user input used directly in query — risk of SQL injection", severity: "critical" as const } },
  { number: 8, content: '  const result = await query(`SELECT * FROM users WHERE id = ${userId}`);', comment: { message: "Use parameterized queries instead of string interpolation", severity: "critical" as const } },
  { number: 9, content: "  res.json(result);" },
  { number: 10, content: "});" },
  { number: 11, content: "" },
  { number: 12, content: 'app.post("/login", async (req, res) => {' },
  { number: 13, content: "  const { email, password } = req.body;" },
  { number: 14, content: "  const user = await findUser(email);", comment: { message: "Missing input validation for email and password fields", severity: "high" as const } },
  { number: 15, content: "  if (user.password === password) {", comment: { message: "Plain text password comparison — use bcrypt.compare()", severity: "critical" as const } },
  { number: 16, content: '    res.json({ token: "abc123" });', comment: { message: "Hardcoded token — generate JWT with proper secret", severity: "high" as const } },
  { number: 17, content: "  }" },
  { number: 18, content: "  // missing else clause", comment: { message: "No error response for failed authentication", severity: "medium" as const } },
  { number: 19, content: "});" },
  { number: 20, content: "" },
  { number: 21, content: "app.listen(3000);" },
];

const issues: Issue[] = [
  { id: "1", file: "server.js", line: 8, message: "SQL injection vulnerability via string interpolation", severity: "critical", type: "security" },
  { id: "2", file: "server.js", line: 15, message: "Plain text password comparison", severity: "critical", type: "security" },
  { id: "3", file: "server.js", line: 16, message: "Hardcoded authentication token", severity: "high", type: "security" },
  { id: "4", file: "server.js", line: 14, message: "Missing input validation", severity: "high", type: "bug" },
  { id: "5", file: "server.js", line: 18, message: "Missing error response for failed auth", severity: "medium", type: "code smell" },
];

const ReviewsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Code Review</h1>
            <p className="mt-1 text-sm text-muted-foreground">server.js — 5 issues found</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <CheckCircle className="h-4 w-4 text-success" />
              Accept All
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <XCircle className="h-4 w-4 text-destructive" />
              Dismiss All
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <CodeViewer lines={sampleCode} fileName="server.js" />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-border bg-card p-6 flex flex-col items-center"
            >
              <QualityScore score={34} label="File Score" />
            </motion.div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Issues</h3>
              <IssuesList issues={issues} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReviewsPage;
