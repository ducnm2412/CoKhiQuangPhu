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
  slug: string; // giống nhau ở mọi ngôn ngữ, dùng làm đường dẫn /du-an/[slug]
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
  projectCategories: ["Xe nghi trượng", "Tượng Bác Hồ", "Tượng đài & phù điêu", "Quà tặng đối ngoại"],
  // NỘI DUNG MẪU: mô tả, kích thước, thời gian thi công và điểm nổi bật của các dự án cũ là giả định để dựng bố cục.
  // TODO: xác minh với Quảng Phú trước khi đưa website lên mạng.
  projects: ([
    {
      title: "Biểu tượng “Quyết tử để Tổ quốc quyết sinh” — Bộ Tư lệnh Thủ đô",
      slug: "bieu-tuong-quyet-tu-bo-tu-lenh-thu-do",
      category: 3,
      year: "2026",
      place: "Hà Nội",
      summary: "Quà tặng đối ngoại cao cấp kỷ niệm 80 năm LLVT Thủ đô, Bộ Tư lệnh Thủ đô trao tặng lãnh đạo Đảng, Nhà nước và Quân đội.",
      body: "Quà tặng đối ngoại cao cấp nhân Kỷ niệm 80 năm Ngày truyền thống Lực lượng Vũ trang Thủ đô (19/10/1946 – 19/10/2026), được Bộ Tư lệnh Thủ đô Hà Nội trao tặng Tổng Bí thư, Chủ tịch nước Tô Lâm cùng lãnh đạo Đảng, Nhà nước và Quân đội. Tượng tái hiện cụm ba nhân vật mùa đông 1946: chiến sĩ Vệ quốc đoàn ôm bom ba càng, nữ tự vệ cầm gươm và công nhân tự vệ giữ súng; chế tác từ đồng đúc nguyên khối hoặc composite phủ ánh kim, bệ khắc chữ đỏ, đế đen gắn mác đồng, hộp kính acrylic.",
      image: img("qtQuyetTu", "Tượng Quyết tử để Tổ quốc quyết sinh phủ ánh kim trong hộp kính acrylic"),
      images: [
        img("qtQuyetTuHandover", "Lễ trao tặng biểu tượng tại Bộ Tư lệnh Thủ đô Hà Nội"),
        img("qtQuyetTuDetail", "Cận cảnh cụm ba nhân vật trên bệ khắc chữ đỏ"),
        img("qtQuyetTuRows", "Loạt tượng hoàn thiện trong hộp kính acrylic"),
      ],
      highlights: [
        "Tái hiện tinh xảo cụm 3 nhân vật huyền thoại: chiến sĩ Vệ quốc đoàn ôm bom ba càng, nữ tự vệ cầm gươm và công nhân tự vệ giữ chắc cây súng — khí thế hào hùng của quân dân Hà Nội mùa đông 1946.",
        "Chế tác linh hoạt từ đồng đúc nguyên khối hoặc composite cao cấp phủ ánh kim; từng nếp áo, thần thái khuôn mặt được điêu khắc sắc nét.",
        "Bệ tượng hình khối vững chãi khắc chữ đỏ “QUYẾT TỬ ĐỂ TỔ QUỐC QUYẾT SINH”; đế đen gắn mác đồng đỏ in thông tin kỷ niệm 80 năm.",
        "Hộp kính acrylic trong suốt chống bụi, tôn vinh vẻ đẹp khi trưng bày.",
        "Ứng dụng: quà tặng đối ngoại cho cơ quan, đoàn thể, doanh nghiệp, tổ chức quân đội; vật phẩm trưng bày tại phòng làm việc, phòng truyền thống, không gian di sản.",
      ],
    },
    {
      title: "Tượng “Bác Hồ với chiến sĩ Biên phòng” — Bộ Tư lệnh Bộ đội Biên phòng",
      slug: "tuong-bac-ho-voi-chien-si-bien-phong",
      category: 3,
      year: "2026",
      place: "Hà Nội",
      summary: "Mẫu tượng quà tặng truyền thống của Bộ Tư lệnh Bộ đội Biên phòng, khắc họa Bác Hồ ân cần trò chuyện với người chiến sĩ.",
      body: "Quảng Phú vinh dự được Bộ Tư lệnh Bộ đội Biên phòng chọn chế tác mẫu tượng quà tặng đối ngoại, lưu niệm truyền thống của lực lượng. Tác phẩm khắc họa hình ảnh Bác Hồ ân cần trò chuyện, động viên người chiến sĩ Biên phòng; nét mặt, nếp áo và thần thái được điêu khắc tỉ mỉ, sống động. Chế tác từ đồng đúc nguyên khối hoặc composite phủ ánh kim vàng; chân đế đen gắn biển chữ nổi viền vàng, khung kính acrylic trong suốt.",
      image: img("qtBienPhong", "Tượng Bác Hồ với chiến sĩ Biên phòng phủ ánh kim vàng trong khung kính"),
      images: [
        img("qtBienPhongDetail", "Cận cảnh thần thái Bác Hồ và người chiến sĩ"),
        img("qtBienPhongClay", "Phôi mẫu đất sét trong xưởng điêu khắc"),
      ],
      highlights: [
        "Tái hiện chân thực, cảm động hình ảnh Bác Hồ ân cần trò chuyện, động viên người chiến sĩ Biên phòng; nét mặt, nếp áo và thần thái được điêu khắc tỉ mỉ, sống động.",
        "Chế tác từ đồng đúc nguyên khối hoặc composite cao cấp phủ màu ánh kim vàng, bền đẹp theo thời gian.",
        "Chân đế khối màu đen tuyền, gắn biển chữ nổi viền vàng “BÁC HỒ VỚI CHIẾN SĨ BIÊN PHÒNG”; khung bảo vệ bằng kính acrylic trong suốt.",
        "Ứng dụng: quà tặng đối ngoại, tri ân cho các đơn vị Quân đội, Bộ đội Biên phòng, cơ quan ban ngành và đối tác ngoại giao; vật phẩm trưng bày tại phòng truyền thống, phòng làm việc.",
      ],
    },
    {
      title: "Tượng “Bác Hồ ngồi đọc báo Nhân Dân” — 100 năm Báo chí Cách mạng",
      slug: "tuong-bac-ho-doc-bao-nhan-dan",
      category: 3,
      year: "2025",
      place: "Hà Nội",
      summary: "Tượng nghệ thuật cao cấp kỷ niệm 100 năm Ngày Báo chí Cách mạng Việt Nam, do Ban Tuyên giáo lựa chọn Quảng Phú sản xuất.",
      body: "Hướng tới Kỷ niệm 100 năm Ngày Báo chí Cách mạng Việt Nam (21/06/1925 – 21/06/2025), Quảng Phú được Ban Tuyên giáo tin tưởng lựa chọn trực tiếp sản xuất mẫu tượng nghệ thuật cao cấp. Tác phẩm khắc họa thần thái ung dung, trí tuệ của Bác bên tờ báo Nhân Dân; nếp áo, chòm râu và chi tiết tờ báo được điêu khắc chân thực, sắc nét. Chế tác từ đồng đúc nguyên khối hoặc composite phủ ánh kim; đi kèm hộp quà đỏ nhung, quai vàng, mặt hộp ép kim chữ vàng kỷ niệm 100 năm.",
      image: img("qtBaoChi", "Tượng Bác Hồ ngồi đọc báo Nhân Dân màu đồng đỏ"),
      images: [
        img("qtBaoChiBox", "Tượng cùng hộp quà đỏ nhung ép kim chữ vàng"),
        img("qtBaoChiPair", "Cặp tượng hoàn thiện trước khi bàn giao"),
      ],
      highlights: [
        "Khắc họa thần thái ung dung, trí tuệ của Bác Hồ bên tờ báo Nhân Dân; nếp áo, chòm râu và chi tiết tờ báo được điêu khắc chân thực, sắc nét.",
        "Chế tác linh hoạt từ đồng đúc nguyên khối hoặc composite cao cấp phủ ánh kim sang trọng.",
        "Hộp quà đỏ nhung, dây quai vàng, mặt hộp ép kim chữ vàng: “KỶ NIỆM 100 NĂM NGÀY BÁO CHÍ CÁCH MẠNG VIỆT NAM (21/06/1925 – 21/06/2025)”.",
      ],
    },
    {
      title: "Khối xe nghi trượng — Đại lễ A80",
      slug: "khoi-xe-nghi-truong-a80",
      category: 0,
      year: "2025",
      place: "Quảng trường Ba Đình, Hà Nội",
      summary: "Khối xe biểu trưng số 80 dẫn giữa đoàn diễu hành kỷ niệm 80 năm Cách mạng Tháng Tám và Quốc khánh 2/9.",
      body: "Khối xe biểu trưng số 80 là khối xe trung tâm trong lễ diễu binh, diễu hành kỷ niệm 80 năm Cách mạng Tháng Tám và Quốc khánh 2/9 tại Quảng trường Ba Đình. Quảng Phú đảm nhận từ bản vẽ kỹ thuật, dựng khung thép chịu lực trên nền xe chuyên dụng, tạo hình số 80 và các mảng phù điêu, đến hoàn thiện bề mặt, lắp đặt hệ chiếu sáng và vận hành thử trong các buổi tổng duyệt đêm.",
      image: img("a80Night", "Khối xe số 80 tiến trên đại lộ trong buổi tổng duyệt đêm"),
      highlights: [
        "Khối xe dài hơn 12 m, cao gần 6 m; khung thép hộp liên kết bu-lông để tháo lắp, vận chuyển và dựng tại chỗ trong một đêm.",
        "Số 80 và dải phù điêu bằng composite phủ nhũ vàng, bề mặt xử lý chống bong tróc dưới nắng mưa và rung lắc khi di chuyển.",
        "Hệ đèn LED viền và đèn pha chiếu ngược tích hợp sẵn, đồng bộ với kịch bản ánh sáng của ban tổ chức.",
        "Tham gia đầy đủ các buổi sơ duyệt, tổng duyệt; đội kỹ thuật trực tại hiện trường đến khi kết thúc lễ chính.",
      ],
    },
    {
      title: "Khối xe nghi trượng — Đại lễ A50",
      slug: "khoi-xe-nghi-truong-a50",
      category: 0,
      year: "2025",
      place: "TP. Hồ Chí Minh",
      summary: "Khối xe biểu trưng 50 năm Giải phóng miền Nam, thống nhất đất nước, diễu hành tại TP. Hồ Chí Minh.",
      body: "Khối xe biểu trưng 50 năm Giải phóng miền Nam, thống nhất đất nước đi trong đội hình diễu hành tại TP. Hồ Chí Minh ngày 30/4/2025. Thiết kế lấy hình tượng ngôi sao, dải lụa và hoa sen cách điệu, kết hợp mảng phù điêu kể lại chặng đường 50 năm xây dựng và phát triển. Quảng Phú thi công tại xưởng Bắc Ninh, vận chuyển vào Nam và lắp dựng hoàn thiện ngay tại khu vực tập kết.",
      image: img("a50", "Khối xe biểu trưng 50 năm giữa rừng cờ đỏ sao vàng"),
      highlights: [
        "Kết cấu khung thép tách rời thành 4 mô-đun để vận chuyển đường dài, lắp ghép hoàn chỉnh trong 48 giờ.",
        "Phù điêu và chi tiết trang trí bằng composite sơn phủ nhiều lớp, chịu được nắng gắt và độ ẩm cao của miền Nam.",
        "Phối hợp với đơn vị kỹ thuật xe nền để cân chỉnh tải trọng, bảo đảm di chuyển ổn định ở tốc độ diễu hành.",
        "Nghiệm thu cùng ban tổ chức trước lễ chính, bàn giao kèm hồ sơ kỹ thuật và phương án bảo quản sau lễ.",
      ],
    },
    {
      title: "Cụm tượng chiến sĩ Điện Biên",
      slug: "cum-tuong-chien-si-dien-bien",
      category: 2,
      year: "2024",
      place: "Sân vận động tỉnh Điện Biên",
      summary: "Cụm tượng composite giả đồng dài 9 m trên khối xe lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ.",
      body: "Cụm tượng chiến sĩ Điện Biên đặt trên khối xe lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ, tái hiện hình ảnh bộ đội kéo pháo, dân công hỏa tuyến và chiến sĩ xung phong. Cụm tượng dài 9 m, chế tác bằng composite giả đồng, nhẹ để phù hợp tải trọng xe nhưng vẫn giữ được chiều sâu khối và độ chi tiết của tượng đúc.",
      image: img("dbp70Soldiers", "Cụm tượng chiến sĩ màu đồng trên khối xe lễ kỷ niệm"),
      highlights: [
        "Gồm 9 nhân vật tỷ lệ 1:1,2; phác thảo đất sét được ban tổ chức duyệt trước khi làm khuôn.",
        "Composite cốt sợi thủy tinh, lõi khung thép, bề mặt patina giả đồng xanh nhiều lớp cho hiệu quả như đồng đúc lâu năm.",
        "Các nhân vật được chia khối, lắp ghép bằng mối nối giấu để vận chuyển lên Điện Biên và dựng trên xe trong ngày.",
        "Nghệ nhân điêu khắc trực tiếp chỉnh sửa thần thái từng khuôn mặt tại hiện trường trước lễ tổng duyệt.",
      ],
    },
    {
      title: "Tượng Chủ tịch Hồ Chí Minh — Khối xe A80",
      slug: "tuong-bac-ho-khoi-xe-a80",
      category: 1,
      year: "2025",
      place: "Hà Nội",
      summary: "Tượng Bác cao 4,2 m phủ nhũ vàng, đặt trên khối xe dẫn đầu đoàn diễu hành Đại lễ A80.",
      body: "Tượng Chủ tịch Hồ Chí Minh cao 4,2 m đặt trên khối xe dẫn đầu đoàn diễu hành Đại lễ A80, khắc họa hình ảnh Bác vẫy tay chào đồng bào. Đây là hạng mục đòi hỏi độ chính xác cao nhất về thần thái, được Quảng Phú thực hiện từ phác thảo đất sét tỷ lệ 1:5, duyệt mẫu nhiều vòng, rồi phóng lớn và hoàn thiện bằng composite phủ nhũ vàng.",
      image: img("a80Statue", "Tượng Bác Hồ vẫy tay trên khối xe đại lễ"),
      highlights: [
        "Phác thảo được đối chiếu với tư liệu ảnh, phim gốc để bảo đảm thần thái, dáng đứng và nếp áo kaki của Bác.",
        "Lõi khung thép định vị bằng chân đế liên kết trực tiếp vào sàn xe, chịu được gió và rung lắc khi di chuyển.",
        "Lớp nhũ vàng phủ trên nền sơn lót chuyên dụng, kiểm tra dưới nhiều điều kiện ánh sáng ban ngày và đèn đêm.",
        "Hội đồng nghệ thuật của ban tổ chức nghiệm thu trực tiếp tại xưởng trước khi vận chuyển về Hà Nội.",
      ],
    },
    {
      title: "Khối xe Quốc huy — 70 năm Điện Biên Phủ",
      slug: "khoi-xe-quoc-huy-dbp70",
      category: 0,
      year: "2024",
      place: "Sân vận động tỉnh Điện Biên",
      summary: "Khối xe Quốc huy dẫn đầu khối diễu hành quần chúng tại lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ.",
      body: "Khối xe Quốc huy dẫn đầu khối diễu hành quần chúng trong lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ tại sân vận động tỉnh Điện Biên. Quốc huy đường kính lớn đặt trên bệ cách điệu hình sóng lúa, hai bên là con số 70 và dải cờ đỏ. Toàn bộ kết cấu được chế tác tại Bắc Ninh và vận chuyển hơn 450 km lên Điện Biên để lắp dựng.",
      image: img("dbp70Emblem", "Khối xe Quốc huy với số 70"),
      highlights: [
        "Quốc huy đường kính 3,2 m, dập nổi chi tiết bông lúa và bánh xe theo đúng mẫu chuẩn quốc gia.",
        "Bệ và chi tiết trang trí bằng composite, sơn phủ chịu thời tiết vùng cao, sương sớm và nắng gắt ban trưa.",
        "Khung thép mô-đun, tháo rời vận chuyển bằng xe tải, lắp ghép tại chỗ trong một ngày với thiết bị nâng hạ nhẹ.",
        "Vận hành thử trong các buổi sơ duyệt, chỉnh tốc độ và bán kính quay để phù hợp mặt sân.",
      ],
    },
    {
      title: "Khối xe Quốc huy — 60 năm Điện Biên Phủ",
      slug: "khoi-xe-quoc-huy-dbp60",
      category: 0,
      year: "2014",
      place: "Tỉnh Điện Biên",
      summary: "Khối xe Quốc huy và biểu trưng 60 năm Chiến thắng Điện Biên Phủ, một trong những khối xe cấp quốc gia đầu tiên của Quảng Phú.",
      body: "Khối xe Quốc huy và biểu trưng 60 năm Chiến thắng Điện Biên Phủ, thực hiện năm 2014, là một trong những khối xe nghi trượng cấp quốc gia đầu tiên Quảng Phú đảm nhận trọn gói. Dự án đặt nền tảng cho quy trình thiết kế, thi công và vận hành khối xe mà công ty tiếp tục hoàn thiện qua các kỳ đại lễ sau này.",
      image: img("dbp60", "Khối xe Quốc huy với chữ 60 năm"),
      highlights: [
        "Quốc huy và chữ số 60 bằng composite, sơn nhũ vàng, dựng trên khung thép hàn liền khối.",
        "Mảng trang trí hoa ban, biểu tượng của Điện Biên, được tạo hình thủ công và sơn nhiều lớp.",
        "Hoàn thành thi công trong 45 ngày, bao gồm vận chuyển và lắp dựng tại Điện Biên.",
        "Kinh nghiệm từ dự án được áp dụng cho các khối xe ĐBP70, A50 và A80 sau này.",
      ],
    },
    {
      title: "Tượng Bác Hồ tại sân khấu lễ kỷ niệm",
      slug: "tuong-bac-ho-san-khau-le-ky-niem",
      category: 1,
      year: "2025",
      place: "Hà Nội",
      summary: "Tượng cao 3,6 m phủ nhũ vàng, dựng trên sân khấu chính của lễ kỷ niệm tại Hà Nội.",
      body: "Tượng Bác Hồ cao 3,6 m phủ nhũ vàng, dựng trên sân khấu chính của lễ kỷ niệm tại Hà Nội, làm điểm nhấn trung tâm phía sau bục phát biểu. Tượng khắc họa Bác đứng giơ tay chào, được chế tác bằng composite để lắp dựng nhanh trên sân khấu lắp ghép và tháo dỡ sau sự kiện mà không ảnh hưởng đến kết cấu.",
      image: img("hoStage", "Tượng Bác Hồ phủ nhũ vàng trước phông đỏ"),
      highlights: [
        "Phác thảo đất sét tỷ lệ 1:4 được duyệt trước khi phóng lớn; thần thái và dáng đứng đối chiếu với tư liệu gốc.",
        "Composite cốt sợi thủy tinh, trọng lượng nhẹ, chân đế có bản mã liên kết với sàn sân khấu.",
        "Lớp nhũ vàng thử nghiệm dưới đèn sân khấu để không bị lóa khi truyền hình trực tiếp.",
        "Lắp đặt trong một đêm trước ngày tổng duyệt, tháo dỡ và bảo quản để tái sử dụng.",
      ],
    },
    {
      title: "Khối xe “Việt Nam kỷ nguyên phát triển mới”",
      slug: "khoi-xe-ky-nguyen-phat-trien-moi",
      category: 0,
      year: "2025",
      place: "Hà Nội",
      summary: "Khối xe biểu trưng 80 năm với ngôi sao vàng và dải lụa đỏ, thể hiện đất nước bước vào kỷ nguyên phát triển mới.",
      body: "Khối xe “Việt Nam kỷ nguyên phát triển mới” trong Đại lễ A80 thể hiện hình ảnh đất nước vươn lên với ngôi sao vàng, dải lụa đỏ và các biểu tượng công nghiệp, công nghệ, nông nghiệp hiện đại. Quảng Phú thiết kế mỹ thuật, dựng mô hình 3D để ban tổ chức duyệt, sau đó thi công toàn bộ phần tạo hình trên xe nền.",
      image: img("a80NewEra", "Khối xe biểu trưng 80 năm Việt Nam kỷ nguyên phát triển mới"),
      highlights: [
        "Dải lụa đỏ uốn lượn dài 14 m làm từ composite khung thép, tạo hình theo mô hình 3D và cắt CNC.",
        "Ngôi sao vàng đường kính 2,4 m gắn đèn LED viền, sáng đồng bộ theo kịch bản ánh sáng ban đêm.",
        "Các biểu tượng ngành nghề được chế tác tách rời, lắp ghép bằng mối nối giấu để dễ bảo trì.",
        "Thi công trong 60 ngày, tham gia đầy đủ các buổi sơ duyệt và tổng duyệt tại Hà Nội.",
      ],
    },
    {
      title: "Tượng bán thân Bác Hồ — Hội trường",
      slug: "tuong-ban-than-bac-ho-hoi-truong",
      category: 1,
      year: "2025",
      place: "Hội trường lễ kỷ niệm",
      summary: "Tượng bán thân phủ nhũ vàng đặt bục trung tâm hội trường, đồng bộ với phông đỏ, cờ Đảng và ngôi sao.",
      body: "Tượng bán thân Chủ tịch Hồ Chí Minh đặt trên bục trung tâm hội trường lễ kỷ niệm, phía sau là phông đỏ với cờ Đảng, cờ Tổ quốc và ngôi sao vàng. Tượng được chế tác theo mẫu chuẩn với tỷ lệ phù hợp không gian hội trường lớn, bề mặt phủ nhũ vàng đồng bộ với tổng thể trang trí.",
      image: img("hoBust", "Tượng bán thân Bác Hồ trong hội trường đỏ"),
      highlights: [
        "Tượng cao 1,2 m tính cả đế, tỷ lệ tính toán theo khoảng cách nhìn từ hàng ghế xa nhất của hội trường.",
        "Composite cao cấp phủ nhũ vàng, bục đế bọc gỗ sơn đỏ đồng màu phông sân khấu.",
        "Phác thảo được ban tổ chức duyệt trên mẫu đất sét trước khi làm khuôn.",
        "Bàn giao kèm hướng dẫn bảo quản để tái sử dụng cho các sự kiện sau của đơn vị.",
      ],
    },
    {
      title: "Phù điêu và cụm tượng chiến sĩ trên khối xe",
      slug: "phu-dieu-cum-tuong-chien-si-khoi-xe",
      category: 2,
      year: "2024",
      place: "Tỉnh Điện Biên",
      summary: "Khối xe phù điêu giả đồng kể lại chiến dịch Điện Biên Phủ, nghiệm thu cùng ban tổ chức trước ngày diễu hành.",
      body: "Khối xe phù điêu kể lại chiến dịch Điện Biên Phủ qua các mảng chạm nổi kết hợp cụm tượng chiến sĩ phía trước, phục vụ lễ kỷ niệm 70 năm tại tỉnh Điện Biên. Phù điêu được dựng từ phác thảo của họa sỹ, đắp đất, làm khuôn và đúc composite giả đồng, sau đó lắp lên khung xe và nghiệm thu cùng ban tổ chức trước ngày diễu hành.",
      image: img("relief", "Nghiệm thu khối xe phù điêu cùng ban tổ chức"),
      highlights: [
        "Mảng phù điêu dài 8 m, cao 2,4 m, bố cục ba lớp sâu dần để tạo chiều sâu khi nhìn từ khán đài.",
        "Composite cốt sợi thủy tinh phủ patina giả đồng, tông màu đồng bộ với cụm tượng chiến sĩ phía trước.",
        "Khung thép tách thành hai nửa để vận chuyển lên Điện Biên, ghép lại bằng mối nối giấu phía sau.",
        "Ban tổ chức nghiệm thu trực tiếp tại khu tập kết; đội kỹ thuật chỉnh sửa chi tiết ngay tại chỗ.",
      ],
    },
    {
      title: "Tác phẩm lá cờ “Không có gì quý hơn độc lập, tự do”",
      slug: "tac-pham-la-co",
      category: 2,
      year: "2025",
      place: "Hà Nội",
      summary: "Tác phẩm sắp đặt khổ lớn hình lá cờ đỏ sao vàng, cẩu lắp đặt hoàn thiện tại hiện trường trong một đêm.",
      body: "Tác phẩm sắp đặt khổ lớn lấy hình tượng lá cờ đỏ sao vàng tung bay, khắc dòng chữ “Không có gì quý hơn độc lập, tự do”, lắp đặt tại Hà Nội năm 2025. Lá cờ được tạo hình uốn lượn từ khung thép và tấm composite, sơn đỏ ngoài trời, cẩu lắp tại hiện trường trong một đêm để kịp sự kiện.",
      image: img("flag", "Cẩu lắp đặt tác phẩm lá cờ đỏ sao vàng"),
      highlights: [
        "Kích thước 9 × 6 m, khung thép hộp tính toán chịu gió cấp 10, liên kết móng bằng bu-lông neo.",
        "Bề mặt composite sơn đỏ hệ PU ngoài trời, ngôi sao và dòng chữ sơn nhũ vàng chống phai màu.",
        "Chia thành 3 mô-đun, vận chuyển bằng xe tải và cẩu lắp hoàn thiện trong 6 giờ.",
        "Kiểm tra an toàn kết cấu và chiếu sáng ban đêm trước khi bàn giao cho đơn vị quản lý.",
      ],
    },
  ] as ProjectItem[]),
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
  projects: ([
    {
      title: "“Determined to die for the Fatherland to live” — Hanoi Capital Command",
      slug: "bieu-tuong-quyet-tu-bo-tu-lenh-thu-do",
      category: 3,
      year: "2026",
      place: "Hanoi",
      summary: "Premium diplomatic gift for the 80th anniversary of the Capital Armed Forces, presented by the Hanoi Capital Command to Party, State and Army leaders.",
      body: "A premium diplomatic gift for the 80th anniversary of the Capital Armed Forces (19/10/1946 – 19/10/2026), presented by the Hanoi Capital Command to General Secretary and President To Lam and leaders of the Party, State and Army. The piece recreates the three legendary figures of winter 1946: a National Guard soldier with a tri-pronged bomb, a militia woman with a sword and a worker militiaman holding his rifle; cast in solid bronze or metallic-finished composite, on a base engraved in red with a black plinth, bronze plaque and acrylic display case.",
      image: img("qtQuyetTu", "Metallic-finish statue of Determined to die for the Fatherland to live in an acrylic case"),
      images: [
        img("qtQuyetTuHandover", "Presentation ceremony at the Hanoi Capital Command"),
        img("qtQuyetTuDetail", "Close-up of the three figures on the red-lettered base"),
        img("qtQuyetTuRows", "Finished statues in acrylic display cases"),
      ],
      highlights: [
        "A finely detailed recreation of the three legendary figures: a National Guard soldier with a tri-pronged bomb, a militia woman with a sword and a worker militiaman holding his rifle — the heroic spirit of Hanoi in winter 1946.",
        "Cast in solid bronze or premium metallic-finished composite; every fold and facial expression is sharply sculpted.",
        "A solid base engraved in red with “DETERMINED TO DIE FOR THE FATHERLAND TO LIVE”; black plinth with a red-bronze plaque marking the 80th anniversary.",
        "Clear acrylic case protects from dust and shows the piece at its best.",
        "Uses: diplomatic gifts for agencies, organisations, businesses and military units; display pieces for offices, tradition rooms and heritage spaces.",
      ],
    },
    {
      title: "“Uncle Ho with a Border Guard soldier” — Border Guard Command",
      slug: "tuong-bac-ho-voi-chien-si-bien-phong",
      category: 3,
      year: "2026",
      place: "Hanoi",
      summary: "The Border Guard Command's signature commemorative gift statue, showing Uncle Ho warmly talking with a soldier.",
      body: "Quang Phu was chosen by the Border Guard Command to craft its signature diplomatic and commemorative gift statue. The piece captures President Ho Chi Minh warmly talking with and encouraging a Border Guard soldier, with faces, clothing folds and expressions sculpted in lifelike detail. Cast in solid bronze or gold metallic-finished composite, on a black plinth with a gold-edged raised nameplate and a clear acrylic display case.",
      image: img("qtBienPhong", "Gold metallic-finish statue of Uncle Ho with a Border Guard soldier in an acrylic case"),
      images: [
        img("qtBienPhongDetail", "Close-up of Uncle Ho and the soldier"),
        img("qtBienPhongClay", "Clay master model in the sculpture workshop"),
      ],
      highlights: [
        "A moving, lifelike depiction of President Ho Chi Minh warmly talking with and encouraging a Border Guard soldier, with faces, clothing folds and expressions sculpted in fine detail.",
        "Cast in solid bronze or premium composite with a gold metallic finish that lasts.",
        "Elegant black plinth with a gold-edged raised nameplate “UNCLE HO WITH A BORDER GUARD SOLDIER”; clear acrylic protective case.",
        "Uses: diplomatic and appreciation gifts for Army and Border Guard units, government bodies and diplomatic partners; display pieces for tradition rooms and offices.",
      ],
    },
    {
      title: "“Uncle Ho reading Nhan Dan newspaper” — 100 years of Revolutionary Press",
      slug: "tuong-bac-ho-doc-bao-nhan-dan",
      category: 3,
      year: "2025",
      place: "Hanoi",
      summary: "Premium art statue for the centenary of Vietnam's Revolutionary Press, produced by Quang Phu for the Central Propaganda Department.",
      body: "For the centenary of Vietnam's Revolutionary Press Day (21/06/1925 – 21/06/2025), Quang Phu was chosen by the Central Propaganda Department to produce this premium art statue. It captures President Ho Chi Minh's calm, thoughtful presence as he reads Nhan Dan; the folds of his clothing, his beard and the newspaper are sculpted in sharp, lifelike detail. Cast in solid bronze or metallic-finished composite, presented in a red velvet gift box with gold handles and gold-foil centenary lettering.",
      image: img("qtBaoChi", "Red-bronze statue of Uncle Ho seated reading Nhan Dan newspaper"),
      images: [
        img("qtBaoChiBox", "The statue with its red velvet gift box and gold-foil lettering"),
        img("qtBaoChiPair", "A finished pair of statues before delivery"),
      ],
      highlights: [
        "Captures President Ho Chi Minh's calm, thoughtful presence as he reads Nhan Dan; the folds of his clothing, his beard and the newspaper are sculpted in sharp, lifelike detail.",
        "Cast in solid bronze or premium composite with a refined metallic finish.",
        "Red velvet gift box with gold handles and gold-foil lettering: “100 YEARS OF VIETNAM'S REVOLUTIONARY PRESS (21/06/1925 – 21/06/2025)”.",
      ],
    },
    {
      title: "Ceremonial float — A80 celebration",
      slug: "khoi-xe-nghi-truong-a80",
      category: 0,
      year: "2025",
      place: "Ba Dinh Square, Hanoi",
      summary: "The number-80 float at the heart of the parade marking 80 years of the August Revolution and National Day.",
      body: "The number-80 float was the centrepiece of the parade marking 80 years of the August Revolution and National Day at Ba Dinh Square. Quang Phu handled everything from technical drawings and the load-bearing steel frame on a dedicated chassis, through shaping the number 80 and relief panels, to surface finishing, lighting and trial runs during the night rehearsals.",
      image: img("a80Night", "The number-80 float advancing along the boulevard at a night rehearsal"),
      highlights: [
        "Over 12 m long and nearly 6 m high; bolted box-steel frame for dismantling, transport and overnight assembly on site.",
        "Number 80 and relief band in gold-finished composite, surface-treated against peeling in sun, rain and road vibration.",
        "Integrated LED edge lighting and uplights, synchronised with the organisers' lighting script.",
        "Attended every preliminary and full rehearsal; technical crew on site until the main ceremony ended.",
      ],
    },
    {
      title: "Ceremonial float — A50 celebration",
      slug: "khoi-xe-nghi-truong-a50",
      category: 0,
      year: "2025",
      place: "Ho Chi Minh City",
      summary: "Float marking 50 years of the Liberation of the South and National Reunification, paraded in Ho Chi Minh City.",
      body: "The float marking 50 years of the Liberation of the South and National Reunification took part in the parade in Ho Chi Minh City on 30 April 2025. The design combines a star, flowing ribbon and stylised lotus with relief panels telling the story of 50 years of growth. Quang Phu built it in Bac Ninh, shipped it south and completed assembly at the staging area.",
      image: img("a50", "The 50th-anniversary float among red flags"),
      highlights: [
        "Steel frame split into 4 modules for long-distance transport, fully assembled in 48 hours.",
        "Reliefs and decorative details in multi-coat painted composite, built for the South's harsh sun and humidity.",
        "Worked with the chassis team to balance the load for stable movement at parade speed.",
        "Inspected with the organisers before the ceremony; handed over with technical files and a post-event storage plan.",
      ],
    },
    {
      title: "Dien Bien soldiers sculpture group",
      slug: "cum-tuong-chien-si-dien-bien",
      category: 2,
      year: "2024",
      place: "Dien Bien Provincial Stadium",
      summary: "A 9 m bronze-effect composite sculpture group on the float for the 70th anniversary of the Dien Bien Phu Victory.",
      body: "A sculpture group of Dien Bien soldiers mounted on the float for the 70th anniversary of the Dien Bien Phu Victory, recreating troops hauling artillery, frontline porters and charging soldiers. The 9 m group is made of bronze-effect composite: light enough for the vehicle, yet with the depth and detail of cast bronze.",
      image: img("dbp70Soldiers", "Bronze-coloured soldier sculptures on an anniversary float"),
      highlights: [
        "Nine figures at 1:1.2 scale; the clay maquette was approved by the organisers before moulding.",
        "Glass-fibre composite over a steel armature, with multi-layer green-bronze patina for the look of aged cast bronze.",
        "Figures split into sections with hidden joints for transport to Dien Bien and same-day assembly on the vehicle.",
        "Sculptors refined each face on site before the full rehearsal.",
      ],
    },
    {
      title: "Statue of President Ho Chi Minh — A80 float",
      slug: "tuong-bac-ho-khoi-xe-a80",
      category: 1,
      year: "2025",
      place: "Hanoi",
      summary: "A 4.2 m gold-finished statue of Ho Chi Minh on the lead float of the A80 parade.",
      body: "A 4.2 m statue of President Ho Chi Minh on the lead float of the A80 parade, showing him waving to the people. The most demanding piece in terms of likeness, it went from a 1:5 clay maquette through several approval rounds to full-scale enlargement and finishing in gold-finished composite.",
      image: img("a80Statue", "Ho Chi Minh statue waving from a celebration float"),
      highlights: [
        "The maquette was checked against archive photographs and film for expression, stance and the folds of his khaki jacket.",
        "Steel armature anchored through the base directly to the vehicle deck, resisting wind and vibration on the move.",
        "Gold finish over a dedicated primer, tested under daylight and night lighting conditions.",
        "The organisers' art council inspected the statue at the workshop before transport to Hanoi.",
      ],
    },
    {
      title: "National emblem float — 70 years of Dien Bien Phu",
      slug: "khoi-xe-quoc-huy-dbp70",
      category: 0,
      year: "2024",
      place: "Dien Bien Provincial Stadium",
      summary: "The National Emblem float leading the public parade at the 70th anniversary of the Dien Bien Phu Victory.",
      body: "The National Emblem float led the public parade at the 70th anniversary of the Dien Bien Phu Victory in Dien Bien provincial stadium. A large emblem sits on a stylised rice-wave base flanked by the number 70 and red flag ribbons. The whole structure was built in Bac Ninh and transported more than 450 km to Dien Bien for assembly.",
      image: img("dbp70Emblem", "National emblem float with the number 70"),
      highlights: [
        "Emblem 3.2 m in diameter, with rice ears and cogwheel embossed to the official national pattern.",
        "Composite base and trim with weather-resistant paint for highland mist and harsh midday sun.",
        "Modular steel frame transported by truck and assembled on site in one day with light lifting gear.",
        "Trial runs during rehearsals to tune speed and turning radius to the stadium surface.",
      ],
    },
    {
      title: "National emblem float — 60 years of Dien Bien Phu",
      slug: "khoi-xe-quoc-huy-dbp60",
      category: 0,
      year: "2014",
      place: "Dien Bien Province",
      summary: "National Emblem float with the 60-year Dien Bien Phu insignia, one of Quang Phu's first national-level floats.",
      body: "The National Emblem float with the 60-year Dien Bien Phu insignia, built in 2014, was one of the first national-level ceremonial floats Quang Phu delivered end to end. The project laid the groundwork for the design, build and operation process the company has refined through every national celebration since.",
      image: img("dbp60", "National emblem float with the words '60 years'"),
      highlights: [
        "Emblem and number 60 in gold-painted composite on a fully welded steel frame.",
        "Ban flower motifs, the symbol of Dien Bien, hand-shaped and multi-coat painted.",
        "Completed in 45 days, including transport and assembly in Dien Bien.",
        "Lessons from this project were applied to the DBP70, A50 and A80 floats.",
      ],
    },
    {
      title: "Ho Chi Minh statue on the anniversary stage",
      slug: "tuong-bac-ho-san-khau-le-ky-niem",
      category: 1,
      year: "2025",
      place: "Hanoi",
      summary: "A 3.6 m gold-finished statue on the main stage of an anniversary ceremony in Hanoi.",
      body: "A 3.6 m gold-finished statue of Ho Chi Minh on the main stage of an anniversary ceremony in Hanoi, the focal point behind the podium. It shows him standing with a raised hand in greeting, made in composite for fast installation on a temporary stage and removal afterwards without affecting the structure.",
      image: img("hoStage", "Gilded Ho Chi Minh statue before a red backdrop"),
      highlights: [
        "A 1:4 clay maquette was approved before enlargement; expression and stance checked against archive sources.",
        "Lightweight glass-fibre composite with a base plate bolted to the stage floor.",
        "Gold finish tested under stage lighting to avoid glare on live television.",
        "Installed in one night before the full rehearsal, then removed and stored for reuse.",
      ],
    },
    {
      title: "'Vietnam, a new era of development' float",
      slug: "khoi-xe-ky-nguyen-phat-trien-moi",
      category: 0,
      year: "2025",
      place: "Hanoi",
      summary: "80-year float with a gold star and red ribbon, showing the nation entering a new era of development.",
      body: "The 'Vietnam, a new era of development' float in the A80 celebration shows the nation rising, with a gold star, red ribbon and symbols of modern industry, technology and agriculture. Quang Phu produced the artistic design and a 3D model for approval, then built the entire sculptural body on the chassis.",
      image: img("a80NewEra", "The 80th-anniversary 'new era of development' float"),
      highlights: [
        "A 14 m flowing red ribbon in composite on a steel frame, shaped from the 3D model and CNC-cut.",
        "A 2.4 m gold star with LED edge lighting, synchronised with the night lighting script.",
        "Industry symbols built as separate pieces with hidden joints for easy maintenance.",
        "Built in 60 days; took part in every preliminary and full rehearsal in Hanoi.",
      ],
    },
    {
      title: "Ho Chi Minh bust — assembly hall",
      slug: "tuong-ban-than-bac-ho-hoi-truong",
      category: 1,
      year: "2025",
      place: "Anniversary assembly hall",
      summary: "Gold-finished bust on the central plinth of an assembly hall, matching the red backdrop, Party flag and star.",
      body: "A bust of President Ho Chi Minh on the central plinth of an anniversary assembly hall, against a red backdrop with the Party flag, national flag and gold star. Made to the standard model at a scale suited to a large hall, with a gold finish matching the overall decoration.",
      image: img("hoBust", "Bust of Ho Chi Minh in a red assembly hall"),
      highlights: [
        "1.2 m high including the plinth, scaled for viewing from the furthest row of seats.",
        "Premium composite with gold finish; wooden plinth painted red to match the stage backdrop.",
        "The organisers approved the clay maquette before moulding.",
        "Delivered with care instructions so the unit can reuse it for future events.",
      ],
    },
    {
      title: "Relief and soldier sculptures on a float",
      slug: "phu-dieu-cum-tuong-chien-si-khoi-xe",
      category: 2,
      year: "2024",
      place: "Dien Bien Province",
      summary: "Bronze-effect relief float telling the story of the Dien Bien Phu campaign, inspected with the organisers before parade day.",
      body: "A relief float telling the story of the Dien Bien Phu campaign through raised panels, combined with a soldier sculpture group at the front, for the 70th anniversary in Dien Bien province. The relief went from the artist's sketch to clay modelling, moulding and bronze-effect composite casting, then was mounted on the vehicle frame and inspected with the organisers before parade day.",
      image: img("relief", "Inspecting the relief float with the organising committee"),
      highlights: [
        "Relief 8 m long and 2.4 m high, composed in three receding layers for depth when seen from the stands.",
        "Glass-fibre composite with bronze patina, toned to match the soldier group in front.",
        "Steel frame split in two for transport to Dien Bien, rejoined with hidden joints at the rear.",
        "Inspected by the organisers at the staging area; the crew refined details on the spot.",
      ],
    },
    {
      title: "Flag installation 'Nothing is more precious than independence and freedom'",
      slug: "tac-pham-la-co",
      category: 2,
      year: "2025",
      place: "Hanoi",
      summary: "Large-scale red-flag installation, craned into place and completed on site overnight.",
      body: "A large-scale installation of a flying red flag with gold star, inscribed 'Nothing is more precious than independence and freedom', installed in Hanoi in 2025. The flag's flowing form is built from a steel frame and composite panels with outdoor red paint, craned into place overnight to be ready for the event.",
      image: img("flag", "Craning the red-flag installation into place"),
      highlights: [
        "9 × 6 m, box-steel frame designed for force-10 winds, anchored to the foundation with anchor bolts.",
        "Composite surface in outdoor PU red; star and lettering in fade-resistant gold.",
        "Three modules transported by truck and craned into position in 6 hours.",
        "Structural safety and night lighting checked before handover to the managing unit.",
      ],
    },
  ] as ProjectItem[]),
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
export type Project = Content["projects"][number];
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
