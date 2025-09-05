// src/pages/AboutPage/AboutPage.tsx

import React from 'react';
import './AboutPage.scss';
import Footer from '../../components/Footer/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="AboutPage">
      <main className="about-main">
        <h1 className="about-title">About</h1>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
