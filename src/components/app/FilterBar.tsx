import { useEffect, useState } from "react";
import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Therapist = {
  specialization: string[];
  location: string;
  availability: string[];
};

type FilterState = {
  specialization: string;
  location: string;
  availability: string;
};

interface FilterBarProps {
  therapists: Therapist[];
  onFilter: (filters: FilterState) => void;
}

const FilterBar: FC<FilterBarProps> = ({ therapists, onFilter }) => {
  const [filters, setFilters] = useState<FilterState>({
    specialization: "",
    location: "",
    availability: "",
  });

  const specializations = Array.from(
    new Set(therapists.flatMap((t) => t.specialization))
  );
  const locations = Array.from(new Set(therapists.map((t) => t.location)));
  const availabilities = Array.from(
    new Set(therapists.flatMap((t) => t.availability))
  );

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Select
        onValueChange={(val) =>
          setFilters((prev) => ({ ...prev, specialization: val }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Specialization" />
        </SelectTrigger>
        <SelectContent>
          {specializations.map((spec) => (
            <SelectItem key={spec} value={spec}>
              {spec}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(val) =>
          setFilters((prev) => ({ ...prev, location: val }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(val) =>
          setFilters((prev) => ({ ...prev, availability: val }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Availability" />
        </SelectTrigger>
        <SelectContent>
          {availabilities.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
