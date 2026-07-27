import { Check } from "lucide-react";

export function Checkbox({
  checked,
  onChange,
  color = "var(--color-sage)",
}: {
  checked: boolean;
  onChange: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className="w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center shrink-0 transition-colors"
      style={{
        borderColor: checked ? color : "var(--color-border)",
        backgroundColor: checked ? color : "transparent",
      }}
    >
      {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </button>
  );
}
