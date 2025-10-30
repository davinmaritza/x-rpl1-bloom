import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, LogOut } from "lucide-react";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkDeveloperRole();
  }, []);

  const checkDeveloperRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "developer")
        .single();

      if (!roles) {
        toast({
          title: "Akses ditolak",
          description: "Anda tidak memiliki akses ke halaman admin",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsDeveloper(true);
    } catch (error) {
      console.error("Error checking role:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Logout berhasil",
      description: "Sampai jumpa!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isDeveloper) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Settings className="text-primary" size={32} />
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  <span className="gradient-text">Admin</span> Panel
                </h1>
              </div>
              <p className="text-muted-foreground">Kelola konten website X RPL 1</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>

          {/* Admin Content */}
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="students">Siswa</TabsTrigger>
              <TabsTrigger value="piket">Piket</TabsTrigger>
              <TabsTrigger value="gallery">Galeri</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-display text-xl font-semibold mb-2">Edit Konten Home</h3>
                <p className="text-muted-foreground">
                  Fitur untuk mengedit konten halaman home akan ditambahkan di sini
                </p>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-display text-xl font-semibold mb-2">Kelola Data Siswa</h3>
                <p className="text-muted-foreground">
                  Fitur CRUD data siswa akan ditambahkan di sini
                </p>
              </div>
            </TabsContent>

            <TabsContent value="piket" className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-display text-xl font-semibold mb-2">Kelola Jadwal Piket</h3>
                <p className="text-muted-foreground">
                  Fitur CRUD jadwal piket akan ditambahkan di sini
                </p>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-display text-xl font-semibold mb-2">Kelola Galeri</h3>
                <p className="text-muted-foreground">
                  Fitur upload dan delete foto galeri akan ditambahkan di sini
                </p>
              </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-display text-xl font-semibold mb-2">Kelola User Roles</h3>
                <p className="text-muted-foreground">
                  Fitur untuk mengubah role user akan ditambahkan di sini
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
