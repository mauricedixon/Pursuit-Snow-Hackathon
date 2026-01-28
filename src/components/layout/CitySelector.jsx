import React from 'react';
import { motion } from 'framer-motion';
import { useHype } from '../../context/HypeContext';

export default function CitySelector() {
    const { cities, activeCity, setActiveCity } = useHype();

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-20">
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
    );
}
