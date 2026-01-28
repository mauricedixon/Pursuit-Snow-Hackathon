import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherData, CITIES } from '../lib/weatherService';
import { calculateHypeScore } from '../lib/hypeEngine';
import { generateHypeSummary } from '../lib/aiService';

const HypeContext = createContext();

export function HypeProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeCity, setActiveCity] = useState(CITIES[0]); // Default to first city

    // Fetch data whenever activeCity changes
    useEffect(() => {
        refreshHype();
    }, [activeCity]);

    const refreshHype = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Get raw weather data using active city coords
            const rawWeather = await fetchWeatherData(activeCity.lat, activeCity.lon);

            const weather = {
                ...rawWeather,
                location: activeCity.name
            };

            // 2. Pass to Hype Engine
            const hypeResult = calculateHypeScore(weather);

            // 3. Get AI Summary (Mock)
            const aiSummary = await generateHypeSummary(weather, hypeResult.score);

            // 4. Update state
            setData({
                weather,
                hype: {
                    ...hypeResult,
                    summary: aiSummary
                }
            });
        } catch (err) {
            setError("Failed to calculate hype. The storm was too powerful.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HypeContext.Provider value={{
            loading,
            data,
            error,
            refreshHype,
            activeCity,
            setActiveCity,
            cities: CITIES
        }}>
            {children}
        </HypeContext.Provider>
    );
}

export function useHype() {
    return useContext(HypeContext);
}
