import Header from './components/Header';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import AcquisitionTrap from './components/AcquisitionTrap';
import Features from './components/Features';
import Comparison from './components/Comparison';
import ProcessOverview from './components/ProcessOverview';
import HowItWorks from './components/HowItWorks';
import TrustedBrands from './components/TrustedBrands';
import CaseStudiesScroll from './components/CaseStudiesScroll';
import ResultsAchieved from './components/ResultsAchieved';
import ROICalculator from './components/ROICalculator';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FounderInsight from './components/FounderInsight';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LogoCarousel />
      <TrustedBrands />
      <FounderInsight
        quote="Understand your customer — stay close to them; that's the best thing you can do."
        founderName="Varun Alagh, Co-founder & CEO at"
        company="Mamaearth"
      />
      <AcquisitionTrap />
      <Features />
      <FounderInsight
        quote="Focus on building repeat buyers — that's what turns a D2C brand into a lasting business."
        founderName="Arjun Vaidya, Founder at"
        company="Dr. Vaidya's"
      />
      <Comparison />
      <ProcessOverview />
      <HowItWorks />
      <FounderInsight
        quote="We doubled down on loyalty programmes to drive repeat purchases — retention matters for long-term growth."
        founderName="Vipul Gupta, Founder at"
        company="Re'equil"
      />
      <CaseStudiesScroll />
      <FounderInsight
        quote="We grew 150% while achieving ~40% repeat customers — retention scaled the business."
        founderName="Dheeraj Bansal, Co-founder at"
        company="Recode Studios"
      />
      <ResultsAchieved />
      <ROICalculator />
      <FounderInsight
        quote="66% of our fashion GMV is coming from repeat customers."
        founderName="Falguni Nayar, Founder & CEO at"
        company="Nykaa"
      />
      <FAQ />
      <FounderInsight
        quote="Customer loyalty is earned through clarity, curation and consistent experience — not just ads."
        founderName="Manasa, Co-founder at"
        company="Kindlife"
      />
      <FinalCTA />
      <FounderInsight
        quote="Repeat customers are earned through trust — you must build product and experience that keeps them coming back."
        founderName="Shantanu Deshpande, Founder & CEO at"
        company="Bombay Shaving Company"
      />
      <Footer />
    </div>
  );
}

export default App;
