interface UserAvatarProps {
  name: string;
  color: string;
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function UserAvatar({ name, color, isOnline = true, size = 'md' }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-block">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-medium text-white`}
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
}

interface AvatarStackProps {
  users: Array<{ name: string; color: string; isOnline?: boolean }>;
  max?: number;
}

export function AvatarStack({ users, max = 5 }: AvatarStackProps) {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user, index) => (
        <div key={index} className="relative" title={user.name}>
          <UserAvatar name={user.name} color={user.color} isOnline={user.isOnline} size="sm" />
        </div>
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
          +{remaining}
        </div>
      )}
    </div>
  );
}
