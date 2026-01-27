import { Hero } from '../Hero';
import { Mission } from '../Mission';
import { Stats } from '../Stats';
import { Features } from '../Features';
import { Team } from '../Team';

export function AppPresentation() {
  return (
    <section id="application">
      <Hero />
      <Mission />
      <Stats />
      <Features />
      <Team />
    </section>
  );
}
