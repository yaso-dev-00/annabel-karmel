export function SiteFooter() {
  return (
    <footer className="site-footer pt-5! md:pt-10!">
      <div className="site-footer-shell">
        <section className="footer-top">
          <a className="footer-logo" href="/" aria-label="Annabel Karmel home">
            <img src="/hero-slides/logo.webp" alt="Annabel Karmel" />
          </a>

          <div className="footer-link-columns" aria-label="Footer links">
            <ul>
              <li>
                <a href="/about-annabel-karmel">About Annabel Karmel</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/recipe-app">
                  Annabel&apos;s Baby &amp; Toddler App
                </a>
              </li>
              <li>
                <a href="/cookie-policy">Cookie Policy</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>

          <article className="footer-app-cta flex flex-col gap-y-2">
            <h3>Download Annabel&apos;s award-winning recipe app</h3>
            <p className="text-base !text-[#636262]">
              Discover nutritious recipes and expert meal planning tools for the whole family.
            </p>
            <div className="footer-store-links">
              <a href="/recipe-app/download/ios" aria-label="Download on the App Store">
                <span>Download on the</span>
                <strong>App Store</strong>
              </a>
              <a href="/recipe-app/download/android" aria-label="Get it on Google Play">
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </a>
            </div>
          </article>
        </section>

        <section className="footer-newsletter">
          <h2>Sign up for our newsletter</h2>
          <form>
            <label htmlFor="email-newsletter" className="sr-only">
              Email address
            </label>
            <input id="email-newsletter" type="email" placeholder="Enter your email" />
            <button type="submit" className="text-[17px]! h-[40px]! md:h-[30px]! md:text-[20px]!">Subscribe</button>
          </form>
        </section>

        <section className="footer-bottom">
          <p className="footer-legal">
            © 2025 Annabel Karmel Group Holdings Limited
            <span aria-hidden>•</span>
            <a href="/privacy-policy">Privacy Policy</a>
            <span aria-hidden>•</span>
            <a href="/terms-conditions">Terms and Conditions</a>
            <span aria-hidden>•</span>
            <a href="/cookie-policy">Cookie Policy</a>
          </p>

          <div className="footer-socials" aria-label="Social links">
            <a href="/social/instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="/social/facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.3 21V13h2.6l.4-3h-3v-1.9c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H7.5v3h2.6v8h3.2Z" />
              </svg>
            </a>
            <a href="/social/pinterest" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3.5a8.5 8.5 0 0 0-3.1 16.4c0-.7 0-1.8.3-2.7l1.2-5.2s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 2 0 3.4-2.1 3.4-5 0-2.6-1.9-4.5-4.7-4.5-3.2 0-5.1 2.4-5.1 4.9 0 1 .4 2 .9 2.5.1.1.2.3.1.5l-.3 1.2c-.1.2-.2.3-.5.2-1.7-.8-2.8-3.1-2.8-5 0-4.1 3-7.8 8.7-7.8 4.6 0 8.1 3.3 8.1 7.7 0 4.6-2.9 8.3-6.8 8.3-1.3 0-2.6-.7-3-1.5l-.8 3c-.3 1-.9 2.2-1.3 2.9 1 .3 2 .5 3 .5 4.7 0 8.5-3.8 8.5-8.5S16.7 3.5 12 3.5Z" />
              </svg>
            </a>
            <a href="/social/tiktok" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.4 6.4c1 .9 2.3 1.4 3.6 1.5v3c-1.4 0-2.7-.4-3.9-1.1v4.8a6.1 6.1 0 1 1-5.2-6v3.1a3.1 3.1 0 1 0 2.2 3v-12h3.3c.1 1.3.5 2.6 1.9 3.7Z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
