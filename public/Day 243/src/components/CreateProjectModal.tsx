import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import { toast } from "sonner";

const CreateProjectModal = () => {
  const [open, setOpen] = useState(false);
  const addProject = useProjectStore((s) => s.addProject);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const reset = () => {
    setTitle(""); setDescription(""); setBudget(""); setDeadline(""); setSkills([]); setSkillInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !budget || !deadline) {
      toast.error("Please fill in all required fields");
      return;
    }
    addProject({ title, description, budget: `$${budget}`, deadline, skills });
    toast.success("Project created successfully!");
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button className="rounded-xl gap-2">
          <PlusCircle size={16} /> Post New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="p-title">Project Title *</Label>
            <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Website Redesign" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-desc">Description *</Label>
            <Textarea id="p-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe your project requirements..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="p-budget">Budget ($) *</Label>
              <Input id="p-budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 3,000 - 5,000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-deadline">Deadline *</Label>
              <Input id="p-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} />
              <Button type="button" variant="secondary" onClick={addSkill} size="sm">Add</Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                    {s}
                    <button type="button" onClick={() => setSkills(skills.filter((x) => x !== s))}><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="rounded-xl">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
