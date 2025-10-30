import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

const Struktur = () => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("absen_number", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-primary" size={48} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Struktur</span> Kelas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Daftar siswa kelas X RPL 1 SMK Negeri 13 Bandung
            </p>
          </div>

          {/* Students Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-muted rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : profiles && profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile, index) => (
                <Card 
                  key={profile.id} 
                  className="card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="w-24 h-24 ring-4 ring-primary/10">
                        <AvatarImage src={profile.photo_url || undefined} alt={profile.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2 w-full">
                        <h3 className="font-display font-semibold text-lg">{profile.name}</h3>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {profile.absen_number && (
                            <p className="flex justify-between">
                              <span className="font-medium">No. Absen:</span>
                              <span>{profile.absen_number}</span>
                            </p>
                          )}
                          {profile.nisn && (
                            <p className="flex justify-between">
                              <span className="font-medium">NISN:</span>
                              <span>{profile.nisn}</span>
                            </p>
                          )}
                          {profile.nis && (
                            <p className="flex justify-between">
                              <span className="font-medium">NIS:</span>
                              <span>{profile.nis}</span>
                            </p>
                          )}
                        </div>

                        {profile.portfolio && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {profile.portfolio}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Belum ada data siswa</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Struktur;
