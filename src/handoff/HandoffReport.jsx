import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  User,
  Printer,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function HandoffReport({ handoff, patients, notes }) {
  const priorityOrder = { critical: 0, urgent: 1, attention: 2, routine: 3 };
  
  const sortedPatientSummaries = notes
    ?.filter(note => note.shift === handoff?.shift_type)
    .sort((a, b) => (priorityOrder[a.priority_level] || 3) - (priorityOrder[b.priority_level] || 3));

  const criticalCount = sortedPatientSummaries?.filter(n => n.priority_level === "critical").length || 0;
  const urgentCount = sortedPatientSummaries?.filter(n => n.priority_level === "urgent").length || 0;

  const shiftLabels = {
    day: "Day Shift (7am - 3pm)",
    evening: "Evening Shift (3pm - 11pm)",
    night: "Night Shift (11pm - 7am)"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5" />
              <span className="text-sm text-slate-300 uppercase tracking-wide">Shift Handoff Report</span>
            </div>
            <h2 className="text-2xl font-semibold">
              {shiftLabels[handoff?.shift_type] || "Shift Report"}
            </h2>
            <p className="text-slate-400 mt-1">
              {handoff?.shift_date ? format(new Date(handoff.shift_date), "EEEE, MMMM d, yyyy") : format(new Date(), "EEEE, MMMM d, yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white">
              <Printer className="w-4 h-4 mr-1" />
              Print
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-3 bg-white/10 rounded-lg">
            <p className="text-sm text-slate-400">Total Patients</p>
            <p className="text-2xl font-semibold">{sortedPatientSummaries?.length || 0}</p>
          </div>
          <div className={cn("p-3 rounded-lg", criticalCount > 0 ? "bg-red-500/30" : "bg-white/10")}>
            <p className="text-sm text-slate-400">Critical</p>
            <p className="text-2xl font-semibold">{criticalCount}</p>
          </div>
          <div className={cn("p-3 rounded-lg", urgentCount > 0 ? "bg-amber-500/30" : "bg-white/10")}>
            <p className="text-sm text-slate-400">Urgent</p>
            <p className="text-2xl font-semibold">{urgentCount}</p>
          </div>
        </div>
      </Card>

      {/* Critical Alerts First */}
      {criticalCount > 0 && (
        <Card className="p-5 border-2 border-red-300 bg-red-50">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Critical Alerts - Immediate Attention Required</h3>
          </div>
          <div className="space-y-3">
            {sortedPatientSummaries
              ?.filter(n => n.priority_level === "critical")
              .map(note => {
                const patient = patients?.find(p => p.id === note.patient_id);
                return (
                  <div key={note.id} className="p-4 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-slate-900">{patient?.name}</span>
                        <span className="text-sm text-slate-500">Room {patient?.room_number}</span>
                      </div>
                      <Badge className="bg-red-100 text-red-700">Critical</Badge>
                    </div>
                    <p className="text-sm text-slate-700">{note.ai_summary}</p>
                    {note.extracted_data?.alerts?.map((alert, idx) => (
                      <div key={idx} className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">
                        <strong>{alert.type}:</strong> {alert.message}
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </Card>
      )}

      {/* All Patient Summaries */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Patient Summaries</h3>
        <div className="space-y-4">
          {sortedPatientSummaries?.map(note => {
            const patient = patients?.find(p => p.id === note.patient_id);
            const priorityColors = {
              routine: "border-l-slate-300",
              attention: "border-l-blue-400",
              urgent: "border-l-amber-400",
              critical: "border-l-red-400"
            };
            
            return (
              <div 
                key={note.id} 
                className={cn(
                  "p-4 bg-slate-50 rounded-lg border-l-4",
                  priorityColors[note.priority_level || "routine"]
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{patient?.name}</span>
                      <span className="text-sm text-slate-500">• Room {patient?.room_number}</span>
                      {patient?.fall_risk && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                          Fall Risk
                        </Badge>
                      )}
                    </div>
                    {patient?.diagnosis && (
                      <p className="text-xs text-slate-500 mt-0.5">{patient.diagnosis}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {format(new Date(note.created_date), "h:mm a")}
                  </div>
                </div>
                
                <p className="text-sm text-slate-700 leading-relaxed">{note.ai_summary}</p>
                
                {/* Quick stats row */}
                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-200">
                  {note.extracted_data?.medications?.length > 0 && (
                    <div className="text-xs text-slate-600">
                      <span className="font-medium">Meds:</span>{" "}
                      {note.extracted_data.medications.filter(m => m.status === "given").length} given,{" "}
                      {note.extracted_data.medications.filter(m => m.status === "missed").length} missed
                    </div>
                  )}
                  {note.extracted_data?.vitals?.bp && (
                    <div className="text-xs text-slate-600">
                      <span className="font-medium">BP:</span> {note.extracted_data.vitals.bp}
                    </div>
                  )}
                  {note.extracted_data?.bowel_movement?.status && (
                    <div className={cn(
                      "text-xs",
                      note.extracted_data.bowel_movement.concern ? "text-amber-600" : "text-slate-600"
                    )}>
                      <span className="font-medium">BM:</span> {note.extracted_data.bowel_movement.status}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {(!sortedPatientSummaries || sortedPatientSummaries.length === 0) && (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p>No notes recorded for this shift yet</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}