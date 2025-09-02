// src/pages/AboutPage/AboutPage.tsx
import React from 'react';
import './AboutPage.scss';
import Footer from '../../components/Footer/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="AboutPage">
      <main className="AboutPage__main" role="main">
        <div className="text-box">
          <h1 className="page-title">About Page</h1>
          <br></br>
          <ul className="text-box-list">
            <p>🌏 WaterNSW manages dams across NSW, delivering clean water to millions in Greater Sydney. This project shares live and historical dam data to support water management and public awareness.</p>
            <p>🌊 Dams safeguard our future: ensuring water security, producing renewable energy, preventing floods, and nurturing ecosystems.</p>
            <p>🔍 To use the application, a user can search for a dam or open a list to find specific data about a dam in NSW.</p>
            <p>🌱 People can support water conservation by staying informed, adopting sustainable practices, and backing strong infrastructure policies. Together, these efforts build resilience to environmental challenges.</p>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
