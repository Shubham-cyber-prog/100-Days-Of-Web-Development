import { Search, Filter, Calendar, Tag, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FilterOptions {
  searchQuery: string;
  selectedLabels: string[];
  dateRange: 'all' | 'today' | 'week' | 'month';
  minConfidence: number;
  sortBy: 'date' | 'confidence' | 'objects';
}

interface HistoryFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableLabels: string[];
}

export function HistoryFilters({ onFilterChange, availableLabels }: HistoryFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    selectedLabels: [],
    dateRange: 'all',
    minConfidence: 0,
    sortBy: 'date',
  });

  const updateFilters = (updates: Partial<FilterOptions>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleLabel = (label: string) => {
    const newLabels = filters.selectedLabels.includes(label)
      ? filters.selectedLabels.filter(l => l !== label)
      : [...filters.selectedLabels, label];
    updateFilters({ selectedLabels: newLabels });
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      searchQuery: '',
      selectedLabels: [],
      dateRange: 'all',
      minConfidence: 0,
      sortBy: 'date',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount =
    (filters.searchQuery ? 1 : 0) +
    filters.selectedLabels.length +
    (filters.dateRange !== 'all' ? 1 : 0) +
    (filters.minConfidence > 0 ? 1 : 0) +
    (filters.sortBy !== 'date' ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar & Filter Toggle */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by labels, date, or keywords..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
            isOpen || activeFilterCount > 0
              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-400'
              : 'bg-black/40 border border-purple-500/20 text-gray-400 hover:text-purple-400 hover:border-purple-500/40'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-cyan-400 text-black text-xs font-bold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 space-y-6"
          >
            {/* Date Range */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <label className="text-white font-medium">Date Range</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'today', 'week', 'month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => updateFilters({ dateRange: range as any })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filters.dateRange === range
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-400'
                        : 'bg-purple-500/10 border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Labels Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-purple-400" />
                <label className="text-white font-medium">Filter by Labels</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableLabels.map((label) => (
                  <button
                    key={label}
                    onClick={() => toggleLabel(label)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.selectedLabels.includes(label)
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 text-purple-400'
                        : 'bg-purple-500/10 border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40'
                    }`}
                  >
                    {label}
                    {filters.selectedLabels.includes(label) && (
                      <X className="inline-block w-3 h-3 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Confidence Threshold */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-pink-400" />
                  <label className="text-white font-medium">Min Confidence</label>
                </div>
                <span className="text-cyan-400 font-bold">
                  {filters.minConfidence}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={filters.minConfidence}
                onChange={(e) =>
                  updateFilters({ minConfidence: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="text-white font-medium mb-3 block">Sort By</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'date', label: 'Most Recent' },
                  { value: 'confidence', label: 'Highest Confidence' },
                  { value: 'objects', label: 'Most Objects' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilters({ sortBy: option.value as any })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filters.sortBy === option.value
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-400'
                        : 'bg-purple-500/10 border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="w-full py-3 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
