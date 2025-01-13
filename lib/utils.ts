import { differenceInCalendarYears } from "date-fns";

export function CalculateAge(dob : Date){
  return differenceInCalendarYears(new Date(),dob);
}