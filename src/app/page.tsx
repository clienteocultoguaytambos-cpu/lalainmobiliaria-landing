import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import TrustBadges from "@/components/TrustBadges";
import PropertiesShowcase from "@/components/PropertiesShowcase";
import MigrantSection from "@/components/MigrantSection";
import ClosingGuarantees from "@/components/ClosingGuarantees";
import LeadEvaluationForm from "@/components/LeadEvaluationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col">
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <TrustBadges />
      <PropertiesShowcase />
      <MigrantSection />
      <ClosingGuarantees />
      <LeadEvaluationForm />
      <Footer />
    </main>
  );
}

