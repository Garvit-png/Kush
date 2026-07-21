import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Quote from "./components/Quote";
import Courses from "./components/Courses";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Quote />
      <Courses />
      <Footer />
    </>
  );
}
