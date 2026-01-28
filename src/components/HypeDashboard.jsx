import React from 'react';
import { motion } from 'framer-motion';
import { useHype } from '../context/HypeContext';
import GlitchText from './visuals/GlitchText';
import HypeGauge from './visuals/HypeGauge';
import Header from './layout/Header';
import Footer from './layout/Footer';
import CitySelector from './layout/CitySelector';

export default function HypeDashboard() {
    const { loading, data } = useHype();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="flex flex-col items-center">
                    <GlitchText text="SEARCHING SATELLITES..." className="text-2xl font-mono text-cyan-500 mb-4" />
                    <div className="w-48 h-1 bg-neutral-800 overflow-hidden">
                        <motion.div
                            className="h-full bg-cyan-500"
                            animate={{ x: [-200, 200] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Fallback if data is missing for some reason
    if (!data) return null;

    const { hype } = data;

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 flex flex-col items-center justify-center selection:bg-cyan-500 selection:text-black overflow-hidden relative">
            {/* Background Noise/Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <Header />

            <CitySelector />

            <main className="w-full max-w-3xl relative z-10">
                <div className="bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">

                    <h2 className="text-lg md:text-xl text-neutral-400 font-medium mb-8 uppercase tracking-wide flex flex-col items-center gap-2">
                        <span>Details for <span className="text-white border-b border-cyan-500/30">{data.weather.location}</span></span>
                        <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-cyan-500/80 bg-black/20 px-3 py-1 rounded-full border border-neutral-700/50">
                            <span>{data.weather.temp}°F</span>
                            <span>•</span>
                            <span>{data.weather.condition.toUpperCase()}</span>
                            <span>•</span>
                            <span>WIND: {data.weather.windSpeed} MPH</span>
                        </div>
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-10">
                        {/* The Gauge */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <HypeGauge score={hype.score} />
                        </motion.div>

                        {/* The Verdict */}
                        <div className="text-left max-w-sm space-y-4">
                            <div>
                                <span className="text-xs font-mono text-cyan-500 bg-cyan-900/30 px-2 py-1 rounded">VERDICT_CODE: {hype.score > 50 ? 'CHAOS' : 'NORM'}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white uppercase italic transform -skew-x-6 leading-tight">
                                <GlitchText text={hype.label} />
                            </h3>
                        </div>
                    </div>

                    <p className="text-neutral-300 text-lg font-light leading-relaxed max-w-xl mx-auto border-t border-neutral-700 pt-6">
                        "{hype.summary}"
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
