import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PatientCard({ patient, onClick, compact = false }) {
  const riskColors = {
    low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    moderate: "bg-blue-100 text-blue-700 border-blue-200",
    high: "bg-amber-100 text-amber-700 border-amber-200",
    critical: "bg-red-100 text-red-700 border-red-200"
  };

  const riskBorderColors = {
    low: "border-l-emerald-400",
    moderate: "border-l-blue-400",
    high: "border-l-amber-400",
    critical: "border-l-red-400"
  };

  if (compact) {
    return (
      <div 
        onClick={onClick}
        className={cn(
          "flex items-center justify-between p-3 bg-white border border-l-4 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors",
          riskBorderColors[patient.risk_level || "low"]
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{patient.name}</p>
            <p className="text-xs text-slate-500">Room {patient.room_number}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {patient.fall_risk && (
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          )}
          <Badge variant="outline" className={cn("text-xs", riskColors[patient.risk_level || "low"])}>
            {patient.risk_level || "low"}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <Card 
      onClick={onClick}
      className={cn(
        "p-5 border-l-4 cursor-pointer hover:shadow-md transition-all",
        riskBorderColors[patient.risk_level || "low"]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{patient.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>Room {patient.room_number}</span>
              {patient.age && <span>• {patient.age} yrs</span>}
            </div>
            {patient.diagnosis && (
              <p className="mt-2 text-sm text-slate-600">{patient.diagnosis}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className={cn(riskColors[patient.risk_level || "low"])}>
            {patient.risk_level || "low"} risk
          </Badge>
          {patient.fall_risk && (
            <div className="flex items-center gap-1 text-amber-600 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Fall Risk</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}