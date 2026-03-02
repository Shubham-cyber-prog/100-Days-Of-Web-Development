import { Link } from 'react-router';
import { Star, Plus, Clock, GitBranch } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import RepositoryCard from '../components/RepositoryCard';
import { repositories, activityFeed, currentUser } from '../data/mockData';
import { useState } from 'react';
import CreateRepositoryModal from '../components/CreateRepositoryModal';

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-80 border-r bg-gray-50 p-6">
        <div className="space-y-6">
          {/* User Profile Summary */}
          <div className="flex items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{currentUser.name}</h2>
              <p className="text-sm text-gray-600">@{currentUser.username}</p>
            </div>
          </div>

          {/* New Repository Button */}
          <Button className="w-full" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Repository
          </Button>

          {/* Quick Links */}
          <nav className="space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              Your repositories
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <Star className="w-4 h-4" />
              Starred repositories
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <Clock className="w-4 h-4" />
              Recent activity
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto p-6 space-y-8">
          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent activity</h2>
            <div className="border rounded-lg divide-y">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <GitBranch className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.repo}</span> -{' '}
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Your Repositories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your repositories</h2>
              <Button variant="outline" size="sm">
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {repositories.map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
          </section>

          {/* Suggested Repositories */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Suggested repositories</h2>
            <div className="border rounded-lg divide-y">
              <div className="p-4 hover:bg-gray-50">
                <Link
                  to="/torvalds/linux"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  torvalds/linux
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Linux kernel source tree
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    159k
                  </span>
                  <span>C</span>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <Link
                  to="/microsoft/vscode"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  microsoft/vscode
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Visual Studio Code
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    156k
                  </span>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <CreateRepositoryModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  );
}
