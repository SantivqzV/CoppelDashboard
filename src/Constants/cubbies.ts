import axios from "axios";
import { Cubby } from "@/types/types";

export async function fetchCubbies() {
  const response = await axios.get<Cubby[]>("https://server-zzcb.onrender.com/get-cubbies");
  return response.data;
}