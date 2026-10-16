import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import PropertiesShowcase from "@/components/PropertiesShowcase";
import MigrantSection from "@/components/MigrantSection";
import LeadEvaluationForm from "@/components/LeadEvaluationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col">
      <Navbar />
      <Hero />
      <TrustBadges />
      <PropertiesShowcase />
      <MigrantSection />
      <LeadEvaluationForm />
      <Footer />
    </main>
  );
}
