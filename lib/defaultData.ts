import { DashboardData } from "./types";
import { toISODate, addDays } from "./dateUtils";

function nextDecember25(from: Date): Date {
  const year = from.getMonth() === 11 && from.getDate() > 25 ? from.getFullYear() + 1 : from.getFullYear();
  return new Date(year, 11, 25);
}

export function getDefaultData(): DashboardData {
  const today = new Date();

  return {
    settings: {
      familyName: "The Anderson Family",
      tagline: "Faith  ·  Family  ·  Growth  ·  Adventure",
      quote: {
        text: "Whatever you do, do it all for the glory of God.",
        source: "1 Corinthians 10:31",
      },
      latitude: 30.2672,
      longitude: -97.7431,
      locationLabel: "Austin, TX",
      temperatureUnit: "fahrenheit",
    },
    members: [
      { id: "marcus", name: "Marcus", role: "Dad", color: "#6C8EA6", initial: "M" },
      { id: "olivia", name: "Olivia", role: "Mom", color: "#B85F8F", initial: "O" },
      { id: "ethan", name: "Ethan", role: "Son", color: "#C88A5F", initial: "E" },
      { id: "liam", name: "Liam", role: "Son", color: "#96A65C", initial: "L" },
      { id: "noah", name: "Noah", role: "Son", color: "#9C82C4", initial: "N" },
    ],
    events: [
      // Monday
      { id: "e1", day: "mon", start: "06:00", end: "07:00", title: "Workout", memberId: "marcus", category: "fitness" },
      { id: "e2", day: "mon", start: "08:00", end: "09:30", title: "Biology Lab", memberId: "ethan", category: "class" },
      { id: "e3", day: "mon", start: "09:00", end: "10:30", title: "Chemistry", memberId: "liam", category: "class" },
      { id: "e4", day: "mon", start: "13:00", end: "14:30", title: "Study Time", memberId: "ethan", category: "class" },
      { id: "e5", day: "mon", start: "18:00", end: "22:00", title: "Work Shift", memberId: "marcus", category: "work" },
      // Tuesday
      { id: "e6", day: "tue", start: "07:00", end: "08:30", title: "Pathophysiology", memberId: "olivia", category: "class" },
      { id: "e7", day: "tue", start: "09:00", end: "10:30", title: "Exercise Physiology", memberId: "noah", category: "class" },
      { id: "e8", day: "tue", start: "12:00", end: "13:00", title: "Lunch", category: "family" },
      { id: "e9", day: "tue", start: "13:00", end: "14:30", title: "Study Group", memberId: "olivia", category: "class" },
      { id: "e10", day: "tue", start: "19:00", end: "20:30", title: "Church", category: "church" },
      // Wednesday
      { id: "e11", day: "wed", start: "06:00", end: "07:00", title: "Workout", memberId: "marcus", category: "fitness" },
      { id: "e12", day: "wed", start: "08:00", end: "09:30", title: "Pharmacology", memberId: "olivia", category: "class" },
      { id: "e13", day: "wed", start: "09:00", end: "10:30", title: "Microbiology Lab", memberId: "marcus", category: "class" },
      { id: "e14", day: "wed", start: "13:00", end: "14:30", title: "Library Study", memberId: "olivia", category: "class" },
      { id: "e15", day: "wed", start: "17:00", end: "18:00", title: "Pick Up Groceries", category: "chores" },
      { id: "e16", day: "wed", start: "18:00", end: "22:00", title: "Work Shift", memberId: "marcus", category: "work" },
      // Thursday
      { id: "e17", day: "thu", start: "08:00", end: "09:30", title: "Clinical Skills", memberId: "olivia", category: "class" },
      { id: "e18", day: "thu", start: "09:00", end: "10:30", title: "Nutrition", memberId: "noah", category: "class" },
      { id: "e19", day: "thu", start: "12:00", end: "13:00", title: "Lunch", category: "family" },
      { id: "e20", day: "thu", start: "13:00", end: "14:30", title: "Study Time", category: "class" },
      { id: "e21", day: "thu", start: "17:00", end: "18:30", title: "Date Night", memberId: "marcus", category: "dateNight" },
      // Friday
      { id: "e22", day: "fri", start: "06:00", end: "07:00", title: "Grocery Run", category: "chores" },
      { id: "e23", day: "fri", start: "07:00", end: "08:30", title: "Pathophysiology Lab", memberId: "olivia", category: "class" },
      { id: "e24", day: "fri", start: "09:00", end: "10:30", title: "Statistics", memberId: "noah", category: "class" },
      { id: "e25", day: "fri", start: "13:00", end: "14:30", title: "Work on Project", category: "work" },
      { id: "e26", day: "fri", start: "18:00", end: "22:00", title: "Work Shift", memberId: "marcus", category: "work" },
      // Saturday
      { id: "e27", day: "sat", start: "07:00", end: "08:00", title: "Meal Prep", category: "chores" },
      { id: "e28", day: "sat", start: "10:00", end: "12:00", title: "Hike", category: "family" },
      { id: "e29", day: "sat", start: "19:00", end: "21:00", title: "Movie Night", category: "family" },
      // Sunday
      { id: "e30", day: "sun", start: "09:00", end: "10:30", title: "Church", category: "church" },
      { id: "e31", day: "sun", start: "13:00", end: "14:30", title: "Family Time", category: "family" },
      { id: "e32", day: "sun", start: "15:00", end: "16:00", title: "Plan for Week", category: "chores" },
    ],
    todos: [
      { id: "t1", memberId: "marcus", text: "Workout", done: true },
      { id: "t2", memberId: "marcus", text: "Nutrition Quiz", done: true },
      { id: "t3", memberId: "marcus", text: "Study Microbiology", done: false },
      { id: "t4", memberId: "marcus", text: "Work 6 PM – 10 PM", done: false },
      { id: "t5", memberId: "olivia", text: "Pilates", done: true },
      { id: "t6", memberId: "olivia", text: "Clinical Skills Assignment", done: false },
      { id: "t7", memberId: "olivia", text: "Call Mom", done: false },
      { id: "t8", memberId: "olivia", text: "Read for 20 min", done: false },
    ],
    meals: [
      { day: "mon", meal: "Lemon Garlic Salmon & Asparagus" },
      { day: "tue", meal: "Chicken Stir Fry & Rice" },
      { day: "wed", meal: "Tacos & Salad" },
      { day: "thu", meal: "Pasta Primavera" },
      { day: "fri", meal: "Grilled Chicken & Veggies" },
      { day: "sat", meal: "Homemade Pizza" },
      { day: "sun", meal: "Leftovers / Soup" },
    ],
    groceries: [
      { id: "g1", text: "Milk", done: false },
      { id: "g2", text: "Chicken", done: false },
      { id: "g3", text: "Eggs", done: true },
      { id: "g4", text: "Spinach", done: false },
      { id: "g5", text: "Avocados", done: false },
      { id: "g6", text: "Almond Milk", done: false },
    ],
    habits: [
      { id: "h1", name: "Water (8 glasses)" },
      { id: "h2", name: "Exercise" },
      { id: "h3", name: "Scripture" },
      { id: "h4", name: "Sleep (7+ hrs)" },
      { id: "h5", name: "No Spend" },
    ],
    habitLog: {
      h1: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
      h2: { mon: true, tue: true, wed: true, thu: true, fri: false, sat: true, sun: false },
      h3: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false },
      h4: { mon: true, tue: false, wed: true, thu: true, fri: true, sat: true, sun: false },
      h5: { mon: true, tue: true, wed: false, thu: true, fri: false, sat: false, sun: false },
    },
    goals: [
      { id: "go1", text: "Save $5,000", done: false },
      { id: "go2", text: "Travel more together", done: false },
      { id: "go3", text: "Read 12 books this year", done: false },
      { id: "go4", text: "Run a half marathon", done: false },
      { id: "go5", text: "Be more present", done: false },
    ],
    countdowns: [
      { id: "c1", label: "Summer Vacation", date: toISODate(addDays(today, 18)) },
      { id: "c2", label: "Anniversary Dinner", date: toISODate(addDays(today, 21)) },
      { id: "c3", label: "Beach Trip", date: toISODate(addDays(today, 37)) },
      { id: "c4", label: "Back to School", date: toISODate(addDays(today, 52)) },
      { id: "c5", label: "Christmas", date: toISODate(nextDecember25(today)) },
    ],
    notes: [
      { id: "n1", text: "Dentist Appt — the 20th" },
      { id: "n2", text: "Oil Change — the 24th" },
      { id: "n3", text: "Mom's Birthday — the 30th" },
      { id: "n4", text: "You've got this! 🤍" },
    ],
  };
}
