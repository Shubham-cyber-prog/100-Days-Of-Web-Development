import { useState } from "react";
import { Plus, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";

const polls = [
  {
    id: 1,
    question: "Should we install new benches in Central Park?",
    description: "Community feedback needed on park improvements",
    status: "active",
    totalVotes: 342,
    endsIn: "2 days",
    createdBy: "Parks Committee",
    options: [
      { id: "a", text: "Yes, definitely needed", votes: 234, percentage: 68 },
      { id: "b", text: "No, not necessary", votes: 108, percentage: 32 },
    ],
    hasVoted: false,
  },
  {
    id: 2,
    question: "What time should the community pool open on weekends?",
    description: "Help us determine the best operating hours",
    status: "active",
    totalVotes: 456,
    endsIn: "5 days",
    createdBy: "Recreation Department",
    options: [
      { id: "a", text: "7:00 AM", votes: 123, percentage: 27 },
      { id: "b", text: "8:00 AM", votes: 198, percentage: 43 },
      { id: "c", text: "9:00 AM", votes: 135, percentage: 30 },
    ],
    hasVoted: true,
    userVote: "b",
  },
  {
    id: 3,
    question: "Should we organize a monthly farmers market?",
    description: "Vote to determine if there's interest in a community market",
    status: "active",
    totalVotes: 521,
    endsIn: "1 week",
    createdBy: "Community Admin",
    options: [
      { id: "a", text: "Yes, I would attend regularly", votes: 398, percentage: 76 },
      { id: "b", text: "Maybe occasionally", votes: 89, percentage: 17 },
      { id: "c", text: "No, not interested", votes: 34, percentage: 7 },
    ],
    hasVoted: false,
  },
  {
    id: 4,
    question: "Preferred time for community meetings?",
    description: "Help us schedule meetings when most people can attend",
    status: "closed",
    totalVotes: 289,
    closedDate: "Feb 15, 2026",
    createdBy: "Community Admin",
    options: [
      { id: "a", text: "Weekday evenings (6-8 PM)", votes: 167, percentage: 58 },
      { id: "b", text: "Weekend mornings (10 AM-12 PM)", votes: 78, percentage: 27 },
      { id: "c", text: "Weekend afternoons (2-4 PM)", votes: 44, percentage: 15 },
    ],
    hasVoted: true,
    userVote: "a",
    winner: "a",
  },
  {
    id: 5,
    question: "Should we implement a community composting program?",
    description: "Vote on environmental initiative",
    status: "closed",
    totalVotes: 412,
    closedDate: "Feb 10, 2026",
    createdBy: "Green Initiative",
    options: [
      { id: "a", text: "Yes, great idea!", votes: 356, percentage: 86 },
      { id: "b", text: "No, not needed", votes: 56, percentage: 14 },
    ],
    hasVoted: true,
    userVote: "a",
    winner: "a",
  },
];

export function PollsPage() {
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("active");
  const [options, setOptions] = useState(["", ""]);

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Poll created successfully!");
    setIsCreatePollOpen(false);
    setOptions(["", ""]);
  };

  const handleVote = (pollId: number, optionId: string) => {
    toast.success("Vote recorded successfully!");
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const filteredPolls = polls.filter(poll => poll.status === selectedTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Polls</h1>
          <p className="text-muted-foreground">Make your voice heard on community decisions</p>
        </div>
        <Dialog open={isCreatePollOpen} onOpenChange={setIsCreatePollOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Poll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create a Poll</DialogTitle>
              <DialogDescription>
                Ask the community for their opinion
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePoll} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="What would you like to ask?"
                  className="bg-input-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide context for your poll"
                  rows={3}
                  className="bg-input-background resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Options</Label>
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      className="bg-input-background"
                      required
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeOption(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="w-full"
                >
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Poll Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Number of days"
                  className="bg-input-background"
                  defaultValue={7}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Create Poll</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreatePollOpen(false);
                    setOptions(["", ""]);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="closed">Closed Polls</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {filteredPolls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{poll.question}</CardTitle>
                  {poll.description && (
                    <CardDescription>{poll.description}</CardDescription>
                  )}
                </div>
                <Badge
                  variant={poll.status === "active" ? "default" : "secondary"}
                  className={poll.status === "active" ? "bg-success" : ""}
                >
                  {poll.status === "active" ? "Active" : "Closed"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <span>By {poll.createdBy}</span>
                <span>•</span>
                <span>{poll.totalVotes} votes</span>
                {poll.status === "active" ? (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      Ends in {poll.endsIn}
                    </div>
                  </>
                ) : (
                  <>
                    <span>•</span>
                    <span>Closed on {poll.closedDate}</span>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {poll.hasVoted || poll.status === "closed" ? (
                <div className="space-y-4">
                  {poll.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.text}</span>
                          {poll.hasVoted && poll.userVote === option.id && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle2 className="size-3" />
                              Your vote
                            </Badge>
                          )}
                          {poll.status === "closed" && poll.winner === option.id && (
                            <Badge className="gap-1 bg-warning text-warning-foreground">
                              <TrendingUp className="size-3" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {option.votes} votes ({option.percentage}%)
                        </span>
                      </div>
                      <Progress value={option.percentage} className="h-2" />
                    </div>
                  ))}
                  {poll.hasVoted && poll.status === "active" && (
                    <p className="text-sm text-muted-foreground pt-2">
                      You've already voted in this poll
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const selected = formData.get(`poll-${poll.id}`);
                  if (selected) {
                    handleVote(poll.id, selected as string);
                  }
                }}>
                  <RadioGroup name={`poll-${poll.id}`} className="space-y-3">
                    {poll.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} />
                        <Label
                          htmlFor={`${poll.id}-${option.id}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button type="submit" className="w-full mt-4">
                    Submit Vote
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredPolls.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No {selectedTab} polls at the moment
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
