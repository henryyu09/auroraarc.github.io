interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

const accentMap = {
  info: { border: "border-accent", bg: "bg-accent-subtle/30", icon: "i" },
  warning: { border: "border-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20", icon: "!" },
  tip: { border: "border-sky-500", bg: "bg-sky-50 dark:bg-sky-950/20", icon: "*" },
};

export default function Callout({ type = "info", children }: CalloutProps) {
  const style = accentMap[type];
  return (
    <div className={`my-6 pl-4 pr-5 py-4 border-l-4 ${style.border} ${style.bg} rounded-r-md`}>
      <div className="text-small text-text-secondary [&>p]:my-0 [&>p+p]:mt-2">
        {children}
      </div>
    </div>
  );
}
