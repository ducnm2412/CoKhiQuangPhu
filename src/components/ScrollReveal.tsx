"use client";

import { useEffect } from "react";

// Hiệu ứng hiện dần khi cuộn.
// - data-reveal="up|left|right|fade|wipe|line" trên một phần tử.
// - data-reveal-group="up|..." trên phần tử cha: các con hiện so le nhau.
// Chỉ ẩn nội dung sau khi script chạy (class .reveal-ready), nên không có JS vẫn xem được.
// Hiệu ứng chạy trên mọi máy; các hiệu ứng lặp (data-loop) tự tạm dừng khi ra khỏi màn hình.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    // Phần tử được theo dõi → các phần tử sẽ hiện khi nó lọt vào màn hình.
    const targets = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          targets.get(e.target)?.forEach((el) => el.classList.add("is-visible"));
          targets.delete(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const watch = (el: HTMLElement) => {
      // Ảnh kiểu "wipe" bị cắt còn chiều cao 0 nên không bao giờ "giao" với màn hình;
      // theo dõi phần tử cha thay cho nó.
      const target = el.dataset.reveal === "wipe" && el.parentElement ? el.parentElement : el;
      const list = targets.get(target);
      if (list) list.push(el);
      else {
        targets.set(target, [el]);
        io.observe(target);
      }
    };

    const prepare = (scope: ParentNode, initial: boolean) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const el = child as HTMLElement;
          el.dataset.reveal ??= group.dataset.revealGroup || "up";
          el.style.setProperty("--i", String(i));
        });
      });
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        // Phần đang nằm trong màn hình lúc tải trang thì hiện luôn, tránh nháy.
        if (initial && el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add("is-visible");
        } else {
          watch(el);
        }
      });
    };

    prepare(document, true);
    root.classList.add("reveal-ready");

    // Nội dung thêm sau (ví dụ bấm "Tất cả dự án") cũng có hiệu ứng.
    // Hiệu ứng lặp (dải ảnh, trống đồng, chim): chỉ chạy khi đang nằm trong màn hình
    const pauser = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle("anim-paused", !e.isIntersecting);
          if (e.target instanceof SVGSVGElement) {
            if (e.isIntersecting) e.target.unpauseAnimations();
            else e.target.pauseAnimations();
          }
        }
      },
      { rootMargin: "100px" },
    );
    const watchLoops = (scope: ParentNode) =>
      scope.querySelectorAll("[data-loop]").forEach((el) => pauser.observe(el));
    watchLoops(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches("[data-reveal]:not(.is-visible)")) watch(n);
            prepare(n, false);
            watchLoops(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      pauser.disconnect();
      mo.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
