import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                About <span className="gradient-text">X RPL 1</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Class X RPL 1 is a class consisting of talented students in the field of Software Engineering. We are committed to continuous learning, development, and creation of innovative works in the world of technology.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 card-hover border border-primary/20">
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">40</h3>
                  <p className="text-muted-foreground">Talented Students</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 card-hover border border-secondary/20">
                  <h3 className="font-display text-2xl font-bold text-secondary mb-2">12+</h3>
                  <p className="text-muted-foreground">Completed Projects</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 card-hover border border-accent/20">
                  <h3 className="font-display text-2xl font-bold text-accent mb-2">5</h3>
                  <p className="text-muted-foreground">Cleaning Days</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Preview Section */}
        <section id="gallery" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Class <span className="gradient-text">Gallery</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Documentation of activities and precious moments of X RPL 1
              </p>
            </div>
            <div className="text-center">
              <a href="/galeri" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-glow transition-all duration-300 hover:scale-105">
                View All Photos
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Index;