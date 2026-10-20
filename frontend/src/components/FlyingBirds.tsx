// Chim Lạc (ảnh chim_hat1) bay vòng quanh một khung ảnh.
// Lớp SVG phủ đúng khung ảnh tỷ lệ 5:4 (viewBox 500×400) nên chim không bị méo ở mọi cỡ màn hình;
// quỹ đạo rộng hơn khung để chim lượn ra ngoài mép ảnh. Chỉ dùng hoạt ảnh SVG, không cần JavaScript.

// Ảnh chim (mỏ hướng sang phải), canh giữa tại gốc tọa độ và xoay cho thân nằm ngang.
function BirdImage() {
  return (
    <image
      href="/images/chim_hat1.webp"
      x={-45}
      y={-25}
      width={90}
      height={50}
      transform="rotate(14)"
      className="light:[filter:saturate(1.8)_brightness(0.68)_drop-shadow(0_0_0.5px_rgb(0_0_0/0.45))]"
    />
  );
}

// Một con chim bay theo quỹ đạo `orbit`. Lớp ngoài di chuyển, lớp giữa lật hướng khi bay
// sang trái (nửa sau quỹ đạo), lớp trong nhấp nhô như đang vỗ cánh.
function Bird({ orbit, dur, begin, scale }: { orbit: string; dur: number; begin: number; scale: number }) {
  const timing = { dur: `${dur}s`, begin: `${begin}s`, repeatCount: "indefinite" } as const;
  return (
    <g opacity={0}>
      <animate attributeName="opacity" from="0" to="1" begin="0.6s" dur="0.8s" fill="freeze" />
      <animateMotion {...timing} rotate="0">
        <mpath href={`#${orbit}`} />
      </animateMotion>
      <g transform={`scale(${scale})`}>
        <g>
          <animateTransform attributeName="transform" type="scale" values="1 1;-1 1" keyTimes="0;0.5" calcMode="discrete" {...timing} />
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.4s" repeatCount="indefinite" />
            <BirdImage />
          </g>
        </g>
      </g>
    </g>
  );
}

export function BirdsAroundPhoto() {
  return (
    <svg
      viewBox="0 0 500 400"
      aria-hidden="true"
      data-loop
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        {/* Elip theo chiều kim đồng hồ: nửa trên bay sang phải, nửa dưới bay sang trái */}
        <path id="photo-orbit-1" d="M-40 200A290 235 0 0 1 540 200A290 235 0 0 1 -40 200" />
        <path id="photo-orbit-2" d="M-10 170A260 200 0 0 1 510 170A260 200 0 0 1 -10 170" />
      </defs>
      <g className="birds">
        <Bird orbit="photo-orbit-1" dur={18} begin={-3} scale={1} />
        <Bird orbit="photo-orbit-2" dur={18} begin={-12} scale={0.7} />
      </g>
    </svg>
  );
}
