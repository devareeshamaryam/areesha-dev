import AboutMe from "@/components/Aboutme";
import BlogsSection from "@/components/Blogssection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Herosection";
import ProjectsSection from "@/components/Projectssection";
import TechStack from "@/components/Techstack";
import Image from "next/image";

export default function Home() {
  return (
 <>
 <HeroSection />
 <ProjectsSection />
 <TechStack />
 <BlogsSection />
 <AboutMe />
 <Footer />
 </>  );
}
