import Header from './components/Header';
import Hero from './components/Hero';
import AcquisitionTrap from './components/AcquisitionTrap';
import Features from './components/Features';
import Comparison from './components/Comparison';
import SocialProof from './components/SocialProof';
import ProcessOverview from './components/ProcessOverview';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import ResultsAchieved from './components/ResultsAchieved';
import ROICalculator from './components/ROICalculator';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AcquisitionTrap />
      <Features />
      <Comparison />
      <SocialProof />
      <ProcessOverview />
      <HowItWorks />
      <CaseStudies />
      <ResultsAchieved />
      <ROICalculator />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
