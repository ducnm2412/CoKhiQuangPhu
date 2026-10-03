// Toàn bộ nội dung trang, hai ngôn ngữ: `vi` (gốc) và `en` (bản dịch, cùng cấu trúc).
// Sửa chữ ở đây; TypeScript sẽ báo lỗi nếu bản tiếng Anh thiếu mục so với bản tiếng Việt.
// Các mục đánh dấu "TODO: xác minh" là nội dung tạm, cần thay bằng thông tin thật trước khi đưa lên mạng.

import type { Locale } from "./i18n";

export type Img = { src: string; alt: string; position?: string };

// Thông tin không phụ thuộc ngôn ngữ
export const contact = {
  taxCode: "2300987654", // TODO: xác minh
  email: "contact@gmail.com", // TODO: thay bằng email thật của công ty
  phone: "0961 031 318",
  phoneHref: "tel:0961031318",
  zaloHref: "https://zalo.me/0961031318",
  facebookHref: "#", // TODO: thay bằng link Fanpage
  mapsHref: "https://maps.app.goo.gl/3jSzaGFSzLRdym8LA",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59584.06496039229!2d106.2234395!3d21.032523549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359e44297fe397%3A0x6c42d9916b1fcc9d!2zTMawxqFuZyBUw6BpLCBC4bqvYyBOaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1790929941093!5m2!1svi!2s",
};

// Đường dẫn ảnh dùng chung cho cả hai ngôn ngữ
const P = {
  a80Night: { src: "/images/a80-khoi-xe-dem.webp" },
  a80NewEra: { src: "/images/a80-khoi-xe-ky-nguyen-moi.webp" },
  a80Statue: { src: "/images/a80-tuong-bac-khoi-xe.webp" },
  a80Mausoleum: { src: "/images/a80-tuong-bac-lang.webp", position: "50% 35%" },
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
};
const img = (key: keyof typeof P, alt: string): Img => ({ ...P[key], alt });

// Logo đối tác (tên hiển thị theo ngôn ngữ ở `partnerNames`). Chỉ đưa logo của đơn vị đã đồng ý.
const partnerLogos = [
  "/logo-doitac/Bo-quoc-phong.webp",
  "/logo-doitac/HN-300x300.webp",
  "/logo-doitac/Petro-Vietnam.webp",
  "/logo-doitac/TW-doan-272x300.webp",
  "/logo-doitac/lien-hiep-thanh-nien-300x300.webp",
];

const vi = {
  meta: {
    title: "Quảng Phú — Cơ khí mỹ thuật: xe nghi trượng, tượng Bác Hồ, tượng chân dung thờ",
    description:
      "Công ty TNHH Cơ khí Mỹ thuật Quảng Phú (Bắc Ninh) thiết kế, chế tác và bàn giao trọn gói khối xe nghi trượng đại lễ A05–A80, tượng Chủ tịch Hồ Chí Minh, tượng chân dung thờ và quà tặng mỹ thuật.",
  },
  company: {
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
    sheet: "Bản vẽ số",
    detail: "Chi tiết",
    imagePending: "Ảnh đang cập nhật",
    portraitPending: "Ảnh chân dung · đang cập nhật",
    callNow: "Gọi ngay",
    zaloChat: "Nhắn Zalo",
  },
  hero: {
    weAre: "Chúng tôi là",
    tagline: "Xưởng cơ khí mỹ thuật chế tác xe nghi trượng đại lễ, tượng đài và tượng chân dung.",
    scroll: "Cuộn xuống",
    drawingLabel: "KHỐI XE NGHI TRƯỢNG · SƠ ĐỒ MINH HỌA",
    drawingTitle: "Sơ đồ minh họa hình chiếu đứng của một khối xe nghi trượng với các kích thước L, H, B",
  },
  // TODO: xác minh
  stats: [
    { value: "120+", label: "dự án, công trình đã hoàn thành" },
    { value: "15 năm", label: "chế tác cơ khí mỹ thuật" },
  ],
  homeAbout: {
    title1: "Tạo nên",
    title2: "biểu tượng",
    body: "Quảng Phú là xưởng cơ khí mỹ thuật tại Bắc Ninh, trực tiếp sản xuất các khối xe nghi trượng trong những kỳ đại lễ quốc gia từ A05 đến A80, cùng tượng Chủ tịch Hồ Chí Minh, tượng chân dung thờ và quà tặng mỹ thuật.",
    quote: "Nhận báo giá",
    more: "Về Quảng Phú",
    image: img("a80Mausoleum", "Tượng Chủ tịch Hồ Chí Minh trên khối xe đại lễ, phía sau là Lăng Bác"),
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
      body: "Quảng Phú nhận trọn gói khối xe từ ý tưởng, bản vẽ phối cảnh, kết cấu khung đến tạo hình biểu tượng, hoàn thiện bề mặt và vận hành trong ngày lễ. Xưởng đã trực tiếp làm các khối xe cho những kỳ đại lễ quốc gia từ A05 đến A80.",
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
    ],
    [
      img("hoBust", "Tượng bán thân Bác Hồ trong hội trường"),
      img("a80Night", "Khối xe số 80 trong buổi tổng duyệt đêm"),
      img("dbp60", "Khối xe Quốc huy 60 năm"),
      img("a80Statue", "Tượng Bác Hồ trên khối xe A80"),
      img("dbp70Soldiers", "Cụm tượng chiến sĩ màu đồng"),
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
  },
  projectCategories: ["Xe nghi trượng", "Tượng Bác Hồ", "Tượng đài & phù điêu"],
  // TODO: xác minh thời gian, địa điểm, kích thước và hạng mục Quảng Phú đảm nhận
  projects: [
    {
      title: "Khối xe nghi trượng — Đại lễ A80",
      category: 0,
      year: "2025",
      place: "Quảng trường Ba Đình, Hà Nội",
      body: "Thiết kế, chế tác và lắp dựng khối xe biểu trưng số 80 trong Đại lễ kỷ niệm 80 năm Cách mạng Tháng Tám và Quốc khánh 2/9.",
      image: img("a80Night", "Khối xe số 80 tiến trên đại lộ trong buổi tổng duyệt đêm"),
    },
    {
      title: "Khối xe nghi trượng — Đại lễ A50",
      category: 0,
      year: "2025",
      place: "TP. Hồ Chí Minh",
      body: "Khối xe biểu trưng 50 năm Giải phóng miền Nam, thống nhất đất nước.",
      image: img("a50", "Khối xe biểu trưng 50 năm giữa rừng cờ đỏ sao vàng"),
    },
    {
      title: "Cụm tượng chiến sĩ Điện Biên",
      category: 2,
      year: "2024",
      place: "Sân vận động tỉnh Điện Biên",
      body: "Cụm tượng composite giả đồng dài 9 m trên khối xe lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ.",
      image: img("dbp70Soldiers", "Cụm tượng chiến sĩ màu đồng trên khối xe lễ kỷ niệm"),
    },
    {
      title: "Tượng Chủ tịch Hồ Chí Minh — Khối xe A80",
      category: 1,
      year: "2025",
      place: "Hà Nội",
      body: "Tượng Bác cao 4,2 m phủ nhũ, đặt trên khối xe dẫn đầu đoàn diễu hành.",
      image: img("a80Statue", "Tượng Bác Hồ vẫy tay trên khối xe đại lễ"),
    },
    {
      title: "Khối xe Quốc huy — 70 năm Điện Biên Phủ",
      category: 0,
      year: "2024",
      place: "Sân vận động tỉnh Điện Biên",
      body: "Khối xe Quốc huy dẫn đầu khối diễu hành quần chúng.",
      image: img("dbp70Emblem", "Khối xe Quốc huy với số 70"),
    },
    {
      title: "Khối xe Quốc huy — 60 năm Điện Biên Phủ",
      category: 0,
      year: "2014",
      place: "Tỉnh Điện Biên",
      body: "Khối xe Quốc huy và biểu trưng 60 năm Chiến thắng Điện Biên Phủ.",
      image: img("dbp60", "Khối xe Quốc huy với chữ 60 năm"),
    },
    {
      title: "Tượng Bác Hồ tại sân khấu lễ kỷ niệm",
      category: 1,
      year: "2025",
      place: "Hà Nội",
      body: "Tượng cao 3,6 m phủ nhũ vàng, dựng trên sân khấu chính của lễ kỷ niệm.",
      image: img("hoStage", "Tượng Bác Hồ phủ nhũ vàng trước phông đỏ"),
    },
    {
      title: "Khối xe “Việt Nam kỷ nguyên phát triển mới”",
      category: 0,
      year: "2025",
      place: "Hà Nội",
      body: "Khối xe biểu trưng 80 năm với ngôi sao và dải lụa đỏ.",
      image: img("a80NewEra", "Khối xe biểu trưng 80 năm Việt Nam kỷ nguyên phát triển mới"),
    },
    {
      title: "Tượng bán thân Bác Hồ — Hội trường",
      category: 1,
      year: "2025",
      place: "Hội trường lễ kỷ niệm",
      body: "Tượng bán thân đặt bục, phông đỏ đồng bộ với cờ Đảng và ngôi sao.",
      image: img("hoBust", "Tượng bán thân Bác Hồ trong hội trường đỏ"),
    },
    {
      title: "Phù điêu và cụm tượng chiến sĩ trên khối xe",
      category: 2,
      year: "2024",
      place: "Tỉnh Điện Biên",
      body: "Phù điêu giả đồng kể lại chiến dịch, nghiệm thu cùng ban tổ chức trước ngày diễu hành.",
      image: img("relief", "Nghiệm thu khối xe phù điêu cùng ban tổ chức"),
    },
    {
      title: "Tác phẩm lá cờ “Không có gì quý hơn độc lập, tự do”",
      category: 2,
      year: "2025",
      place: "Hà Nội",
      body: "Tác phẩm sắp đặt khổ lớn, cẩu lắp đặt tại hiện trường.",
      image: img("flag", "Cẩu lắp đặt tác phẩm lá cờ đỏ sao vàng"),
    },
  ],
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
  news: [
    {
      slug: "nang-cap-xuong-bac-ninh",
      tag: "Năng lực",
      title: "Nâng cấp xưởng cơ khí mỹ thuật tại Bắc Ninh",
      summary: "Xưởng mở rộng, có thêm cẩu trục tải trọng lớn, sẵn sàng làm song song nhiều khối xe đại lễ.",
      body: [
        "Xưởng tại Thôn Quảng Bố, Xã Quảng Phú, Lương Tài, Bắc Ninh vừa hoàn thành nâng cấp: mở rộng nhà xưởng, bổ sung cẩu trục tải trọng lớn và thiết bị gia công cơ khí chính xác.",
        "Nhờ đó, Quảng Phú có thể triển khai cùng lúc nhiều khối xe nghi trượng và công trình tượng đài khổ lớn, giữ tiến độ gấp mà vẫn đảm bảo an toàn kỹ thuật và thẩm mỹ.",
      ],
      image: img("flag", "Cẩu trục đưa tác phẩm lá cờ khổ lớn vào vị trí"),
    },
    {
      slug: "ky-thuat-so-trong-tuong-truyen-than",
      tag: "Kỹ thuật",
      title: "Kỹ thuật số và tay nghề thủ công trong tượng truyền thần",
      summary: "Dựng mẫu 3D từ ảnh cũ để gia đình duyệt trước, rồi nghệ nhân hoàn thiện từng nét bằng tay.",
      body: [
        "Từ ảnh tư liệu của gia đình, đội thiết kế dựng mẫu 3D để khách xem trước và chỉnh tỷ lệ khuôn mặt trước khi đúc phôi.",
        "Phần hồn của tượng nằm ở khâu cuối: nghệ nhân trực tiếp chạm từng nếp nhăn, khóe mắt trên bề mặt kim loại — việc máy móc không thay được.",
      ],
      image: img("hoStanding", "Bề mặt tượng được nghệ nhân hoàn thiện thủ công"),
    },
    {
      slug: "ban-giao-tuong-bac-ho-cap-tinh",
      tag: "Dự án",
      title: "Bàn giao tượng Bác Hồ cho các cơ quan cấp tỉnh",
      summary: "Hoàn thành vận chuyển và lắp đặt loạt tượng Chủ tịch Hồ Chí Minh tại hội trường các cơ quan hành chính.",
      body: [
        "Cuối năm, đội kỹ thuật Quảng Phú đã đóng gói, vận chuyển và lắp đặt an vị nhiều tượng Chủ tịch Hồ Chí Minh tại cơ quan hành chính và hội trường các tỉnh.",
        "Tượng được chở bằng xe chuyên dụng với giá đỡ chống sốc. Đội thi công khảo sát bệ đặt, kiểm tra khả năng chịu lực và cố định chắc chắn trước khi bàn giao đúng tiến độ.",
      ],
      image: img("hoBust", "Tượng bán thân Chủ tịch Hồ Chí Minh đặt tại hội trường"),
    },
    {
      slug: "do-ben-tuong-dai-ngoai-troi",
      tag: "Kiến thức",
      title: "Điều gì giữ tượng đài ngoài trời bền với thời gian?",
      summary: "Ba yếu tố: hợp kim chuẩn, khung thép tính toán kỹ và lớp phủ chống oxy hóa.",
      body: [
        "Tượng đài ngoài trời chịu nắng gắt, mưa axit và chênh lệch nhiệt độ lớn. Độ bền đến từ ba yếu tố:",
        "Hợp kim chất lượng cao, đúng thành phần, hạn chế xốp rỗ trong lõi. Khung thép chịu lực do kỹ sư tính toán để chống gió và giãn nở nhiệt.",
        "Lớp phủ chống oxy hóa ngoài cùng giữ màu, ngăn rỉ sét và giúp ban quản lý di tích giảm chi phí bảo trì hằng năm.",
      ],
      image: img("dbp70Soldiers", "Cụm tượng chiến sĩ giả đồng đặt ngoài trời"),
    },
  ],

  // ——— Về chúng tôi ———
  aboutPage: {
    metaTitle: "Về chúng tôi — Quảng Phú, xưởng cơ khí mỹ thuật Bắc Ninh",
    metaDescription:
      "Giới thiệu Công ty TNHH Cơ khí Mỹ thuật Quảng Phú: năng lực sản xuất khối xe nghi trượng đại lễ A05–A80, ban lãnh đạo và đội ngũ nghệ nhân, kỹ thuật.",
    topic: "Giới thiệu",
    title: "Về Quảng Phú",
    lead: "Xưởng cơ khí mỹ thuật tại Lương Tài, Bắc Ninh — từ bản vẽ đến ngày bàn giao.",
    capabilityTopic: "Năng lực",
    capabilityTitle: "Xưởng cơ khí mỹ thuật đã qua thử thách cấp quốc gia",
    capabilityBody:
      "Công ty TNHH Cơ khí Mỹ thuật Quảng Phú đặt xưởng tại Bắc Ninh, chuyên thiết kế và chế tác các sản phẩm cơ khí mỹ thuật: khối xe nghi trượng đại lễ, công trình tượng đài, tượng chân dung và quà tặng mỹ thuật.",
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
    { term: "Năm thành lập", value: "2011" },
    { term: "Xưởng sản xuất", value: "Lương Tài, Bắc Ninh · 3.000 m²" },
    { term: "Nhân sự", value: "65+ người" },
    { term: "Đại lễ đã tham gia", value: "A05 – A80" },
  ],
  strengths: [
    {
      title: "Kinh nghiệm thực chiến cấp quốc gia",
      body: "Đã trực tiếp sản xuất, thi công thành công các khối xe nghi trượng cho các dịp đại lễ lớn, từ A05 đến A80.",
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
        "Hơn 15 năm thiết kế và thi công khối xe nghi trượng, công trình mỹ thuật",
        "Trực tiếp chỉ đạo sản xuất các khối xe cho Đại lễ A50, A80 và lễ kỷ niệm 70 năm Chiến thắng Điện Biên Phủ",
        "Sáng lập xưởng Quảng Phú tại Lương Tài, Bắc Ninh năm 2011",
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
      "Quang Phu Art Mechanics Co., Ltd. (Bac Ninh, Vietnam) designs, fabricates and delivers ceremonial parade floats for national celebrations A05–A80, statues of President Ho Chi Minh, ancestral portrait statues and art gifts.",
  },
  company: {
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
    sheet: "Drawing no.",
    detail: "Detail",
    imagePending: "Photo coming soon",
    portraitPending: "Portrait · coming soon",
    callNow: "Call us",
    zaloChat: "Message us on Zalo",
  },
  hero: {
    weAre: "We are",
    tagline: "An art metalwork studio building ceremonial floats, monuments and portrait statues.",
    scroll: "Scroll down",
    drawingLabel: "CEREMONIAL FLOAT · ILLUSTRATIVE DIAGRAM",
    drawingTitle: "Illustrative front elevation of a ceremonial float with dimensions L, H and B",
  },
  stats: [
    { value: "120+", label: "projects and works completed" },
    { value: "15 years", label: "of art metalwork" },
  ],
  homeAbout: {
    title1: "Building",
    title2: "symbols",
    body: "Quang Phu is an art metalwork studio in Bac Ninh. We build ceremonial floats for Vietnam's national celebrations from A05 to A80, as well as statues of President Ho Chi Minh, ancestral portrait statues and art gifts.",
    quote: "Get a quote",
    more: "About Quang Phu",
    image: img("a80Mausoleum", "Statue of President Ho Chi Minh on a ceremonial float, with the Mausoleum behind"),
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
      body: "Quang Phu takes on floats end to end: concept, perspective drawings, frame structure, sculpted emblems, surface finishing and operation on the day. Our workshop has built floats for Vietnam's national celebrations from A05 to A80.",
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
    ],
    [
      img("hoBust", "Bust of Ho Chi Minh in an assembly hall"),
      img("a80Night", "The number-80 float during a night rehearsal"),
      img("dbp60", "National emblem float, 60th anniversary"),
      img("a80Statue", "Ho Chi Minh statue on the A80 float"),
      img("dbp70Soldiers", "Bronze-effect soldier sculptures"),
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
  },
  projectCategories: ["Ceremonial floats", "Ho Chi Minh statues", "Monuments & reliefs"],
  projects: [
    {
      title: "Ceremonial float — A80 celebration",
      category: 0,
      year: "2025",
      place: "Ba Dinh Square, Hanoi",
      body: "Design, fabrication and assembly of the number-80 float for the 80th anniversary of the August Revolution and National Day (2 September).",
      image: img("a80Night", "The number-80 float advancing along the boulevard at a night rehearsal"),
    },
    {
      title: "Ceremonial float — A50 celebration",
      category: 0,
      year: "2025",
      place: "Ho Chi Minh City",
      body: "Float marking 50 years since the liberation of the South and national reunification.",
      image: img("a50", "The 50th-anniversary float among red flags"),
    },
    {
      title: "Dien Bien soldiers sculpture group",
      category: 2,
      year: "2024",
      place: "Dien Bien Provincial Stadium",
      body: "A 9 m bronze-effect composite sculpture group on a float for the 70th anniversary of the Dien Bien Phu victory.",
      image: img("dbp70Soldiers", "Bronze-coloured soldier sculptures on an anniversary float"),
    },
    {
      title: "Statue of President Ho Chi Minh — A80 float",
      category: 1,
      year: "2025",
      place: "Hanoi",
      body: "A 4.2 m gilded statue mounted on the float leading the parade.",
      image: img("a80Statue", "Ho Chi Minh statue waving from a celebration float"),
    },
    {
      title: "National emblem float — 70 years of Dien Bien Phu",
      category: 0,
      year: "2024",
      place: "Dien Bien Provincial Stadium",
      body: "The national emblem float leading the civilian parade.",
      image: img("dbp70Emblem", "National emblem float with the number 70"),
    },
    {
      title: "National emblem float — 60 years of Dien Bien Phu",
      category: 0,
      year: "2014",
      place: "Dien Bien Province",
      body: "National emblem float and emblem for the 60th anniversary of the Dien Bien Phu victory.",
      image: img("dbp60", "National emblem float with the words '60 years'"),
    },
    {
      title: "Ho Chi Minh statue on the anniversary stage",
      category: 1,
      year: "2025",
      place: "Hanoi",
      body: "A 3.6 m gilded statue on the main stage of the anniversary ceremony.",
      image: img("hoStage", "Gilded Ho Chi Minh statue before a red backdrop"),
    },
    {
      title: "'Vietnam, a new era of development' float",
      category: 0,
      year: "2025",
      place: "Hanoi",
      body: "The 80th-anniversary float with a star and red silk ribbons.",
      image: img("a80NewEra", "The 80th-anniversary 'new era of development' float"),
    },
    {
      title: "Ho Chi Minh bust — assembly hall",
      category: 1,
      year: "2025",
      place: "Anniversary assembly hall",
      body: "A bust on a podium with a red backdrop matching the Party flag and star.",
      image: img("hoBust", "Bust of Ho Chi Minh in a red assembly hall"),
    },
    {
      title: "Relief and soldier sculptures on a float",
      category: 2,
      year: "2024",
      place: "Dien Bien Province",
      body: "A bronze-effect relief recounting the campaign, inspected with the organisers before parade day.",
      image: img("relief", "Inspecting the relief float with the organising committee"),
    },
    {
      title: "Flag installation 'Nothing is more precious than independence and freedom'",
      category: 2,
      year: "2025",
      place: "Hanoi",
      body: "A large-scale installation lifted into place by crane on site.",
      image: img("flag", "Craning the red-flag installation into place"),
    },
  ],
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
  news: [
    {
      slug: "nang-cap-xuong-bac-ninh",
      tag: "Capability",
      title: "Our Bac Ninh workshop has been upgraded",
      summary: "A larger workshop with heavy-duty overhead cranes, ready to build several celebration floats at once.",
      body: [
        "Our workshop in Quang Bo Village, Quang Phu Commune, Luong Tai, Bac Ninh has completed an upgrade: more floor space, heavy-duty overhead cranes and precision metalworking equipment.",
        "Quang Phu can now run several ceremonial floats and large monuments in parallel, keeping tight schedules without compromising on engineering safety or artistry.",
      ],
      image: img("flag", "An overhead crane lifting a large flag installation into place"),
    },
    {
      slug: "ky-thuat-so-trong-tuong-truyen-than",
      tag: "Technique",
      title: "Digital tools and handcraft in portrait statues",
      summary: "A 3D model from old photos lets the family approve first; then artisans finish every detail by hand.",
      body: [
        "From a family's archive photos, our designers build a 3D model so the client can preview it and adjust facial proportions before casting.",
        "The soul of a statue comes at the end: our artisans hand-chase every wrinkle and the corners of the eyes into the metal — something no machine can replace.",
      ],
      image: img("hoStanding", "A statue surface finished by hand"),
    },
    {
      slug: "ban-giao-tuong-bac-ho-cap-tinh",
      tag: "Project",
      title: "Ho Chi Minh statues delivered to provincial agencies",
      summary: "A series of statues of President Ho Chi Minh transported and installed in provincial assembly halls.",
      body: [
        "At year end, the Quang Phu crew packed, transported and installed a number of statues of President Ho Chi Minh in provincial agencies and assembly halls.",
        "Statues travel in dedicated trucks on shock-absorbing frames. The crew surveys each plinth, checks its load capacity and secures the statue before handing over on schedule.",
      ],
      image: img("hoBust", "Bust of President Ho Chi Minh in an assembly hall"),
    },
    {
      slug: "do-ben-tuong-dai-ngoai-troi",
      tag: "Insight",
      title: "What keeps outdoor monuments lasting?",
      summary: "Three things: the right alloy, an engineered steel frame and an anti-oxidation finish.",
      body: [
        "Outdoor monuments face harsh sun, acid rain and wide temperature swings. Their durability comes down to three things:",
        "High-quality alloys of the right composition to avoid porosity in the core, and a load-bearing steel frame engineered against wind and thermal expansion.",
        "An outer anti-oxidation coating that keeps the original colour, prevents rust and lowers annual maintenance costs for heritage site boards.",
      ],
      image: img("dbp70Soldiers", "Bronze-effect soldier sculptures outdoors"),
    },
  ],

  aboutPage: {
    metaTitle: "About us — Quang Phu, art metalwork studio in Bac Ninh",
    metaDescription:
      "About Quang Phu Art Mechanics Co., Ltd.: our capacity for ceremonial floats for national celebrations A05–A80, our leadership and our team of artisans and engineers.",
    topic: "Introduction",
    title: "About Quang Phu",
    lead: "An art metalwork studio in Luong Tai, Bac Ninh — from first drawing to delivery.",
    capabilityTopic: "Capability",
    capabilityTitle: "An art metalwork studio proven at national scale",
    capabilityBody:
      "Quang Phu Art Mechanics Co., Ltd. runs its workshop in Bac Ninh, specialising in the design and fabrication of art metalwork: ceremonial floats, monuments, portrait statues and art gifts.",
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
    { term: "Founded", value: "2011" },
    { term: "Workshop", value: "Luong Tai, Bac Ninh · 3,000 m²" },
    { term: "Team", value: "65+ people" },
    { term: "National celebrations", value: "A05 – A80" },
  ],
  strengths: [
    {
      title: "Proven at national scale",
      body: "We have built and delivered ceremonial floats for major national celebrations, from A05 to A80.",
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
        "15+ years designing and building ceremonial floats and art installations",
        "Directed float production for the A50 and A80 celebrations and the 70th anniversary of Dien Bien Phu",
        "Founded the Quang Phu workshop in Luong Tai, Bac Ninh in 2011",
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
export type NewsItem = Content["news"][number];

export const partnersFor = (lang: Locale) =>
  partnerLogos.map((logo, i) => ({ logo, name: contents[lang].partnerNames[i] }));
