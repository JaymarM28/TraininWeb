import { BrandLogo } from "@/presentation/components/ui/brand-logo";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950/90">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <BrandLogo compact={false} />
            <p className="mt-4 text-zinc-400 max-w-md leading-relaxed">
              Transformamos vidas a través del entrenamiento de alto rendimiento. 
              Nuestra misión es llevar tu potencial físico al siguiente nivel.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-zinc-800/50 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-zinc-800/50 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-zinc-800/50 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="/exercises" className="text-zinc-400 hover:text-red-400 transition-colors duration-200">
                  Ejercicios
                </a>
              </li>
              <li>
                <a href="/routines" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200">
                  Rutinas
                </a>
              </li>
              <li>
                <a href="#about" className="text-zinc-400 hover:text-purple-400 transition-colors duration-200">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-400 hover:text-red-400 transition-colors duration-200">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="h-4 w-4 text-red-400" />
                <span>info@jsc.com</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>Ciudad, País</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} JSC Entrenamiento Diferencial. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-400 transition-colors duration-200">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors duration-200">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


