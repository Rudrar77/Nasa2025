import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  to: string;
  icon?: React.ReactNode;
};

const FeatureCard = ({ title, description, to, icon }: Props) => {
  return (
    <div className="rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5 flex items-start gap-3">
        {icon && <div className="mt-1 text-primary">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <Link to={to} className="btn btn-primary inline-flex items-center gap-2">
          Open page <span aria-hidden>→</span>
        </Link>
      </div>
      <style>{`
        .btn{display:inline-block;padding:.5rem .9rem;border-radius:.5rem;border:1px solid hsl(var(--primary));}
        .btn-primary{background:hsl(var(--primary));color:hsl(var(--primary-foreground));}
        .btn-primary:hover{filter:brightness(1.05);}
      `}</style>
    </div>
  );
};

export default FeatureCard;


