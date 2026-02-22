import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Pill, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  ThermometerSun,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIExtractedSummary({ extractedData, summary }) {
  if (!extractedData) return null;

  const priorityColors = {
    routine: "bg-slate-100 text-slate-700",
    attention: "bg-blue-100 text-blue-700",
    urgent: "bg-amber-100 text-amber-700",
    critical: "bg-red-100 text-red-700"
  };

  return (
    <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">AI-Extracted Summary</h3>
        <Badge className={cn(priorityColors[extractedData.priority_level || "routine"])}>
          {extractedData.priority_level || "routine"}
        </Badge>
      </div>

      {summary && (
        <div className="p-4 bg-white rounded-lg border border-blue-100 mb-5">
          <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Medications */}
        {extractedData.medications && extractedData.medications.length > 0 && (
          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-slate-900">Medications</span>
            </div>
            <div className="space-y-2">
              {extractedData.medications.map((med, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{med.name}</span>
                  <div className="flex items-center gap-1">
                    {med.status === "given" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : med.status === "missed" ? (
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span className={cn(
                      "text-xs",
                      med.status === "given" ? "text-emerald-600" : 
                      med.status === "missed" ? "text-red-600" : "text-amber-600"
                    )}>
                      {med.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vitals */}
        {extractedData.vitals && Object.keys(extractedData.vitals).some(k => extractedData.vitals[k]) && (
          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-900">Vitals</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {extractedData.vitals.bp && (
                <div>
                  <span className="text-slate-500">BP:</span>
                  <span className="ml-1 text-slate-900">{extractedData.vitals.bp}</span>
                </div>
              )}
              {extractedData.vitals.hr && (
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span className="text-slate-900">{extractedData.vitals.hr}</span>
                </div>
              )}
              {extractedData.vitals.temp && (
                <div className="flex items-center gap-1">
                  <ThermometerSun className="w-3 h-3 text-amber-500" />
                  <span className="text-slate-900">{extractedData.vitals.temp}</span>
                </div>
              )}
              {extractedData.vitals.o2 && (
                <div>
                  <span className="text-slate-500">O2:</span>
                  <span className="ml-1 text-slate-900">{extractedData.vitals.o2}</span>
                </div>
              )}
            </div>
            {extractedData.vitals.concerns && (
              <p className="mt-2 text-xs text-amber-600">{extractedData.vitals.concerns}</p>
            )}
          </div>
        )}

        {/* Bowel Movement */}
        {extractedData.bowel_movement && extractedData.bowel_movement.status && (
          <div className={cn(
            "p-4 rounded-lg border",
            extractedData.bowel_movement.concern ? "bg-amber-50 border-amber-200" : "bg-white"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-slate-900">Bowel Movement</span>
              {extractedData.bowel_movement.concern && (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <p className="text-sm text-slate-700">{extractedData.bowel_movement.status}</p>
            {extractedData.bowel_movement.last_recorded && (
              <p className="text-xs text-slate-500 mt-1">
                Last: {extractedData.bowel_movement.last_recorded}
              </p>
            )}
          </div>
        )}

        {/* Alerts */}
        {extractedData.alerts && extractedData.alerts.length > 0 && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="font-medium text-red-900">Alerts</span>
            </div>
            <div className="space-y-2">
              {extractedData.alerts.map((alert, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-medium text-red-800">{alert.type}:</span>
                  <span className="ml-1 text-red-700">{alert.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fall Risk Indicators */}
      {extractedData.fall_risk_indicators && extractedData.fall_risk_indicators.length > 0 && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-amber-900">Fall Risk Indicators</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {extractedData.fall_risk_indicators.map((indicator, idx) => (
              <Badge key={idx} variant="outline" className="bg-white text-amber-700 border-amber-300">
                {indicator}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}