import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import OmanCoverage from "./_components/OmanCoverage";
import PopularIndustries from "./_components/PopularIndustries";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularIndustries />
      <HowItWorks />
      <OmanCoverage />
    </div>
  );
}
