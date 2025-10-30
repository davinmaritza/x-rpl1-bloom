import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Piket = () => {
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["piket-schedules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("piket_schedules")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const dayColors = {
    Senin: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    Selasa: "from-green-500/10 to-green-500/5 border-green-500/20",
    Rabu: "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20",
    Kamis: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    Jumat: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="text-primary" size={48} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Jadwal</span> Piket
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jadwal piket kelas X RPL 1 SMK Negeri 13 Bandung
            </p>
          </div>

          {/* Schedule Grid */}
          {isLoading ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-8 bg-muted rounded mb-4 w-32"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : schedules && schedules.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {schedules.map((schedule, index) => (
                <Card 
                  key={schedule.id}
                  className={`card-hover animate-fade-in bg-gradient-to-br border-2 ${
                    dayColors[schedule.day as keyof typeof dayColors] || "from-gray-500/10 to-gray-500/5 border-gray-500/20"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{schedule.day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {schedule.student_names && schedule.student_names.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium mb-2">Petugas Piket:</p>
                        <ul className="space-y-1">
                          {schedule.student_names.map((name, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                                {i + 1}
                              </span>
                              <span>{name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">Belum ada petugas piket</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Belum ada jadwal piket</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Piket;
