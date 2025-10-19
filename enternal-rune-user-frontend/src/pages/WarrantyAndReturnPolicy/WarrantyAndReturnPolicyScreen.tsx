"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

export default function WarrantyAndReturnPolicyScreen() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string>("thoi-gian-dieu-kien");

  const tocItems = useMemo(
    () => [
      { id: "thoi-gian-dieu-kien", label: "1. Thời gian & điều kiện" },
      { id: "quy-trinh-tiep-nhan", label: "2. Quy trình tiếp nhận" },
      { id: "chinh-sach-hoan-tien", label: "3. Hoàn tiền" },
      { id: "bao-hanh-chinh-hang", label: "4. Bảo hành" },
      { id: "tu-choi-bao-hanh", label: "5. Từ chối bảo hành" },
      { id: "chi-phi-van-chuyen", label: "6. Phí vận chuyển" },
      { id: "luu-y-quan-trong", label: "7. Lưu ý" },
      { id: "thong-tin-lien-he", label: "8. Liên hệ" },
    ],
    []
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        // Hiệu ứng vào trang mượt hơn, tránh khựng
        gsap.set(".rp-hero", { y: 64 });
        gsap.to(".rp-hero", {
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: function () {
            gsap.set(".rp-hero", { clearProps: "all" });
          },
        });

        // Parallax rất nhẹ cho blobs
        gsap.to(".rp-hero .bg-sky-200\\/60", {
          y: 8,
          duration: 3,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(".rp-hero .bg-indigo-200\\/50", {
          y: -6,
          duration: 3.2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

         const sections = gsap.utils.toArray<HTMLElement>(".rp-section");
          if (sections.length) {
            // Các thẻ xuất hiện tuần tự từ dưới lên với offset 100px
            gsap.set(sections, { y: 100 });
            gsap.to(sections, {
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
              delay: 0.05,
              onComplete: function () {
                gsap.set(sections, { clearProps: "all" });
              },
            });
          }
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Scrollspy: highlight mục lục theo section đang hiển thị
  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>("[data-rp-section]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveId(id);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -65% 0px", threshold: 0.25 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClickToc = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Cuộn để section ở giữa màn hình
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setActiveId(id);

    // Hiệu ứng mũi tên chỉ vào section được chọn (xuất hiện ngắn rồi biến mất)
    // Dùng SVG để có mũi tên đẹp hơn và mượt mà
    const makeArrowSvg = (dir: 'left' | 'right') => {
      const svgNS = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(svgNS, 'svg')
      svg.setAttribute('width', '28')
      svg.setAttribute('height', '28')
      svg.setAttribute('viewBox', '0 0 28 28')
      svg.style.position = 'absolute'
      svg.style.top = '50%'
      svg.style.transform = 'translateY(-50%)'
      svg.style.opacity = '0'
      if (dir === 'left') svg.style.left = '0'
      if (dir === 'right') svg.style.right = '0'

      const defs = document.createElementNS(svgNS, 'defs')
      const filter = document.createElementNS(svgNS, 'filter')
      filter.setAttribute('id', 'shadow')
      const feGaussian = document.createElementNS(svgNS, 'feGaussianBlur')
      feGaussian.setAttribute('stdDeviation', '1.2')
      feGaussian.setAttribute('in', 'SourceAlpha')
      filter.appendChild(feGaussian)
      const feOffset = document.createElementNS(svgNS, 'feOffset')
      feOffset.setAttribute('dx', '0')
      feOffset.setAttribute('dy', '0')
      filter.appendChild(feOffset)
      const feMerge = document.createElementNS(svgNS, 'feMerge')
      const feMergeNode1 = document.createElementNS(svgNS, 'feMergeNode')
      const feMergeNode2 = document.createElementNS(svgNS, 'feMergeNode')
      feMergeNode2.setAttribute('in', 'SourceGraphic')
      feMerge.appendChild(feMergeNode1)
      feMerge.appendChild(feMergeNode2)
      filter.appendChild(feMerge)
      defs.appendChild(filter)
      svg.appendChild(defs)

      const polygon = document.createElementNS(svgNS, 'polygon')
      // Mũi tên tam giác viền đậm
      polygon.setAttribute('points', dir === 'left' ? '18,4 6,14 18,24' : '10,4 22,14 10,24')
      polygon.setAttribute('fill', '#0f172a')
      polygon.setAttribute('filter', 'url(#shadow)')
      svg.appendChild(polygon)
      return svg
    }

    const leftArrow = makeArrowSvg('left')
    const rightArrow = makeArrowSvg('right')

    el.style.position = el.style.position || 'relative';
    el.appendChild(leftArrow);
    el.appendChild(rightArrow);

    // Delay nhẹ cho scrollIntoView hoàn thành rồi animate
    setTimeout(() => {
      try {
        gsap.to(leftArrow, { x: 12, opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
        gsap.to(rightArrow, { x: -12, opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
        gsap.to([leftArrow, rightArrow], {
          opacity: 0,
          duration: 0.35,
          delay: 0.6,
          ease: 'power2.in',
          onComplete: () => {
            leftArrow.remove();
            rightArrow.remove();
          }
        });
      } catch {
        leftArrow.remove();
        rightArrow.remove();
      }
    }, 350);
  };

  return (
    <div ref={containerRef} className="px-4 py-8 text-gray-800">
      {/* Mục lục cố định bên trái màn hình */}
      <aside className="hidden md:block fixed left-4 top-40 w-[220px] z-20">
        <nav className="relative rounded-xl border border-slate-200 bg-white py-4 px-3 shadow-sm">
          {/* Chỉ hiển thị dấu chấm và nhãn, không có đường dọc */}
          <ul className="relative flex flex-col gap-3">
            {tocItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="flex items-center gap-3 pl-4">
                  <button
                    onClick={() => handleClickToc(item.id)}
                    className={`relative grid place-items-center w-4 h-4 rounded-full border transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 border-slate-900 scale-110 shadow-[0_0_0_4px_rgba(15,23,42,0.15)]'
                        : 'bg-white border-slate-400 hover:bg-slate-200'
                    }`}
                    aria-label={item.label}
                    title={item.label}
                  />
                  <button
                    onClick={() => handleClickToc(item.id)}
                    className={`text-sm text-left transition-colors ${
                      isActive ? 'text-slate-900 font-medium' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Nội dung đẩy sang phải để không bị chồng lên mục lục */}
      <div className="md:pl-[260px]">
        <div className="max-w-6xl mx-auto grid gap-6">
          {/* Hero đặt trong cùng container để cùng chiều rộng với các thẻ */}
          <div className="relative overflow-hidden rp-hero rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/70 p-4 md:p-5 shadow-sm">
            <div
              className="pointer-events-none absolute -top-12 -right-14 w-32 h-32 rounded-full bg-sky-200/60 blur-3xl"
              style={{ transform: "translateZ(0)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-indigo-200/50 blur-3xl"
              style={{ transform: "translateZ(0)" }}
            />
            <h1 className="text-3xl md:text-[34px] font-semibold tracking-tight text-slate-900 mb-2">
              Chính sách đổi trả & bảo hành
            </h1>
            <p className="text-slate-600 leading-7 text-[15px] md:text-[16px]">
              Nhằm mang đến trải nghiệm mua sắm tốt nhất, chúng tôi áp dụng chính
              sách đổi trả linh hoạt và bảo hành rõ ràng cho tất cả sản phẩm điện
              thoại di động được bán ra tại cửa hàng/website. Vui lòng đọc kỹ các
              điều khoản bên dưới để được hỗ trợ nhanh chóng.
            </p>
          </div>
          <section
            id="thoi-gian-dieu-kien"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              1. Thời gian và điều kiện đổi trả
            </h2>
            <ul className="rp-stagger list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Đổi mới trong 7 ngày</strong> kể từ ngày nhận hàng nếu
                phát sinh lỗi phần cứng do nhà sản xuất.
              </li>
              <li>
                <strong>Đổi sang sản phẩm khác trong 15 ngày</strong> (có
                bù/hoàn chênh lệch) nếu sản phẩm còn mới 100%, đầy đủ phụ kiện,
                hộp, tem, không trầy xước.
              </li>
              <li>
                Không áp dụng đổi trả cho các trường hợp: bị vào nước, rơi vỡ,
                trầy xước nặng, can thiệp phần mềm/hardware trái quy định, cháy
                nổ do nguồn điện không ổn định.
              </li>
              <li>
                Sản phẩm quà tặng kèm, khuyến mãi có thể không áp dụng đổi trả
                theo chương trình cụ thể.
              </li>
            </ul>
          </section>

          <section
            id="quy-trinh-tiep-nhan"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              2. Quy trình tiếp nhận đổi trả
            </h2>
            <ol className="rp-stagger list-decimal pl-6 space-y-2 text-slate-700">
              <li>
                Liên hệ bộ phận hỗ trợ qua hotline hoặc email kèm mô tả lỗi,
                video/hình ảnh minh họa.
              </li>
              <li>
                Mang sản phẩm đến cửa hàng hoặc gửi về trung tâm theo hướng dẫn
                (giữ đầy đủ hóa đơn, phụ kiện, hộp).
              </li>
              <li>
                Kỹ thuật kiểm tra và xác nhận tình trạng (tối đa 3 ngày làm
                việc).
              </li>
              <li>
                Tiến hành đổi mới/đổi sang sản phẩm khác/hoàn tiền theo chính
                sách áp dụng.
              </li>
            </ol>
          </section>

          <section
            id="chinh-sach-hoan-tien"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              3. Chính sách hoàn tiền
            </h2>
            <ul className="rp-stagger list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Hoàn tiền khi không còn hàng để đổi mới hoặc khách hàng không
                đồng ý đổi sang model khác.
              </li>
              <li>
                Thời gian hoàn tiền: 3–7 ngày làm việc tùy theo phương thức
                thanh toán ban đầu.
              </li>
              <li>
                Phí phát sinh (nếu có) sẽ được thông báo trước khi tiến hành.
              </li>
            </ul>
          </section>

          <section
            id="bao-hanh-chinh-hang"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              4. Bảo hành chính hãng
            </h2>
            <ul className="rp-stagger list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Tất cả sản phẩm là hàng chính hãng, được{" "}
                <strong>bảo hành theo tiêu chuẩn nhà sản xuất</strong>.
              </li>
              <li>
                Thời hạn bảo hành thông thường: 12 tháng (có thể khác theo từng
                model/nhà sản xuất).
              </li>
              <li>
                Khách hàng có thể bảo hành tại hệ thống ủy quyền của hãng hoặc
                thông qua cửa hàng.
              </li>
            </ul>
          </section>

          <section
            id="tu-choi-bao-hanh"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              5. Trường hợp từ chối bảo hành
            </h2>
            <ul className="rp-stagger list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Sản phẩm hư hỏng do người dùng: rơi vỡ, cong vênh, vào nước,
                cháy nổ, tác động ngoại lực.
              </li>
              <li>
                Tem niêm phong bị rách, số IMEI/serial mờ hoặc không khớp.
              </li>
              <li>
                Can thiệp phần cứng/phần mềm không chính thống, root/jailbreak.
              </li>
              <li>Sử dụng phụ kiện không đạt chuẩn gây hư hỏng.</li>
            </ul>
          </section>

          <section
            id="chi-phi-van-chuyen"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              6. Chi phí vận chuyển
            </h2>
            <p className="text-slate-700 mb-3">
              Đối với các yêu cầu đổi trả/bảo hành qua chuyển phát:
            </p>
            <ul className="rp-stagger list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Lỗi do nhà sản xuất</strong>: chúng tôi hỗ trợ phí vận
                chuyển 2 chiều.
              </li>
              <li>
                <strong>Không do lỗi nhà sản xuất</strong>: khách hàng chịu phí
                vận chuyển.
              </li>
            </ul>
          </section>

          <section
            id="luu-y-quan-trong"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              7. Lưu ý quan trọng
            </h2>
            <ul className="rp-stagger list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Vui lòng <strong>sao lưu dữ liệu</strong> trước khi gửi máy để
                tránh mất mát thông tin.
              </li>
              <li>
                Không gửi kèm SIM, thẻ nhớ, ốp lưng, kính cường lực, hoặc phụ
                kiện cá nhân.
              </li>
              <li>Giữ lại hóa đơn mua hàng để được hỗ trợ nhanh chóng.</li>
            </ul>
          </section>

          <section
            id="thong-tin-lien-he"
            data-rp-section
            className="rp-section rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
              8. Thông tin liên hệ hỗ trợ
            </h2>
            <div className="rp-stagger space-y-1 text-slate-700">
              <p>Hotline: 1900 0000 (8:00–21:00 hằng ngày)</p>
              <p>Email: support@enternal-rune.vn</p>
              <p>
                Địa chỉ trung tâm: 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
            <p className="text-sm text-slate-500 mt-5">
              Lưu ý: Chính sách có thể thay đổi theo từng thời điểm hoặc chương
              trình khuyến mãi. Vui lòng kiểm tra thông tin cập nhật trên
              website hoặc liên hệ bộ phận hỗ trợ để được tư vấn.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
