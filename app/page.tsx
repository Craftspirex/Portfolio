"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MoveUpRight,
  ShoppingBag,
  Sparkles,
  Youtube,
  Zap,
  Clock,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────────────── */

const projects = [
  {
    number: "01",
    name: "MedMaster AI",
    type: "AI · EdTech",
    tone: "mint",
    comingSoon: true,
    launchDate: "1 January 2027",
    demoHref: "https://medmaster-demoversion.vercel.app",
    description:
      "An AI-powered learning experience designed to help students practise MCQs, understand concepts, and prepare with greater confidence.",
    tags: ["Next.js", "Supabase", "AI Workflows"],
    icon: BrainCircuit,
    href: "https://medmaster-demoversion.vercel.app",
    action: "View demo",
  },
  {
    number: "02",
    name: "Social Umbralea",
    type: "Social · Digital",
    tone: "violet",
    comingSoon: false,
    description:
      "A social-first digital concept bringing community, content, and connection into a single cohesive platform experience.",
    tags: ["Next.js", "UI Design", "Community"],
    icon: Layers3,
    href: "#contact",
    action: "Ask about project",
  },
  {
    number: "03",
    name: "AO Spicy Grill",
    type: "Restaurant · E-commerce",
    tone: "violet",
    comingSoon: false,
    description:
      "A bold digital home for a restaurant brand, bringing its menu, visual identity and customer ordering journey into one experience.",
    tags: ["Next.js", "Responsive UI", "Customer Experience"],
    icon: ShoppingBag,
    href: "https://ao-spicy-grill.vercel.app/",
    action: "View website",
  },
  {
    number: "04",
    name: "Excel Learning Hub",
    type: "Education · Learning",
    tone: "blue",
    comingSoon: false,
    description:
      "A learning hub concept built to make Excel practice easier through clear explanations, guided exercises, and test-style activities.",
    tags: ["Learning Design", "Web UI", "Education"],
    icon: Code2,
    href: "#contact",
    action: "Ask about project",
  },
];

const services = [
  {
    icon: Globe2,
    title: "Web Development",
    text: "Modern, responsive websites that make your brand feel credible, professional, and easy to use.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify & E-commerce",
    text: "Store setup, product pages, theme customisation, and conversion-focused improvements.",
  },
  {
    icon: BrainCircuit,
    title: "AI Product Building",
    text: "Thoughtful AI-powered tools, educational experiences, and practical product ideas built to solve real problems.",
  },
  {
    icon: Zap,
    title: "Digital Growth",
    text: "Marketing ideas, content strategy, and customer journeys built around real business goals.",
  },
  {
    icon: Youtube,
    title: "Creator & Channel Setup",
    text: "YouTube channel setup, presentation, content direction, and creator-focused digital support.",
  },
  {
    icon: Layers3,
    title: "UI & Digital Experiences",
    text: "Clean interfaces, strong visual hierarchy, and polished user experiences across all devices.",
  },
];

/* ─── 3D CARD TILT HOOK ─────────────────────────────────────────────── */
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const MAX_TILT = 10; // degrees

    function onMove(e: MouseEvent) {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const target = ref.current;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -MAX_TILT * 2;
        const ry = ((x / rect.width) - 0.5) * MAX_TILT * 2;

        // Set CSS custom props for the spotlight
        target.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
        target.style.setProperty("--my", `${(y / rect.height) * 100}%`);
        target.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    }

    function onLeave() {
      if (raf.current) cancelAnimationFrame(raf.current);
      const target = ref.current;
      if (!target) return;
      target.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      target.style.transition = "transform .55s cubic-bezier(0.16,1,0.3,1)";
    }

    function onEnter() {
      const target = ref.current;
      if (!target) return;
      target.style.transition = "transform .08s linear";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [ref]);
}

/* ─── TILT CARD WRAPPER ─────────────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref);

  return (
    <div ref={ref} className={`card-tilt-wrapper ${className ?? ""}`}>
      {children}
    </div>
  );
}

/* ─── SCROLL REVEAL HOOK ────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(".reveal");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ─── SPOTLIGHT UPDATER FOR CARDS (non-tilt fallback) ───────────────── */
function CardSpotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal();

  return (
    <main>
      {/* Ambient background orbs */}
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {/* ── NAVBAR ────────────────────────────────────────────────────── */}
      <nav className="nav-wrap" role="navigation" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Rayan Zaib — back to top">
          <span className="brand-avatar">
            <Image
              src="/images/profile.jpg"
              alt="Rayan Zaib"
              width={38}
              height={38}
              priority
            />
          </span>
          <span>
            RAYAN ZAIB
            <small>FOUNDER · DEVELOPER · AI BUILDER</small>
          </span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="nav-cta" href="#contact">
          Let&apos;s talk <ArrowUpRight size={14} />
        </a>

        <a
          className="mobile-menu"
          href="#contact"
          aria-label="Jump to contact"
        >
          <Menu size={22} />
        </a>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero section-shell" id="home" aria-label="Introduction">
        {/* Copy side */}
        <div className="hero-copy">
          <div className="availability" role="status" aria-label="Availability status">
            <span className="pulse-dot" aria-hidden="true" />
            OPEN TO SELECT PROJECTS
            <span className="avail-line" aria-hidden="true" />
          </div>

          <p className="eyebrow">FOUNDER · DEVELOPER · AI BUILDER · ENTREPRENEUR</p>

          <h1>
            Building digital
            <br />
            experiences that{" "}
            <span className="gradient-text">matter.</span>
          </h1>

          <p className="hero-sub">
            I&apos;m Rayan Zaib — a founder and digital creator from Karachi,
            Pakistan. I turn ideas into useful products, thoughtful websites,
            and better online experiences.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowUpRight size={16} />
            </a>
            <a className="button button-ghost" href="#contact">
              Let&apos;s collaborate <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="hero-proof">
            <span className="proof-icon" aria-hidden="true">
              <Code2 size={17} />
            </span>
            <div>
              <strong>Ideas into interfaces.</strong>
              <span>Design-minded development with a product-first approach.</span>
            </div>
          </div>
        </div>

        {/* Visual / portrait side */}
        <div
          className="hero-visual"
          aria-label="Portrait and identity graphic"
        >
          <div className="visual-grid" aria-hidden="true" />

          {/* Orbital rings */}
          <div className="orbit orbit-a" aria-hidden="true" />
          <div className="orbit orbit-b" aria-hidden="true" />
          <div className="orbit orbit-c" aria-hidden="true" />

          {/* Ambient glow behind portrait */}
          <div className="portrait-glow" aria-hidden="true" />

          {/* Portrait */}
          <div className="portrait-wrap">
            <div className="portrait-circle">
              <Image
                src="/images/profile.jpg"
                alt="Rayan Zaib — Founder, Developer & AI Builder"
                width={260}
                height={260}
                priority
                quality={90}
              />
            </div>
          </div>

          {/* Floating info cards */}
          <div className="float-card card-top" aria-hidden="true">
            <span className="float-icon mint-bg">
              <BrainCircuit size={17} />
            </span>
            <div>
              <strong>AI + PRODUCT</strong>
              <small>Building what&apos;s next</small>
            </div>
            <span className="live-mini" />
          </div>

          <div className="float-card card-bottom" aria-hidden="true">
            <span className="float-icon purple-bg">
              <Code2 size={17} />
            </span>
            <div>
              <strong>WEB EXPERIENCES</strong>
              <small>Made with intention</small>
            </div>
            <ArrowUpRight size={15} className="float-arrow" />
          </div>

          <div className="visual-caption" aria-hidden="true">
            <span>01 / DIGITAL CRAFT</span>
            <span>PK · 24°51′ N</span>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <span className="index-line" />
          <span>01 — 04</span>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <section className="ticker" aria-label="Areas of expertise">
        <div className="ticker-track" aria-hidden="true">
          {[
            "WEB DEVELOPMENT",
            "AI PRODUCTS",
            "SHOPIFY & E-COMMERCE",
            "DIGITAL GROWTH",
            "FOUNDER",
            "UI DESIGN",
            "EDTECH",
            "ENTREPRENEUR",
            "WEB DEVELOPMENT",
            "AI PRODUCTS",
            "SHOPIFY & E-COMMERCE",
            "DIGITAL GROWTH",
            "FOUNDER",
            "UI DESIGN",
            "EDTECH",
            "ENTREPRENEUR",
          ].map((label, i) => (
            <span key={i}>
              {i % 2 === 1 ? <i>✳</i> : null}
              {label}
              {i % 2 === 0 ? <i>✳</i> : null}
            </span>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section
        className="section-shell section-pad about-section"
        id="about"
        aria-label="About"
      >
        <div className="section-kicker reveal">
          <span>01</span>
          <span className="kicker-line" />
          <span>THE PERSON BEHIND THE PIXELS</span>
        </div>

        <div className="about-grid">
          <div className="reveal reveal-delay-1">
            <h2>
              Curious by nature.
              <br />
              <span className="muted-heading">Builder by choice.</span>
            </h2>
          </div>

          <div className="about-copy reveal reveal-delay-2">
            <p>
              I&apos;m a founder and digital creator from Karachi, Pakistan,
              working at the intersection of technology, design, and business.
            </p>
            <p>
              From AI-driven learning tools to restaurant websites and
              e-commerce experiences, I take a problem, find the opportunity,
              and build something people can actually use.
            </p>
            <a className="text-link" href="#contact">
              Have an idea? Let&apos;s talk <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="skill-strip reveal reveal-delay-3">
          <div>
            <span className="skill-label">FOCUS AREAS</span>
            <strong>Web &amp; UI Development</strong>
          </div>
          <div>
            <span className="skill-label">COMMERCE</span>
            <strong>Shopify &amp; Store Setup</strong>
          </div>
          <div>
            <span className="skill-label">VENTURES</span>
            <strong>AI &amp; EdTech Products</strong>
          </div>
          <div>
            <span className="skill-label">GROWTH</span>
            <strong>Marketing &amp; Content</strong>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────── */}
      <section
        className="section-shell section-pad projects-section"
        id="projects"
        aria-label="Selected projects"
      >
        <div className="section-kicker reveal">
          <span>02</span>
          <span className="kicker-line" />
          <span>SELECTED WORK</span>
        </div>

        <div className="section-heading-row reveal reveal-delay-1">
          <div>
            <h2>
              Made with a{" "}
              <span className="gradient-text">purpose.</span>
            </h2>
            <p>A few projects from my digital building journey.</p>
          </div>
          <span className="count-badge">0{projects.length} FEATURED PROJECTS</span>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const isExternal = project.href.startsWith("http");
            const revealDelay = `reveal-delay-${Math.min(i + 1, 4)}` as const;

            return (
              <TiltCard key={project.number} className={`reveal ${revealDelay}`}>
                <CardSpotlight
                  className={`project-card ${project.tone}`}
                >
                  {/* Top row */}
                  <div className="project-top">
                    <div className="project-status-row">
                      <span>{project.number} / FEATURED</span>
                      {project.comingSoon && (
                        <span className="coming-soon-badge" aria-label={`Coming soon — launches ${project.launchDate}`}>
                          <span className="badge-dot" aria-hidden="true" />
                          COMING SOON
                        </span>
                      )}
                    </div>
                    <span className="project-type">{project.type}</span>
                  </div>

                  {/* Art window */}
                  <div className="project-art">
                    <div className="art-window">
                      <div className="window-bar">
                        <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                        <span>{project.name.toLowerCase().replaceAll(" ", "")}.app</span>
                      </div>
                      <div className="window-content">
                        <div className="art-symbol" aria-hidden="true">
                          <Icon size={34} />
                        </div>
                        <div className="art-lines" aria-hidden="true">
                          <i /><i /><i />
                        </div>
                        <div className="art-pills" aria-hidden="true">
                          <i /><i /><i />
                        </div>
                        <div className="art-bottom-line" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="art-glow" aria-hidden="true" />
                  </div>

                  {/* Body */}
                  <div className="project-body">
                    <div className="project-title-row">
                      <h3>{project.name}</h3>
                      <a
                        href={project.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        aria-label={`${project.action}: ${project.name}`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>

                    <p>{project.description}</p>

                    {/* Coming-soon detail block */}
                    {project.comingSoon && (
                      <div style={{ marginBottom: "10px" }}>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "10px",
                            color: "#789a83",
                            margin: "0 0 4px",
                            minHeight: "auto",
                          }}
                        >
                          <Clock size={11} />
                          Full launch: <strong style={{ color: "var(--mint)", fontWeight: 600 }}>{project.launchDate}</strong>
                        </p>
                        {project.demoHref && (
                          <p
                            style={{
                              fontSize: "10px",
                              color: "#789a83",
                              margin: 0,
                              minHeight: "auto",
                            }}
                          >
                            <Check size={11} style={{ display: "inline", marginRight: 4, color: "var(--mint)" }} />
                            Demo version available
                          </p>
                        )}
                      </div>
                    )}

                    <div className="tag-row">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    {/* Action links */}
                    {project.comingSoon && project.demoHref ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <a
                          className="project-link"
                          href={project.demoHref}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`View demo: ${project.name}`}
                        >
                          View demo <ArrowRight size={13} />
                        </a>
                      </div>
                    ) : (
                      <a
                        className="project-link"
                        href={project.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        aria-label={`${project.action}: ${project.name}`}
                      >
                        {project.action} <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                </CardSpotlight>
              </TiltCard>
            );
          })}
        </div>

        <p className="project-note reveal">
          <Sparkles size={14} />
          Project links and previews are updated as each deployment is finalised.
        </p>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section
        className="section-shell section-pad services-section"
        id="services"
        aria-label="Services"
      >
        <div className="section-kicker reveal">
          <span>03</span>
          <span className="kicker-line" />
          <span>HOW I CAN HELP</span>
        </div>

        <div className="section-heading-row reveal reveal-delay-1">
          <div>
            <h2>
              Let&apos;s build your
              <br />
              <span className="muted-heading">next advantage.</span>
            </h2>
          </div>
          <p className="section-side-copy">
            Whether you&apos;re starting from zero or improving what you have,
            I bring a builder&apos;s mindset to every digital project.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const revealDelay = `reveal-delay-${Math.min(index + 1, 4)}` as const;
            return (
              <article
                className={`service-card reveal ${revealDelay}`}
                key={service.title}
              >
                <div className="service-card-top">
                  <span className="service-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="service-num">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a
                  href="#contact"
                  aria-label={`Ask about ${service.title}`}
                >
                  <ArrowUpRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section
        className="section-shell contact-shell"
        id="contact"
        aria-label="Contact"
      >
        <div className="contact-card reveal">
          <div className="contact-orb orb-one" aria-hidden="true" />
          <div className="contact-orb orb-two" aria-hidden="true" />

          <div className="section-kicker">
            <span>04</span>
            <span className="kicker-line" />
            <span>YOUR IDEA STARTS HERE</span>
          </div>

          <div className="contact-content">
            <div>
              <h2>
                Have something
                <br />
                good in <span className="gradient-text">mind?</span>
              </h2>
              <p>
                Tell me what you&apos;re building. Let&apos;s turn the first
                conversation into a clear next step.
              </p>
            </div>

            <div className="contact-actions">
              <a
                className="button button-primary"
                href="mailto:rayanzaib.support@gmail.com?subject=Let's%20work%20together"
              >
                Start a conversation <ArrowUpRight size={16} />
              </a>

              <a
                className="contact-detail"
                href="https://www.linkedin.com/in/rayan-zaib-225b5a328/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="contact-detail-icon" aria-hidden="true">
                  <BriefcaseBusiness size={17} />
                </span>
                <span>
                  <small>CONNECT ON LINKEDIN</small>
                  <strong>
                    Rayan Zaib <ExternalLink size={12} />
                  </strong>
                </span>
              </a>

              <a
                className="contact-detail"
                href="mailto:rayanzaib.support@gmail.com"
              >
                <span className="contact-detail-icon" aria-hidden="true">
                  <Mail size={17} />
                </span>
                <span>
                  <small>SEND AN EMAIL</small>
                  <strong>
                    rayanzaib.support@gmail.com <ExternalLink size={12} />
                  </strong>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="footer section-shell" role="contentinfo">
        <a className="brand footer-brand" href="#home" aria-label="Back to top — Rayan Zaib">
          <span className="brand-avatar" style={{ width: 30, height: 30 }}>
            <Image
              src="/images/profile.jpg"
              alt="Rayan Zaib"
              width={30}
              height={30}
            />
          </span>
          <span>
            RAYAN ZAIB
            <small>FOUNDER · DEVELOPER · AI BUILDER</small>
          </span>
        </a>

        <p>Designed with curiosity. Built with purpose.</p>

        <div className="footer-right">
          <span>
            A product of <strong>ARVÉN</strong>
          </span>
          <a href="#home" aria-label="Back to top">
            <MoveUpRight size={15} />
          </a>
        </div>
      </footer>
    </main>
  );
}
