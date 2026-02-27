import { useState, useEffect } from 'react';
import { fetchEvents } from "../api/eventsApi";
import EventCard from "../components/EventCard";
import type { Event as EventType } from "../api/eventsApi";


const HomePage = () : JSX.Element => {

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //console.log("Loading events home page...");
    let active = true;

    async function load() {
      try {
        const data = await fetchEvents(1, 50);
        if (active) {
          setEvents(data.results);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (active) {
          const msg = err instanceof Error ? err.message : "Error while loading events";
          setError(msg);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [setEvents]);


  if (loading) return <div>Loading Events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Upcoming Events</h1>

      {events.length === 0 && (
        <p className="text-sm opacity-70">No Events Found</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HomePage;
