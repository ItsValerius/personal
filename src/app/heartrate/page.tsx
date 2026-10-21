"use client";
import Heartbeat from "@/components/heartrate";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function Heartrate() {
  return (
    <div className="min-h-screen bg-[url('/pencil-dots-colored.svg')] dark:bg-[url('/pencil-dots-colored-dark.svg')] bg-repeat bg-[length:60px_60px] bg-fixed">
      <Header />
      <main className="container py-10 mx-auto px-2">
        <Heartbeat />
      </main>
      <Footer />
    </div>
  );
}
