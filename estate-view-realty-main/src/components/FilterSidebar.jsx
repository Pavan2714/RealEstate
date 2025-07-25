import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FilterSidebar = ({ isOpen, onClose, onFiltersChange }) => {
  const [expandedSections, setExpandedSections] = useState([
    "price",
    "bedrooms",
    "bathrooms",
    "status",
    "type",
  ]);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: [],
    bathrooms: "",
    status: "all",
    type: "all",
    furnished: null,
    parking: null,
    offer: null,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Convert "all" values back to empty strings for parent component
    const filtersForParent = {
      ...newFilters,
      status: newFilters.status === "all" ? "" : newFilters.status,
      type: newFilters.type === "all" ? "" : newFilters.type,
    };

    onFiltersChange && onFiltersChange(filtersForParent);
  };

  const updatePriceFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Convert "all" values back to empty strings for parent component
    const filtersForParent = {
      ...newFilters,
      status: newFilters.status === "all" ? "" : newFilters.status,
      type: newFilters.type === "all" ? "" : newFilters.type,
    };

    onFiltersChange && onFiltersChange(filtersForParent);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      minPrice: "",
      maxPrice: "",
      bedrooms: [],
      bathrooms: "",
      status: "all",
      type: "all",
      furnished: null,
      parking: null,
      offer: null,
    };
    setFilters(clearedFilters);
    onFiltersChange &&
      onFiltersChange({
        ...clearedFilters,
        status: "",
        type: "",
      });
  };

  const bedroomOptions = [1, 2, 3, 4, 5, 6];
  const bathroomOptions = [1, 2, 3, 4, 5];
  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Condo",
    "Townhouse",
    "Studio",
  ];
  const statusOptions = [
    { value: "sell", label: "For Sale" },
    { value: "rent", label: "For Rent" },
  ];

  const FilterSection = ({ title, sectionKey, children }) => {
    const isExpanded = expandedSections.includes(sectionKey);

    return (
      <div className="space-y-3">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left p-2 hover:bg-muted/50 rounded-md transition-colors"
        >
          <h3 className="font-medium text-foreground">{title}</h3>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isExpanded && <div className="space-y-3 pl-2">{children}</div>}
        <Separator />
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-80 bg-background border-r transform transition-transform duration-300 z-50 lg:z-10",
          "overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Status (Sell/Rent) */}
          <FilterSection title="Property Status" sectionKey="status">
            <Select
              value={filters.status}
              onValueChange={(value) => updateFilters("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" sectionKey="price">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Min Price
                </Label>
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  onBlur={(e) => updatePriceFilter("minPrice", e.target.value)}
                  className="h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Max Price
                </Label>
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  onBlur={(e) => updatePriceFilter("maxPrice", e.target.value)}
                  className="h-9"
                />
              </div>
            </div>
          </FilterSection>

          {/* Bedrooms */}
          <FilterSection title="Number of Bedrooms" sectionKey="bedrooms">
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((num) => (
                <Badge
                  key={num}
                  variant={
                    filters.bedrooms.includes(num) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    const newBedrooms = filters.bedrooms.includes(num)
                      ? filters.bedrooms.filter((b) => b !== num)
                      : [...filters.bedrooms, num];
                    updateFilters("bedrooms", newBedrooms);
                  }}
                >
                  {num} BR
                </Badge>
              ))}
            </div>
          </FilterSection>

          {/* Bathrooms */}
          <FilterSection title="Number of Bathrooms" sectionKey="bathrooms">
            <div className="flex flex-wrap gap-2">
              {bathroomOptions.map((num) => (
                <Badge
                  key={num}
                  variant={
                    filters.bathrooms === num.toString() ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => updateFilters("bathrooms", num.toString())}
                >
                  {num}+ Bath
                </Badge>
              ))}
            </div>
          </FilterSection>

          {/* Property Type */}
          <FilterSection title="Property Type" sectionKey="type">
            <Select
              value={filters.type}
              onValueChange={(value) => updateFilters("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Furnished */}
          <FilterSection title="Furnishing" sectionKey="furnished">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="furnished"
                  checked={filters.furnished === true}
                  onCheckedChange={(checked) =>
                    updateFilters("furnished", checked ? true : null)
                  }
                />
                <Label htmlFor="furnished" className="text-sm">
                  Furnished
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unfurnished"
                  checked={filters.furnished === false}
                  onCheckedChange={(checked) =>
                    updateFilters("furnished", checked ? false : null)
                  }
                />
                <Label htmlFor="unfurnished" className="text-sm">
                  Unfurnished
                </Label>
              </div>
            </div>
          </FilterSection>

          {/* Parking */}
          <FilterSection title="Parking" sectionKey="parking">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={filters.parking === true}
                onCheckedChange={(checked) =>
                  updateFilters("parking", checked ? true : null)
                }
              />
              <Label htmlFor="parking" className="text-sm">
                Parking Available
              </Label>
            </div>
          </FilterSection>

          {/* Special Offers */}
          <FilterSection title="Special Offers" sectionKey="offer">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="offer"
                checked={filters.offer === true}
                onCheckedChange={(checked) =>
                  updateFilters("offer", checked ? true : null)
                }
              />
              <Label htmlFor="offer" className="text-sm">
                Properties with Offers
              </Label>
            </div>
          </FilterSection>

          {/* Apply Button */}
          <div className="sticky bottom-0 bg-background pt-4 border-t">
            <Button className="w-full" size="lg">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
