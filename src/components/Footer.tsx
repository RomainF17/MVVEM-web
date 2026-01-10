import { Leaf } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl">Ma Ville Verte et Moi</span>
          </div>
          <div className="flex gap-8 text-sm opacity-80">
            <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-sm opacity-50">
            © 2024 Ma Ville Verte et Moi. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};
