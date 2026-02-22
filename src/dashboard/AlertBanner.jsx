import { AlertTriangle, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AlertBanner({ alerts, onDismiss }) {
  if (!alerts || alerts.length === 0) return null;

  const priorityColors = {
    critical: "bg-red-600",
    urgent: "bg-amber-500",
    attention: "bg-blue-500"
  };

  const criticalAlerts = alerts.filter(a => a.priority === "critical");
  const urgentAlerts = alerts.filter(a => a.priority === "urgent");

  if (criticalAlerts.length === 0 && urgentAlerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {criticalAlerts.map((alert, idx) => (
        <div 
          key={`critical-${idx}`}
          className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-red-900">{alert.title}</p>
              <p className="text-sm text-red-700">{alert.message}</p>
            </div>
          </div>
          {onDismiss && (
            <Button variant="ghost" size="icon" onClick={() => onDismiss(alert)}>
              <X className="w-4 h-4 text-red-600" />
            </Button>
          )}
        </div>
      ))}
      
      {urgentAlerts.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">
                {urgentAlerts.length} Attention Required
              </p>
              <p className="text-sm text-amber-700">
                {urgentAlerts.map(a => a.patient).join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}