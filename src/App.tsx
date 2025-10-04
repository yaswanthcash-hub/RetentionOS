import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <SocialProof />
      <HowItWorks />
      <CaseStudies />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
