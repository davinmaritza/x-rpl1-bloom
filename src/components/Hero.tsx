import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDown } from "lucide-react";
import classPhoto from "@/assets/class-photo.jpg";

const Hero = () => {
  const { data: homeContent } = useQuery({
    queryKey: ["home-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page_name", "home")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const content = homeContent?.content as { title?: string; subtitle?: string } | null;
  const title = content?.title || "Welcome to X RPL 1 SMK Negeri 13 Bandung";
  const subtitle = content?.subtitle || "The Best Class in SMK Negeri 13 Bandung";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={classPhoto} 
          alt="Class X RPL 1" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Animated accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="gradient-text">{title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#about"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              About Us
            </a>
            <a
              href="#gallery"
              className="group px-8 py-4 bg-muted/50 backdrop-blur-sm border-2 border-foreground/20 text-foreground rounded-full font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105"
            >
              View Gallery
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-muted-foreground" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
