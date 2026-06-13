import { useEffect, useRef, useState } from "react";

export default function LarsenMathSite() {
  const [page, setPage] = useState(window.location.hash || "#/");
  const [showTopButton, setShowTopButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState({});
  const toggleFaq = (i) => setOpenFaqs((o) => ({ ...o, [i]: !o[i] }));

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash || "#/");
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".lm-reveal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  const scrollerRef = useRef(null);
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || page !== "#/") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf;
    let paused = false;
    let resumeTimer;
    const speed = 0.4; // px per frame — gentle

    const step = () => {
      if (!paused) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const resumeSoon = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 2500);
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resumeSoon);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resumeSoon, { passive: true });
    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", resumeSoon);
    el.addEventListener("wheel", () => { pause(); resumeSoon(); }, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resumeSoon);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resumeSoon);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", resumeSoon);
    };
  }, [page]);

  useEffect(() => {
    if (page !== "#/book") return;
    const load = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]").forEach((el) => {
          el.src = el.getAttribute("data-tally-src");
        });
      }
    };
    if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      load();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://tally.so/widgets/embed.js";
    s.onload = load;
    s.onerror = load;
    document.body.appendChild(s);
  }, [page]);

  const whatsappLink = "https://wa.me/27794083205";

  const testimonials = [
    {
      quote:
        "My son enjoys working with Larsen. He is a very dedicated Maths tutor and very patient. It is really a blessing having him as my son's tutor. I am certain my son was going to choose pure maths in Grade 10 if he had Larsen as his tutor from Grade 8. I wish and plan to have him as my daughter's Maths tutor next year as she will be in Grade 8.",
      author: "Parent, South Africa",
    },
    {
      quote:
        "I’m following very closely on the lessons, and I found Larsen to be very professional. I found his lessons encouraging. My child is also giving similar feedback and is now used to working with Larsen. I like the passion!",
      author: "Parent, South Africa",
    },
    {
      quote:
        "The tutor was so great. He went through the theory in depth and assisted in answering questions that I struggled with. After the session, I was quite confident that I had gained more knowledge than I had gained in my lectures!",
      author: "Learner",
    },
    {
      quote:
        "Those 3-hour sessions felt like 10 minutes because of how informative and enjoyable the tutor made them. We’re truly grateful and I hope we all make you proud.",
      author: "Learners",
    },
    {
      quote:
        "I love the way the tutor explained concepts. The teaching style is easy to understand and many of my questions were answered in a simple and clear way.",
      author: "Learner",
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="lm-root">
      {/* ---- Global iOS-style tokens & primitives ---- */}
      <style>{`
        :root {
          --lm-bg: #f2f2f7;          /* iOS system grouped background */
          --lm-surface: #ffffff;
          --lm-surface-2: #fbfbfd;
          --lm-ink: #1c1c1e;          /* label */
          --lm-ink-2: #3c3c43;        /* secondary label */
          --lm-ink-3: #8a8a8e;        /* tertiary label */
          --lm-hairline: rgba(60,60,67,0.10);
          --lm-blue: #0a84ff;         /* iOS system blue */
          --lm-blue-press: #0060df;
          --lm-green: #34c759;        /* iOS system green */
          --lm-green-press: #248a3d;
          --lm-radius-card: 22px;
          --lm-radius-btn: 14px;
          --lm-shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 6px 16px rgba(17,17,26,0.05);
          --lm-shadow-md: 0 2px 6px rgba(0,0,0,0.04), 0 12px 34px rgba(17,17,26,0.08);
          --lm-spring: cubic-bezier(0.32, 0.72, 0, 1);
          --lm-font: -apple-system, BlinkMacSystemFont, "SF Pro Display",
            "SF Pro Text", "Inter", "Helvetica Neue", system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; scroll-padding-top: 76px; }
        .lm-root {
          font-family: var(--lm-font);
          background: var(--lm-bg);
          color: var(--lm-ink);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          letter-spacing: -0.011em;
        }
        .lm-root *, .lm-root *::before, .lm-root *::after { box-sizing: border-box; }

        .lm-wrap { max-width: 980px; margin: 0 auto; padding: 0 24px; }
        .lm-mid { max-width: 840px; margin: 0 auto; padding: 0 24px; }
        .lm-narrow { max-width: 720px; margin: 0 auto; padding: 0 24px; }

        /* ---- Type scale (8pt rhythm) ---- */
        .lm-eyebrow {
          font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
          text-transform: uppercase; color: var(--lm-blue);
        }
        .lm-h1 {
          font-size: clamp(34px, 6vw, 52px); line-height: 1.05;
          font-weight: 700; letter-spacing: -0.03em; color: var(--lm-ink);
          margin: 0;
        }
        .lm-h2 {
          font-size: clamp(26px, 3.4vw, 34px); line-height: 1.12;
          font-weight: 700; letter-spacing: -0.025em; margin: 0;
        }
        .lm-h3 {
          font-size: 19px; font-weight: 600; letter-spacing: -0.015em; margin: 0;
        }
        .lm-lead {
          font-size: clamp(17px, 2.1vw, 20px); line-height: 1.55;
          color: var(--lm-ink-2); font-weight: 400;
        }
        .lm-body { font-size: 16px; line-height: 1.6; color: var(--lm-ink-2); }
        .lm-caption { font-size: 14px; line-height: 1.5; color: var(--lm-ink-3); }

        /* ---- Surfaces ---- */
        .lm-card {
          background: var(--lm-surface);
          border-radius: var(--lm-radius-card);
          box-shadow: var(--lm-shadow-sm);
          padding: 28px;
        }
        .lm-tile {
          background: var(--lm-surface);
          border-radius: 18px;
          box-shadow: var(--lm-shadow-sm);
          padding: 20px 22px;
        }
        .lm-chips {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;
        }
        .lm-chip {
          background: var(--lm-surface); color: var(--lm-ink);
          font-size: 15px; font-weight: 500; letter-spacing: -0.01em;
          padding: 9px 16px; border-radius: 999px;
          box-shadow: var(--lm-shadow-sm); white-space: nowrap;
        }

        /* ---- Buttons (tap-to-shrink) ---- */
        .lm-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; font-weight: 600; font-size: 17px; letter-spacing: -0.01em;
          padding: 15px 26px; border-radius: var(--lm-radius-btn);
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.25s var(--lm-spring), background-color 0.2s ease,
            box-shadow 0.25s var(--lm-spring);
          will-change: transform;
        }
        .lm-btn:active { transform: scale(0.96); }
        .lm-btn-blue { background: var(--lm-blue); color: #fff; box-shadow: 0 6px 18px rgba(10,132,255,0.30); }
        .lm-btn-blue:hover { background: var(--lm-blue-press); }
        .lm-btn-green { background: var(--lm-green); color: #fff; box-shadow: 0 6px 18px rgba(52,199,89,0.28); }
        .lm-btn-green:hover { background: var(--lm-green-press); }
        .lm-btn-ghost {
          background: rgba(120,120,128,0.10); color: var(--lm-ink);
        }
        .lm-btn-ghost:hover { background: rgba(120,120,128,0.16); }

        /* ---- Sections (8pt rhythm) ---- */
        .lm-section { padding: 56px 0; }
        .lm-section-tight { padding: 40px 0; }
        @media (max-width: 640px) {
          .lm-section { padding: 40px 0; }
          .lm-section-tight { padding: 32px 0; }
        }

        /* ---- Links ---- */
        .lm-link {
          color: var(--lm-blue); text-decoration: none; font-weight: 500;
          transition: opacity 0.2s ease;
        }
        .lm-link:hover { opacity: 0.65; }
        .lm-reslist { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 16px; }
        .lm-reslist li { display: flex; flex-direction: column; gap: 3px; }
        .lm-reslist .lm-link { font-size: 16px; }
        .lm-resnote { font-size: 13px; line-height: 1.45; color: var(--lm-ink-3); }

        /* ---- Header (frosted glass) ---- */
        .lm-header {
          position: sticky; top: 0; z-index: 50;
          background: rgba(242,242,247,0.72);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--lm-hairline);
        }
        .lm-header-inner {
          max-width: 980px; margin: 0 auto; padding: 12px 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .lm-brand {
          display: flex; align-items: center; gap: 10px;
          font-weight: 650; font-size: 17px; letter-spacing: -0.02em;
          color: var(--lm-ink); text-decoration: none;
        }
        .lm-brand img { width: 26px; height: 26px; border-radius: 7px; }
        .lm-nav { display: flex; align-items: center; gap: 6px; }
        .lm-nav a {
          font-size: 15px; font-weight: 500; letter-spacing: -0.01em;
          padding: 8px 12px; border-radius: 10px; text-decoration: none;
          color: var(--lm-ink-2); transition: background-color 0.2s ease, color 0.2s ease;
        }
        .lm-nav a:hover { background: rgba(120,120,128,0.10); color: var(--lm-ink); }
        .lm-nav .is-book {
          background: var(--lm-blue); color: #fff;
          box-shadow: 0 4px 12px rgba(10,132,255,0.28);
        }
        .lm-nav .is-book:hover { background: var(--lm-blue-press); color: #fff; }

        /* Hamburger button — hidden on desktop */
        .lm-burger {
          display: none; flex-direction: column; align-items: center; justify-content: center;
          width: 40px; height: 40px; border: none; cursor: pointer;
          border-radius: 11px; background: rgba(120,120,128,0.12);
          color: var(--lm-ink); padding: 0;
          transition: transform 0.25s var(--lm-spring), background-color 0.2s ease;
        }
        .lm-burger:active { transform: scale(0.92); }
        .lm-burger span {
          display: block; width: 18px; height: 2px; border-radius: 2px;
          background: currentColor; margin: 2.5px 0;
          transition: transform 0.3s var(--lm-spring), opacity 0.2s ease;
        }
        .lm-burger.is-open span:nth-child(1) { transform: translateY(4.5px) rotate(45deg); }
        .lm-burger.is-open span:nth-child(2) { opacity: 0; }
        .lm-burger.is-open span:nth-child(3) { transform: translateY(-4.5px) rotate(-45deg); }

        /* Backdrop */
        .lm-backdrop {
          position: fixed; inset: 0; z-index: 70;
          background: rgba(0,0,0,0.32);
          -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px);
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .lm-backdrop.is-open { opacity: 1; pointer-events: auto; }

        /* Slide-in panel from the right */
        .lm-panel {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 80;
          width: min(78vw, 320px);
          background: rgba(248,248,250,0.86);
          -webkit-backdrop-filter: saturate(180%) blur(24px);
          backdrop-filter: saturate(180%) blur(24px);
          border-left: 1px solid var(--lm-hairline);
          box-shadow: -12px 0 40px rgba(0,0,0,0.16);
          transform: translateX(100%);
          transition: transform 0.42s var(--lm-spring);
          padding: 76px 22px 28px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .lm-panel.is-open { transform: translateX(0); }
        .lm-panel a {
          font-size: 18px; font-weight: 500; letter-spacing: -0.015em;
          color: var(--lm-ink); text-decoration: none;
          padding: 15px 16px; border-radius: 13px;
          display: flex; align-items: center; gap: 12px;
          transition: background-color 0.2s ease, transform 0.2s var(--lm-spring);
        }
        .lm-panel a:active { transform: scale(0.97); }
        .lm-panel a:hover { background: rgba(120,120,128,0.12); }
        .lm-panel .is-book {
          background: var(--lm-blue); color: #fff; justify-content: center;
          margin-top: 8px; box-shadow: 0 6px 16px rgba(10,132,255,0.28);
        }
        .lm-panel-ic { width: 21px; height: 21px; flex: none; color: var(--lm-ink-3); }
        .lm-panel-close {
          position: absolute; top: 18px; right: 18px;
          width: 34px; height: 34px; border: none; cursor: pointer;
          border-radius: 50%; background: rgba(120,120,128,0.14);
          color: var(--lm-ink); font-size: 17px; line-height: 1;
          display: inline-flex; align-items: center; justify-content: center;
        }

        @media (max-width: 640px) {
          .lm-header-inner { position: relative; justify-content: center; gap: 12px; }
          .lm-burger { display: inline-flex; position: absolute; left: 16px; top: 50%; transform: translateY(-50%); }
          .lm-burger:active { transform: translateY(-50%) scale(0.92); }
          .lm-brand { justify-content: center; }
          .lm-brand span { font-size: 16px; }
          .lm-nav { display: none; }
        }

        /* ---- Grids ---- */
        .lm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .lm-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 760px) {
          .lm-grid-2, .lm-grid-3 { grid-template-columns: 1fr; }
        }

        /* ---- Pill (topics / who-this-is-for) ---- */
        .lm-pill {
          background: var(--lm-surface); border-radius: 14px;
          box-shadow: var(--lm-shadow-sm); padding: 16px 18px;
          font-size: 15px; font-weight: 500; color: var(--lm-ink);
          display: flex; align-items: center; gap: 10px;
        }
        .lm-dot { width: 7px; height: 7px; border-radius: 99px; background: var(--lm-blue); flex: none; }

        /* ---- Hero ---- */
        .lm-hero { text-align: center; padding: 72px 0 56px; }
        @media (max-width: 640px) { .lm-hero { padding: 48px 0 36px; } }
        .lm-hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }
        .lm-hero-cta .lm-btn { min-width: 200px; }
        @media (max-width: 420px) {
          .lm-hero-cta { flex-direction: column; align-items: stretch; }
          .lm-hero-cta .lm-btn { min-width: 0; width: 100%; }
        }

        /* ---- Stats (slim inline row) ---- */
        .lm-stat-row {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 8px 28px;
        }
        .lm-stat { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .lm-stat-n { font-size: 26px; font-weight: 700; letter-spacing: -0.03em; color: var(--lm-ink); line-height: 1; }
        .lm-stat-l { font-size: 13px; color: var(--lm-ink-3); }
        .lm-stat-div { width: 1px; height: 30px; background: var(--lm-hairline); }
        @media (max-width: 560px) {
          .lm-stat-div { display: none; }
          .lm-stat-row { gap: 18px 28px; }
        }

        /* ---- Steps (numbered — real sequence) ---- */
        .lm-step-num {
          width: 38px; height: 38px; border-radius: 12px;
          display: inline-flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 17px; color: var(--lm-blue);
          background: rgba(10,132,255,0.10); margin: 0 auto;
        }

        /* ---- Pricing highlight ---- */
        .lm-price { font-size: 34px; font-weight: 700; letter-spacing: -0.03em; color: var(--lm-ink); }

        /* ---- Testimonials marquee ---- */
        .lm-marquee-mask { position: relative; }
        .lm-marquee-mask::before, .lm-marquee-mask::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 56px; z-index: 2; pointer-events: none;
        }
        .lm-marquee-mask::before { left: 0; background: linear-gradient(to right, var(--lm-bg), transparent); }
        .lm-marquee-mask::after { right: 0; background: linear-gradient(to left, var(--lm-bg), transparent); }
        .lm-scroller {
          display: flex; gap: 18px; padding: 4px 24px;
          overflow-x: auto; overflow-y: hidden;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
          cursor: grab; scrollbar-width: none; -ms-overflow-style: none;
        }
        .lm-scroller::-webkit-scrollbar { display: none; }
        .lm-scroller:active { cursor: grabbing; }
        .lm-scroller .lm-quote-card { scroll-snap-align: center; }
        .lm-quote-card {
          width: 360px; flex: none; background: var(--lm-surface);
          border-radius: var(--lm-radius-card); box-shadow: var(--lm-shadow-sm);
          padding: 26px;
        }
        @media (max-width: 480px) { .lm-quote-card { width: 290px; } }
        .lm-stars { display: flex; gap: 3px; margin-bottom: 14px; color: #ff9f0a; font-size: 15px; }

        /* ---- Profile (About) ---- */
        .lm-about-grid { display: grid; grid-template-columns: 240px 1fr; gap: 44px; align-items: center; }
        @media (max-width: 760px) { .lm-about-grid { grid-template-columns: 1fr; text-align: center; justify-items: center; } }
        .lm-avatar {
          width: 184px; height: 184px; border-radius: 40px; object-fit: cover;
          box-shadow: var(--lm-shadow-md);
        }

        /* ---- Booking iframe frame ---- */
        .lm-iframe-frame {
          border-radius: var(--lm-radius-card); overflow: hidden;
          background: var(--lm-surface); box-shadow: var(--lm-shadow-md);
        }
        .lm-iframe-frame iframe { width: 100%; display: block; border: 0; }

        /* ---- Back to top (floating, frosted) ---- */
        .lm-top {
          position: fixed; right: 20px; bottom: 22px; z-index: 60;
          width: 46px; height: 46px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(28,28,30,0.78); color: #fff; text-decoration: none;
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
          box-shadow: var(--lm-shadow-md); font-size: 19px;
          transition: transform 0.3s var(--lm-spring), opacity 0.3s ease;
        }
        .lm-top:active { transform: scale(0.9); }

        /* ---- Footer ---- */
        .lm-footer { padding: 40px 0 56px; text-align: center; }

        /* ---- Reveal on scroll ---- */
        .lm-reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.7s var(--lm-spring), transform 0.7s var(--lm-spring); }
        .lm-reveal.is-in { opacity: 1; transform: none; }
        .lm-reveal.d1 { transition-delay: 0.06s; }
        .lm-reveal.d2 { transition-delay: 0.12s; }
        .lm-reveal.d3 { transition-delay: 0.18s; }

        /* FAQ accordion */
        .lm-faq-list { max-width: 720px; margin: 28px auto 0; display: flex; flex-direction: column; gap: 12px; }
        .lm-faq-item {
          background: var(--lm-surface); border-radius: 16px;
          box-shadow: var(--lm-shadow-sm); overflow: hidden;
        }
        .lm-faq-q {
          width: 100%; border: none; background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 20px 22px; text-align: left; font-family: inherit;
          font-size: 17px; font-weight: 600; letter-spacing: -0.015em; color: var(--lm-ink);
        }
        .lm-faq-q:hover { background: rgba(120,120,128,0.05); }
        .lm-faq-chev {
          flex: none; width: 22px; height: 22px; color: var(--lm-ink-3);
          transition: transform 0.35s var(--lm-spring);
        }
        .lm-faq-item.is-open .lm-faq-chev { transform: rotate(180deg); }
        .lm-faq-a {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s var(--lm-spring);
        }
        .lm-faq-item.is-open .lm-faq-a { grid-template-rows: 1fr; }
        .lm-faq-a-inner { overflow: hidden; }
        .lm-faq-a p { margin: 0; padding: 0 22px 20px; }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .lm-marquee-track { animation: none; }
          .lm-scroller { scroll-behavior: auto; }
          .lm-reveal { opacity: 1; transform: none; transition: none; }
          .lm-btn, .lm-top { transition: none; }
          .lm-panel, .lm-burger span, .lm-backdrop { transition: none; }
          .lm-faq-chev, .lm-faq-a { transition: none; }
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <header className="lm-header">
        <div className="lm-header-inner">
          <button
            className={`lm-burger${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
          <a href="#/" className="lm-brand">
            <img src="/favicon2.svg" alt="Larsen Math Academy logo" />
            <span>Larsen Math Academy</span>
          </a>
          <nav className="lm-nav">
            <a href="#/about">About</a>
            <a href="#/resources">Resources</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="#/book" className="is-book">Book</a>
          </nav>
        </div>
      </header>

      {/* ===== Mobile slide-in menu ===== */}
      <div
        className={`lm-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`lm-panel${menuOpen ? " is-open" : ""}`} aria-label="Mobile" aria-hidden={!menuOpen}>
        <button className="lm-panel-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
        <a href="#/" onClick={() => setMenuOpen(false)}>
          <svg className="lm-panel-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </a>
        <a href="#/about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#/resources" onClick={() => setMenuOpen(false)}>Resources</a>
        <a href={whatsappLink} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp</a>
        <a href="#/book" className="is-book" onClick={() => setMenuOpen(false)}>Book a lesson</a>
      </nav>

      {/* ================= ABOUT ================= */}
      {page === "#/about" ? (
        <main>
          <section className="lm-section">
            <div className="lm-wrap lm-reveal">
              <div className="lm-about-grid">
                <img
                  src="/larsen-profile.webp"
                  alt="Larsen, maths tutor at Larsen Math Academy"
                  className="lm-avatar"
                />
                <div>
                  <p className="lm-eyebrow">About Larsen Math Academy</p>
                  <h1 className="lm-h1" style={{ marginTop: 14 }}>
                    Clear, patient Maths support for Grade 10–12 learners
                  </h1>
                  <p className="lm-lead" style={{ marginTop: 20 }}>
                    Hi, I’m Larsen. I help Grade 10–12 learners understand Maths
                    through clear explanations, structured practice, and patient
                    support. My lessons are designed for learners who want to
                    improve confidence, prepare for tests and exams, or close
                    gaps from earlier topics.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="lm-section-tight">
            <div className="lm-wrap lm-reveal">
              <div className="lm-grid-3">
                {[
                  ["Teaching style", "Lessons focus on simple explanations, guided examples, and enough practice for learners to gain confidence."],
                  ["Who I help", "I support Grade 10–12 learners studying IEB, CAPS, or Cambridge International Maths."],
                  ["Lesson format", "Lessons are held online via Microsoft Teams, with availability and pricing confirmed before booking."],
                ].map(([title, body]) => (
                  <div key={title} className="lm-card">
                    <h2 className="lm-h3">{title}</h2>
                    <p className="lm-body" style={{ marginTop: 12 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lm-section">
            <div className="lm-wrap lm-reveal">
              <div className="lm-card" style={{ padding: 34 }}>
                <h2 className="lm-h2">Contact details</h2>
                <div className="lm-grid-2" style={{ marginTop: 22 }}>
                  <p className="lm-body">
                    <strong style={{ color: "var(--lm-ink)" }}>WhatsApp:</strong>{" "}
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="lm-link" style={{ color: "var(--lm-green)" }}>
                      +27 79 408 3205
                    </a>
                  </p>
                  <p className="lm-body">
                    <strong style={{ color: "var(--lm-ink)" }}>Email:</strong>{" "}
                    <a href="mailto:larsenmbhoni@gmail.com" className="lm-link">larsenmbhoni@gmail.com</a>
                  </p>
                  <p className="lm-body"><strong style={{ color: "var(--lm-ink)" }}>Lessons:</strong> Online via Microsoft Teams</p>
                  <p className="lm-body"><strong style={{ color: "var(--lm-ink)" }}>Response time:</strong> Within 24 hours</p>
                </div>
                <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="#/book" className="lm-btn lm-btn-blue">Book a lesson</a>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="lm-btn lm-btn-green">Chat on WhatsApp</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : page === "#/resources" ? (
        /* ================= RESOURCES ================= */
        <main>
          <section className="lm-section" style={{ textAlign: "center" }}>
            <div className="lm-narrow lm-reveal">
              <p className="lm-eyebrow">Free Maths Resources</p>
              <h1 className="lm-h1" style={{ marginTop: 14 }}>
                Helpful links for Grade 10–12 Maths practice
              </h1>
              <p className="lm-lead" style={{ marginTop: 18 }}>
                These resources can help learners practise between lessons,
                revise topics, explore graphs, and prepare for tests and exams.
              </p>
            </div>
          </section>

          <section className="lm-section-tight">
            <div className="lm-wrap lm-reveal">
              <div className="lm-grid-2">
                <div className="lm-card">
                  <h2 className="lm-h3">Past papers</h2>
                  <ul className="lm-reslist">
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers.aspx">DBE / CAPS past papers</a>
                      <span className="lm-resnote">Official national exam papers and memos, Grade 12.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.advantagelearn.com/grade-12-past-exam-papers/">Advantage Learn past papers</a>
                      <span className="lm-resnote">DBE and IEB papers in one easy-to-filter library.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.ieb.co.za/">IEB past papers (official)</a>
                      <span className="lm-resnote">IEB papers via the “NSC Public Resources” login.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/">Cambridge International</a>
                      <span className="lm-resnote">Specimen papers and syllabus for IGCSE / AS &amp; A Level.</span>
                    </li>
                  </ul>
                </div>

                <div className="lm-card">
                  <h2 className="lm-h3">Practice and revision</h2>
                  <ul className="lm-reslist">
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.siyavula.com/">Siyavula Practice</a>
                      <span className="lm-resnote">Free, CAPS-aligned questions with instant feedback. Zero-rated on major SA networks.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://olico.org/">OLICO Maths</a>
                      <span className="lm-resnote">SA non-profit with 50,000+ practice questions and a free WhatsApp Maths Hotline: 0600 39 00 00.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.khanacademy.org/math">Khan Academy</a>
                      <span className="lm-resnote">Video lessons and practice across every topic.</span>
                    </li>
                  </ul>
                </div>

                <div className="lm-card">
                  <h2 className="lm-h3">Video explanations</h2>
                  <ul className="lm-reslist">
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://learn.mindset.africa/">Mindset Learn</a>
                      <span className="lm-resnote">SA curriculum video lessons and exam walkthroughs.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.youtube.com/results?search_query=grade+12+maths+caps+south+africa">Grade 10–12 Maths on YouTube</a>
                      <span className="lm-resnote">Topic-by-topic worked examples to revise a method.</span>
                    </li>
                  </ul>
                </div>

                <div className="lm-card">
                  <h2 className="lm-h3">NBT preparation</h2>
                  <ul className="lm-reslist">
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://nbt.ac.za/content/preparing-your-learners-0">NBT Project (official)</a>
                      <span className="lm-resnote">Free prep booklets for the MAT and AQL tests, from the people who set the NBT.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://learn.olico.org/course/index.php?categoryid=30">OLICO NBT practice</a>
                      <span className="lm-resnote">Free, peer-reviewed NBT workbook plus two full mock MAT papers.</span>
                    </li>
                  </ul>
                </div>

                <div className="lm-card">
                  <h2 className="lm-h3">Graphing and visual tools</h2>
                  <ul className="lm-reslist">
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.desmos.com/calculator">Desmos Graphing Calculator</a>
                      <span className="lm-resnote">Plot functions instantly to see how graphs behave.</span>
                    </li>
                    <li>
                      <a className="lm-link" target="_blank" rel="noreferrer" href="https://www.geogebra.org/">GeoGebra</a>
                      <span className="lm-resnote">Interactive geometry, algebra and calculus.</span>
                    </li>
                  </ul>
                </div>

                <div className="lm-card">
                  <h2 className="lm-h3">How to use these resources</h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 10 }} className="lm-body">
                    <li>Start with the topic you are struggling with.</li>
                    <li>Use videos or notes to revise the method.</li>
                    <li>Practise with Siyavula or OLICO questions.</li>
                    <li>Use past papers once the basics are clearer.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="lm-section" style={{ textAlign: "center" }}>
            <div className="lm-narrow lm-reveal">
              <h2 className="lm-h2">Need guided help?</h2>
              <p className="lm-lead" style={{ marginTop: 12 }}>
                Free resources are useful, but lessons can take a learner further.
              </p>
              <a href="#/book" className="lm-btn lm-btn-blue" style={{ marginTop: 26 }}>Book a lesson</a>
            </div>
          </section>
        </main>
      ) : page === "#/book" ? (
        /* ================= BOOK ================= */
        <main>
          <section className="lm-section">
            <div className="lm-narrow lm-reveal">
              <h1 className="lm-h1" style={{ textAlign: "center" }}>Book a lesson</h1>
              <p className="lm-lead" style={{ marginTop: 16, textAlign: "center" }}>
                I’ll reply within 24 hours with availability and next steps.
              </p>
              <div className="lm-iframe-frame" style={{ marginTop: 28 }}>
                <iframe
                  data-tally-src="https://tally.so/embed/xXNLLE?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  src="https://tally.so/embed/xXNLLE?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  title="Book a lesson"
                  loading="lazy"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                />
              </div>
              <p className="lm-caption" style={{ marginTop: 16, textAlign: "center" }}>
                No commitment. No upfront payment.
              </p>
            </div>
          </section>
        </main>
      ) : (
        /* ================= HOME ================= */
        <main id="top">
          {/* HERO */}
          <section className="lm-hero">
            <div className="lm-wrap">
              <p className="lm-eyebrow">Online Maths tutoring · Grade 10–12</p>
              <h1 className="lm-h1" style={{ marginTop: 16 }}>
                Maths that finally<br />makes sense.
              </h1>
              <p className="lm-lead" style={{ marginTop: 20, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                Clear explanations, structured online lessons, and patient
                support to help IEB, CAPS and Cambridge learners build
                confidence, exam readiness, and better marks.
              </p>
              <div className="lm-hero-cta">
                <a href="#/book" className="lm-btn lm-btn-blue">Book a lesson</a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="lm-btn lm-btn-green">Chat on WhatsApp</a>
              </div>
              <p className="lm-caption" style={{ marginTop: 16 }}>
                Online via Microsoft Teams · Availability and pricing confirmed before booking
              </p>
            </div>
          </section>

          {/* CREDIBILITY */}
          <section className="lm-section-tight">
            <div className="lm-wrap lm-reveal">
              <div className="lm-stat-row">
                <div className="lm-stat">
                  <span className="lm-stat-n">500+</span>
                  <span className="lm-stat-l">Hours of 1:1 tutoring</span>
                </div>
                <span className="lm-stat-div" />
                <div className="lm-stat">
                  <span className="lm-stat-n">8+</span>
                  <span className="lm-stat-l">Years of experience</span>
                </div>
                <span className="lm-stat-div" />
                <div className="lm-stat">
                  <span className="lm-stat-n">Verified</span>
                  <span className="lm-stat-l">Tutor on TeachMe2</span>
                </div>
              </div>
              <p className="lm-caption" style={{ marginTop: 18, textAlign: "center", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
                Larsen has tutored through multiple platforms, including
                TeachMe2, one of South Africa’s leading tutoring services.{" "}
                <a href="https://www.teachme2.co.za/tutors/larsen-30528" target="_blank" rel="noreferrer" className="lm-link">View profile</a>
              </p>
            </div>
          </section>

          {/* WHO THIS IS FOR */}
          <section className="lm-section">
            <div className="lm-wrap lm-reveal">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>Who this is for</h2>
              <div className="lm-grid-2" style={{ marginTop: 28 }}>
                {[
                  "Learners who struggle to understand concepts in class",
                  "Learners preparing for tests, exams, and past-paper practice",
                  "Learners who need structured weekly maths support",
                  "Grade 10–12 learners studying IEB, CAPS, or Cambridge International",
                ].map((item) => (
                  <div key={item} className="lm-pill">
                    <span className="lm-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OFFER */}
          <section className="lm-section">
            <div className="lm-wrap lm-reveal">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>Choose a lesson format</h2>
              <div className="lm-grid-2" style={{ marginTop: 28 }}>
                <div className="lm-card">
                  <h3 className="lm-h3">Private Lessons (1:1)</h3>
                  <p className="lm-body" style={{ marginTop: 12 }}>
                    Personalised support focused on your learner’s exact gaps and goals.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "grid", gap: 10 }} className="lm-body">
                    <li>Fully tailored sessions</li>
                    <li>Faster progress</li>
                    <li>Limited availability</li>
                  </ul>
                </div>
                <div className="lm-card">
                  <h3 className="lm-h3">Group Sessions</h3>
                  <p className="lm-body" style={{ marginTop: 12 }}>
                    Structured lessons covering key topics with other learners.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "grid", gap: 10 }} className="lm-body">
                    <li>Fridays, Saturdays, Sundays</li>
                    <li>More affordable option</li>
                    <li>Strong foundations built weekly</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="lm-section">
            <div className="lm-wrap lm-reveal">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>Pricing</h2>
              <p className="lm-lead" style={{ marginTop: 12, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                Confirmed before booking, based on lesson format, frequency, and the learner’s needs.
              </p>
              <div className="lm-grid-2" style={{ marginTop: 28 }}>
                <div className="lm-card">
                  <h3 className="lm-h3">Private Lessons</h3>
                  <p className="lm-price" style={{ marginTop: 12 }}>From R250<span style={{ fontSize: 17, color: "var(--lm-ink-3)", fontWeight: 500 }}> / hr</span></p>
                  <p className="lm-body" style={{ marginTop: 12 }}>
                    Best for personalised support, weak topics, exam preparation, and focused one-on-one guidance.
                  </p>
                </div>
                <div className="lm-card">
                  <h3 className="lm-h3">Group Sessions</h3>
                  <p className="lm-price" style={{ marginTop: 12 }}>More affordable</p>
                  <p className="lm-body" style={{ marginTop: 12 }}>
                    Best for structured weekly practice with other learners. Pricing depends on the group schedule and session length.
                  </p>
                </div>
              </div>
              <p className="lm-caption" style={{ marginTop: 20, textAlign: "center" }}>
                No commitment. No upfront payment before details are confirmed.
              </p>
            </div>
          </section>

          {/* HOW IT WORKS — real 3-step sequence, numbering earns its place */}
          <section className="lm-section">
            <div className="lm-mid lm-reveal">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>How it works</h2>
              <div className="lm-grid-3" style={{ marginTop: 28, textAlign: "center" }}>
                {[
                  ["1", "Send a request", "Tell me the learner’s grade and challenges."],
                  ["2", "Get options", "I’ll suggest private or group sessions."],
                  ["3", "Start lessons", "All sessions run online via Microsoft Teams."],
                ].map(([n, title, body]) => (
                  <div key={n}>
                    <div className="lm-step-num">{n}</div>
                    <div className="lm-h3" style={{ marginTop: 14 }}>{title}</div>
                    <p className="lm-body" style={{ marginTop: 8 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TOPICS */}
          <section className="lm-section">
            <div className="lm-wrap lm-reveal">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>Topics covered</h2>
              <p className="lm-lead" style={{ marginTop: 12, textAlign: "center" }}>
                Lessons can focus on weekly support, exam revision, or specific weak areas.
              </p>
              <div className="lm-chips" style={{ marginTop: 24 }}>
                {[
                  "Algebra", "Functions and graphs", "Trigonometry", "Calculus",
                  "Analytical geometry", "Euclidean geometry",
                  "Probability and statistics", "Past papers", "Exam revision",
                  "NBT preparation",
                ].map((topic) => (
                  <span key={topic} className="lm-chip">{topic}</span>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="lm-section" style={{ overflow: "hidden" }}>
            <div className="lm-wrap">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>What parents and learners say</h2>
            </div>
            <div className="lm-marquee-mask" style={{ marginTop: 28 }}>
              <div className="lm-scroller" ref={scrollerRef}>
                {duplicatedTestimonials.map((item, index) => (
                  <div key={`${item.author}-${index}`} className="lm-quote-card">
                    <div className="lm-stars" aria-label="Rated 5 out of 5 stars">★★★★★</div>
                    <p className="lm-body" style={{ color: "var(--lm-ink)" }}>“{item.quote}”</p>
                    <div className="lm-caption" style={{ marginTop: 16, fontWeight: 600 }}>— {item.author}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lm-wrap">
              <p className="lm-caption" style={{ marginTop: 24, textAlign: "center" }}>
                Touch or hover to pause, then swipe to read at your own pace.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="lm-section">
            <div className="lm-mid lm-reveal">
              <h2 className="lm-h2" style={{ textAlign: "center" }}>Frequently asked questions</h2>
              <div className="lm-faq-list">
                {[
                  ["Do you offer online lessons?", "Yes. All lessons run online via Microsoft Teams."],
                  ["Which grades do you tutor?", "Larsen Math Academy focuses on Grade 10–12 Maths."],
                  ["Which curricula do you support?", "Lessons support IEB, CAPS, and Cambridge International learners."],
                  ["Do you help with exam revision?", "Yes. Lessons can focus on exam preparation, past papers, weak topics, or weekly support."],
                  ["Do you prepare learners for the NBT?", "Yes. Lessons can include National Benchmark Test (NBT) preparation for the Mathematics and Quantitative Literacy sections, focused on the question styles and timing learners face."],
                  ["How do I book a lesson?", "Send a request with the learner’s grade, curriculum, and what they need help with."],
                  ["Do I have to pay upfront?", "No. Availability and pricing are confirmed before booking."],
                ].map(([q, a], i) => (
                  <div key={q} className={`lm-faq-item${openFaqs[i] ? " is-open" : ""}`}>
                    <button
                      className="lm-faq-q"
                      aria-expanded={!!openFaqs[i]}
                      onClick={() => toggleFaq(i)}
                    >
                      <span>{q}</span>
                      <svg className="lm-faq-chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="lm-faq-a">
                      <div className="lm-faq-a-inner">
                        <p className="lm-body">{a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CLOSING CTA */}
          <section className="lm-section" style={{ paddingTop: 16 }}>
            <div className="lm-narrow lm-reveal">
              <div className="lm-card" style={{ textAlign: "center", padding: 40, background: "var(--lm-ink)", boxShadow: "var(--lm-shadow-md)" }}>
                <h2 className="lm-h2" style={{ color: "#fff" }}>Ready to start?</h2>
                <p className="lm-lead" style={{ color: "rgba(255,255,255,0.72)", marginTop: 12 }}>
                  Send a request and I’ll reply within 24 hours.
                </p>
                <div style={{ marginTop: 26, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="#/book" className="lm-btn" style={{ background: "#fff", color: "var(--lm-ink)" }}>Book a lesson</a>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="lm-btn lm-btn-green">Chat on WhatsApp</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="lm-footer">
        <div className="lm-wrap">
          <p className="lm-caption">
            © {new Date().getFullYear()} Larsen Math Academy · Online Maths tutoring, Grade 10–12
          </p>
        </div>
      </footer>

      {/* ================= BACK TO TOP ================= */}
      {showTopButton && (
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="lm-top"
          aria-label="Back to top"
        >
          ↑
        </a>
      )}
    </div>
  );
}
