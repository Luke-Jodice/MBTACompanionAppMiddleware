import 'dotenv/config'
const API_KEY = process.env.MBTA_API_KEY;
const STOP_ID = "place-sstat"; // Example: South Station
const BASE_URL = "https://api-v3.mbta.com/predictions";

async function getNextThree(stopId, directionId) {
  const url = new URL(BASE_URL);
  url.searchParams.set("filter[stop]", stopId);
  url.searchParams.set("filter[direction_id]", directionId); // 0 = inbound, 1 = outbound
  url.searchParams.set("sort", "arrival_time");
  url.searchParams.set("include", "trip,stop,schedule");

  const resp = await fetch(url, {
    headers: { "x-api-key": API_KEY }
  });
  const data = await resp.json();

  const now = new Date();
  const upcoming = data.data
    .map(p => {
      const arrival = p.attributes.arrival_time || p.attributes.departure_time;
      return arrival ? new Date(arrival) : null;
    })
    .filter(t => t && t > now)
    .slice(0, 3) // take only next 3
    .map(t => t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

  return upcoming;
}

(async () => {
  const inbound = await getNextThree(STOP_ID, 0);
  const outbound = await getNextThree(STOP_ID, 1);

  console.log("Inbound:", inbound);
  console.log("Outbound:", outbound);
})();