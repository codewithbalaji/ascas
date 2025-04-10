"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormData {
  name: string;
  phone: string;
  date: string;
  message: string;
}

export function ContactSection() {
  const { register, handleSubmit } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Book Your Consultation</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <p>No.24 Chowdhary Nagar Main Road, Valasaravakkam, Chennai - 87</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p>+91 9342521779</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p>contact@ascasclinic.com</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input {...register("name")} placeholder="Your Name" />
              <Input {...register("phone")} placeholder="Phone Number" />
              <Input {...register("date")} type="date" />
              <Textarea {...register("message")} placeholder="Your Message" />
              <Button type="submit" className=" w-full bg-pink-600 hover:bg-pink-700 text-white font-medium">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}