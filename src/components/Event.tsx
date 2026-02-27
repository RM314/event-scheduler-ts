import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchOneEvent} from "../api/eventsApi";
import ViewEvent from '../ViewEvent';
import NotFound from "../pages/NotFound";
import { useAuth } from "../contexts/AuthContext";

import type { Event as EventType } from "../api/eventsApi";


const Event = () : JSX.Element | null => {

  const { id } = useParams<{id: string }>();

  const { isAuthenticated } = useAuth();


  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    let active = true;

    async function load() {
      try {
        const data = await fetchOneEvent(Number(id));
        if (active) {
          setEvent(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || "Error while loading event");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []); //only while mounting

console.log("dibngs", isAuthenticated);


  if (loading)  return <div>Loading event...</div>;

  console.log("dibngs", isAuthenticated);

  if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

  if (error)    return  <NotFound /> ;

  if (event) {
  return (
    <>
      <ViewEvent event={event} reducedView={false} />
    </>
  )
  } else return null;
}

export default Event

