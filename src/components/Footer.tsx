import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Class Info */}
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-lg">X RPL 1</h3>
            <p className="text-sm text-muted-foreground">SMK Negeri 13 Bandung</p>
          </div>

          {/* Social Media */}
          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com/lumiereone_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">@lumiereone_</span>
            </a>
          </div>

          {/* Developer Credit */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Developed by{" "}
              <a
                href="https://instagram.com/davinmaritza"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                @davinmaritza
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} X RPL 1 - SMK Negeri 13 Bandung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
