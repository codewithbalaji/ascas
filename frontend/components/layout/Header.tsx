"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Heart className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">ASCAS</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">Accumed Speciality Clinic and Scans</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <h2 className="font-semibold">Dr. Aishwarya Parthasarathy</h2>
          <p className="text-sm text-muted-foreground">MD(OG), DNB(OG), FNB(RM), MRCOG(UK)</p>
          <p className="text-sm mt-1">+91 9342521779</p>
        </div>
        <button 
          className="sm:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="border-t hidden sm:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 py-4">
            {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="nav-link">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-t"
          >
            <div className="px-4 py-2">
              <div className="py-4 border-b">
                <h2 className="font-semibold">Dr. Aishwarya Parthasarathy</h2>
                <p className="text-sm text-muted-foreground">MD(OG), DNB(OG), FNB(RM), MRCOG(UK)</p>
                <p className="text-sm mt-1">+91 9342521779</p>
              </div>
              <ul className="py-4 space-y-4">
                {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}