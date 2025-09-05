// src/pages/AboutPage/AboutPage.tsx

import React from 'react';
import './AboutPage.scss';
import Footer from '../../components/Footer/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="AboutPage" aria-label="About Page">
      <main className="AboutPage__main">
        <section className="about-stage">
          <div className="about-canvas">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor.
            </p>
            <p>
              Cras elementum ultrices diam. Maecenas ligula massa, varius a,
              semper congue, euismod non, mi.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
