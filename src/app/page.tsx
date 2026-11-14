import CitySearch from "@/components/CitySearch";
import FeedbackForm from "@/components/FeedbackForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroBox}>
            <header className={styles.header}>
              <a href="#" className={styles.brand} aria-label="Commi home">
                commi<span>.</span>
              </a>
              <nav aria-label="Main navigation">
                <a href="#about">About</a>
                <a href="#how-it-works">How it works</a>
              </nav>
              <a href="#feedback" className={styles.headerLink}>
                Let’s talk <span aria-hidden="true">↗</span>
              </a>
            </header>

            <svg
              className={styles.heroMap}
              viewBox="0 0 1400 850"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M-90 270 285 75 620 195 980 -20M-90 365 285 170 620 290 1100 0M-90 460 285 265 620 385 1400 50M-90 555 285 360 620 480 1500 100M-90 650 285 455 620 575 1500 195M-90 745 285 550 620 670 1500 290M-90 840 285 645 620 765 1500 385" />
                <path d="M80 -60 340 430 100 950M250 -60 510 430 270 950M420 -60 680 430 440 950M590 -60 850 430 610 950M760 -60 1020 430 780 950M930 -60 1190 430 950 950M1100 -60 1360 430 1120 950" />
              </g>
              <path
                d="M1150 -60C900 220 1350 370 1140 580S960 770 1050 910"
                fill="none"
                stroke="currentColor"
                strokeWidth="45"
                opacity=".28"
              />
            </svg>
            <div className={styles.heroContent}>
              <h1 id="hero-title">
                Your kind of city.
                <br />
                Your kind of <em>home.</em>
              </h1>
              <CitySearch />
            </div>
          </div>
        </section>

        <section
          id="about"
          className={`${styles.section} ${styles.about}`}
          aria-labelledby="about-title"
        >
          <h2 id="about-title">About Commi</h2>
          <div>
            <p>
              Explore neighbourhoods in Nigeria by power supply, flood risk,
              roads, and commute.
            </p>
            <p className={styles.quiet}>
              Location insights, not apartment listings.
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className={`${styles.section} ${styles.how}`}
          aria-labelledby="how-title"
        >
          <div className={styles.sectionTop}>
            <h2 id="how-title">How it works</h2>
          </div>
          <div className={styles.steps}>
            {[
              ["01", "Choose a city", "Pick where to explore."],
              [
                "02",
                "Set your priorities",
                "Filter by what matters to you.",
              ],
              [
                "03",
                "See your matches",
                "Compare matching areas on the map.",
              ],
            ].map(([number, title, description]) => (
              <article key={number}>
                <span>
                  {number}
                  <span aria-hidden="true">↗</span>
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className={styles.quiet}>
            Preference matching is in development.
          </p>
        </section>

        <section
          id="why"
          className={`${styles.section} ${styles.why}`}
          aria-labelledby="why-title"
        >
          <h2 id="why-title">Why we’re building it</h2>
          <div>
            <p>
              Finding reliable neighbourhood information takes too much asking
              around. Commi aims to bring it together in one map.
            </p>
          </div>
        </section>

        <section
          id="feedback"
          className={`${styles.section} ${styles.feedback}`}
          aria-labelledby="feedback-title"
        >
          <div>
            <h2 id="feedback-title">Share feedback</h2>
          </div>
          <FeedbackForm />
        </section>
      </main>
      <footer className={styles.footer}>
        <a href="#" className={styles.footerBrand}>
          commi<span>.</span>
        </a>
        <a
          href="https://github.com/BoazDaboh/Commi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow the build ↗
        </a>
      </footer>
    </>
  );
}
