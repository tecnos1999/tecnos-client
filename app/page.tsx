import AboutUsContainer from "@/components/AboutUsContainer";
import Advertisment from "@/components/Advertisment";
import Banners from "@/components/Banners";
import EventsContainer from "@/components/EventsContainer";
import HeroSection from "@/components/HeroSection";
import LogoContainer from "@/components/LogoContainer";
import TestimonialContainer from "@/components/TerstimonialContainer";
import WebinarContainer from "@/components/WebinarContainer";

export default function Home() {
  return (
    <main className=" mt-[104px]  md:mt-[188px]">
      <Advertisment />
      <HeroSection />
      <Banners />
      <AboutUsContainer />
      <EventsContainer />
      <WebinarContainer />
      <TestimonialContainer />
      <LogoContainer />
    </main>
  );
}
