import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <h2 className="font-display text-3xl md:text-3xl font-semibold">
                Tentang <span className="gradient-text">X RPL 1</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Class X RPL 1 is a class consisting of talented students in the field of Software Engineering. We are committed to continuous learning, development, and creation of innovative works in the world of technology.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 card-hover">
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">36</h3>
                  <p className="text-muted-foreground">Siswa Berbakat</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 card-hover">
                  <h3 className="font-display text-2xl font-bold text-secondary mb-2">100+</h3>
                  <p className="text-muted-foreground">Project Selesai</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 card-hover">
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">5</h3>
                  <p className="text-muted-foreground">Hari Piket</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Preview Section */}
        <section id="gallery" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                <span className="gradient-text">Galeri</span> Kelas
              </h2>
              <p className="text-lg text-muted-foreground">
                Dokumentasi kegiatan dan momen berharga kelas X RPL 1
              </p>
            </div>
            <div className="text-center">
              <a href="/galeri" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-glow transition-all duration-300 hover:scale-105">
                Lihat Semua Foto
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Index;