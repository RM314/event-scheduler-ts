import { useNavigate } from "react-router-dom";
import type { FormEventHandler } from "react";
import NewEventForm from "../components/NewEventForm";
import { newEvent } from "../api/eventsApi";

type NewEventInput = {
  title: string;
  date: string; // ISO string
  description: string;
  location: string;
  latitude: number;
  longitude: number;
};

const NewEventPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const title = String(fd.get("title") ?? "");
    const description = String(fd.get("description") ?? "");
    const location = String(fd.get("location") ?? "");
    const dateRaw = String(fd.get("date") ?? "");
    const latitudeRaw = String(fd.get("latitude") ?? "");
    const longitudeRaw = String(fd.get("longitude") ?? "");

    const latitude = Number(latitudeRaw);
    const longitude = Number(longitudeRaw);

    const payload: NewEventInput = {
      title,
      description,
      location,
      latitude,
      longitude,
      date: new Date(dateRaw).toISOString(),
    };

    try {
      await newEvent(payload);
      navigate("/");
    } catch {
      alert("Error while storing new event");
    }
  };

  return <NewEventForm onSubmit={handleSubmit} />;
};

export default NewEventPage;