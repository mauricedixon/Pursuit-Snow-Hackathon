/**
 * AI Service
 * 
 * Simulates calling an LLM to generate a hype summary.
 */

const PROMPTS = [
    "Take this boring forecast and make it sound like an ESPN announcer shouting about the apocalypse.",
    "Describe the snow potential like a hype-beast sneaker drop.",
    "Explain the weather using only Gen-Z slang."
];

function getContext(weather) {
    return `Current weather in ${weather.location}: ${weather.condition}, ${weather.temp}°F.`;
}

export async function generateHypeSummary(weatherData, score) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real app, we would call OpenAI/Anthropic here.
    // For now, we return a mock response based on the score.

    const currentYear = new Date().getFullYear();
    const context = getContext(weatherData);

    if (score > 80) {
        return `LISTEN UP ${weatherData.location.toUpperCase()}! ${context} MOTHER NATURE IS ABOUT TO DROP THE HARDEST MIXTAPE OF ${currentYear}! WE ARE TALKING WHITE OUT CONDITIONS! SCHOOL? CANCELLED! WORK? FORGET IT!`;
    } else if (score > 50) {
        return `We have some solid activity on the radar for ${weatherData.location}. ${context} It's not a category 5 event, but the vibes are definitely accumulating. Keep your chargers ready.`;
    } else {
        return `SAD TROMBONE NOISES. The data for ${weatherData.location} is giving... nothing. ${context} It's just rain or cold. Go do your homework. The sky has disappointed us all.`;
    }
}
