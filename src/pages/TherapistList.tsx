import { useEffect, useState } from "react";
import therapist_data from "@/data/therapists.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/app/FilterBar";
import { useNavigate } from "react-router-dom";

type Therapist = {
  id: number;
  name: string;
  specialization: string[];
  location: string;
  availability: string[];
};

const TherapistList = () => {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filtered, setFiltered] = useState<Therapist[]>([]);

  const handleFilterChange = (filters: {
    specialization: string;
    location: string;
    availability: string;
  }) => {
    let results = [...therapists];

    if (filters.specialization)
      results = results.filter((t) =>
        t.specialization.includes(filters.specialization)
      );

    if (filters.location)
      results = results.filter((t) => t.location === filters.location);

    if (filters.availability)
      results = results.filter((t) =>
        t.availability.includes(filters.availability)
      );

    setFiltered(results);
  };

  useEffect(() => {
    setTherapists(therapist_data);
    setFiltered(therapist_data);
  }, []);

  const onProfileVisit = (id: number) => {
    if (id) {
      navigate(`/therapist/${id}`);
    } else {
      console.error("Astrologer profile not found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Find Your Therapist</h1>
        <FilterBar therapists={therapists} onFilter={handleFilterChange} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((therapist: Therapist) => (
              <Card key={therapist.id}>
                <CardHeader>
                  <CardTitle>{therapist.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p>
                      <strong>Specializations:</strong>{" "}
                      {therapist.specialization.join(", ")}
                    </p>
                    <p>
                      <strong>Location:</strong> {therapist.location}
                    </p>
                    <p>
                      <strong>Availability:</strong>{" "}
                      {therapist.availability.join(", ")}
                    </p>
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    onClick={() => onProfileVisit(therapist.id)}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No therapists found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistList;
