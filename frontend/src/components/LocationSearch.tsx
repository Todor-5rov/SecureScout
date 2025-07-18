import { useState, useEffect, useRef } from "react";
import { MapPin, Search, X } from "lucide-react";
import {
  searchLocations,
  getSimplifiedLocationName,
  MapboxFeature,
} from "../services/mapboxService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LocationSearchProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function LocationSearch({
  value,
  onChange,
  placeholder = "Search for a location...",
  className = "",
  disabled = false,
}: LocationSearchProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchLocations(query);
        setSuggestions(results);
      } catch (error) {
        console.error("Error searching locations:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectLocation(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectLocation = (feature: MapboxFeature) => {
    const locationName = getSimplifiedLocationName(feature.place_name);
    setQuery(locationName);
    onChange(locationName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const clearLocation = () => {
    setQuery("");
    onChange("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearLocation}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
          ) : (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={suggestion.id}>
                  <button
                    type="button"
                    onClick={() => selectLocation(suggestion)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                      index === selectedIndex ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {suggestion.text}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {suggestion.place_name}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
