import { useDayjsCast, type DayjsType } from "@finzor-ui/use-day-js";

export default function dayjsCast(value: string | number | Date): DayjsType {
  return useDayjsCast(value) as DayjsType;
}
