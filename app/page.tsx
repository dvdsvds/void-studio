"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

const projects = [
  { id: 1, name: "Blossom", sub: "감성 브런치 카페", color: "#c9a87c", bg: "linear-gradient(135deg, #2a1f0e 0%, #0e0a05 100%)", url: "https://brunch-cafe.vercel.app", img: "/brunch-cafe.png" },
  { id: 2, name: "NOIR", sub: "다크 럭셔리 카페", color: "#c9a84c", bg: "linear-gradient(135deg, #1a1200 0%, #080808 100%)", url: "https://dark-luxury.vercel.app", img: "/dark-luxuery.png" },
  { id: 3, name: "Verdure", sub: "내추럴 오가닉 카페", color: "#7a9e7e", bg: "linear-gradient(135deg, #0a150a 0%, #060e06 100%)", url: "https://natural-organic.vercel.app", img: "/natural-organic.png" },
  { id: 4, name: "Côté", sub: "프렌치 비스트로", color: "#c4622d", bg: "linear-gradient(135deg, #1a0c05 0%, #0a0603 100%)", url: "https://bistro-eight.vercel.app", img: "/bistro.png" },
  { id: 5, name: "AURUM", sub: "파인다이닝", color: "#b8960c", bg: "linear-gradient(135deg, #15100a 0%, #080808 100%)", url: "https://fine-dining-lac.vercel.app", img: "/fine-dining.png" },
  { id: 6, name: "酒場", sub: "이자카야", color: "#c0392b", bg: "linear-gradient(135deg, #140505 0%, #080808 100%)", url: "https://izakaya-liard.vercel.app", img: "/izakaya.png" },
  { id: 7, name: "담", sub: "모던 한식당", color: "#9a6b3e", bg: "linear-gradient(135deg, #120c06 0%, #080808 100%)", url: "https://hansik.vercel.app", img: "/hansik.png" },
];

const features = [
  { n: "빠른 납품", d: "기획부터 배포까지 최대 1주" },
  { n: "반응형 보장", d: "모바일·태블릿·데스크톱 완벽 대응" },
  { n: "무제한 수정", d: "납품 전까지 피드백 무제한 반영" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % projects.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const syne = { fontFamily: "'Syne', sans-serif" };
  const p = projects[current];

  return (
    <>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.5rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(8,8,8,0.96)" : "transparent", borderBottom: scrolled ? "1px solid #1a1a1a" : "none", backdropFilter: "blur(12px)", transition: "all 0.4s" }}>
        <div style={{ ...syne, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.12em" }}>VOID STUDIO</div>
        <a href="#contact" style={{ display: "inline-flex", alignItems: "center", background: "#f0ece6", color: "#080808", padding: "0.6rem 1.5rem", fontSize: "0.78rem", textDecoration: "none", ...syne, fontWeight: 600, letterSpacing: "0.05em" }}>문의하기</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 4rem 6rem", position: "relative", overflow: "hidden" }}>

        {/* BG 슬라이드 */}
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, background: p.bg, zIndex: 0 }}>
            {/* 컬러 글로우 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{ position: "absolute", top: "30%", right: "15%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${p.color}18 0%, transparent 65%)`, filter: "blur(40px)" }} />
            {/* 프로젝트명 워터마크 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1 }}
              style={{ position: "absolute", top: "50%", right: "4rem", transform: "translateY(-50%)", ...syne, fontSize: "clamp(5rem,12vw,10rem)", fontWeight: 800, color: `${p.color}12`, letterSpacing: "0.05em", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>
              {p.name}
            </motion.div>
            {/* 서브 레이블 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.5, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: "absolute", bottom: "6rem", right: "4rem", fontSize: "0.72rem", color: p.color, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {p.sub}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* 슬라이드 인디케이터 */}
        <div style={{ position: "absolute", bottom: "6rem", left: "4rem", display: "flex", gap: "0.5rem", zIndex: 2 }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? 24 : 6, height: 2, background: i === current ? "#f0ece6" : "#333", border: "none", cursor: "pointer", padding: 0, transition: "all 0.4s" }} />
          ))}
        </div>

        {/* 텍스트 */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "#444", textTransform: "uppercase", marginBottom: "2.5rem" }}>
            Web Agency · Seoul
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...syne, fontSize: "clamp(3.5rem,7.5vw,7rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
            브랜드의<br />첫인상을<br />만듭니다.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#work" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", background: "#f0ece6", color: "#080808", padding: "0.9rem 2rem", fontSize: "0.82rem", textDecoration: "none", ...syne, fontWeight: 600, letterSpacing: "0.05em" }}>
                작업물 보기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "6rem 4rem", borderTop: "1px solid #141414", background: "#080808" }}>
        <div style={{ display: "flex", gap: "20rem", justifyContent: "center", alignItems: "flex-end" }}>
          {features.map((f, i) => (
            <FadeUp key={f.n} delay={i * 0.08}>
              <div style={{ display: "flex", gap: "6rem", alignItems: "start" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ ...syne, fontSize: "2.5rem", fontWeight: 800, color: "#f0ece6", marginBottom: "0.8rem" }}>{f.n}</div>
                  <div style={{ fontSize: "1rem", color: "#f0ece6", lineHeight: 1.7 }}>{f.d}</div>
                </div>
                {i !== features.length - 1 && <div style={{ width: "1px", height: "100%", background: "#1a1a1a", alignSelf: "stretch" }} />}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "8rem 4rem", borderTop: "1px solid #141414" }}>
        <FadeUp>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4rem" }}>
            <h2 style={{ ...syne, fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700 }}>작업물</h2>
            <span style={{ fontSize: "0.72rem", color: "#444", letterSpacing: "0.1em" }}>카페 · 레스토랑</span>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem", background: "transparent" }}>
          {projects.map((proj, i) => (
            <FadeUp key={proj.id} delay={i * 0.05}>
              <div onMouseEnter={() => setHovered(proj.id)} onMouseLeave={() => setHovered(null)}
                style={{ background: "#080808", cursor: "pointer", transition: "background 0.3s", position: "relative", overflow: "hidden" }}>
                <div style={{ height: 550, position: "relative", overflow: "hidden" }}>
                  <img src={proj.img} alt={proj.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: hovered === proj.id ? "brightness(1.1)" : "brightness(0.8)", transition: "filter 0.4s" }} />
                </div>
                <div style={{ padding: "1.2rem 1.5rem", borderTop: "1px solid #141414", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.9rem", color: "#f0ece6" }}>{proj.sub}</div>
                  <a href={proj.url} target="_blank" style={{ fontSize: "0.72rem", color: hovered === proj.id ? proj.color : "#333", transition: "color 0.3s", textDecoration: "none" }}>보기</a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
      <p style={{ fontSize: "0.72rem", color: "#666", textAlign: "center", marginTop: "2rem", letterSpacing: "0.05em" }}>
        위 작업물은 예시 템플릿입니다.
      </p>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "8rem 4rem", borderTop: "1px solid #141414" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <FadeUp>
            <h2 style={{ ...syne, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, marginBottom: "1rem" }}>프로젝트 문의</h2>
            <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.8, marginBottom: "3rem" }}>24시간 내 답변드립니다.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <form 
              onSubmit={async e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: (form[0] as HTMLInputElement).value,
                    phone: (form[1] as HTMLInputElement).value,
                    business: (form[2] as HTMLInputElement).value,
                    memo: (form[3] as HTMLTextAreaElement).value,
                  }),
                });
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 3000);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[["이름", "text", "홍길동"], ["연락처", "tel", "010-0000-0000"], ["업종", "text", "카페 / 레스토랑 / 기타"]].map(([l, t, p]) => (
                <div key={l} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "#444" }}>{l}</label>
                  <input type={t} placeholder={p} style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", color: "#f0ece6", padding: "0.85rem 1rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none" }} />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "#444" }}>메모</label>
                <textarea rows={4} placeholder="원하시는 사이트를 간단히 설명해주세요" style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", color: "#f0ece6", padding: "0.85rem 1rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", resize: "none" }} />
              </div>
              <button type="submit" style={{ marginTop: "0.5rem", padding: "1rem", background: submitted ? "#1a1a1a" : "#f0ece6", color: submitted ? "#555" : "#080808", border: "none", fontFamily: "'Syne',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.3s" }}>
                {submitted ? "완료 ✓" : "문의 보내기"}
              </button>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 4rem", borderTop: "1px solid #141414", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ ...syne, fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em" }}>VOID STUDIO</div>
        <div style={{ fontSize: "0.72rem", color: "#444" }}>© 2024 Void Studio</div>
      </footer>
    </>
  );
}
