
import Hero from './components/Hero';
import ApartmentList from './components/ApartmentList';
import Footer from './components/Footer';
import About from './components/About';





function Home() {
  return (
    <div className="w-full">
      
      <Hero />   

      <div className="mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-10">
  Featured Apartments
</h2>
        <ApartmentList limit={6} />
      </div>

      {/* Clean Divider */}
      <div className="w-full h-px bg-gray-300 my-16"></div>

      <About />

     

      <Footer />
    </div>
  );
}

export default Home;