// Sơ đồ minh họa khối xe nghi trượng, vẽ như hình chiếu đứng có kích thước.
// Mọi nét đều là <path pathLength=1> để CSS (.draw) vẽ nét tuần tự khi tải trang.

const ink = "currentColor";
const red = "#d52b1e";

const rect = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y}h${w}v${h}h${-w}Z`;
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
const line = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1}L${x2} ${y2}`;

function Stroke({
  d,
  delay,
  color = ink,
  width = 1.6,
}: {
  d: string;
  delay: number;
  color?: string;
  width?: number;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={width}
      style={{ "--d": delay } as React.CSSProperties}
    />
  );
}

function Reveal({ delay, children, ...rest }: React.SVGProps<SVGGElement> & { delay: number }) {
  return (
    <g className="reveal" style={{ "--d": delay } as React.CSSProperties} {...rest}>
      {children}
    </g>
  );
}

const label = { fontFamily: "var(--font-code)", fontSize: 11 } as const;


export function HeroDrawing({ label: caption, title }: { label: string; title: string }) {
  return (
    <figure>
      <svg
        viewBox="0 0 540 340"
        className="draw h-auto w-full text-bone"
        role="img"
        aria-labelledby="hero-drawing-title"
      >
        <title id="hero-drawing-title">{title}</title>

        <Reveal delay={0}>
          <text x="40" y="22" {...label} fontSize={9.5} letterSpacing={1} fill="currentColor" opacity={0.55}>
            {caption}
          </text>
          {/* Trục đối xứng */}
          <path d={line(255, 34, 255, 300)} stroke={red} strokeDasharray="6 4" />
        </Reveal>

        {/* Biểu tượng tròn trên đỉnh */}
        <Stroke d={circle(255, 92, 54)} delay={150} />
        <Stroke d={circle(255, 92, 38)} delay={300} width={1.4} />
        <Stroke d={line(201, 92, 309, 92)} delay={450} width={1.2} />

        {/* Bệ trụ và các tầng đế */}
        <Stroke d={rect(215, 146, 80, 34)} delay={400} />
        <Stroke d={rect(160, 180, 190, 26)} delay={550} />
        <Stroke d={rect(120, 206, 270, 26)} delay={700} />

        {/* Sàn xe và cabin */}
        <Stroke d={rect(70, 232, 380, 30)} delay={850} />
        <Stroke d="M70 232V210H110L120 222" delay={950} />

        {/* Bánh xe */}
        {[118, 402].map((cx, i) => (
          <g key={cx}>
            <Stroke d={circle(cx, 274, 17)} delay={1000 + i * 100} />
            <Stroke d={circle(cx, 274, 5)} delay={1100 + i * 100} width={1.2} />
          </g>
        ))}

        {/* Mặt đất */}
        <Reveal delay={900}>
          <path d={line(40, 291, 480, 291)} stroke="currentColor" opacity={0.35} strokeDasharray="2 4" />
        </Reveal>

        {/* Kích thước L */}
        <Stroke d={line(70, 268, 70, 322)} delay={1300} color={red} width={1} />
        <Stroke d={line(450, 268, 450, 322)} delay={1300} color={red} width={1} />
        <Stroke d={line(70, 314, 450, 314)} delay={1400} color={red} width={1} />
        <Reveal delay={1700} fill={red}>
          <path d="M70 314l8-3v6z" />
          <path d="M450 314l-8-3v6z" />
          <text x="255" y="333" {...label} textAnchor="middle">L</text>
        </Reveal>

        {/* Kích thước H */}
        <Stroke d={line(312, 38, 500, 38)} delay={1350} color={red} width={1} />
        <Stroke d={line(456, 262, 500, 262)} delay={1350} color={red} width={1} />
        <Stroke d={line(492, 38, 492, 262)} delay={1450} color={red} width={1} />
        <Reveal delay={1750} fill={red}>
          <path d="M492 38l-3 8h6z" />
          <path d="M492 262l-3-8h6z" />
          <text x="504" y="154" {...label}>H</text>
        </Reveal>

        {/* Chú thích B */}
        <Stroke d={line(293, 54, 340, 22)} delay={1500} color={red} width={1} />
        <Reveal delay={1800} fill={red}>
          <circle cx="293" cy="54" r="2.5" />
          <text x="344" y="22" {...label}>B</text>
        </Reveal>
      </svg>
    </figure>
  );
}
