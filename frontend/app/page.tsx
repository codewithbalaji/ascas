"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/components/home/Home";
import { Chatbot } from "@/components/chatbot";

export default function Page() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
      <Chatbot />
    </>
  );
}