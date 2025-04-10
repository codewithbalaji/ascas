import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function ServicesSection() {
  const services = [
    {
      title: "Women's Health",
      description: "Comprehensive gynecology services including contraception, PCOS management, menstrual disorders, and menopausal care.",
      image: "https://res.cloudinary.com/dyj3rywju/image/upload/v1744255271/2024-03-13_kelcqh.jpg"
    },
    {
      title: "Fertility & Reproductive Medicine",
      description: "Advanced treatments including IUI, fertility scans, ovulation tracking, and counseling.",
      image: "https://res.cloudinary.com/dyj3rywju/image/upload/v1744255271/2024-11-04_bxktjp.jpg"
    },
    {
      title: "Ultrasound & Laparoscopy",
      description: "High-quality diagnostic scans and minimally invasive procedures for women's health and fertility.",
      image: "https://res.cloudinary.com/dyj3rywju/image/upload/v1744255271/2024-02-28_io6oct.jpg"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-pink-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Services We Offer</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-4 text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}