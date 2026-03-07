// Mock data for the social media platform

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
  isVerified?: boolean;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
}

export interface Story {
  id: string;
  user: User;
  image: string;
  isViewed: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: User;
  content: string;
  post?: { id: string; image?: string };
  time: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  user: User;
  lastMessage: string;
  time: string;
  isRead: boolean;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  time: string;
  reactions?: string[];
}

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  bio: 'Creative designer & photographer 📸 | Coffee enthusiast ☕',
  followers: 2543,
  following: 892,
  posts: 156,
  isVerified: true,
};

export const mockUsers: User[] = [
  {
    id: '2',
    name: 'Sarah Miller',
    username: 'sarahmiller',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    followers: 5432,
    following: 234,
    posts: 89,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Mike Chen',
    username: 'mikechen',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
    followers: 1234,
    following: 567,
    posts: 45,
  },
  {
    id: '4',
    name: 'Emma Davis',
    username: 'emmadavis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    followers: 8765,
    following: 432,
    posts: 234,
    isVerified: true,
  },
  {
    id: '5',
    name: 'James Wilson',
    username: 'jameswilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    followers: 3456,
    following: 654,
    posts: 123,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    content: 'Just finished this amazing sunset shoot! The golden hour never disappoints 🌅✨ #photography #sunset',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    likes: 1234,
    comments: 56,
    shares: 23,
    isLiked: false,
    isSaved: false,
    createdAt: '2h ago',
  },
  {
    id: '2',
    author: mockUsers[1],
    content: 'Working on some exciting new features! Can\'t wait to share with you all. Stay tuned! 🚀',
    likes: 892,
    comments: 34,
    shares: 12,
    isLiked: true,
    isSaved: false,
    createdAt: '4h ago',
  },
  {
    id: '3',
    author: mockUsers[2],
    content: 'Which one should I choose for my next project?',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    poll: {
      question: 'Which design do you prefer?',
      options: [
        { id: '1', text: 'Modern & Minimalist', votes: 245 },
        { id: '2', text: 'Bold & Colorful', votes: 189 },
        { id: '3', text: 'Classic & Elegant', votes: 156 },
        { id: '4', text: 'Experimental', votes: 98 },
      ],
    },
    likes: 567,
    comments: 89,
    shares: 34,
    isLiked: false,
    isSaved: true,
    createdAt: '6h ago',
  },
  {
    id: '4',
    author: mockUsers[3],
    content: 'Beautiful morning hike in the mountains! Nature is the best therapy 🏔️💚',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    likes: 2341,
    comments: 123,
    shares: 45,
    isLiked: true,
    isSaved: false,
    createdAt: '8h ago',
  },
];

export const mockStories: Story[] = [
  {
    id: '1',
    user: currentUser,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    isViewed: false,
  },
  ...mockUsers.map((user, index) => ({
    id: String(index + 2),
    user,
    image: `https://images.unsplash.com/photo-${1500000000000 + index * 1000000}?w=400&h=600&fit=crop`,
    isViewed: index % 2 === 0,
  })),
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[0],
    content: 'liked your post',
    post: { id: '1', image: mockPosts[0].image },
    time: '5m ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'follow',
    user: mockUsers[1],
    content: 'started following you',
    time: '1h ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    user: mockUsers[2],
    content: 'commented: "Amazing shot!"',
    post: { id: '2', image: mockPosts[2].image },
    time: '2h ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'mention',
    user: mockUsers[3],
    content: 'mentioned you in a post',
    time: '3h ago',
    isRead: true,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    user: mockUsers[0],
    lastMessage: 'Hey! Did you see my latest post?',
    time: '2m ago',
    isRead: false,
    isOnline: true,
  },
  {
    id: '2',
    user: mockUsers[1],
    lastMessage: 'Thanks for the follow! Love your content 🎨',
    time: '1h ago',
    isRead: false,
    isOnline: true,
  },
  {
    id: '3',
    user: mockUsers[2],
    lastMessage: 'Let\'s collaborate on that project!',
    time: '3h ago',
    isRead: true,
    isOnline: false,
  },
  {
    id: '4',
    user: mockUsers[3],
    lastMessage: 'See you at the meetup tomorrow!',
    time: '1d ago',
    isRead: true,
    isOnline: false,
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '2',
    content: 'Hey! How are you doing?',
    time: '10:30 AM',
  },
  {
    id: '2',
    senderId: '1',
    content: 'I\'m great! Just working on some new designs.',
    time: '10:32 AM',
  },
  {
    id: '3',
    senderId: '2',
    content: 'That sounds exciting! Can\'t wait to see them.',
    time: '10:33 AM',
    reactions: ['👍', '❤️'],
  },
  {
    id: '4',
    senderId: '1',
    content: 'I\'ll share them with you soon!',
    time: '10:35 AM',
  },
];

export const trendingHashtags = [
  { tag: '#photography', posts: 125000 },
  { tag: '#design', posts: 98000 },
  { tag: '#nature', posts: 87000 },
  { tag: '#tech', posts: 76000 },
  { tag: '#art', posts: 65000 },
];
