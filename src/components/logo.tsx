import Image from "next/image";

/**
 * The CubeSense Properties wordmark. The source artwork is a full lockup
 * (cube mark + wordmark + "PROPERTIES"), so no accompanying text is rendered.
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
      src="/cubesense-logo.png"
      alt="CubeSense Properties"
      width={1358}
      height={287}
      priority={priority}
      className={className}
    />
  );
}
