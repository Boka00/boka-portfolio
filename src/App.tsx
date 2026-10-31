import React from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Journey } from './components/sections/Journey';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { AuroraBackground } from './components/ui/AuroraBackground';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { TelemetryProgressBar } from './components/ui/TelemetryProgressBar';
import { ThemeProvider } from './context/ThemeContext';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-clip">
        {/* Accessible Skip-to-Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-violet-600 focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Scroll Telemetry Rail + Desktop Section Readout */}
        <TelemetryProgressBar />

        {/* Ambient Visual Layers */}
        <AuroraBackground />
        <CursorSpotlight />

        {/* Sticky Glassmorphism Navigation */}
        <Navbar />

        {/* Primary Landmark */}
        <main id="main-content" className="relative z-20">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
