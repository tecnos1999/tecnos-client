import React from 'react';
import { faCertificate, faHeadset, faGears } from '@fortawesome/free-solid-svg-icons';
import BannersCard from './BannersCard';

const Banners: React.FC = () => {
  return (
    <section className="flex relative flex-col items-center  md:absolute md:flex-row md:-translate-y-1/2 justify-center gap-8 py-8 mx-auto">
      <BannersCard
        icon={faCertificate}
        title="GARANTIA CALITATII"
        content="Colaborarile pe termen lung si increderea clientilor in noi si in produsele noastre ne obliga sa fim mereu mai buni in tot ceea ce inseamna angajamentul nostru de calitate fata de partenerii nostri."
      />
      <BannersCard
        icon={faHeadset}
        title="CONSULTANTA TEHNICA"
        content="Ofertele intocmite pentru clientii nostri sunt rezultatul unei atente analize a nevoilor acestora si o optima solutie tehnico-economica stabilita prin discutii ale clientului cu echipa noastra de vanzari."
      />
      <BannersCard
        icon={faGears}
        title="SERVICII DE LIVRARE"
        content="Colaborarile pe termen lung si increderea clientilor in noi si in produsele noastre ne obliga sa fim mereu mai buni in tot ceea ce inseamna angajamentul nostru de calitate fata de partenerii nostri."
      />
    </section>
  );
};

export default Banners;
