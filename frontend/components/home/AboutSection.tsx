import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1">
            <Image
              src="https://res.cloudinary.com/dyj3rywju/image/upload/v1744252697/aish2_f7zklv.jpg"
              alt="Dr. Aishwarya"
              className="rounded-2xl shadow-xl"
              width={400}
              height={400}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold">Meet Dr. Aishwarya Parthasarathy</h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
              Dr. Aishwarya is a Gynecologist and fertility specialist based in Chennai. She completed postgraduation from AIIMS, New Delhi, senior residency at JIPMER, Pondicherry, and FNB in reproductive medicine. She also holds MRCOG from the UK. With years of experience and international publications, she is passionate about fertility, laparoscopy, ultrasound, and high-risk pregnancies. She regularly educates her audience on Instagram and YouTube and believes in empathy and making care accessible for all women.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}