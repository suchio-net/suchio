export function BrandMark({ inverse = false, loading }: { inverse?: boolean; loading?: "eager" | "lazy" }) {
  return (
    // Explicit dimensions preserve the logo's aspect ratio before it loads.
    <img
      src={inverse ? "/suchio-logo-dark.svg" : "/suchio-logo-light.svg"}
      alt="Suchio"
      width={729}
      height={223}
      loading={loading}
      className="block h-7 w-auto max-w-full object-contain"
      draggable={false}
    />
  );
}
