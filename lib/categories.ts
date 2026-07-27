import { CategoryStyle, EventCategory } from "./types";

export const CATEGORY_STYLES: Record<EventCategory, CategoryStyle> = {
  work: {
    label: "Work",
    bg: "bg-[#DCE3E0]",
    border: "border-[#A9BCB4]",
    text: "text-[#3F5248]",
    dot: "bg-[#7C9A8B]",
  },
  class: {
    label: "Class",
    bg: "bg-[#F4E4DA]",
    border: "border-[#E0BCA6]",
    text: "text-[#8A5A3B]",
    dot: "bg-[#C88A5F]",
  },
  appointment: {
    label: "Appointment",
    bg: "bg-[#EAE2F4]",
    border: "border-[#CBB9E5]",
    text: "text-[#5F4A80]",
    dot: "bg-[#9C82C4]",
  },
  church: {
    label: "Church",
    bg: "bg-[#F6EBCE]",
    border: "border-[#E4CE8F]",
    text: "text-[#8A6D22]",
    dot: "bg-[#CBA53C]",
  },
  trip: {
    label: "Trip",
    bg: "bg-[#F1DCD3]",
    border: "border-[#E0B4A3]",
    text: "text-[#8F4F37]",
    dot: "bg-[#C97350]",
  },
  event: {
    label: "Event",
    bg: "bg-[#F5E1E4]",
    border: "border-[#E4B9C0]",
    text: "text-[#914D5C]",
    dot: "bg-[#CE8494]",
  },
  dateNight: {
    label: "Date Night",
    bg: "bg-[#EFD9E4]",
    border: "border-[#DBACC4]",
    text: "text-[#833F63]",
    dot: "bg-[#B85F8F]",
  },
  family: {
    label: "Family Time",
    bg: "bg-[#E4E8D4]",
    border: "border-[#C4CE9E]",
    text: "text-[#5C6635]",
    dot: "bg-[#96A65C]",
  },
  fitness: {
    label: "Fitness",
    bg: "bg-[#DDE7E6]",
    border: "border-[#AECAC7]",
    text: "text-[#31615C]",
    dot: "bg-[#5D948D]",
  },
  chores: {
    label: "Chores",
    bg: "bg-[#EEE7DC]",
    border: "border-[#D9CBB3]",
    text: "text-[#73624A]",
    dot: "bg-[#B0987A]",
  },
};
