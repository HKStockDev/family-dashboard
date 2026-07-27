# The Anderson Family — Home Dashboard

A warm, botanical/Scandinavian family command-center dashboard built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Designed to run full-screen on a TV (via an iPad, Chromecast, Fire Stick browser, or any smart display) as a shared family calendar, task board, meal planner, habit tracker, and more.

Live sample data ("The Anderson Family", Marcus & Olivia + kids) is included so the dashboard works out of the box — swap in your own family's info in minutes (see [Customizing](#customizing-the-dashboard) below).

## Features

- **Large weekly calendar** (top priority) — color-coded work shifts, classes, church, appointments, trips, date nights, and family events, laid out hour-by-hour Monday–Sunday with a live "now" indicator.
- **Separate daily to-do lists** for two primary family members (defaults: Marcus & Olivia), with tap-to-check boxes.
- **Weekly meal plan** and **grocery list** (checkable).
- **Habit tracker** with a 7-day grid (water, exercise, scripture, sleep, no-spend, or anything you like).
- **Goals** list with progress checkboxes.
- **Countdown** to the next big trip/event, plus a short list of what's coming up after that.
- **Notes & reminders** card for the little things (appointments, birthdays, encouragement).
- **Live clock**, **live weather** (via [Open-Meteo](https://open-meteo.com/), no API key required), and a rotating **scripture/quote** card.
- **Bottom navigation** with focused full-screen views for Tasks, Meals, Habits, Finances, Lists, Photos, and a live **Settings** panel.
- **In-app Settings tab** to rename the family, tagline, quote, location/units, and each family member's name + color — no code required. Changes are saved to the browser's local storage.
- Fully responsive: fills a 1080p/4K TV perfectly, and reflows to a scrollable layout on iPad/tablet/phone.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev/) icons
- No backend required for the demo — data lives in `lib/defaultData.ts` and is persisted to `localStorage` as you check things off or edit Settings.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For the full "TV" experience, open it full-screen (or use your TV/iPad browser's full-screen / "Add to Home Screen" mode) at 1920×1080 or larger.

### Production build

```bash
npm run build
npm run start
```

## Deploying

### Vercel (recommended)

```bash
npm install -g vercel   # if you don't already have it
vercel                  # first-time deploy, follow the prompts
vercel --prod           # promote to production
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deploys on every push — no configuration needed, Vercel auto-detects Next.js.

### Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build command: `npm run build` — Netlify's Next.js Runtime plugin handles the rest automatically.

## Customizing the Dashboard

Everything shown on the dashboard is **sample data** meant to be replaced with your family's real info. There are two ways to customize it:

### 1. Quick edits from the TV/browser itself (no code)

Open the **Settings** tab (bottom nav) to change:
- Family name & tagline
- Scripture / quote of the day
- Location (for live weather) & temperature units
- Each family member's name and accent color

These are saved to the browser's local storage, so they'll stick around on that device/browser.

### 2. Editing the source data (recommended for anything permanent)

Open `lib/defaultData.ts`. This single file defines everything on the dashboard:

| Section | What to edit |
|---|---|
| Family name, tagline, quote, location | `settings` |
| Who's in the family + their color | `members` (the **first two** members power the Tasks / Today's Focus columns) |
| Calendar events | `events` — each has a `day` (`mon`…`sun`), `start`/`end` (24h `"HH:MM"`), `title`, optional `memberId`, and a `category` (controls the color — see `lib/categories.ts`) |
| To-do items | `todos` — tied to a `memberId` |
| Weekly meals | `meals` |
| Grocery list | `groceries` |
| Habits + the 7-day tracker grid | `habits` / `habitLog` |
| Goals | `goals` |
| Countdowns | `countdowns` — plain `YYYY-MM-DD` dates; "days left" is computed automatically |
| Notes & reminders | `notes` |

Event categories and their colors live in `lib/categories.ts` — add a new category or restyle an existing one there.

## Connecting Live Data (Google Sheets / Google Calendar)

The dashboard is intentionally architected so the UI never needs to change to plug in a real data source — everything reads from one `DashboardData` object (see `lib/types.ts`), currently supplied by `lib/defaultData.ts` via `lib/store.tsx`.

To make it update automatically from your phone, the most common no-code-backend approach:

1. **Create a Google Sheet** with tabs like `Events`, `Todos`, `Meals`, `Groceries`, `Habits`, `Goals`, `Countdowns`, `Notes` (columns matching the fields in `lib/types.ts`).
2. **Publish it via Google Apps Script** as a small `doGet` web app that returns JSON (a couple dozen lines of Apps Script — this is the same pattern used by most "Google Sheets dashboard" tutorials). It should return an object shaped like `DashboardData`.
3. In this project, replace the initial data load in `lib/store.tsx` (`useState(() => getDefaultData())` / the localStorage-hydration `useEffect`) with a `fetch()` to your Apps Script web app URL, and map the response into the same shape.
4. Optionally add a `setInterval`/`revalidate` refresh (e.g., every 5 minutes) so edits made from a phone show up on the TV automatically.

Because every component consumes data purely through the `useDashboard()` hook, none of the UI needs to change — only the loading logic inside `lib/store.tsx`.

**Google Calendar** can be brought in the same way: use the [Google Calendar API](https://developers.google.com/calendar/api) (or a service like Zapier/Make to mirror events into your Sheet) and merge those events into the `events` array with a `category` you choose.

## Project Structure

```
app/
  layout.tsx        Root layout, fonts, metadata, DashboardProvider
  page.tsx           Top-level tab switcher (Calendar / Tasks / Meals / ...)
  globals.css         Design tokens (cream/sage/brown palette), fonts
components/           All UI: WeeklyCalendar, cards, nav, settings, etc.
lib/
  types.ts            Shared TypeScript types — the "schema" for all dashboard data
  defaultData.ts       Sample family data — replace this or wire up a live source
  categories.ts        Calendar event category → color mapping
  store.tsx            React context: state, persistence, toggle/update actions
  useWeather.ts         Live weather via Open-Meteo
  dateUtils.ts          Date/time helpers
```

## Notes

- The provided family ("The Anderson Family", Marcus, Olivia, Ethan, Liam, Noah) is a **placeholder** — rename everyone from the Settings tab or `lib/defaultData.ts`.
- Weather uses [Open-Meteo](https://open-meteo.com/), which is free and requires no API key or sign-up.
- Task/habit/grocery/goal checkmarks persist per-browser via `localStorage`. For true multi-device sync (e.g., checking something off on a phone and seeing it update on the TV), connect a live backend as described above.
