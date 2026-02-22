import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatsCard({ title, value, icon: Icon, trend, variant = "default" }) {
  const variants = {
    default: "bg-white border-slate-200",
    critical: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    success: "bg-emerald-50 border-emerald-200",
    info: "bg-blue-50 border-blue-200"
  };

  const iconVariants = {
    default: "bg-slate-100 text-slate-600",
    critical: "bg-red-100 text-red-600",
    warning: "bg-amber-100 text-amber-600",
    success: "bg-emerald-100 text-emerald-600",
    info: "bg-blue-100 text-blue-600"
  };

  return (
    <Card className={cn("p-5 border transition-all hover:shadow-md", variants[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          {trend && (
            <p className="mt-1 text-sm text-slate-500">{trend}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconVariants[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}