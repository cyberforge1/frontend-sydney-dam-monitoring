// src/components/Footer/Footer.tsx
import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="Footer" role="contentinfo">
      <div className="Footer__inner">
        <div className="Footer__left">
          <p>© {currentYear} Water Dashboard NSW</p>
        </div>

        <nav className="Footer__right" aria-label="External links">
          <a
            href="https://api.nsw.gov.au/Product/Index/26"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NSW Open Data API"
            title="NSW Open Data API"
          >
            {/* Link icon */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/>
            </svg>
          </a>

          <a
            href="https://www.waternsw.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WaterNSW"
            title="WaterNSW"
          >
            {/* Globe icon */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm7.93 9h-3.12a15.5 15.5 0 0 0-1.2-5.01 8.03 8.03 0 0 1 4.32 5.01ZM12 4c1.11 0 2.67 2.27 3.27 6H8.73C9.33 6.27 10.89 4 12 4ZM6.39 6.99A15.5 15.5 0 0 0 5.19 11H2.07a8.03 8.03 0 0 1 4.32-5.01ZM2.07 13h3.12c.24 1.74.73 3.43 1.2 5.01A8.03 8.03 0 0 1 2.07 13Zm5.06 0h6.74c-.6 3.73-2.16 6-3.27 6s-2.67-2.27-3.47-6Zm8.61 5.01c.47-1.58.96-3.27 1.2-5.01h3.12a8.03 8.03 0 0 1-4.32 5.01Z"/>
            </svg>
          </a>

          <a
            href="https://github.com/cyberforge1/SydneyDamMonitoring"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            title="GitHub"
          >
            {/* GitHub icon (octocat) */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.26.79-.57l-.02-2.02c-3.2.7-3.88-1.38-3.88-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.74 1.27 3.41.97.1-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.28 1.2-3.08-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18.93-.26 1.92-.39 2.9-.4.98.01 1.97.14 2.9.4 2.22-1.49 3.2-1.18 3.2-1.18.62 1.58.23 2.75.11 3.04.75.8 1.2 1.82 1.2 3.08 0 4.44-2.71 5.42-5.29 5.7.42.36.8 1.07.8 2.17l-.01 3.22c0 .32.21.68.8.57A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
