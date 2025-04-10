import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="pt-40 pb-20 bg-gradient-to-b from-pink-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Your neighborhood women&apos;s and fertility care expert
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              Led by Dr. Aishwarya Parthasarathy – MD, DNB, FNB, MRCOG (UK)
            </p>
            <Button
              size="lg"
              variant="default"
              className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-medium"
              onClick={() => document.getElementById('contact')?.scrollIntoView()}
            >
              Book Appointment
            </Button>
          </div>
          <div className="flex-1">
            <Image
              src="https://res.cloudinary.com/dyj3rywju/image/upload/c_fill,ar_4:3/v1744253241/435276838_2723668191174370_7022216030897694343_n_m94y2i.jpg"
              alt="Doctor"
              className="rounded-2xl shadow-xl"
              width={800}
              height={800}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}