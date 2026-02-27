import { useState } from 'react';
import { CommentsList, Comment } from './comment-bubble';
import { MessageSquare, Settings as SettingsIcon, Clock, Send, Palette } from 'lucide-react';

interface RightSidebarProps {
  selectedElement: any | null;
  onUpdateElement?: (updates: any) => void;
  comments: Comment[];
  onAddComment?: (text: string) => void;
  activities: Array<{ id: string; text: string; timestamp: Date }>;
}

export function RightSidebar({
  selectedElement,
  onUpdateElement,
  comments,
  onAddComment,
  activities,
}: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'comments' | 'activity'>('properties');
  const [commentText, setCommentText] = useState('');

  const handleSendComment = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  const tabs = [
    { id: 'properties', label: 'Properties', icon: SettingsIcon },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'activity', label: 'Activity', icon: Clock },
  ] as const;

  return (
    <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-l border-gray-200 flex flex-col shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'properties' && (
          <div className="p-4">
            {selectedElement ? (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Palette className="w-4 h-4" />
                    Color Palette
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['#FEF3C7', '#DBEAFE', '#FCE7F3', '#D1FAE5', '#E9D5FF', '#FED7AA', '#FCA5A5', '#C7D2FE'].map((color) => (
                      <button
                        key={color}
                        onClick={() => onUpdateElement?.({ color })}
                        className="w-full h-12 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:scale-105 transition-all shadow-sm hover:shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                {selectedElement.text !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
                    <textarea
                      value={selectedElement.text}
                      onChange={(e) => onUpdateElement?.({ text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                      rows={4}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SettingsIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Select an element to edit properties</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="p-4 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4">
              <CommentsList comments={comments} />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendComment}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="p-4">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">No activity yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}