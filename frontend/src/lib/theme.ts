// Đặt data-theme trước khi trang hiện ra (qua <InlineScript>) để không nháy màu.
// Dùng chung cho site công khai và trang quản trị: cùng một lựa chọn sáng/tối.
export const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;
