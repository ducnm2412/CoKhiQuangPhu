// Toàn bộ nội dung trang, hai ngôn ngữ: `vi` (gốc) và `en` (bản dịch, cùng cấu trúc).
// Sửa chữ ở đây; TypeScript sẽ báo lỗi nếu bản tiếng Anh thiếu mục so với bản tiếng Việt.
// Các mục đánh dấu "TODO: xác minh" là nội dung tạm, cần thay bằng thông tin thật trước khi đưa lên mạng.

import type { Locale } from "./i18n";

export type Img = { src: string; alt: string; position?: string };

// Thông tin không phụ thuộc ngôn ngữ
export const contact = {
  taxCode: "2300233337",
  email: "contact@gmail.com", // TODO: thay bằng email thật của công ty
  phone: "0222 3867 318",
  phoneHref: "tel:02223867318",
  zaloHref: "https://zalo.me/0961031318",
  facebookHref: "#", // TODO: thay bằng link Fanpage
  mapsHref: "https://maps.app.goo.gl/3jSzaGFSzLRdym8LA",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59584.06496039229!2d106.2234395!3d21.032523549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359e44297fe397%3A0x6c42d9916b1fcc9d!2zTMawxqFuZyBUw6BpLCBC4bqvYyBOaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1790929941093!5m2!1svi!2s",
};

// Đường dẫn ảnh dùng chung cho cả hai ngôn ngữ
const P = {
  a80Night: { src: "/images/a80-khoi-xe-dem.webp" },
  // Cùng ảnh trên, canh vào khối xe để làm ảnh nền đầu trang chủ
  a80Hero: { src: "/images/a80-khoi-xe-dem.webp", position: "48% 62%" },
  a80NewEra: { src: "/images/a80-khoi-xe-ky-nguyen-moi.webp" },
  a80Statue: { src: "/images/a80-tuong-bac-khoi-xe.webp" },
  a80Mausoleum: { src: "/images/a80-tuong-bac-lang.webp", position: "50% 35%" },
  // Cùng ảnh trên nhưng lấy phần khối xe và tượng Bác (bỏ bớt phần Lăng phía trên)
  a80Float: { src: "/images/a80-tuong-bac-lang.webp", position: "50% 80%" },
  a50: { src: "/images/a50-khoi-xe.webp" },
  dbp60: { src: "/images/dbp60-khoi-xe-quoc-huy.webp" },
  dbp70Emblem: { src: "/images/dbp70-khoi-xe-quoc-huy.webp" },
  dbp70Emblem2: { src: "/images/dbp70-khoi-xe-quoc-huy-2.webp" },
  dbp70Soldiers: { src: "/images/dbp70-cum-tuong-chien-si.webp" },
  relief: { src: "/images/khoi-xe-phu-dieu-nghiem-thu.webp" },
  flag: { src: "/images/lap-dat-la-co.webp", position: "50% 55%" },
  hoStanding: { src: "/images/tuong-bac-ho-dung.webp", position: "50% 20%" },
  hoBust: { src: "/images/tuong-ban-than-bac-hoi-truong.webp" },
  hoStage: { src: "/images/tuong-bac-ho-san-van-dong.webp", position: "60% 30%" },
  director: { src: "/images/anh_mau_giam_doc.jpg", position: "50% 18%" },
  qtQuyetTu: { src: "/images/qt-quyet-tu-tuong.webp", position: "50% 40%" },
  qtQuyetTuHandover: { src: "/images/qt-quyet-tu-trao-tang.webp", position: "50% 45%" },
  qtQuyetTuRows: { src: "/images/qt-quyet-tu-hang-loat.webp", position: "50% 50%" },
  qtQuyetTuDetail: { src: "/images/qt-quyet-tu-can-canh.webp", position: "50% 35%" },
  qtBienPhong: { src: "/images/qt-bien-phong-tuong.webp", position: "50% 45%" },
  qtBienPhongDetail: { src: "/images/qt-bien-phong-can-canh.webp", position: "50% 40%" },
  qtBienPhongClay: { src: "/images/qt-bien-phong-phoi-mau.webp", position: "50% 40%" },
  qtBaoChi: { src: "/images/qt-bao-chi-tuong.webp", position: "50% 45%" },
  qtBaoChiPair: { src: "/images/qt-bao-chi-cap-tuong.webp", position: "50% 45%" },
  qtBaoChiBox: { src: "/images/qt-bao-chi-hop-qua.webp", position: "50% 50%" },
};
const img = (key: keyof typeof P, alt: string): Img => ({ ...P[key], alt });

export type ProjectItem = {
  title: string;
  slug: string; // đường dẫn /du-an/[slug] của ngôn ngữ đang xem
  slugs?: { vi: string; en: string }; // slug của từng ngôn ngữ (dự án mới có slug tiếng Anh riêng)
  category: number;
  year: string;
  place: string;
  summary: string; // 1–2 dòng hiện ở thẻ dự án
  body: string; // mô tả đầy đủ ở trang chi tiết
  image: Img;
  images?: Img[]; // ảnh bổ sung cho trang chi tiết
  highlights?: string[]; // điểm nổi bật, hiện ở trang chi tiết
};

// Logo đối tác (tên hiển thị theo ngôn ngữ ở `partnerNames`). Chỉ đưa logo của đơn vị đã đồng ý.
const partnerLogos = [
  "/logo-doitac/Bo-quoc-phong.webp",
  "/logo-doitac/HN-300x300.png",
  "/logo-doitac/Petro-Vietnam.png",
  "/logo-doitac/TW-doan-272x300.webp",
  "/logo-doitac/lien-hiep-thanh-nien-300x300.webp",
];

const vi = {
  meta: {
    title: "Quảng Phú — Cơ khí mỹ thuật: xe nghi trượng, tượng Bác Hồ, tượng chân dung thờ",
    description:
      "Công ty TNHH Cơ khí Mỹ thuật Quảng Phú (Bắc Ninh) thiết kế, chế tác và bàn giao trọn gói khối xe nghi trượng đại lễ A50–A80, tượng Chủ tịch Hồ Chí Minh, tượng chân dung thờ và quà tặng mỹ thuật.",
  },
  company: {
    brand: "Quảng Phú", // tên ngắn hiển thị ở logo, đầu trang chủ, tiêu đề tab
    name: "Công ty TNHH Cơ khí Mỹ thuật Quảng Phú",
    address: "Thôn Quảng Bố, Xã Quảng Phú, Huyện Lương Tài, Tỉnh Bắc Ninh",
  },
  nav: {
    home: "Trang chủ",
    about: "Về chúng tôi",
    services: "Dịch vụ",
    projects: "Dự án",
    news: "Tin tức",
    contact: "Liên hệ",
  },
  ui: {
    homeAria: "Quảng Phú — trang chủ",
    mainNav: "Điều hướng chính",
    mobileNav: "Điều hướng di động",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    showServices: "Hiện danh sách dịch vụ",
    hideServices: "Ẩn danh sách dịch vụ",
    allServices: "Xem tất cả dịch vụ",
    allProjects: "Xem tất cả dự án",
    theme: "Đổi giao diện sáng / tối",
    switchLang: "English",
    switchLangShort: "EN",
    breadcrumb: "Đường dẫn",
    detail: "Chi tiết",
    imagePending: "Ảnh đang cập nhật",
    portraitPending: "Ảnh chân dung · đang cập nhật",
    callNow: "Gọi ngay",
    zaloChat: "Nhắn Zalo",
    backToTop: "Lên đầu trang",
  },
  hero: {
    weAre: "Công ty Cơ khí Mỹ thuật",
    tagline: "Tinh hoa Cơ khí Mỹ thuật – Khẳng định tầm vóc Quốc gia", // dấu cách giữa "Quốc" và "gia" là dấu không ngắt dòng
    bullets: [
      "Đơn vị cung cấp độc quyền tượng chân dung Chủ tịch Hồ Chí Minh cho các cơ quan, đơn vị trong Quân đội nhân dân Việt Nam",
      "Thiết kế & cải hoán các khối xe Nghi trượng phục vụ các dịp đại lễ lớn của dân tộc",
      "Thi công tượng đài và sản xuất quà tặng đối nội, đối ngoại cao cấp cho các bộ ban ngành",
    ],
    photoLabel: "Khối xe đại lễ A80 · Hà Nội 2025",
    photo: img("a80Hero", "Khối xe số 80 tiến trên đại lộ trong buổi tổng duyệt đêm"),
  },
  // TODO: xác minh
  stats: [
    { value: "200+", label: "dự án, công trình đã hoàn thành" },
    { value: "24 năm", label: "chế tác cơ khí mỹ thuật" },
  ],
  homeAbout: {
    title1: "Tạo nên",
    title2: "biểu tượng",
    body: "Được thành lập từ năm 2002, Quảng Phú tự hào là doanh nghiệp chuyên sâu trong lĩnh vực chế tác quà tặng mỹ thuật độc bản, điêu khắc tượng chân dung truyền thần, thi công các công trình công ích hoành tráng và trực tiếp tham gia cải hoán kỹ thuật – thiết kế mỹ thuật khối xe nghi trượng phục vụ cho các dịp đại lễ cấp quốc gia.",
    quote: "Nhận báo giá",
    more: "Về Quảng Phú",
    image: img("a80Float", "Tượng Chủ tịch Hồ Chí Minh trên khối xe đại lễ, phía sau là Lăng Bác"),
  },
  works: {
    kicker: "Một thoáng",
    title: "Tác phẩm",
    view: "Xem ảnh lớn",
    dialog: "Xem ảnh tác phẩm",
    prev: "Ảnh trước",
    next: "Ảnh sau",
    close: "Đóng",
  },
  homeProjects: { title: "Các dự án của chúng tôi", all: "Tất cả dự án" },
  homeClients: { topic: "Khách hàng", title: "Khách hàng của chúng tôi" },
  clientTypes: ["Cơ quan Nhà nước", "Ban tổ chức sự kiện", "Di tích, đền chùa, dòng họ", "Gia đình", "Doanh nghiệp"],
  partnerNames: [
    "Bộ Quốc phòng",
    "Thành phố Hà Nội",
    "Tập đoàn Dầu khí Việt Nam",
    "Trung ương Đoàn TNCS Hồ Chí Minh",
    "Hội Liên hiệp Thanh niên Việt Nam",
  ],
  footer: { sitemap: "Sơ đồ trang", maps: "Google Maps", mapTitle: "Bản đồ khu vực xưởng sản xuất Quảng Phú, Lương Tài, Bắc Ninh" },

  // ——— Liên hệ ———
  contactPage: {
    metaTitle: "Liên hệ — Quảng Phú, xưởng cơ khí mỹ thuật Bắc Ninh",
    metaDescription: "Liên hệ Công ty TNHH Cơ khí Mỹ thuật Quảng Phú: điện thoại, Zalo, email, địa chỉ xưởng tại Lương Tài, Bắc Ninh.",
    title: "Liên hệ",
    lead: "Gọi điện, nhắn Zalo hoặc ghé xưởng — chúng tôi tư vấn và báo giá miễn phí.",
    infoTopic: "Thông tin liên hệ",
    address: "Địa chỉ xưởng",
    directions: "Chỉ đường",
    phone: "Điện thoại",
    email: "Email",
    social: "Mạng xã hội",
    taxCode: "Mã số thuế",
    mapTopic: "Bản đồ",
  },

  // ——— Dịch vụ ———
  servicesPage: {
    metaTitle: "Dịch vụ — Quảng Phú: xe nghi trượng, tượng Bác Hồ, tượng chân dung thờ",
    metaDescription:
      "Quảng Phú thiết kế và chế tác trọn gói khối xe nghi trượng đại lễ, tượng Chủ tịch Hồ Chí Minh, tượng chân dung thờ, quà tặng và mỹ thuật trang trí.",
    title: "Dịch vụ",
    lead: "Bốn dòng chế tác, một quy trình trọn gói.",
    processTopic: "Quy trình đặt hàng",
    processTitle: "Trọn gói từ thiết kế đến bàn giao",
    faqTopic: "Câu hỏi thường gặp",
    faqTitle: "Trước khi đặt hàng",
    viewDetail: "Xem chi tiết",
    requestQuote: "Yêu cầu báo giá",
    audience: "Phù hợp cho",
    materials: "Chất liệu",
    sizes: "Kích thước tham khảo",
    whatWeDo: "Chúng tôi làm gì",
    scope: "Hạng mục nhận làm",
    all: "Tất cả dịch vụ",
    otherTopic: "Dịch vụ khác",
    otherTitle: "Các dòng chế tác khác",
  },
  // TODO: xác minh chất liệu và kích thước tham khảo với xưởng
  products: [
    {
      id: "xe-nghi-truong",
      name: "Xe nghi trượng đại lễ",
      summary: "Thiết kế, sản xuất khối xe nghi trượng cho diễu hành, diễu binh và sự kiện lớn.",
      body: "Quảng Phú nhận trọn gói khối xe từ ý tưởng, bản vẽ phối cảnh, kết cấu khung đến tạo hình biểu tượng, hoàn thiện bề mặt và vận hành trong ngày lễ. Xưởng đã trực tiếp làm các khối xe cho những kỳ đại lễ quốc gia từ A50 đến A80.",
      audience: "Cơ quan Nhà nước, ban tổ chức sự kiện cấp quốc gia, tỉnh, thành phố",
      scope: [
        "Thiết kế ý tưởng, phối cảnh 3D và bản vẽ kỹ thuật",
        "Kết cấu khung thép trên sát xi xe, tính tải và cân bằng",
        "Tạo hình biểu tượng: Quốc huy, ngôi sao, con số kỷ niệm, phù điêu",
        "Hoàn thiện sơn, phủ nhũ, hệ đèn trang trí",
        "Vận chuyển, lắp dựng, túc trực kỹ thuật trong ngày lễ",
      ],
      materials: ["Thép hộp", "Composite", "Xốp EPS bọc composite", "Sơn nhũ vàng", "Đèn LED"],
      sizes: "Dài 8–14 m, cao 4–7 m tùy sát xi và lộ trình",
      images: [
        img("a80NewEra", "Khối xe Việt Nam kỷ nguyên phát triển mới trong Đại lễ A80"),
        img("a50", "Khối xe biểu trưng 50 năm giữa rừng cờ"),
        img("dbp70Emblem2", "Khối xe Quốc huy lễ kỷ niệm 70 năm Điện Biên Phủ"),
        img("a80Night", "Khối xe số 80 trong buổi tổng duyệt đêm"),
        img("dbp60", "Khối xe Quốc huy 60 năm Điện Biên Phủ"),
      ],
    },
    {
      id: "tuong-bac-ho",
      name: "Tượng Chủ tịch Hồ Chí Minh",
      summary: "Tượng Bác toàn thân, bán thân cho hội trường, cơ quan, di tích và sự kiện.",
      body: "Mẫu tượng được nghệ nhân đắp và chỉnh thần thái theo tư liệu ảnh chuẩn, duyệt mẫu với khách hàng trước khi đúc. Kích thước từ tượng bán thân đặt bục hội trường đến tượng toàn thân nhiều mét cho quảng trường, sân khấu đại lễ.",
      audience: "Cơ quan, đơn vị, trường học, ban quản lý di tích, ban tổ chức sự kiện",
      scope: [
        "Tượng bán thân đặt bục hội trường",
        "Tượng toàn thân cho sân khấu, khối xe, khuôn viên",
        "Bục tượng, phông nền đồng bộ với không gian",
        "Vận chuyển, lắp đặt và bảo dưỡng định kỳ",
      ],
      materials: ["Đồng đúc", "Composite giả đồng", "Composite phủ nhũ vàng", "Thạch cao (mẫu)"],
      sizes: "Bán thân 60–120 cm; toàn thân 1,5–4,5 m",
      images: [
        img("hoStanding", "Tượng Bác Hồ toàn thân phủ nhũ vàng"),
        img("hoBust", "Tượng bán thân Bác Hồ trong hội trường"),
        img("a80Mausoleum", "Tượng Bác Hồ trên khối xe trước Lăng Bác"),
        img("hoStage", "Tượng Bác Hồ phủ nhũ vàng trên sân khấu lễ kỷ niệm"),
        img("a80Statue", "Tượng Bác Hồ trên khối xe Đại lễ A80"),
      ],
    },
    {
      id: "tuong-chan-dung-tho",
      name: "Tượng chân dung thờ",
      summary: "Tượng thờ ông bà, cha mẹ, tổ tiên, chuẩn thần thái theo ảnh gia đình cung cấp.",
      body: "Từ ảnh chân dung gia đình gửi, nghệ nhân dựng mẫu đất và chỉnh từng nét mặt cùng gia đình cho đến khi giống người thật, rồi mới đúc và hoàn thiện. Phù hợp đặt tại bàn thờ gia tiên, nhà thờ họ, từ đường.",
      audience: "Gia đình, dòng họ, hội đồng họ, nhà thờ họ",
      scope: [
        "Tượng bán thân và toàn thân ngồi",
        "Chỉnh mẫu theo góp ý của gia đình qua ảnh hoặc tại xưởng",
        "Ngai, bệ thờ đồng bộ",
        "Giao và đặt tượng tận nơi",
      ],
      materials: ["Đồng đúc", "Composite giả đồng", "Đá"],
      sizes: "Bán thân 30–60 cm; toàn thân ngồi 50–90 cm",
      // Ảnh tạm: tượng bán thân Bác Hồ. TODO: thay bằng ảnh tượng chân dung thờ đã làm
      images: [
        img("hoBust", "Tượng chân dung bán thân Chủ tịch Hồ Chí Minh"),
        img("hoStanding", "Tượng chân dung toàn thân phủ nhũ vàng"),
        img("hoStage", "Tượng chân dung đặt trên sân khấu lễ kỷ niệm"),
      ],
    },
    {
      id: "qua-tang-my-thuat",
      name: "Quà tặng & mỹ thuật trang trí",
      summary: "Tượng lưu niệm, quà tặng độc bản và tác phẩm mỹ thuật cho không gian, sự kiện.",
      body: "Thiết kế riêng theo câu chuyện của đơn vị đặt hàng: biểu tượng kỷ niệm, phù điêu, tác phẩm sắp đặt khổ lớn cho sân khấu và khuôn viên, hay quà tặng đối ngoại số lượng nhỏ, mỗi chiếc một số hiệu.",
      audience: "Doanh nghiệp, tập đoàn, cơ quan đối ngoại, đơn vị tổ chức sự kiện",
      scope: [
        "Quà tặng, biểu trưng kỷ niệm có khắc tên, số hiệu",
        "Phù điêu, tác phẩm sắp đặt khổ lớn",
        "Linh vật, biểu tượng cho sân khấu và khuôn viên",
        "Hộp, đế trưng bày đồng bộ",
      ],
      materials: ["Đồng", "Composite", "Thép", "Gỗ", "Mica"],
      sizes: "Từ quà tặng để bàn 20 cm đến tác phẩm sắp đặt trên 10 m",
      images: [
        img("flag", "Tác phẩm lá cờ đỏ sao vàng được cẩu lắp đặt"),
        img("relief", "Phù điêu và cụm tượng chiến sĩ trên khối xe"),
        img("dbp70Soldiers", "Cụm tượng chiến sĩ giả đồng"),
        img("dbp70Emblem", "Biểu trưng Quốc huy trên khối xe"),
      ],
    },
  ],
  process: [
    { title: "Tiếp nhận", body: "Trao đổi mục đích, kích thước, chất liệu, thời hạn." },
    { title: "Thiết kế", body: "Bản vẽ, phối cảnh và phương án kết cấu." },
    { title: "Duyệt mẫu", body: "Khách hàng duyệt mẫu trước khi chế tác." },
    { title: "Chế tác", body: "Đúc và chế tác cơ khí tại xưởng." },
    { title: "Hoàn thiện", body: "Xử lý bề mặt, kiểm tra chất lượng." },
    { title: "Bàn giao", body: "Vận chuyển, lắp đặt tận nơi đúng tiến độ." },
  ],
  // TODO: xác minh các mốc thời gian và chính sách với công ty
  faqs: [
    {
      q: "Làm một khối xe nghi trượng mất bao lâu?",
      a: "Tùy quy mô, thường từ 30 đến 60 ngày tính từ khi duyệt thiết kế. Với lịch đại lễ cố định, Quảng Phú lập tiến độ ngược từ ngày tổng duyệt và báo trước các mốc duyệt mẫu.",
    },
    {
      q: "Tôi chỉ có ảnh cũ của ông bà, có làm tượng được không?",
      a: "Được. Gia đình gửi càng nhiều ảnh ở các góc khác nhau càng tốt. Nghệ nhân dựng mẫu đất và gửi ảnh mẫu để gia đình góp ý chỉnh sửa trước khi đúc.",
    },
    {
      q: "Có được xem mẫu trước khi sản xuất không?",
      a: "Có. Mọi sản phẩm đều qua bước duyệt mẫu (bản vẽ, phối cảnh hoặc mẫu đất). Chỉ khi khách hàng đồng ý mẫu, xưởng mới chuyển sang đúc và chế tác.",
    },
    {
      q: "Quảng Phú có giao và lắp đặt ở tỉnh xa không?",
      a: "Có. Xưởng tự vận chuyển và lắp đặt trên toàn quốc. Chi phí vận chuyển được tính rõ trong báo giá theo kích thước và địa điểm.",
    },
    {
      q: "Báo giá dựa trên những thông tin nào?",
      a: "Loại sản phẩm, kích thước, chất liệu, số lượng, thời hạn và địa điểm bàn giao. Ảnh mẫu có thể gửi qua Zalo; Quảng Phú sẽ gọi lại để làm rõ trước khi báo giá.",
    },
  ],

  // Hai hàng ảnh trong dải "Một thoáng tác phẩm"
  gallery: [
    [
      img("relief", "Khối xe phù điêu và cụm tượng chiến sĩ"),
      img("hoStanding", "Tượng Bác Hồ đứng phủ nhũ vàng"),
      img("flag", "Cẩu lắp đặt tác phẩm lá cờ đỏ sao vàng"),
      img("a80NewEra", "Khối xe Việt Nam kỷ nguyên phát triển mới"),
      img("dbp70Emblem2", "Khối xe Quốc huy lễ kỷ niệm 70 năm Điện Biên Phủ"),
      img("qtQuyetTuHandover", "Lễ trao tặng biểu tượng Quyết tử để Tổ quốc quyết sinh"),
      img("qtBienPhongDetail", "Cận cảnh tượng Bác Hồ với chiến sĩ Biên phòng"),
      img("qtBaoChiBox", "Tượng Bác Hồ đọc báo cùng hộp quà đỏ kỷ niệm 100 năm Báo chí"),
    ],
    [
      img("hoBust", "Tượng bán thân Bác Hồ trong hội trường"),
      img("a80Night", "Khối xe số 80 trong buổi tổng duyệt đêm"),
      img("dbp60", "Khối xe Quốc huy 60 năm"),
      img("a80Statue", "Tượng Bác Hồ trên khối xe A80"),
      img("dbp70Soldiers", "Cụm tượng chiến sĩ màu đồng"),
      img("qtQuyetTuRows", "Loạt tượng Quyết tử để Tổ quốc quyết sinh trong hộp kính"),
    ],
  ],

  // ——— Dự án ———
  projectsPage: {
    metaTitle: "Dự án đã thực hiện — Quảng Phú: khối xe đại lễ, tượng Bác Hồ, tượng đài",
    metaDescription:
      "Các dự án Quảng Phú đã thực hiện: khối xe nghi trượng cho Đại lễ A80, A50, lễ kỷ niệm Chiến thắng Điện Biên Phủ, tượng Chủ tịch Hồ Chí Minh, tượng đài và phù điêu.",
    title: "Dự án đã thực hiện",
    lead: "Khối xe đại lễ, tượng Bác Hồ và tượng đài đã bàn giao.",
    statProjects: "Dự án tiêu biểu",
    statCeremonies: "Kỳ đại lễ",
    statCategories: "Hạng mục",
    ceremoniesTopic: "Các kỳ đại lễ",
    ceremoniesTitle: "Dấu ấn qua các kỳ đại lễ quốc gia",
    listTopic: "Danh mục dự án",
    listTitle: "Công trình tiêu biểu",
    all: "Tất cả",
    filter: "Lọc theo loại dự án",
    showing: "Đang hiện {n} dự án",
    viewDetail: "Xem chi tiết",
    overview: "Giới thiệu",
    highlightsTitle: "Điểm nổi bật",
    yearLabel: "Năm thực hiện",
    placeLabel: "Địa điểm",
    categoryLabel: "Hạng mục",
    otherTopic: "Dự án khác",
    otherTitle: "Các dự án liên quan",
    backAll: "Tất cả dự án",
  },
  // Dự án lấy từ backend (quản trị ở /admin/projects). Trường `category` là vị trí trong danh sách này;
  // thêm/bớt hạng mục thì sửa cả CATEGORY_COUNT ở backend/src/routes/projects.ts.
  projectCategories: ["Xe nghi trượng", "Tượng Bác Hồ", "Tượng đài & phù điêu", "Quà tặng đối ngoại"],
  ceremonies: [
    { code: "ĐBP60", year: "2014", name: "60 năm Chiến thắng Điện Biên Phủ" },
    { code: "ĐBP70", year: "2024", name: "70 năm Chiến thắng Điện Biên Phủ" },
    { code: "A50", year: "2025", name: "50 năm Giải phóng miền Nam, thống nhất đất nước" },
    { code: "A80", year: "2025", name: "80 năm Cách mạng Tháng Tám và Quốc khánh 2/9" },
  ],

  // ——— Tin tức ———
  newsPage: {
    metaTitle: "Tin tức — Quảng Phú, cơ khí mỹ thuật",
    metaDescription: "Tin tức từ xưởng cơ khí mỹ thuật Quảng Phú: năng lực sản xuất, kỹ thuật chế tác, dự án đã bàn giao.",
    title: "Tin tức",
    lead: "Chuyện ở xưởng và công trình mới.",
    readMore: "Đọc tiếp",
    more: "Tin khác",
    all: "Tất cả tin tức",
  },

  // ——— Về chúng tôi ———
  aboutPage: {
    metaTitle: "Về chúng tôi — Quảng Phú, xưởng cơ khí mỹ thuật Bắc Ninh",
    metaDescription:
      "Giới thiệu Công ty TNHH Cơ khí Mỹ thuật Quảng Phú: năng lực sản xuất khối xe nghi trượng đại lễ A50–A80, ban lãnh đạo và đội ngũ nghệ nhân, kỹ thuật.",
    topic: "Giới thiệu",
    title: "Về Quảng Phú",
    lead: "Xưởng cơ khí mỹ thuật tại Lương Tài, Bắc Ninh — từ bản vẽ đến ngày bàn giao.",
    capabilityTopic: "Năng lực",
    capabilityTitle: "Xưởng cơ khí mỹ thuật đã qua thử thách cấp quốc gia",
    founded: "Công ty TNHH Cơ khí Mỹ thuật Quảng Phú thành lập ngày 06 tháng 12 năm 2002, hoạt động trong đa lĩnh vực:",
    fields: [
      { title: "Sản phẩm kim loại", body: "Sản xuất sản phẩm và cấu kiện bằng kim loại" },
      { title: "Sản phẩm plastic", body: "Sản xuất các sản phẩm từ plastic" },
      { title: "Công trình công ích", body: "Tượng đài, phù điêu hoành tráng" },
      { title: "Sáng tác nghệ thuật", body: "Thiết kế, điêu khắc, tạo hình sản phẩm mỹ thuật" },
    ],
    team: "Đội ngũ họa sỹ điêu khắc, họa sỹ hội họa, nghệ nhân và công nhân lành nghề làm việc theo quy trình chuyên nghiệp, khép kín; luôn được trau dồi, tiếp cận công nghệ mới và rõ ý thức, quyền lợi, trách nhiệm trong công việc.",
    mottoTitle: "Phương châm hoạt động",
    mottoSlogan: ["Uy tín", "Chất lượng", "Hiệu quả"],
    mottoBody: [
      "Đây là phương châm hoạt động sáng tạo và sản xuất kinh doanh của Công ty. Sự hài lòng của khách hàng chính là một trong những động lực mạnh mẽ thúc đẩy cho guồng máy hoạt động của công ty ngày càng hiệu quả.",
      "Hướng tới mục tiêu phát triển bền vững, Công ty Cơ khí Mỹ thuật Quảng Phú tự hào là cầu nối giữa quá khứ và tương lai, nơi khơi nguồn từ nghệ thuật đúc đồng truyền thống và cất cánh bằng công nghệ tiên tiến. Bằng việc hòa quyện kinh nghiệm đúc kết qua nhiều thế hệ với xu hướng công nghệ mới, chúng tôi khát vọng tạo nên những sản phẩm văn hóa đỉnh cao — những tác phẩm không chỉ đạt chất lượng mỹ nghệ thượng thừa mà còn kết tinh sâu sắc bản sắc và linh hồn Việt.",
    ],
    capabilityImage: img("relief", "Cán bộ ban tổ chức nghiệm thu khối xe phù điêu và cụm tượng chiến sĩ"),
    capabilityCaption: "Nghiệm thu khối xe phù điêu cùng ban tổ chức trước ngày diễu hành.",
    leadersTopic: "Ban lãnh đạo",
    leadersTitle: "Ban lãnh đạo",
    teamTopic: "Đội ngũ nhân lực",
    teamTitle: "{n}+ người, bốn tổ chuyên môn",
    teamBody:
      "Mỗi sản phẩm đi qua đủ bốn tổ trong cùng một xưởng, nên bản vẽ, mẫu tượng và kết cấu luôn khớp nhau và tiến độ do một đầu mối kiểm soát.",
    people: "người",
  },
  // TODO: xác minh
  companyFacts: [
    { term: "Năm thành lập", value: "2002" },
    { term: "Xưởng sản xuất", value: "Thôn Quảng Bố, Xã Lâm Thao, Thành phố Bắc Ninh" },
    { term: "Nhân sự", value: "65+ người" },
    { term: "Đại lễ đã tham gia", value: "A50 – A80" },
  ],
  strengths: [
    {
      title: "Kinh nghiệm thực chiến cấp quốc gia",
      body: "Đã trực tiếp sản xuất, thi công thành công các khối xe nghi trượng cho các dịp đại lễ lớn, từ A50 đến A80.",
    },
    {
      title: "Độ chính xác và thần thái cao",
      body: "Tay nghề cơ khí mỹ thuật trình độ cao, khắc họa chân thực, có hồn từ tượng Bác Hồ đến tượng chân dung truyền thần ông bà, bố mẹ.",
    },
    {
      title: "Sản xuất trọn gói, quy mô lớn",
      body: "Đáp ứng từ khâu thiết kế, đúc và chế tác cơ khí đến hoàn thiện, bàn giao tận nơi đúng tiến độ.",
    },
  ],
  // NỘI DUNG MẪU: tên, ảnh, lý lịch và lời chia sẻ là giả lập để dựng bố cục.
  // TODO: thay bằng thông tin và ảnh thật của ban lãnh đạo trước khi đưa website lên mạng.
  leaders: [
    {
      name: "Nguyễn Văn Quảng",
      role: "Giám đốc",
      photo: img("director", "Chân dung giám đốc Công ty Cơ khí Mỹ thuật Quảng Phú") as Img | null,
      credentials: [
        "Kỹ sư Cơ khí chế tạo máy",
        "Hơn 25 năm thiết kế và thi công khối xe nghi trượng, công trình mỹ thuật",
        "Trực tiếp chỉ đạo sản xuất các khối xe cho Đại lễ A50, A80 và lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ",
        "Sáng lập xưởng Quảng Phú tại Bắc Ninh năm 2002",
      ],
      quote:
        "Mỗi khối xe, mỗi bức tượng đều gắn với một sự kiện hay một con người. Chúng tôi làm kỹ ở khâu bản vẽ để ngày bàn giao không phải sửa gì.",
    },
    {
      name: "Trần Minh Đức",
      role: "Nghệ nhân trưởng",
      photo: img("director", "Chân dung nghệ nhân trưởng (ảnh mẫu)") as Img | null,
      credentials: [
        "Tốt nghiệp chuyên ngành Điêu khắc",
        "Hơn 20 năm đắp mẫu tượng chân dung và tượng đài",
        "Phụ trách mẫu tượng Bác Hồ trên khối xe Đại lễ A80",
      ],
      quote:
        "Giống người thì dễ, có thần mới khó. Tôi chỉnh mẫu đến khi gia đình nhìn vào thấy đúng người thân của mình.",
    },
  ],
  // TODO: xác minh số người từng bộ phận
  teams: [
    {
      name: "Thiết kế & tạo hình",
      count: 8,
      body: "Họa sĩ và kiến trúc sư dựng phối cảnh, bản vẽ kỹ thuật và phương án kết cấu cho từng khối xe, tượng đài.",
    },
    {
      name: "Nghệ nhân điêu khắc",
      count: 12,
      body: "Đắp mẫu đất, chỉnh tỷ lệ và thần thái cho tượng Bác Hồ, tượng chân dung thờ trước khi đúc.",
    },
    {
      name: "Cơ khí & kết cấu",
      count: 25,
      body: "Gia công khung thép, cơ cấu chuyển động và hệ khung đỡ chịu tải cho khối xe nghi trượng.",
    },
    {
      name: "Đúc, hoàn thiện & lắp dựng",
      count: 20,
      body: "Đúc composite, giả đồng, phủ nhũ; vận chuyển và lắp đặt tại hiện trường đúng tiến độ.",
    },
  ],
  teamPhotos: [
    img("flag", "Đội lắp dựng cẩu tác phẩm lá cờ lên vị trí"),
    img("relief", "Nghiệm thu khối xe phù điêu cùng ban tổ chức"),
  ],
};

export type Content = typeof vi;

const en: Content = {
  meta: {
    title: "Quang Phu — Art metalwork: ceremonial floats, Ho Chi Minh statues, ancestral portrait statues",
    description:
      "Quang Phu Art Mechanics Co., Ltd. (Bac Ninh, Vietnam) designs, fabricates and delivers ceremonial parade floats for national celebrations A50–A80, statues of President Ho Chi Minh, ancestral portrait statues and art gifts.",
  },
  company: {
    brand: "Quang Phu",
    name: "Quang Phu Art Mechanics Co., Ltd.",
    address: "Quang Bo Village, Quang Phu Commune, Luong Tai District, Bac Ninh Province, Vietnam",
  },
  nav: {
    home: "Home",
    about: "About us",
    services: "Services",
    projects: "Projects",
    news: "News",
    contact: "Contact",
  },
  ui: {
    homeAria: "Quang Phu — home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    showServices: "Show services",
    hideServices: "Hide services",
    allServices: "All services",
    allProjects: "All projects",
    theme: "Switch light / dark mode",
    switchLang: "Tiếng Việt",
    switchLangShort: "VI",
    breadcrumb: "Breadcrumb",
    detail: "Detail",
    imagePending: "Photo coming soon",
    portraitPending: "Portrait · coming soon",
    callNow: "Call us",
    zaloChat: "Message us on Zalo",
    backToTop: "Back to top",
  },
  hero: {
    weAre: "Art Metalwork Company",
    tagline: "The finest in art metalwork – affirming national stature",
    bullets: [
      "Exclusive supplier of portrait statues of President Ho Chi Minh to agencies and units of the Vietnam People's Army",
      "Design and refitting of ceremonial floats for the nation's major national celebrations",
      "Construction of monuments and production of premium gifts for ministries and government bodies",
    ],
    photoLabel: "A80 parade float · Hanoi 2025",
    photo: img("a80Hero", "The number-80 float advancing along the boulevard at a night rehearsal"),
  },
  stats: [
    { value: "200+", label: "projects and works completed" },
    { value: "24 years", label: "of art metalwork" },
  ],
  homeAbout: {
    title1: "Building",
    title2: "symbols",
    body: "Founded in 2002, Quang Phu is a specialist in one-of-a-kind art gifts, lifelike portrait sculpture, large-scale public monuments, and the technical refitting and artistic design of ceremonial floats for national celebrations.",
    quote: "Get a quote",
    more: "About Quang Phu",
    image: img("a80Float", "Statue of President Ho Chi Minh on a ceremonial float, with the Mausoleum behind"),
  },
  works: {
    kicker: "A glimpse of",
    title: "Our work",
    view: "View larger",
    dialog: "Artwork viewer",
    prev: "Previous photo",
    next: "Next photo",
    close: "Close",
  },
  homeProjects: { title: "Our projects", all: "All projects" },
  homeClients: { topic: "Clients", title: "Our clients" },
  clientTypes: ["Government agencies", "Event organisers", "Heritage sites, temples, clans", "Families", "Businesses"],
  partnerNames: [
    "Ministry of National Defence",
    "Hanoi City",
    "PetroVietnam",
    "Ho Chi Minh Communist Youth Union",
    "Vietnam Youth Federation",
  ],
  footer: { sitemap: "Site map", maps: "Google Maps", mapTitle: "Map of the Quang Phu workshop area, Luong Tai, Bac Ninh" },

  contactPage: {
    metaTitle: "Contact — Quang Phu, art metalwork workshop in Bac Ninh",
    metaDescription: "Contact Quang Phu Art Mechanics Co., Ltd.: phone, Zalo, email and our workshop address in Luong Tai, Bac Ninh.",
    title: "Contact",
    lead: "Call, message us on Zalo or visit the workshop — free consultation and quotes.",
    infoTopic: "Get in touch",
    address: "Workshop address",
    directions: "Get directions",
    phone: "Phone",
    email: "Email",
    social: "Social",
    taxCode: "Tax code",
    mapTopic: "Map",
  },

  servicesPage: {
    metaTitle: "Services — Quang Phu: ceremonial floats, Ho Chi Minh statues, portrait statues",
    metaDescription:
      "Quang Phu designs and fabricates ceremonial parade floats, statues of President Ho Chi Minh, ancestral portrait statues, gifts and decorative art — end to end.",
    title: "Services",
    lead: "Four lines of work, one end-to-end process.",
    processTopic: "How we work",
    processTitle: "End to end, from design to delivery",
    faqTopic: "FAQ",
    faqTitle: "Before you order",
    viewDetail: "View details",
    requestQuote: "Request a quote",
    audience: "Suited for",
    materials: "Materials",
    sizes: "Typical sizes",
    whatWeDo: "What we do",
    scope: "Scope of work",
    all: "All services",
    otherTopic: "Other services",
    otherTitle: "Our other lines of work",
  },
  products: [
    {
      id: "xe-nghi-truong",
      name: "Ceremonial parade floats",
      summary: "Design and fabrication of ceremonial floats for parades, military reviews and major events.",
      body: "Quang Phu takes on floats end to end: concept, perspective drawings, frame structure, sculpted emblems, surface finishing and operation on the day. Our workshop has built floats for Vietnam's national celebrations from A50 to A80.",
      audience: "Government agencies and national, provincial and city event organisers",
      scope: [
        "Concept design, 3D renders and technical drawings",
        "Steel frame on the vehicle chassis, load and balance calculations",
        "Sculpted emblems: national emblem, stars, anniversary numerals, reliefs",
        "Paint, gilding and decorative lighting",
        "Transport, assembly and on-site technical crew on the day",
      ],
      materials: ["Steel box section", "Composite", "Composite-clad EPS foam", "Gold-effect paint", "LED lighting"],
      sizes: "8–14 m long, 4–7 m tall depending on chassis and route",
      images: [
        img("a80NewEra", "The 'Vietnam, a new era of development' float at the A80 celebration"),
        img("a50", "The 50th-anniversary float among a sea of flags"),
        img("dbp70Emblem2", "National emblem float at the 70th anniversary of Dien Bien Phu"),
        img("a80Night", "The number-80 float during a night rehearsal"),
        img("dbp60", "National emblem float, 60th anniversary of Dien Bien Phu"),
      ],
    },
    {
      id: "tuong-bac-ho",
      name: "Statues of President Ho Chi Minh",
      summary: "Full-length and bust statues for halls, offices, heritage sites and events.",
      body: "Our artisans sculpt each model from reference photographs and refine the likeness, and the client approves the model before casting. Sizes range from busts for assembly halls to multi-metre full-length statues for squares and celebration stages.",
      audience: "Agencies, schools, heritage site boards and event organisers",
      scope: [
        "Busts for assembly hall podiums",
        "Full-length statues for stages, floats and grounds",
        "Plinths and backdrops designed to match the space",
        "Transport, installation and periodic maintenance",
      ],
      materials: ["Cast bronze", "Bronze-effect composite", "Gilded composite", "Plaster (models)"],
      sizes: "Busts 60–120 cm; full-length 1.5–4.5 m",
      images: [
        img("hoStanding", "Gilded full-length statue of Ho Chi Minh"),
        img("hoBust", "Bust of Ho Chi Minh in an assembly hall"),
        img("a80Mausoleum", "Ho Chi Minh statue on a float in front of the Mausoleum"),
        img("hoStage", "Gilded Ho Chi Minh statue on the anniversary stage"),
        img("a80Statue", "Ho Chi Minh statue on the A80 float"),
      ],
    },
    {
      id: "tuong-chan-dung-tho",
      name: "Ancestral portrait statues",
      summary: "Statues of grandparents, parents and ancestors for worship, true to the family's photographs.",
      body: "From the portraits a family sends us, our artisans build a clay model and refine every facial detail together with the family until it truly resembles their loved one, and only then cast and finish it. Suited to family altars, clan halls and ancestral houses.",
      audience: "Families, clans, clan councils and clan halls",
      scope: [
        "Busts and seated full-length statues",
        "Model revisions based on family feedback, by photo or at the workshop",
        "Matching thrones and altar plinths",
        "Delivery and placement at your home",
      ],
      materials: ["Cast bronze", "Bronze-effect composite", "Stone"],
      sizes: "Busts 30–60 cm; seated full-length 50–90 cm",
      images: [
        img("hoBust", "Bust portrait statue of President Ho Chi Minh"),
        img("hoStanding", "Gilded full-length portrait statue"),
        img("hoStage", "Portrait statue on an anniversary stage"),
      ],
    },
    {
      id: "qua-tang-my-thuat",
      name: "Gifts & decorative art",
      summary: "Commemorative statues, one-of-a-kind gifts and art installations for spaces and events.",
      body: "Designed around each client's story: commemorative emblems, reliefs, large installations for stages and grounds, or small runs of diplomatic gifts, each individually numbered.",
      audience: "Businesses, corporations, foreign-affairs offices and event organisers",
      scope: [
        "Gifts and commemorative emblems engraved with names and serial numbers",
        "Reliefs and large-scale installations",
        "Mascots and emblems for stages and grounds",
        "Matching display boxes and stands",
      ],
      materials: ["Bronze", "Composite", "Steel", "Wood", "Acrylic"],
      sizes: "From 20 cm desk gifts to installations over 10 m",
      images: [
        img("flag", "A red-flag installation being lifted into place by crane"),
        img("relief", "Relief and soldier sculptures on a float"),
        img("dbp70Soldiers", "Bronze-effect soldier sculptures"),
        img("dbp70Emblem", "National emblem on a float"),
      ],
    },
  ],
  process: [
    { title: "Brief", body: "Purpose, size, materials and deadline." },
    { title: "Design", body: "Drawings, renders and structural plan." },
    { title: "Approval", body: "You approve the model before fabrication." },
    { title: "Fabrication", body: "Casting and metalwork in our workshop." },
    { title: "Finishing", body: "Surface treatment and quality checks." },
    { title: "Delivery", body: "Transport and on-site installation, on schedule." },
  ],
  faqs: [
    {
      q: "How long does a ceremonial float take?",
      a: "Depending on scale, usually 30 to 60 days from design approval. For fixed celebration dates, Quang Phu plans backwards from the dress rehearsal and agrees the model-approval milestones up front.",
    },
    {
      q: "I only have old photos of my grandparents. Can you still make a statue?",
      a: "Yes. The more photos from different angles, the better. Our artisans build a clay model and send you photos of it so the family can request changes before casting.",
    },
    {
      q: "Can I see a model before production?",
      a: "Yes. Every piece goes through model approval (drawings, renders or a clay model). We only move on to casting and fabrication once you approve it.",
    },
    {
      q: "Do you deliver and install outside Bac Ninh?",
      a: "Yes. We handle transport and installation nationwide. Shipping is itemised in the quote based on size and location.",
    },
    {
      q: "What do you need to prepare a quote?",
      a: "The type of piece, size, materials, quantity, deadline and delivery location. Reference photos can be sent via Zalo; Quang Phu will call you to clarify before quoting.",
    },
  ],
  gallery: [
    [
      img("relief", "Relief float with soldier sculptures"),
      img("hoStanding", "Gilded standing statue of Ho Chi Minh"),
      img("flag", "Craning a red-flag installation into place"),
      img("a80NewEra", "The 'Vietnam, a new era of development' float"),
      img("dbp70Emblem2", "National emblem float, 70th anniversary of Dien Bien Phu"),
      img("qtQuyetTuHandover", "Presentation of the Determined to die for the Fatherland to live statue"),
      img("qtBienPhongDetail", "Close-up of the Uncle Ho with a Border Guard soldier statue"),
      img("qtBaoChiBox", "Uncle Ho reading statue with its red centenary gift box"),
    ],
    [
      img("hoBust", "Bust of Ho Chi Minh in an assembly hall"),
      img("a80Night", "The number-80 float during a night rehearsal"),
      img("dbp60", "National emblem float, 60th anniversary"),
      img("a80Statue", "Ho Chi Minh statue on the A80 float"),
      img("dbp70Soldiers", "Bronze-effect soldier sculptures"),
      img("qtQuyetTuRows", "Rows of Determined to die for the Fatherland to live statues in acrylic cases"),
    ],
  ],

  projectsPage: {
    metaTitle: "Projects — Quang Phu: celebration floats, Ho Chi Minh statues, monuments",
    metaDescription:
      "Projects by Quang Phu: ceremonial floats for the A80 and A50 celebrations and the Dien Bien Phu anniversaries, statues of President Ho Chi Minh, monuments and reliefs.",
    title: "Completed projects",
    lead: "Celebration floats, Ho Chi Minh statues and monuments we have delivered.",
    statProjects: "Featured projects",
    statCeremonies: "National celebrations",
    statCategories: "Categories",
    ceremoniesTopic: "National celebrations",
    ceremoniesTitle: "Our mark on national celebrations",
    listTopic: "Project list",
    listTitle: "Featured works",
    all: "All",
    filter: "Filter by project type",
    showing: "Showing {n} projects",
    viewDetail: "View details",
    overview: "Overview",
    highlightsTitle: "Highlights",
    yearLabel: "Year",
    placeLabel: "Location",
    categoryLabel: "Category",
    otherTopic: "More projects",
    otherTitle: "Related projects",
    backAll: "All projects",
  },
  projectCategories: ["Ceremonial floats", "Ho Chi Minh statues", "Monuments & reliefs", "Diplomatic gifts"],
  ceremonies: [
    { code: "ĐBP60", year: "2014", name: "60th anniversary of the Dien Bien Phu victory" },
    { code: "ĐBP70", year: "2024", name: "70th anniversary of the Dien Bien Phu victory" },
    { code: "A50", year: "2025", name: "50 years since the liberation of the South and reunification" },
    { code: "A80", year: "2025", name: "80th anniversary of the August Revolution and National Day" },
  ],

  newsPage: {
    metaTitle: "News — Quang Phu, art metalwork",
    metaDescription: "News from the Quang Phu art metalwork studio: new capacity, craft techniques and recently delivered projects.",
    title: "News",
    lead: "Workshop news and recent works.",
    readMore: "Read more",
    more: "More news",
    all: "All news",
  },

  aboutPage: {
    metaTitle: "About us — Quang Phu, art metalwork studio in Bac Ninh",
    metaDescription:
      "About Quang Phu Art Mechanics Co., Ltd.: our capacity for ceremonial floats for national celebrations A50–A80, our leadership and our team of artisans and engineers.",
    topic: "Introduction",
    title: "About Quang Phu",
    lead: "An art metalwork studio in Luong Tai, Bac Ninh — from first drawing to delivery.",
    capabilityTopic: "Capability",
    capabilityTitle: "An art metalwork studio proven at national scale",
    founded: "Quang Phu Art Mechanics Co., Ltd. was founded on 6 December 2002 and works across several fields:",
    fields: [
      { title: "Metal products", body: "Metal products and metal structures" },
      { title: "Plastic products", body: "Manufacturing of plastic products" },
      { title: "Public works", body: "Monuments and large-scale reliefs" },
      { title: "Artistic creation", body: "Design, sculpture and shaping of art pieces" },
    ],
    team: "Sculptors, painters, artisans and skilled workers follow a professional, closed workflow; they are continually trained, exposed to new technology, and clear about their responsibilities and ownership of their work.",
    mottoTitle: "Our motto",
    mottoSlogan: ["Reputation", "Quality", "Efficiency"],
    mottoBody: [
      "This guides everything we create and produce. Customer satisfaction is one of the strongest forces driving the company to work ever more effectively.",
      "Aiming for sustainable growth, Quang Phu Art Mechanics is proud to bridge past and future: rooted in traditional bronze casting and taking flight with advanced technology. By blending experience accumulated over generations with new technology, we aspire to create cultural works of the highest order — pieces of supreme craftsmanship that also embody the identity and soul of Vietnam.",
    ],
    capabilityImage: img("relief", "Organising committee members inspecting a relief float and soldier sculptures"),
    capabilityCaption: "Inspecting a relief float with the organisers before parade day.",
    leadersTopic: "Leadership",
    leadersTitle: "Leadership",
    teamTopic: "Our team",
    teamTitle: "{n}+ people, four specialist crews",
    teamBody:
      "Every piece passes through all four crews under one roof, so drawings, sculpted models and structure always fit together, with one point of contact owning the schedule.",
    people: "people",
  },
  companyFacts: [
    { term: "Founded", value: "2002" },
    { term: "Workshop", value: "Quang Bo village, Lam Thao, Bac Ninh city" },
    { term: "Team", value: "65+ people" },
    { term: "National celebrations", value: "A50 – A80" },
  ],
  strengths: [
    {
      title: "Proven at national scale",
      body: "We have built and delivered ceremonial floats for major national celebrations, from A50 to A80.",
    },
    {
      title: "Precision and true likeness",
      body: "Highly skilled art metalwork that captures each subject faithfully, from statues of Ho Chi Minh to portraits of grandparents and parents.",
    },
    {
      title: "End to end, at scale",
      body: "From design, casting and metal fabrication to finishing and on-site delivery, on schedule.",
    },
  ],
  leaders: [
    {
      name: "Nguyễn Văn Quảng",
      role: "Director",
      photo: img("director", "Portrait of the director of Quang Phu Art Mechanics") as Img | null,
      credentials: [
        "Mechanical engineer (machine manufacturing)",
        "25+ years designing and building ceremonial floats and art installations",
        "Directed float production for the A50 and A80 celebrations and the 70th anniversary of Dien Bien Phu",
        "Founded the Quang Phu workshop in Bac Ninh in 2002",
      ],
      quote:
        "Every float and every statue is tied to an event or a person. We take our time at the drawing stage so nothing needs fixing on delivery day.",
    },
    {
      name: "Trần Minh Đức",
      role: "Head artisan",
      photo: img("director", "Portrait of the head artisan (sample photo)") as Img | null,
      credentials: [
        "Trained in sculpture",
        "20+ years sculpting portrait statues and monuments",
        "Led the model for the Ho Chi Minh statue on the A80 float",
      ],
      quote:
        "A likeness is easy; a living presence is hard. I keep refining the model until the family looks at it and sees their loved one.",
    },
  ],
  teams: [
    {
      name: "Design & modelling",
      count: 8,
      body: "Artists and architects produce renders, technical drawings and structural plans for every float and monument.",
    },
    {
      name: "Sculptors",
      count: 12,
      body: "Clay modelling, refining proportion and likeness for Ho Chi Minh statues and portrait statues before casting.",
    },
    {
      name: "Metalwork & structure",
      count: 25,
      body: "Steel frames, moving mechanisms and load-bearing structures for ceremonial floats.",
    },
    {
      name: "Casting, finishing & installation",
      count: 20,
      body: "Composite and bronze-effect casting, gilding, transport and on-site installation on schedule.",
    },
  ],
  teamPhotos: [
    img("flag", "Installation crew craning the flag installation into position"),
    img("relief", "Inspecting the relief float with the organisers"),
  ],
};

const contents: Record<Locale, Content> = { vi, en };

export function getContent(lang: Locale): Content {
  return contents[lang];
}

export type Product = Content["products"][number];
export type Project = ProjectItem;
export type NewsItem = {
  slug: string; // slug theo ngôn ngữ đang xem
  slugs?: { vi: string; en: string }; // slug của từng ngôn ngữ (bản tiếng Anh có slug riêng)
  tag: string;
  title: string;
  summary: string;
  body: string[];
  image: Img;
  gallery?: Img[];
};

export const partnersFor = (lang: Locale) =>
  partnerLogos.map((logo, i) => ({ logo, name: contents[lang].partnerNames[i] }));
