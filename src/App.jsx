import { useEffect, useRef, useState } from "react";

// ====== ТУТ МЕНЯЕШЬ ВСЁ СВОЁ ======
// Положи файлы в src/assets, импортируй и впиши ниже, например:
import photo1 from "./assets/love-1.jpeg";
import photo2 from "./assets/love-2.jpeg";
import photo3 from "./assets/love-3.jpeg";
import photo4 from "./assets/love-4.jpeg";
import photo5 from "./assets/love-5.jpeg";
import photo6 from "./assets/love-6.jpeg";
import video from "./assets/love-video.mp4";
  import music from './assets/Aigerim.mp3'
const NAME = "Любимая, моя Айгерим";
const RUNNING =
  "Ты — моё самое лучшее «сегодня» ♥ Люблю тебя больше, чем вчера ♥ ";
const PHOTOS = [photo1, photo2, photo3, photo4, photo5, photo6];
const VIDEO = video;
const MUSIC = music; 
// ===================================

const TONES = [
  ["#ffb7cf", "#c6b3ff"],
  ["#a9c8ff", "#ffd0e0"],
  ["#d7c3ff", "#ffc2d6"],
  ["#ffd6c2", "#c6b3ff"],
  ["#b9d0ff", "#e9c2ff"],
  ["#ffc2d6", "#a9c8ff"],
];

const placeholder = (i) => {
  const c = TONES[i % 6];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="300" height="400" fill="url(#g)"/><path d="M150 250c-52-38-75-64-75-94 0-23 18-39 38-39 17 0 31 10 37 25 6-15 20-25 37-25 20 0 38 16 38 39 0 30-23 56-75 94z" fill="#fff" fill-opacity=".85"/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500;1,600&family=Manrope:wght@400;600&display=swap');
.sk{--sky:#dbe8ff;--lav:#e9deff;--blush:#ffdfe9;--ink:#3a2a5c;--soft:#6f5f93;--rose:#e0507a;--glass:rgba(255,255,255,.55);
position:relative;min-height:100vh;overflow-x:hidden;background-color:var(--sky);color:var(--ink);font-family:'Manrope',system-ui,sans-serif;line-height:1.6}
.sk *{box-sizing:border-box}
.sk .bg{position:fixed;inset:0;z-index:0;background:linear-gradient(180deg,var(--sky),var(--lav) 55%,var(--blush));pointer-events:none}
.sk .blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.75;animation:sk-drift 18s ease-in-out infinite alternate}
.sk .b1{width:46vmax;height:46vmax;background:#ffc2d6;left:-12vmax;top:-10vmax}
.sk .b2{width:40vmax;height:40vmax;background:#b9d0ff;right:-14vmax;top:30vh;animation-delay:-6s}
.sk .b3{width:34vmax;height:34vmax;background:#d7c3ff;left:10vw;bottom:-14vmax;animation-delay:-11s}
@keyframes sk-drift{to{transform:translate(6vmax,4vmax) scale(1.12)}}
.sk .page{position:relative;z-index:1}
.sk h1,.sk h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-style:italic;margin:0}
.sk .hero{min-height:88vh;display:grid;place-items:center;text-align:center;padding:10vh 20px 4vh}
.sk .hero h1{font-size:clamp(4rem,17vw,11rem);line-height:.95;letter-spacing:-.02em}
.sk .hero p{max-width:30ch;margin:18px auto 0;color:var(--soft);font-size:1.05rem}
.sk .band{overflow:hidden;white-space:nowrap;padding:8px 0}
.sk .band span{display:inline-block;padding-left:100%;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(3rem,9vw,6.5rem);color:transparent;-webkit-text-stroke:1.2px var(--rose);animation:sk-run 30s linear infinite}
.sk .band.rev span{animation-direction:reverse;-webkit-text-stroke:0;color:var(--rose);opacity:.85}
@keyframes sk-run{to{transform:translateX(-100%)}}
.sk section{max-width:1000px;margin:0 auto;padding:9vh 20px 3vh}
.sk h2{font-size:clamp(2.4rem,7vw,3.8rem);margin-bottom:26px;text-align:center}
.sk .gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px 22px}
.sk .arch{aspect-ratio:3/4;border-radius:999px 999px 18px 18px;overflow:hidden;background:var(--glass);border:6px solid rgba(255,255,255,.8);box-shadow:0 24px 50px -24px rgba(90,60,150,.5);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.sk .arch:nth-child(3n+2){margin-top:34px}
.sk .arch:hover{transform:translateY(-8px) rotate(-1deg)}
.sk .arch img{width:100%;height:100%;object-fit:cover;display:block}
.sk .frame{border-radius:28px;padding:10px;background:var(--glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.9);box-shadow:0 30px 60px -30px rgba(90,60,150,.5)}
.sk .frame video,.sk .vph{width:100%;aspect-ratio:16/9;border-radius:20px;display:block;background:#000;object-fit:cover}
.sk .vph{background:linear-gradient(135deg,#ffb7cf,#c6b3ff 55%,#a9c8ff);display:grid;place-items:center;color:#fff;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:2rem}
.sk .end{text-align:center;padding:12vh 20px 14vh}
.sk .end h2{font-size:clamp(3rem,10vw,6rem);color:var(--rose);margin:0}
.sk .gate{position:fixed;inset:0;z-index:20;display:grid;place-items:center;border:0;width:100%;padding:20px;font:inherit;color:var(--ink);cursor:pointer;background:linear-gradient(180deg,var(--sky),var(--lav) 55%,var(--blush));transition:opacity 1s,transform 1s}
.sk .gate.out{opacity:0;transform:scale(1.06);pointer-events:none}
.sk .gate .card{background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid #fff;border-radius:32px;padding:clamp(28px,7vw,56px);box-shadow:0 30px 60px -30px rgba(90,60,150,.55)}
.sk .gate h1{font-size:clamp(3.2rem,14vw,6.5rem);line-height:1}
.sk .gate p{margin:10px 0 0;color:var(--soft)}
.sk .gate .heart{font-size:2rem;color:var(--rose);display:block;animation:sk-beat 1.4s ease-in-out infinite}
@keyframes sk-beat{50%{transform:scale(1.25)}}
.sk .gate:focus-visible{outline:3px solid var(--rose);outline-offset:-8px}
.sk .fl{position:fixed;bottom:-30px;z-index:5;color:var(--rose);opacity:.7;pointer-events:none;animation:sk-up linear forwards}
@keyframes sk-up{to{transform:translateY(-115vh) rotate(25deg);opacity:0}}
@media (prefers-reduced-motion:reduce){.sk .blob,.sk .band span,.sk .gate .heart{animation:none}.sk .band span{padding-left:0}.sk .fl{display:none}}
`;

const App = () => {
  const [open, setOpen] = useState(false);
  const [hearts, setHearts] = useState([]);
  const audio = useRef(null);
  const timer = useRef(null);
  const nextId = useRef(0);

  const addHeart = () => {
    const id = nextId.current++;
    const dur = 7 + Math.random() * 6;
    const h = {
      id,
      left: Math.random() * 100,
      size: 14 + Math.random() * 26,
      dur,
    };
    setHearts((a) => [...a, h]);
    setTimeout(
      () => setHearts((a) => a.filter((x) => x.id !== id)),
      dur * 1000,
    );
  };

  const enter = () => {
    setOpen(true);
    if (MUSIC && audio.current) audio.current.play().catch(() => {});
    for (let i = 0; i < 8; i++) setTimeout(addHeart, i * 180);
    timer.current = setInterval(addHeart, 1400);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  const photos = PHOTOS.length ? PHOTOS : [0, 1, 2, 3, 4, 5].map(placeholder);

  return (
    <div className="sk">
      <style>{CSS}</style>

      <div className="bg" aria-hidden="true">
        <i className="blob b1" />
        <i className="blob b2" />
        <i className="blob b3" />
      </div>

      <button className={"gate" + (open ? " out" : "")} onClick={enter}>
        <span className="card">
          <span className="heart">♥</span>
          <h1>Для тебя</h1>
          <p>Нажми, чтобы открыть</p>
        </span>
      </button>

      {MUSIC && <audio ref={audio} src={MUSIC} loop />}

      {hearts.map((h) => (
        <span
          key={h.id}
          className="fl"
          style={{
            left: h.left + "vw",
            fontSize: h.size,
            animationDuration: h.dur + "s",
          }}
        >
          ♥
        </span>
      ))}

      <div className="page">
        <header className="hero">
          <div>
            <h1>{NAME}</h1>
            <p>Маленький уголок интернета, который я сделал только для тебя.</p>
          </div>
        </header>

        <div className="band" aria-hidden="true">
          <span>{RUNNING + RUNNING}</span>
        </div>
        <div className="band rev" aria-hidden="true">
          <span>{RUNNING + RUNNING}</span>
        </div>

        <section>
          <h2>Наши фото</h2>
          <div className="gallery">
            {photos.map((src, i) => (
              <div className="arch" key={i}>
                <img src={src} alt={"Наше фото " + (i + 1)} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Наше видео</h2>
          <div className="frame">
            {VIDEO ? (
              <video src={VIDEO} controls playsInline />
            ) : (
              <div className="vph">тут будет наше видео</div>
            )}
          </div>
        </section>

        <div className="end">
          <h2>С любовью твой муж❤</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
