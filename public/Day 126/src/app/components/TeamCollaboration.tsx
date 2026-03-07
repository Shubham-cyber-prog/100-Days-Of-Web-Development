import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, UserPlus, CheckCircle2, XCircle, Clock, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  lineNumber?: number;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface ReviewApproval {
  id: string;
  reviewer: string;
  avatar: string;
  status: 'approved' | 'rejected' | 'pending';
  timestamp?: Date;
  comment?: string;
}

const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'SC', role: 'Senior Developer' },
  { id: '2', name: 'Mike Johnson', avatar: 'MJ', role: 'Tech Lead' },
  { id: '3', name: 'Alex Kumar', avatar: 'AK', role: 'DevOps Engineer' },
  { id: '4', name: 'Emma Davis', avatar: 'ED', role: 'Security Expert' },
];

const mockApprovals: ReviewApproval[] = [
  {
    id: '1',
    reviewer: 'Sarah Chen',
    avatar: 'SC',
    status: 'approved',
    timestamp: new Date(Date.now() - 3600000),
    comment: 'Looks good! Security issues are properly addressed.',
  },
  {
    id: '2',
    reviewer: 'Mike Johnson',
    avatar: 'MJ',
    status: 'pending',
  },
  {
    id: '3',
    reviewer: 'Emma Davis',
    avatar: 'ED',
    status: 'approved',
    timestamp: new Date(Date.now() - 7200000),
  },
];

export function TeamCollaboration() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'The SQL injection fix looks great! Make sure to apply this pattern across all database queries.',
      timestamp: new Date(Date.now() - 3600000),
      lineNumber: 42,
    },
    {
      id: '2',
      author: 'Mike Johnson',
      avatar: 'MJ',
      content: 'Can we also add input validation before the query?',
      timestamp: new Date(Date.now() - 1800000),
      lineNumber: 42,
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [approvals] = useState<ReviewApproval[]>(mockApprovals);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YO',
      content: newComment,
      timestamp: new Date(),
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleDeleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Comments Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Team Discussion
          </CardTitle>
          <CardDescription>
            Collaborate with your team on code review
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comments List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-3 group"
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {comment.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{comment.author}</span>
                      {comment.lineNumber && (
                        <Badge variant="outline" className="text-xs">
                          Line {comment.lineNumber}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {comment.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <p className="text-sm text-muted-foreground flex-1">
                        {comment.content}
                      </p>
                      {comment.author === 'You' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Comment */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[80px] resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                size="sm"
              >
                <Send className="mr-2 h-3 w-3" />
                Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviewers & Approvals */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Review Approvals
          </CardTitle>
          <CardDescription>
            Assign reviewers and track approval status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Reviewer */}
          <div className="flex gap-2">
            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select team member..." />
              </SelectTrigger>
              <SelectContent>
                {mockTeamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                      <span className="text-xs text-muted-foreground">({member.role})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button disabled={!selectedAssignee}>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign
            </Button>
          </div>

          {/* Approvals List */}
          <div className="space-y-3">
            {approvals.map((approval, index) => (
              <motion.div
                key={approval.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {approval.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{approval.reviewer}</span>
                    <div className={`flex items-center gap-1 ${getStatusColor(approval.status)}`}>
                      {getStatusIcon(approval.status)}
                      <span className="text-xs capitalize">{approval.status}</span>
                    </div>
                  </div>
                  {approval.timestamp && (
                    <p className="text-xs text-muted-foreground">
                      {approval.timestamp.toLocaleString()}
                    </p>
                  )}
                  {approval.comment && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {approval.comment}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Approval Summary */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Approval Status</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {approvals.filter(a => a.status === 'approved').length} / {approvals.length} approved
                </span>
                {approvals.every(a => a.status === 'approved') && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
