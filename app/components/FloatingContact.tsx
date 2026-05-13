"use client";

import { useEffect, useState } from "react";

interface FloatingContactProps {
  phone?: string;
  kakaoChannel?: string;
}

export default function FloatingContact({
  phone,
  kakaoChannel,
}: FloatingContactProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const telHref = phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : null;
  const kakaoHandle = kakaoChannel?.replace(/^@/, "");
  const kakaoHref = kakaoHandle ? `https://pf.kakao.com/${kakaoHandle}` : null;

  if (!telHref && !kakaoHref) return null;

  return (
    <div
      className={`fixed right-4 sm:right-6 bottom-6 sm:bottom-8 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Badge */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blanc-text-primary text-white text-[11px] tracking-[0.2em] uppercase rounded-full shadow-[0_8px_24px_rgba(51,43,43,0.18)]">
        <span className="w-1.5 h-1.5 rounded-full bg-blanc-gold animate-pulse" />
        24시간 무료 상담
      </div>

      {telHref && (
        <FloatingButton
          href={telHref}
          label="전화 상담"
          variant="primary"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          }
        />
      )}

      {kakaoHref && (
        <FloatingButton
          href={kakaoHref}
          label="카카오 채팅"
          variant="kakao"
          external
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.85 1.86 5.35 4.66 6.78-.2.74-.74 2.74-.85 3.17-.13.55.2.55.42.4.17-.12 2.7-1.83 3.78-2.57.65.09 1.31.14 1.99.14 5.52 0 10-3.58 10-8s-4.48-7.92-10-7.92z" />
            </svg>
          }
        />
      )}
    </div>
  );
}

function FloatingButton({
  href,
  label,
  icon,
  variant,
  external = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  variant: "primary" | "kakao";
  external?: boolean;
}) {
  const baseClass =
    "group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full shadow-[0_10px_28px_rgba(51,43,43,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(51,43,43,0.24)]";

  const variantClass =
    variant === "kakao"
      ? "bg-[#FEE500] text-[#3C1E1E]"
      : "bg-blanc-text-primary text-white border border-blanc-text-primary";

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClass} ${variantClass}`}
    >
      {icon}

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-blanc-text-primary text-white text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-[0_6px_18px_rgba(51,43,43,0.18)]">
        {label}
      </span>
    </a>
  );
}
