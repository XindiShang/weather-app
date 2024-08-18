import type { Units } from "@/types/weather";

export const UNITS: Record<Units, string> = {
  metric: '°C',
  imperial: '°F',
  standard: 'K',
};

export const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
