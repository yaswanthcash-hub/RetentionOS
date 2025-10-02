import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookAudit={openModal} />
      <Hero onBookAudit={openModal} />
      <Features />
      <SocialProof />
      <HowItWorks />
      <CaseStudies />
      <Pricing onBookAudit={openModal} />
      <FAQ />
      <FinalCTA onBookAudit={openModal} />
      <Footer />
      <AuditModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
