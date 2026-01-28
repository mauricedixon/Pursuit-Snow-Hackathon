import React from 'react';
import GlitchText from '../visuals/GlitchText';

export default function Header() {
    return (
        <header className="w-full mb-12 flex flex-col items-center justify-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
                <GlitchText text="Will It Snow?" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600" />
            </h1>
            <p className="text-neutral-500 font-mono text-sm tracking-widest">HYPE METER v1.0</p>
        </header>
    );
}
