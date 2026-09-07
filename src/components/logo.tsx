import Image from "next/image";

/**
 * The Cube Holdings wordmark. The source artwork already contains the
 * "Holdings Limited" lockup, so no accompanying text is rendered.
 */
export function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/cube-logo.png"
      alt="Cube Holdings Limited"
      width={548}
      height={455}
      priority={priority}
      className={className}
    />
  );
}
