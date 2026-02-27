// base url from .env file
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


type ApiEventsResponse = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: ApiEvent[];
};

type ApiEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
};

export type Event = Omit<ApiEvent, "date" | "createdAt" | "updatedAt"> & {
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type EventsResponse = Omit<ApiEventsResponse, "results"> & {
  results: Event[];
}

const getAuthTokenOrThrow = () : string  => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Could not load API token");
  }
  return token;
};



const fetchEvents = async (page : number, N : number) : Promise<EventsResponse> => {
  const token = getAuthTokenOrThrow();

  const res = await fetch(
    `${BASE_URL}/events?page=${page}&limit=${N}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Fetch failed");
  }

  const data = (await res.json()) as ApiEventsResponse;

  const normalized : Event[] = data.results.map(ev => ({
    ...ev,
    date: new Date(ev.date),
    createdAt: new Date(ev.createdAt),
    updatedAt: new Date(ev.updatedAt)
  }));

  const sorted = normalized.sort((a, b) => b.date.getTime() - a.date.getTime());

  const finalized = { ...data, results: sorted };

  return finalized;
};

const fetchOneEvent = async (id : number) : Promise<Event> => {
  const token = getAuthTokenOrThrow();
  const res = await fetch(
    `${BASE_URL}/events/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok || res.status!=200) {
    throw new Error("Fetch failed");
  }

  const data = await res.json() as ApiEvent;

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    date: new Date(data.date)
  };
};

async function newEvent(event) : Promise<Event> {
  const token = getAuthTokenOrThrow();

  const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(event)
  });

  const data = await response.json() as ApiEvent;

  return {
    ...data,
    date: new Date(data.date),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}


export { fetchEvents, fetchOneEvent, newEvent };
