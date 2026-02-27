import ViewEvent from '../ViewEvent';
import type { Event as EventType } from "../api/eventsApi";

type EventCardProps = {
  event: EventType;
};

const EventCard = ({ event } : EventCardProps ) : JSX.Element => {
  return (
    <>
      <ViewEvent event={event} reducedView={true} />
    </>
  )
}

export default EventCard;