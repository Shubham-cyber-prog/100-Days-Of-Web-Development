import { Search, ChevronDown, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const languages = [
  'All Languages',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'CSS',
];

const sortOptions = [
  { value: 'recent', label: 'Recent' },
  { value: 'name', label: 'Name' },
  { value: 'favorites', label: 'Favorites' },
];

export function Header({
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange,
}: HeaderProps) {
  return (
    <div className="h-16 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center px-4 md:px-6 gap-2 md:gap-4">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search snippets, tags, languages..."
          className="w-full bg-[#2d2d2d] text-white pl-10 pr-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none text-sm"
        />
      </div>

      {/* Language Filter */}
      <div className="relative hidden sm:block">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-[#2d2d2d] text-white pl-4 pr-10 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none text-sm appearance-none cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>

      {/* Sort Options */}
      <div className="relative hidden md:block">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[#2d2d2d] text-white pl-4 pr-10 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none text-sm appearance-none cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}