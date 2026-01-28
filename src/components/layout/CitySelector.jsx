import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHype } from '../../context/HypeContext';
import { fetchCoordinatesByZip } from '../../lib/weatherService';

export default function CitySelector() {
    const { cities, activeCity, setActiveCity } = useHype();
    const [zip, setZip] = useState("");
    const [loadingZip, setLoadingZip] = useState(false);

    const handleZipSearch = async (e) => {
        e.preventDefault();
        if (!zip || zip.length < 5) return;

        setLoadingZip(true);
        const location = await fetchCoordinatesByZip(zip);
        setLoadingZip(false);

        if (location) {
            setActiveCity(location);
            setZip(""); // Clear input on success
        } else {
            alert("Invalid Zip Code or Data Not Found!");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 mb-8 relative z-20 w-full max-w-2xl px-4">
            {/* Standard Cities */}
            <div className="flex flex-wrap justify-center gap-2">
                {cities.map((city) => {
                    const isActive = activeCity.name === city.name;
                    return (
                        <button
                            key={city.name}
                            onClick={() => setActiveCity(city)}
                            className={`
                  relative px-4 py-2 rounded-full text-xs md:text-sm font-mono tracking-wider transition-colors border
                  ${isActive
                                    ? 'text-black border-cyan-400 font-bold'
                                    : 'text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-white bg-neutral-800/50'
                                }
                `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-0 bg-cyan-400 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            )}
                            <span className="relative z-10">{city.name.split(',')[0]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Zipcode Search */}
            <form onSubmit={handleZipSearch} className="flex items-center gap-2 bg-neutral-900/50 p-1 rounded-full border border-neutral-700 focus-within:border-cyan-500/50 transition-colors">
                <input
                    type="text"
                    placeholder="ENTER ZIP..."
                    className="bg-transparent text-white font-mono text-sm px-3 py-1 outline-none w-28 placeholder:text-neutral-600"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    maxLength={5}
                />
                <button
                    type="submit"
                    disabled={loadingZip}
                    className="bg-neutral-800 hover:bg-neutral-700 text-cyan-500 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider disabled:opacity-50 transition-colors"
                >
                    {loadingZip ? "..." : "GO"}
                </button>
            </form>
        </div>
    );
}
