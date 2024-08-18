import { Units } from '@/types/weather';

export const formatWindSpeed = (speed: number, units: Units) => {
  return units === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} mph`;
}

export const formatTemperature = (temp: number, units: Units) => {
  if (units === 'metric') {
    return `${temp} °C`;
  } else if (units === 'imperial') {
    return `${temp} °F`;
  } else {
    return `${temp} K`;
  }
}