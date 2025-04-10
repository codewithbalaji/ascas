'use client'

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Dr. Aishwarya is a friendly and confident doctor who made me feel calm during a stressful time. She explained every step clearly, and I felt completely supported throughout my treatment.",
      author: "Sarah M."
    },
    {
      quote: "I came to Dr. Aishwarya after struggling with PCOS for years. Her personalized approach and attention to detail made all the difference. She truly listens and creates treatment plans tailored to your individual needs.",
      author: "Priya R."
    },
    {
      quote: "The fertility journey can be emotionally draining, but Dr. Aishwarya's compassion and expertise helped us through every step. We're now expecting our first child thanks to her care.",
      author: "Maya and Raj K."
    },
    {
      quote: "As someone who was terrified of gynecological exams, I can't express how much Dr. Aishwarya's gentle approach meant to me. She takes the time to explain everything and ensure you're comfortable.",
      author: "Lakshmi T."
    }
  ];

  // Create autoplay plugin instance
  const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });
  
  // Initialize carousel with autoplay
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (api) {
      // Make sure autoplay is working
      api.on('select', () => {
        // Resets the timer when slide changes
        autoplayPlugin.reset();
      });
    }
  }, [api, autoplayPlugin]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-pink-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Real Patients, Real Stories</h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Carousel
            className="w-full max-w-3xl mx-auto"
            setApi={setApi}
            opts={{
              loop: true,
              align: "center"
            }}
            plugins={[autoplayPlugin]}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-pink-500 text-3xl font-serif mb-2">"</div>
                    <p className="text-base md:text-lg italic">
                      {testimonial.quote}
                    </p>
                    <div className="text-pink-500 text-3xl font-serif text-right mt-2">"</div>
                    <p className="mt-4 font-semibold text-right">- {testimonial.author}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}