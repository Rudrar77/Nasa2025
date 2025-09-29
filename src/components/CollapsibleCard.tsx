import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = { title: string; children: React.ReactNode; subtitle?: string };

const CollapsibleCard = ({ title, subtitle, children }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-0 overflow-hidden border-glass">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/40"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="p-4 border-t border-border">{children}</div>}
    </Card>
  );
};

export default CollapsibleCard;


