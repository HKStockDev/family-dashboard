import { Card } from "./Card";
import { Image as ImageIcon } from "lucide-react";

const GRADIENTS = [
  "from-[#DCE3D0] to-[#B7C9A8]",
  "from-[#F1DCD3] to-[#E0B4A3]",
  "from-[#EAE2F4] to-[#CBB9E5]",
  "from-[#F6EBCE] to-[#E4CE8F]",
  "from-[#DDE7E6] to-[#AECAC7]",
  "from-[#F5E1E4] to-[#E4B9C0]",
  "from-[#EEE7DC] to-[#D9CBB3]",
  "from-[#E4E8D4] to-[#C4CE9E]",
];

export function PhotosView() {
  return (
    <div className="flex-1 min-h-0 px-6 pb-6">
      <Card
        title="Family Photos"
        icon={<ImageIcon className="w-4 h-4" strokeWidth={1.8} />}
        className="h-full"
        bodyClassName="overflow-auto"
      >
        <p className="text-[12.5px] text-[var(--color-muted)] mb-3">
          Connect a Google Photos album or shared folder to rotate real family memories here.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GRADIENTS.map((g, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${g} border border-[var(--color-border)]`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
