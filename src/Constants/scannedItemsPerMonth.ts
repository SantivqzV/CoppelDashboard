import axios from "axios";
import { ScannedItem } from "@/types/types";

export async function fetchScannedItems() {
  const response = await axios.get<ScannedItem[]>("https://server-zzcb.onrender.com/get-scanned-items");
  const data = response.data;

  // Group by month and day
  const counts: Record<string, Record<string, number>> = {};

  data.forEach(item => {
    if (item.scanned && item["Scan Date"]) {
      const date = new Date(item["Scan Date"]);
      const month = date.toLocaleString("default", { month: "long", year: "numeric" }); // e.g. "May 2025"
      const day = date.toISOString().slice(0, 10); // e.g. "2025-05-30"

      if (!counts[month]) counts[month] = {};
      if (!counts[month][day]) counts[month][day] = 0;
      counts[month][day]++;
    }
  });

  // Flatten to array
  const result: { month: string; day: string; total: number }[] = [];
  for (const month in counts) {
    for (const day in counts[month]) {
      result.push({ month, day, total: counts[month][day] });
    }
  }

  // Sort by day ascending
  result.sort((a, b) => a.day.localeCompare(b.day));

  return result;
}