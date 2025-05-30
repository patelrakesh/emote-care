import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TherapistProfile from "@/pages/TherapistProfile";
import * as mockData from "@/data/therapists.json";
import { MemoryRouter, Route, Routes } from "react-router-dom";

type Therapist = {
  id: number;
  name: string;
  specialization: string[];
  location: string;
  availability: string[];
  bio?: string;
};

const therapists = mockData as Therapist[];

describe("TherapistProfile", () => {
  it("renders therapist details and booking form", () => {
    const selected = therapists[0];

    render(
      <MemoryRouter initialEntries={[`/therapist/${selected.id}`]}>
        <Routes>
          <Route path="/therapist/:id" element={<TherapistProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(selected.name)).toBeInTheDocument();
    expect(screen.getByText(selected.location)).toBeInTheDocument();
    expect(screen.getByText(/Book a Session/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g. Monday 10 AM")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write briefly...")).toBeInTheDocument();
  });

  it("renders fallback if therapist not found", () => {
    render(
      <MemoryRouter initialEntries={["/therapist/99999"]}>
        <Routes>
          <Route path="/therapist/:id" element={<TherapistProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Therapist not found/i)).toBeInTheDocument();
  });
});
