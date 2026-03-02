import { useParams } from 'react-router';
import { MapPin, Link as LinkIcon, Twitter, Building, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import RepositoryCard from '../components/RepositoryCard';
import { currentUser, repositories, contributionData } from '../data/mockData';

export default function Profile() {
  const { username } = useParams();
  const isOwnProfile = username === currentUser.username;

  // Generate contribution grid
  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 3) return 'bg-green-200';
    if (count <= 6) return 'bg-green-400';
    return 'bg-green-600';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Profile Info */}
          <aside className="w-80 space-y-6">
            <div className="space-y-4">
              <Avatar className="w-64 h-64 rounded-full">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-4xl">JD</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
                <p className="text-gray-600">@{currentUser.username}</p>
              </div>

              {isOwnProfile && (
                <Button variant="outline" className="w-full">
                  Edit profile
                </Button>
              )}

              <p className="text-sm">{currentUser.bio}</p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    <strong>42</strong> followers · <strong>24</strong> following
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>Acme Inc.</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  <a href="#" className="text-blue-600 hover:underline">
                    johndoe.dev
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  <a href="#" className="text-blue-600 hover:underline">
                    @johndoe
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Contribution Graph */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold">Contribution activity</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded-sm" />
                    <div className="w-3 h-3 bg-green-200 rounded-sm" />
                    <div className="w-3 h-3 bg-green-400 rounded-sm" />
                    <div className="w-3 h-3 bg-green-600 rounded-sm" />
                  </div>
                  <span>More</span>
                </div>
                <div className="grid grid-cols-52 gap-1">
                  {contributionData.map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(
                        day.count
                      )}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Repositories */}
            <Tabs defaultValue="repositories" className="w-full">
              <TabsList>
                <TabsTrigger value="repositories">
                  Repositories ({repositories.length})
                </TabsTrigger>
                <TabsTrigger value="stars">Stars</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="repositories" className="mt-6 space-y-3">
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </TabsContent>

              <TabsContent value="stars" className="mt-6">
                <div className="text-center py-12 text-gray-500">
                  <p>No starred repositories yet</p>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <div className="text-center py-12 text-gray-500">
                  <p>No projects yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
