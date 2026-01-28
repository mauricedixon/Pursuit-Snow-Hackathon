# Snow Hype Meter - Presentation Script (2-3 minutes)

---

**[SLIDE 1 - OPEN]**

"Every winter, the same thing happens. There's a chance of snow, and suddenly everyone loses their minds. Schools panic. Parents panic. The grocery store runs out of bread and milk.

We built **Snow Hype Meter** - an app that answers the one question everyone's really asking: *Should I actually be hyped about this snow?*"

**[DEMO - Show the app]**

"Here's how it works. Pick your city - Boston, NYC, Chicago, wherever. The app pulls real-time weather data and runs it through our **Hype Engine**.

The Hype Engine looks at the actual conditions - is it snowing? How heavy? What's the temperature? - and gives you a score from 0 to 100.

But we don't just give you a number. We give you a *verdict*."

**[Point to the label]**

"See this? 'SCHOOL CLOSING IMMINENT' - that means something. 'GROCERY RUN' means maybe grab some supplies. 'TOTAL DUD' means go back to bed, nothing's happening.

And down here, we've got an AI-generated hype summary that describes the situation like a sports announcer calling the apocalypse."

**[CLICK through a few cities]**

"Works for multiple cities. Real data. Real-time updates."

**[SLIDE - TECH]**

"Under the hood: React with Vite, Tailwind for styling, Framer Motion for the animations, and Open-Meteo's free weather API. The hype calculation is pure JavaScript - no AI needed for the core logic, though we've mocked an AI summary generator that could plug into Claude or GPT.

Total build time: one hackathon."

**[CLOSE]**

"Snow Hype Meter. Because you deserve to know if the panic is real.

Questions?"

---

## Code Review Notes

### What's Good

1. **Architecture** - Smart use of React Context for state management. The `HypeProvider` cleanly separates data fetching from UI.

2. **weatherService.js** - Clean API integration with Open-Meteo. Good WMO code mapping. Fallback on error is sensible.

3. **hypeEngine.js** - Simple scoring logic that's easy to understand and tweak. The labels are fun ("ABSOLUTE CHAOS", "GROCERY RUN").

4. **Visuals** - The `GlitchText` chromatic aberration effect and `HypeGauge` SVG animation are slick for a hackathon.

5. **CitySelector** - Nice use of `layoutId` for the animated pill transition between cities.

### Future Improvements (If Continuing Development)

1. **aiService.js** - Currently mocked. The `PROMPTS` array is defined but unused. Could hook up to a real LLM.

2. **Error display** - `HypeContext` sets `error` but `HypeDashboard` doesn't display it to users.

3. **precipProb** - Fetched from API but not used in hype calculation. Could boost score when precipitation probability is high.

4. **City search** - Currently hardcoded cities. Could add a search/autocomplete.
