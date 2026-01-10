import { Leaf } from 'lucide-react';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-secondary/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl text-secondary tracking-tight">Ma Ville Verte</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-secondary/80">
            <a href="#mission" className="hover:text-primary transition-colors">Notre Mission</a>
            <a href="#features" className="hover:text-primary transition-colors">Fonctionnalités</a>
            <a href="#team" className="hover:text-primary transition-colors">L'Équipe</a>
          </div>
          <button className="bg-secondary text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20">
            Télécharger
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <Mission />
        <Stats />
        <Features />
        <Team />
      </main>

      <Footer />
    </div>
  )
}

export default App
