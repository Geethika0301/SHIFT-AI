import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Clock,
  ArrowRight,
  Plus,
  Activity
} from "lucide-react";
import { format } from "date-fns";
import StatsCard from "@/components/dashboard/StatsCard";
import AlertBanner from "@/components/dashboard/AlertBanner";
import PatientCard from "@/components/patients/PatientCard";

export default function Dashboard() {
  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: () => base44.entities.Patient.list("-created_date")
  });

  const { data: notes = [] } = useQuery({
    queryKey: ["notes"],
    queryFn: () => base44.entities.NursingNote.list("-created_date", 50)
  });

  const todayNotes = notes.filter(
    n => format(new Date(n.created_date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  const criticalPatients = patients.filter(p => p.risk_level === "critical" || p.risk_level === "high");
  const fallRiskPatients = patients.filter(p => p.fall_risk);

  const alerts = [
    ...notes
      .filter(n => n.priority_level === "critical")
      .slice(0, 3)
      .map(n => {
        const patient = patients.find(p => p.id === n.patient_id);
        return {
          priority: "critical",
          title: `Critical: ${patient?.name || "Patient"}`,
          message: n.ai_summary?.substring(0, 100) + "...",
          patient: patient?.name
        };
      }),
    ...criticalPatients.slice(0, 3).map(p => ({
      priority: "urgent",
      title: "High Risk Patient",
      message: `${p.name} in Room ${p.room_number} requires attention`,
      patient: p.name
    }))
  ];

  const getCurrentShift = () => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 15) return "day";
    if (hour >= 15 && hour < 23) return "evening";
    return "night";
  };

  const shiftLabels = {
    day: "Day Shift",
    evening: "Evening Shift",
    night: "Night Shift"
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Shift Dashboard</h1>
          <p className="text-slate-500 mt-1">
            {format(new Date(), "EEEE, MMMM d")} • {shiftLabels[getCurrentShift()]}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to={createPageUrl("NoteEntry")}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </Link>
          <Link to={createPageUrl("HandoffReport")}>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View Handoff
            </Button>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      <AlertBanner alerts={alerts} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Patients"
          value={patients.length}
          icon={Users}
          variant="info"
        />
        <StatsCard
          title="Today's Notes"
          value={todayNotes.length}
          icon={FileText}
          trend={`${notes.filter(n => n.priority_level === "critical" || n.priority_level === "urgent").length} need attention`}
        />
        <StatsCard
          title="Critical/High Risk"
          value={criticalPatients.length}
          icon={AlertTriangle}
          variant={criticalPatients.length > 0 ? "critical" : "default"}
        />
        <StatsCard
          title="Fall Risk"
          value={fallRiskPatients.length}
          icon={Activity}
          variant={fallRiskPatients.length > 0 ? "warning" : "default"}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Patients */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Priority Patients</h2>
            <Link to={createPageUrl("Patients")} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {patients
              .sort((a, b) => {
                const order = { critical: 0, high: 1, moderate: 2, low: 3 };
                return (order[a.risk_level] || 3) - (order[b.risk_level] || 3);
              })
              .slice(0, 5)
              .map(patient => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient}
                  onClick={() => window.location.href = createPageUrl(`NoteEntry?patient=${patient.id}`)}
                />
              ))}
            
            {patients.length === 0 && (
              <Card className="p-8 text-center">
                <Users className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">No patients added yet</p>
                <Link to={createPageUrl("Patients")}>
                  <Button variant="link" className="mt-2">Add your first patient</Button>
                </Link>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Notes</h2>
          
          <div className="space-y-3">
            {todayNotes.slice(0, 6).map(note => {
              const patient = patients.find(p => p.id === note.patient_id);
              const priorityColors = {
                routine: "bg-slate-100 text-slate-600",
                attention: "bg-blue-100 text-blue-600",
                urgent: "bg-amber-100 text-amber-600",
                critical: "bg-red-100 text-red-600"
              };
              
              return (
                <Card key={note.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{patient?.name || "Unknown"}</p>
                      <p className="text-xs text-slate-500">Room {patient?.room_number}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[note.priority_level || "routine"]}`}>
                      {note.priority_level || "routine"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{note.ai_summary}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {format(new Date(note.created_date), "h:mm a")}
                  </div>
                </Card>
              );
            })}
            
            {todayNotes.length === 0 && (
              <Card className="p-6 text-center">
                <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">No notes today</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}