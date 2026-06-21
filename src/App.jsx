import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import FutureVision from "./components/FutureVision";
import RegistrationForms from "./components/RegistrationForms";
import Founder from "./components/Founder";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AdminLeads from "./components/AdminLeads";

function App() {
  const [activeFormTab, setActiveFormTab] = useState("tutor");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Trigger tab selection and scroll to the forms section
  const handleSelectForm = (tabType) => {
    setActiveFormTab(tabType);
    const element = document.getElementById("registration-forms");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="font-sans antialiased text-secondary bg-white selection:bg-primary/20 selection:text-primary">
      {/* Site Header */}
      <Header />

      {/* Hero Section */}
      <Hero onSelectForm={handleSelectForm} />

      {/* Main Sections */}
      <main>
        {/* Problem Section */}
        <Problem />

        {/* Solution Section */}
        <Solution />

        {/* How It Works Timeline */}
        <HowItWorks />


        {/* Future Vision Section */}
        <FutureVision />

        {/* Tutor Waitlist & Student Requirement Forms */}
        <RegistrationForms activeTab={activeFormTab} setActiveTab={setActiveFormTab} />

        {/* About Founder */}
        <Founder />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer Section */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Secret Waitlist Admin Overlay */}
      <AdminLeads isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
