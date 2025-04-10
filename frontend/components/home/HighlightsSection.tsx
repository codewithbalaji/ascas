"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HighlightsSection() {
  const [counts, setCounts] = useState({
    consultations: 0,
    appointments: 0,
    scans: 0,
    fertility: 0,
    experience: 0
  });

  const targetCounts = {
    consultations: 1200,
    appointments: 7500,
    scans: 1000,
    fertility: 1700,
    experience: 18
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const incrementCounts = (step: number) => {
      setCounts({
        consultations: Math.min(Math.floor((targetCounts.consultations * step) / steps), targetCounts.consultations),
        appointments: Math.min(Math.floor((targetCounts.appointments * step) / steps), targetCounts.appointments),
        scans: Math.min(Math.floor((targetCounts.scans * step) / steps), targetCounts.scans),
        fertility: Math.min(Math.floor((targetCounts.fertility * step) / steps), targetCounts.fertility),
        experience: Math.min(Math.floor((targetCounts.experience * step) / steps), targetCounts.experience)
      });
    };

    let currentStep = 0;
    const counter = setInterval(() => {
      currentStep++;
      incrementCounts(currentStep);
      if (currentStep >= steps) clearInterval(counter);
    }, interval);

    return () => clearInterval(counter);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Why Choose ASCAS?</h2>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-primary">{counts.consultations}+</div>
            <div className="mt-2 text-sm text-muted-foreground">Online Consultations</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-primary">{counts.appointments}+</div>
            <div className="mt-2 text-sm text-muted-foreground">Direct Appointments</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-primary">{counts.scans}+</div>
            <div className="mt-2 text-sm text-muted-foreground">Laparoscopy/Fertility Scans</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-primary">{counts.fertility}+</div>
            <div className="mt-2 text-sm text-muted-foreground">Fertility Consultations</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-primary">{counts.experience}+</div>
            <div className="mt-2 text-sm text-muted-foreground">Years of Experience</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}