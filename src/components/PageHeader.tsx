type Props = { title: string; subtitle?: string; children?: React.ReactNode };

const PageHeader = ({ title, subtitle, children }: Props) => {
  return (
    <div className="py-6">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default PageHeader;


