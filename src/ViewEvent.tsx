import { Link } from "react-router-dom";

import type { Event as EventType } from "../api/eventsApi";

type ViewEventProps = {
  event: EventType;
  reducedView?: boolean;
};

const ViewEvent = ({ event, reducedView = true } : ViewEventProps) : JSX.Element => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 max-w-xl mx-auto">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{event.title}</h2>
          <span className="text-sm opacity-70">
            {event.date.toLocaleString()}
          </span>
        </div>

        {!reducedView && (
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm [&>dt]:font-semibold">

            <dt>Description</dt>
            <dd>{event.description}</dd>

            <dt>Location</dt>
            <dd>{event.location}</dd>

            <dt>Latitude</dt>
            <dd>{event.latitude}</dd>

            <dt>Longitude</dt>
            <dd>{event.longitude}</dd>

            <dt>Organizer ID</dt>
            <dd>{event.organizerId}</dd>

            <dt>Created</dt>
            <dd>{event.createdAt.toLocaleString()}</dd>

            <dt>Updated</dt>
            <dd>{event.updatedAt.toLocaleString()}</dd>
          </dl>
        )}

        {reducedView && (
          <div className="card-actions justify-end mt-4">
            <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
              Full Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvent;
