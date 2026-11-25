import { useState, type FormEvent, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "bean"
  | "clock"
  | "cup"
  | "leaf"
  | "menu"
  | "spark"
  | "wifi"
  | "x";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: "Coffee" | "Bites";
  label: string;
  color: string;
  featured?: boolean;
};

const menuItems: MenuItem[] = [
  {
    name: "The Slow Down",
    description: "Double espresso, silky oat milk, a little honey.",
    price: "$5.50",
    category: "Coffee",
    label: "HOUSE FAVORITE",
    color: "latte",
    featured: true,
  },
  {
    name: "Midnight Bloom",
    description: "Cold brew, orange peel, and a surprisingly good mood.",
    price: "$6.00",
    category: "Coffee",
    label: "COLD & BOLD",
    color: "cold",
  },
  {
    name: "Soft Landing",
    description: "Flaky, buttery, baked fresh before the first scroll.",
    price: "$4.25",
    category: "Bites",
    label: "BAKERY DROP",
    color: "bake",
  },
];

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  bean: (
    <>
      <path d="M7.5 3.5c-2.6 1-4.1 4.3-3.4 8.1.8 4.5 4 8.1 7.5 8.9 3.6.8 7.2-1.6 8.2-5.8 1.1-4.6-.7-9.5-4.4-11.1-2.4-1-5.3-.1-7.9 2.4Z" />
      <path d="M6 17c3.3-.5 7.2-4.7 8.2-9.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  cup: (
    <>
      <path d="M4 9h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
      <path d="M17 11h1a2.5 2.5 0 0 1 0 5h-1M7 5c0-1 1-1 1-2m4 2c0-1 1-1 1-2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-9 0-15 3-15 10a6 6 0 0 0 6 6c7 0 10-7 9-16Z" />
      <path d="M5 19c3-4 6-7 11-10" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 9.5a11 11 0 0 1 14 0M8 13a6.5 6.5 0 0 1 8 0m-5 3.5a2 2 0 0 1 2 0M12 20h.01" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {iconPaths[name]}
    </svg>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand-lockup" href="#home" aria-label="Flawsome Coffee Club home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path
            d="M13 18h21v12a8 8 0 0 1-8 8h-5a8 8 0 0 1-8-8V18Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M34 21h2a5 5 0 0 1 0 10h-2M19 13c0-2 2-2 2-4m6 4c0-2 2-2 2-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path d="M12 40h25" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-type">
          <span>FLAWSOME</span>
          <small>COFFEE CLUB</small>
        </span>
      )}
    </a>
  );
}

function CoffeeIllustration() {
  return (
    <div className="hero-illustration" aria-label="Illustration of a warm cup of coffee">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="sun-disc" />
      <div className="coffee-bean bean-one"><Icon name="bean" /></div>
      <div className="coffee-bean bean-two"><Icon name="bean" /></div>
      <div className="steam-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="illustrated-cup">
        <div className="cup-coffee" />
        <div className="cup-sleeve">FC<span>·</span></div>
        <div className="cup-handle" />
      </div>
      <div className="art-caption">
        <span className="caption-dot" />
        <span>GOOD THINGS<br />BREW HERE</span>
      </div>
      <div className="art-note">
        <Icon name="spark" />
        <span>made for<br />your moment</span>
      </div>
    </div>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState<"All" | MenuItem["category"]>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const visibleItems = menuItems.filter(
    (item) => activeFilter === "All" || item.category === activeFilter,
  );

  function handleReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    setNotice(`You're on the list, ${name}. We can't wait to see you.`);
    event.currentTarget.reset();
  }

  function orderItem(name: string) {
    setNotice(`${name} added to your order. Excellent choice.`);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} />
          </button>
          <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#menu" onClick={closeMobileMenu}>The menu</a>
            <a href="#story" onClick={closeMobileMenu}>Our kind of place</a>
            <a className="nav-cta" href="#reserve" onClick={closeMobileMenu}>
              Find your seat <Icon name="arrow" />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span /> YOUR NEIGHBORHOOD COFFEE CLUB</p>
              <h1>
                A little more<br />
                <span>you-time.</span>
              </h1>
              <p className="hero-description">
                Really good coffee. Room to think. A place that gets it.
                Come as you are; stay for one more.
              </p>
              <div className="hero-actions">
                <a className="button button-honey" href="#menu">
                  Find your usual <Icon name="arrow" />
                </a>
                <a className="text-link" href="#story">
                  Get to know us <span>↘</span>
                </a>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <span>M</span><span>J</span><span>A</span><span>+</span>
                </div>
                <p><strong>A neighborhood favorite</strong><br />for mornings that need a moment.</p>
              </div>
            </div>
            <CoffeeIllustration />
          </div>
          <div className="hero-bottom">
            <span>GOOD COFFEE, NO BIG SPEECH.</span>
            <a href="#perks">SCROLL A LITTLE <span>↓</span></a>
          </div>
        </section>

        <section className="perks-section" id="perks" aria-label="The Flawsome difference">
          <div className="perks-inner">
            <article className="perk">
              <span className="perk-icon"><Icon name="leaf" /></span>
              <div><h2>Good from the ground up</h2><p>Thoughtful beans, better beginnings.</p></div>
            </article>
            <article className="perk">
              <span className="perk-icon"><Icon name="wifi" /></span>
              <div><h2>Stay a little longer</h2><p>Good Wi-Fi. Better company.</p></div>
            </article>
            <article className="perk">
              <span className="perk-icon"><Icon name="clock" /></span>
              <div><h2>Your pace, always</h2><p>Open early. Here when you need us.</p></div>
            </article>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="section-topline">
            <p className="eyebrow eyebrow-dark"><span /> THE GOOD STUFF</p>
            <span className="section-index">01 — 03</span>
          </div>
          <div className="menu-heading-row">
            <h2>Little rituals.<br /><span>Big feelings.</span></h2>
            <p>Made with care, ordered on repeat. A few of our current reasons to get out of bed.</p>
          </div>
          <div className="menu-controls" role="group" aria-label="Filter menu">
            {(["All", "Coffee", "Bites"] as const).map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={`filter-button ${activeFilter === filter ? "active" : ""}`}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
            <span className="menu-note"><span /> MADE FRESH, EVERY DAY</span>
          </div>
          <div className="menu-grid">
            {visibleItems.map((item, index) => (
              <article
                className={`menu-card menu-art-${item.color} ${item.featured ? "is-featured" : ""}`}
                key={item.name}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className={`menu-artwork ${item.color}`}>
                  <span className="menu-label">{item.label}</span>
                  {item.category === "Bites" ? (
                    <div className="pastry-art"><span /><span /><span /></div>
                  ) : (
                    <div className={`mini-cup ${item.color}`}>
                      <div className="mini-cup-coffee" />
                      <span>FC</span>
                    </div>
                  )}
                  <span className="art-number">0{index + 1}</span>
                </div>
                <div className="menu-card-copy">
                  <div className="menu-name-row"><h3>{item.name}</h3><span>{item.price}</span></div>
                  <p>{item.description}</p>
                  <button className="order-link" onClick={() => orderItem(item.name)} type="button">
                    Add to your day <Icon name="arrow" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <a className="full-menu-link" href="#reserve">There’s more where that came from <Icon name="arrow" /></a>
        </section>

        <section className="story-section" id="story">
          <div className="story-copy">
            <p className="eyebrow"><span /> A PLACE TO LAND</p>
            <h2>Not just a<br />coffee <span>run.</span></h2>
            <p>
              We made Flawsome for the in-between bits. The slow starts, the
              “let’s catch up”s, the one-more-page afternoons. A good cup is
              just the beginning.
            </p>
            <a className="story-link" href="#reserve">Come find your corner <Icon name="arrow" /></a>
          </div>
          <div className="story-visual">
            <div className="story-orbit" />
            <div className="story-quote">
              <Icon name="spark" />
              <p>“A little pocket of calm in a very loud world.”</p>
              <span>— SOMEONE WHO GETS IT</span>
            </div>
            <div className="story-stamp"><span>MAKE YOURSELF</span><strong>at home</strong><span>YOU’RE RIGHT ON TIME</span></div>
            <div className="story-leaf leaf-one" />
            <div className="story-leaf leaf-two" />
          </div>
        </section>

        <section className="reserve-section" id="reserve">
          <div className="reserve-inner">
            <div className="reserve-copy">
              <p className="eyebrow"><span /> YOUR TABLE’S WAITING</p>
              <h2>Make a little<br /><span>room for you.</span></h2>
              <p>Bring your people, your laptop, or absolutely nothing at all. We’ll save you a spot.</p>
              <div className="opening-hours"><Icon name="clock" /><span><strong>Here every day</strong><br />7:00 am — 11:00 pm</span></div>
            </div>
            <form className="booking-form" onSubmit={handleReservation}>
              <p className="form-heading">Find your corner</p>
              <label>
                <span>Your name</span>
                <input autoComplete="name" name="name" placeholder="How should we say hello?" required />
              </label>
              <label>
                <span>Email address</span>
                <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
              </label>
              <div className="form-row">
                <label>
                  <span>Day</span>
                  <input name="date" required type="date" />
                </label>
                <label>
                  <span>Little group</span>
                  <select defaultValue="2 people" name="party">
                    <option>Just me</option><option>2 people</option><option>3 people</option><option>4+ people</option>
                  </select>
                </label>
              </div>
              <button className="button button-honey form-submit" type="submit">
                Save me a seat <Icon name="arrow" />
              </button>
              <p className="form-footnote">No pressure. Just a very good cup of coffee.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <BrandMark />
            <p>Good coffee. Good people.<br />Come as you are.</p>
          </div>
          <div className="footer-column"><span>COME ON IN</span><p>94 Main Street<br />Your neighborhood, USA</p></div>
          <div className="footer-column"><span>WHENEVER</span><p>Every single day<br />7:00 am — 11:00 pm</p></div>
          <div className="footer-column"><span>FOLLOW THE GOOD</span><a href="https://instagram.com" rel="noreferrer" target="_blank">Instagram ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 FLAWSOME COFFEE CLUB</span><span>MADE WITH A LITTLE EXTRA LOVE <Icon name="spark" /></span></div>
      </footer>

      {notice && (
        <div className="toast" role="status">
          <span className="toast-check">✓</span>{notice}
          <button aria-label="Dismiss message" onClick={() => setNotice("")} type="button"><Icon name="x" /></button>
        </div>
      )}
    </div>
  );
}

export default App;
