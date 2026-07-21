const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Cookies Policy",
  "Preferences",
  "Ethics Line",
  "Accessibility",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* LEFT */}
        <div className="footer__col">
          <h2 className="footer__heading">Kush Adhana</h2>
          <p className="footer__text">
            Premium fitness coaching tailored to elevate your physical and
            mental peak performance. High-end systems built for elite results.
          </p>
          <div className="footer__socials">
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="footer__col footer__col--brand">
          <span className="footer__collab">MADE IN COLLABORATION</span>
          <h2 className="footer__heading footer__heading--brand">Sellixa</h2>
          <p className="footer__text">
            Sellixa helps creators and coaches turn attention into revenue
            through courses, funnels, websites, and growth systems.
          </p>
          <div className="footer__socials">
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Appsians, Inc. All rights reserved.</p>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
