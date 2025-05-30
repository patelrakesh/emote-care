import { useParams } from "react-router-dom";
import data from "@/data/therapists.json";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Therapist = {
  id: number;
  name: string;
  specialization: string[];
  location: string;
  availability: string[];
  bio?: string;
};

const TherapistProfile = () => {
  const { id } = useParams();
  const therapist: Therapist | undefined = data.find(
    (t) => t.id === Number(id)
  );

  if (!therapist) {
    return <div className="p-6">Therapist not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{therapist.name}</h1>
        <p className="text-muted-foreground">{therapist.location}</p>
        <p className="mt-4">
          <strong>Specializations:</strong>{" "}
          {therapist.specialization.join(", ")}
        </p>
        <p>
          <strong>Availability:</strong> {therapist.availability.join(", ")}
        </p>
        {therapist.bio && <p className="mt-4 text-sm">{therapist.bio}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Book a Session</h2>
        <form className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input type="text" placeholder="Your Name" required />
          </div>
          <div>
            <Label>Preferred Time Slot</Label>
            <Input type="text" placeholder="e.g. Monday 10 AM" required />
          </div>
          <div>
            <Label>Reason for Visit</Label>
            <Textarea placeholder="Write briefly..." required />
          </div>
          <Button type="submit" disabled>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TherapistProfile;
