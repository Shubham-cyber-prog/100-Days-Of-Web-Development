import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Phone,
  X,
  LogOut,
  Eye,
  UserCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const mockMyRequests = [
  {
    id: 1,
    sport: "Cricket",
    date: "2026-02-20",
    timeSlots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
    totalPlayers: 22,
    requiredPlayers: 10,
    joinedPlayers: 12,
    contributionPerPlayer: 150,
    players: [
      { name: "Rahul Kumar", phone: "+91 9876543210" },
      { name: "Amit Sharma", phone: "+91 9876543211" },
      { name: "Vikas Patel", phone: "+91 9876543212" },
      { name: "Deepak Rao", phone: "+91 9876543219" },
      { name: "Manoj Tiwari", phone: "+91 9876543220" },
    ],
  },
  {
    id: 2,
    sport: "Football",
    date: "2026-02-18",
    timeSlots: ["6:00 PM - 7:00 PM"],
    totalPlayers: 10,
    requiredPlayers: 4,
    joinedPlayers: 6,
    contributionPerPlayer: 200,
    players: [
      { name: "Sanjay Reddy", phone: "+91 9876543213" },
      { name: "Kiran Singh", phone: "+91 9876543214" },
      { name: "Ajay Kumar", phone: "+91 9876543218" },
    ],
  },
];

const mockAvailableMatches = [
  {
    id: 3,
    creatorName: "Arjun Mehta",
    creatorPhone: "+91 9876543215",
    sport: "Badminton",
    date: "2026-02-17",
    timeSlots: ["4:00 PM - 5:00 PM"],
    totalPlayers: 4,
    requiredPlayers: 2,
    joinedPlayers: 2,
    contributionPerPlayer: 100,
    hasJoined: false,
    players: [
      { name: "Arjun Mehta (Creator)", phone: "+91 9876543215" },
      { name: "Sneha Desai", phone: "+91 9876543221" },
    ],
  },
  {
    id: 4,
    creatorName: "Priya Gupta",
    creatorPhone: "+91 9876543216",
    sport: "Cricket",
    date: "2026-02-19",
    timeSlots: ["7:00 AM - 8:00 AM"],
    totalPlayers: 22,
    requiredPlayers: 11,
    joinedPlayers: 11,
    contributionPerPlayer: 180,
    hasJoined: false,
    players: [
      { name: "Priya Gupta (Creator)", phone: "+91 9876543216" },
      { name: "Rohit Sharma", phone: "+91 9876543222" },
      { name: "Virat Kohli", phone: "+91 9876543223" },
      { name: "MS Dhoni", phone: "+91 9876543224" },
      { name: "KL Rahul", phone: "+91 9876543225" },
      { name: "Hardik Pandya", phone: "+91 9876543226" },
      { name: "Ravindra Jadeja", phone: "+91 9876543227" },
      { name: "Jasprit Bumrah", phone: "+91 9876543228" },
      { name: "Mohammed Shami", phone: "+91 9876543229" },
      { name: "Yuzvendra Chahal", phone: "+91 9876543230" },
      { name: "Shubman Gill", phone: "+91 9876543231" },
    ],
  },
];

const mockJoinedMatches = [
  {
    id: 5,
    creatorName: "Rohan Desai",
    creatorPhone: "+91 9876543217",
    sport: "Football",
    date: "2026-02-21",
    timeSlots: ["5:00 PM - 6:00 PM"],
    totalPlayers: 10,
    requiredPlayers: 5,
    joinedPlayers: 5,
    contributionPerPlayer: 150,
    hasJoined: true,
    allPlayers: [
      {
        name: "Rohan Desai (Creator)",
        phone: "+91 9876543217",
      },
      { name: "Me", phone: "+91 9876543210" },
      { name: "Ajay Kumar", phone: "+91 9876543218" },
      { name: "Deepak Rao", phone: "+91 9876543219" },
      { name: "Manoj Tiwari", phone: "+91 9876543220" },
    ],
  },
];

export function MatchSection() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [availableMatches, setAvailableMatches] = useState(mockAvailableMatches);
  const [joinedMatches, setJoinedMatches] = useState(mockJoinedMatches);
  const [newMatch, setNewMatch] = useState({
    sport: "",
    date: "",
    timeSlots: [""],
    totalPlayers: "",
    requiredPlayers: "",
    contributionPerPlayer: "",
  });

  const handleCreateMatch = () => {
    console.log("Creating match:", newMatch);
    setShowCreateDialog(false);
    // Handle match creation
  };

  const handleJoinMatch = (matchId: number) => {
    console.log("Joining match:", matchId);
    
    // Find the match in available matches
    const matchToJoin = availableMatches.find(m => m.id === matchId);
    
    if (matchToJoin) {
      // Add current user to the match
      const updatedMatch = {
        ...matchToJoin,
        joinedPlayers: matchToJoin.joinedPlayers + 1,
        hasJoined: true,
        allPlayers: [
          ...matchToJoin.players,
          { name: "Me (You)", phone: "+91 9876543210" }
        ]
      };
      
      // Remove from available matches
      setAvailableMatches(prev => prev.filter(m => m.id !== matchId));
      
      // Add to joined matches
      setJoinedMatches(prev => [...prev, updatedMatch]);
      
      // Switch to joined tab
      setActiveTab("joined");
    }
    
    setShowDetailsDialog(false);
  };

  const handleViewDetails = (match: any) => {
    setSelectedMatch(match);
    setShowDetailsDialog(true);
  };

  const handleLeaveMatch = (matchId: number) => {
    console.log("Leaving match:", matchId);
    
    // Find the match in joined matches
    const matchToLeave = joinedMatches.find(m => m.id === matchId);
    
    if (matchToLeave) {
      // Remove current user from the match
      const updatedMatch = {
        ...matchToLeave,
        joinedPlayers: matchToLeave.joinedPlayers - 1,
        hasJoined: false,
        players: matchToLeave.allPlayers?.filter(p => p.name !== "Me (You)") || matchToLeave.players
      };
      
      // Remove allPlayers property and keep only players
      const { allPlayers, ...matchWithoutAllPlayers } = updatedMatch;
      
      // Remove from joined matches
      setJoinedMatches(prev => prev.filter(m => m.id !== matchId));
      
      // Add back to available matches
      setAvailableMatches(prev => [...prev, matchWithoutAllPlayers]);
      
      // Stay on joined tab
      setActiveTab("joined");
    }
  };

  const handleCancelMatch = (matchId: number) => {
    console.log("Cancelling match:", matchId);
    // Handle cancelling match
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
              Matches
            </h1>
            <p className="text-sm sm:text-base text-[#BDBDBD]">
              Find players or create your own match
            </p>
          </div>

          <Dialog
            open={showCreateDialog}
            onOpenChange={setShowCreateDialog}
          >
            <DialogTrigger asChild>
              <Button className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Match Request
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1E1E1E] border-[#1B5E20] max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">
                  Create Match Request
                </DialogTitle>
                <DialogDescription className="text-[#BDBDBD]">
                  Fill in the details to create a new match
                  request
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label className="text-white">Sport</Label>
                  <Select
                    value={newMatch.sport}
                    onValueChange={(value) =>
                      setNewMatch({ ...newMatch, sport: value })
                    }
                  >
                    <SelectTrigger className="bg-[#121212] border-[#1B5E20] text-white">
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-[#1B5E20]">
                      <SelectItem value="cricket">
                        Cricket
                      </SelectItem>
                      <SelectItem value="football">
                        Football
                      </SelectItem>
                      <SelectItem value="badminton">
                        Badminton
                      </SelectItem>
                      <SelectItem value="pickleball">
                        Pickleball
                      </SelectItem>
                      <SelectItem value="basketball">
                        Basketball
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Date</Label>
                    <Input
                      type="date"
                      value={newMatch.date}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          date: e.target.value,
                        })
                      }
                      className="bg-[#121212] border-[#1B5E20] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">
                      Time Slot
                    </Label>
                    <Input
                      type="time"
                      value={newMatch.timeSlots[0]}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          timeSlots: [e.target.value],
                        })
                      }
                      className="bg-[#121212] border-[#1B5E20] text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">
                      Total Players
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g., 22"
                      value={newMatch.totalPlayers}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          totalPlayers: e.target.value,
                        })
                      }
                      className="bg-[#121212] border-[#1B5E20] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">
                      Players Required
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g., 11"
                      value={newMatch.requiredPlayers}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          requiredPlayers: e.target.value,
                        })
                      }
                      className="bg-[#121212] border-[#1B5E20] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">
                    Contribution per Player (₹)
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g., 150"
                    value={newMatch.contributionPerPlayer}
                    onChange={(e) =>
                      setNewMatch({
                        ...newMatch,
                        contributionPerPlayer: e.target.value,
                      })
                    }
                    className="bg-[#121212] border-[#1B5E20] text-white"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={() => setShowCreateDialog(false)}
                  variant="outline"
                  className="border-[#1B5E20] text-white text-[#000000]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateMatch}
                  className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90"
                >
                  Create Match
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#FFFFFF] border border-[#1B5E20] mb-4 sm:mb-6 w-full sm:w-auto">
            <TabsTrigger
              value="available"
              className="data-[state=active]:bg-[#00E676] data-[state=active]:text-[#121212] text-xs sm:text-sm"
            >
              Available Matches
            </TabsTrigger>
            <TabsTrigger
              value="my-requests"
              className="data-[state=active]:bg-[#00E676] data-[state=active]:text-[#121212] text-xs sm:text-sm"
            >
              My Requests
            </TabsTrigger>
            <TabsTrigger
              value="joined"
              className="data-[state=active]:bg-[#00E676] data-[state=active]:text-[#121212] text-xs sm:text-sm"
            >
              Joined Matches
            </TabsTrigger>
          </TabsList>

          {/* Available Matches */}
          <TabsContent value="available" className="space-y-3 sm:space-y-4">
            {availableMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#1E1E1E] rounded-[14px] p-4 sm:p-6 card-elevation hover:border-[#00E676] border-2 border-[#1B5E20] transition-all"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                            <h3 className="text-white font-bold text-lg sm:text-xl">
                              {match.sport}
                            </h3>
                            <Badge className="bg-[#1B5E20] text-[#00E676] border border-[#00E676] text-xs">
                              {match.requiredPlayers -
                                match.joinedPlayers}{" "}
                              Needed
                            </Badge>
                          </div>
                          <p className="text-sm text-[#BDBDBD]">
                            By {match.creatorName}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                          <span className="text-white text-xs sm:text-sm truncate">
                            {new Date(
                              match.date,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                          <span className="text-white text-xs sm:text-sm truncate">
                            {match.timeSlots[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                          <span className="text-white text-xs sm:text-sm">
                            {match.joinedPlayers}/
                            {match.totalPlayers}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#00E676] font-bold text-sm sm:text-base">
                            ₹{match.contributionPerPlayer}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-col lg:w-auto">
                      <Button
                        onClick={() => handleViewDetails(match)}
                        variant="outline"
                        className="border-[#1B5E20] text-white hover:border-[#00E676] hover:text-[#00E676] w-full sm:flex-1 lg:w-auto text-sm text-[#000000]"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleJoinMatch(match.id)}
                        className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover w-full sm:flex-1 lg:w-auto text-sm"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Join Match
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* My Requests */}
          <TabsContent
            value="my-requests"
            className="space-y-3 sm:space-y-4"
          >
            {mockMyRequests.map((match) => (
              <div
                key={match.id}
                className="bg-[#1E1E1E] rounded-[14px] p-4 sm:p-6 card-elevation border-2 border-[#00E676]/30"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                        <h3 className="text-white font-bold text-lg sm:text-xl">
                          {match.sport}
                        </h3>
                        <Badge className="bg-[#00E676]/20 text-[#00E676] text-xs">
                          My Request
                        </Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        handleCancelMatch(match.id)
                      }
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full sm:w-auto text-sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel Match
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm truncate">
                        {new Date(
                          match.date,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm truncate">
                        {match.timeSlots.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm">
                        {match.joinedPlayers}/
                        {match.totalPlayers}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00E676] font-bold text-sm sm:text-base">
                        ₹{match.contributionPerPlayer}
                      </span>
                    </div>
                  </div>

                  {/* Joined Players List */}
                  <div className="pt-2">
                    <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                      Joined Players ({match.joinedPlayers})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {match.players.map((player, index) => (
                        <div
                          key={index}
                          className="bg-[#121212] rounded-lg p-3 border border-[#1B5E20]"
                        >
                          <p className="text-white font-medium text-sm">
                            {player.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3 text-[#00E676] flex-shrink-0" />
                            <p className="text-[#BDBDBD] text-xs sm:text-sm truncate">
                              {player.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Joined Matches */}
          <TabsContent value="joined" className="space-y-3 sm:space-y-4">
            {joinedMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#1E1E1E] rounded-[14px] p-4 sm:p-6 card-elevation border-2 border-[#1B5E20]"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                        <h3 className="text-white font-bold text-lg sm:text-xl">
                          {match.sport}
                        </h3>
                        <Badge className="bg-[#1B5E20] text-[#00E676] text-xs">
                          Joined
                        </Badge>
                      </div>
                      <p className="text-sm text-[#BDBDBD]">
                        Created by {match.creatorName}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleLeaveMatch(match.id)}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full sm:w-auto text-sm"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Leave Match
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm truncate">
                        {new Date(
                          match.date,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm truncate">
                        {match.timeSlots.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm">
                        {match.joinedPlayers}/
                        {match.totalPlayers}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00E676] font-bold text-sm sm:text-base">
                        ₹{match.contributionPerPlayer}
                      </span>
                    </div>
                  </div>

                  {/* All Players List */}
                  <div className="pt-2">
                    <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                      All Players ({match.allPlayers.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {match.allPlayers.map((player, index) => (
                        <div
                          key={index}
                          className="bg-[#121212] rounded-lg p-3 border border-[#1B5E20]"
                        >
                          <p className="text-white font-medium text-sm">
                            {player.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3 text-[#00E676] flex-shrink-0" />
                            <p className="text-[#BDBDBD] text-xs sm:text-sm truncate">
                              {player.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Match Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="bg-[#1E1E1E] border-[#1B5E20] max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedMatch && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white text-xl sm:text-2xl">
                    {selectedMatch.sport} Match Details
                  </DialogTitle>
                  <DialogDescription className="text-[#BDBDBD] text-sm sm:text-base">
                    View complete match information and players
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6 py-4">
                  {/* Match Info */}
                  <div className="bg-[#121212] rounded-xl p-4 sm:p-5 border border-[#1B5E20]">
                    <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Match Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#00E676]" />
                        </div>
                        <div>
                          <p className="text-[#BDBDBD] text-xs sm:text-sm">Date</p>
                          <p className="text-white font-semibold text-sm sm:text-base">
                            {new Date(selectedMatch.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-[#00E676]" />
                        </div>
                        <div>
                          <p className="text-[#BDBDBD] text-xs sm:text-sm">Time</p>
                          <p className="text-white font-semibold text-sm sm:text-base">
                            {selectedMatch.timeSlots[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[#00E676]" />
                        </div>
                        <div>
                          <p className="text-[#BDBDBD] text-xs sm:text-sm">Players</p>
                          <p className="text-white font-semibold text-sm sm:text-base">
                            {selectedMatch.joinedPlayers}/{selectedMatch.totalPlayers}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00E676] font-bold text-lg">₹</span>
                        </div>
                        <div>
                          <p className="text-[#BDBDBD] text-xs sm:text-sm">Contribution</p>
                          <p className="text-[#00E676] font-bold text-sm sm:text-base">
                            ₹{selectedMatch.contributionPerPlayer}/player
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="bg-[#121212] rounded-xl p-4 sm:p-5 border border-[#1B5E20]">
                    <h3 className="text-white font-bold mb-3 text-base sm:text-lg">Match Creator</h3>
                    <div className="flex items-center gap-3 bg-[#1E1E1E] rounded-lg p-3 border border-[#00E676]/30">
                      <div className="w-12 h-12 rounded-full bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-6 h-6 text-[#00E676]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm sm:text-base">{selectedMatch.creatorName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-3 h-3 text-[#00E676] flex-shrink-0" />
                          <p className="text-[#BDBDBD] text-xs sm:text-sm truncate">{selectedMatch.creatorPhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Players List */}
                  <div className="bg-[#121212] rounded-xl p-4 sm:p-5 border border-[#1B5E20]">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-white font-bold text-base sm:text-lg">Joined Players</h3>
                      <Badge className="bg-[#1B5E20] text-[#00E676] text-xs">
                        {selectedMatch.players?.length || 0} Players
                      </Badge>
                    </div>
                    
                    {selectedMatch.players && selectedMatch.players.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {selectedMatch.players.map((player: any, index: number) => (
                          <div
                            key={index}
                            className="bg-[#1E1E1E] rounded-lg p-3 border border-[#1B5E20] hover:border-[#00E676]/50 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1B5E20] flex items-center justify-center flex-shrink-0 text-[#00E676] font-bold text-xs">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-xs sm:text-sm">{player.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <Phone className="w-3 h-3 text-[#00E676] flex-shrink-0" />
                                  <p className="text-[#BDBDBD] text-xs truncate">{player.phone}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[#BDBDBD] text-center py-4 text-sm">No players joined yet</p>
                    )}

                    {selectedMatch.requiredPlayers > selectedMatch.joinedPlayers && (
                      <div className="mt-4 p-3 bg-[#1B5E20]/20 rounded-lg border border-[#1B5E20]">
                        <p className="text-[#00E676] text-center text-xs sm:text-sm font-semibold">
                          {selectedMatch.requiredPlayers - selectedMatch.joinedPlayers} more{" "}
                          {selectedMatch.requiredPlayers - selectedMatch.joinedPlayers === 1 ? "player" : "players"} needed
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    onClick={() => setShowDetailsDialog(false)}
                    variant="outline"
                    className="border-[#1B5E20] text-white hover:border-[#00E676] w-full sm:w-auto order-2 sm:order-1 text-[#000000]"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleJoinMatch(selectedMatch.id)}
                    className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover w-full sm:w-auto order-1 sm:order-2"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Join This Match
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}