import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p>© 2025 Accumed Speciality Clinic and Scans</p>
            <p className="text-sm text-muted-foreground">All Rights Reserved</p>
          </div>
          <div className="flex items-center gap-8">
            <a href="#home" className="text-sm text-muted-foreground hover:text-primary">Home</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-primary">Services</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}