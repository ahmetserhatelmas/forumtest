import Image from "next/image";

const LOGO_SRC = "/brand-logo-mark.png";
const LOGO_W = 654;
const LOGO_H = 482;

/**
 * Şeffaf arka planlı marka görseli: `/public/brand-logo-mark.png`
 * (güncellemek için dosyayı değiştirmeniz yeterli).
 * `dark`: mor sidebar üzerinde siyah çizimi beyaza çevirir (`invert`).
 */
export function BrandLogo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      role="img"
      aria-label="DR. ÖMER PARILDAR, Aesthetic & Plastic Surgeon"
      className={`flex shrink-0 items-center ${className}`}
      dir="ltr"
    >
      <Image
        src={LOGO_SRC}
        alt="DR. ÖMER PARILDAR — Aesthetic & Plastic Surgeon"
        width={LOGO_W}
        height={LOGO_H}
        className={`h-auto w-auto object-contain object-left ${
          isDark
            ? "max-h-24 max-w-[min(100%,12rem)] sm:max-h-28 sm:max-w-[min(100%,13.5rem)]"
            : "max-h-32 max-w-[min(100%,22rem)] sm:max-h-36 sm:max-w-[min(100%,26rem)] md:max-h-40 md:max-w-[min(100%,30rem)]"
        } ${isDark ? "brightness-0 invert" : ""}`}
        sizes="(max-width: 768px) 300px, (max-width: 1200px) 360px, 400px"
        priority
      />
    </div>
  );
}
