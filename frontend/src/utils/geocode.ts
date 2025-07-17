import axios from "axios";

const MAPBOX_TOKEN =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  "pk.eyJ1IjoicGF0a2FuIiwiYSI6ImNtZDdkaDlxbTBmMTgybHF1djQ0dWR4ZTEifQ.LI1-0uV8Bb7MZfa1webYaw"; // Set in .env

export async function fetchLocationSuggestions(query: string) {
  if (!MAPBOX_TOKEN) throw new Error("Mapbox token not set");
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&types=country,region,place,address&limit=5`;
  const res = await axios.get(url);
  return res.data.features.map((feature: any) => ({
    label: feature.place_name,
    coords: feature.center,
  }));
}
