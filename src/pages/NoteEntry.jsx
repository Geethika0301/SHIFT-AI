import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, History, Sparkles } from "lucide-react";
import { format } from "date-fns";
import NoteEntryForm from "@/components/notes/NoteEntryForm";
import AIExtractedSummary from "@/components/notes/AIExtractedSummary";
import PatientCard from "@/components/patients/PatientCard";

export default function NoteEntry() {
  const [lastProcessedNote, setLastProcessedNote] = useState(null);
  const [lastExtractedData, setLastExtractedData] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const preselectedPatient = urlParams.get("patient");

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: () => base44.entities.Patient.list("-created_date")
  });

  const { data: recentNotes = [], refetch: refetchNotes } = useQuery({
    queryKey: ["recent-notes"],
    queryFn: () => base44.entities.NursingNote.list("-created_date", 10)
  });

  const handleNoteProcessed = (note, aiData) => {
    setLastProcessedNote(note);
    setLastExtractedData(aiData);
    refetchNotes();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Nursing Notes</h1>
        <p className="text-slate-500 mt-1">Enter patient updates for AI-powered extraction and summarization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <NoteEntryForm 
            patients={patients} 
            onNoteProcessed={handleNoteProcessed}
            preselectedPatient={preselectedPatient}
          />

          {/* AI Results */}
          {lastExtractedData && (
            <AIExtractedSummary 
              extractedData={lastExtractedData} 
              summary={lastExtractedData.summary}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="recent" className="flex-1">
                <History className="w-4 h-4 mr-1" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="patients" className="flex-1">
                Patients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-4 space-y-3">
              {recentNotes.map(note => {
                const patient = patients.find(p => p.id === note.patient_id);
                const priorityColors = {
                  routine: "border-l-slate-300",
                  attention: "border-l-blue-400",
                  urgent: "border-l-amber-400",
                  critical: "border-l-red-400"
                };

                return (
                  <Card 
                    key={note.id} 
                    className={`p-4 border-l-4 ${priorityColors[note.priority_level || "routine"]} cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={() => {
                      setLastProcessedNote(note);
                      setLastExtractedData(note.extracted_data);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{patient?.name || "Unknown"}</p>
                        <p className="text-xs text-slate-500">Room {patient?.room_number}</p>
                      </div>
                      <span className="text-xs text-slate-400">
                        {format(new Date(note.created_date), "MMM d, h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{note.ai_summary}</p>
                  </Card>
                );
              })}

              {recentNotes.length === 0 && (
                <Card className="p-6 text-center">
                  <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">No recent notes</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="patients" className="mt-4 space-y-2">
              {patients.slice(0, 8).map(patient => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  compact 
                />
              ))}
            </TabsContent>
          </Tabs>

          {/* AI Tips */}
          <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-indigo-900 text-sm">AI Tips</span>
            </div>
            <ul className="text-xs text-indigo-700 space-y-2">
              <li>• Include vital signs with specific values</li>
              <li>• Mention all medications given or missed</li>
              <li>• Note bowel movement status and timing</li>
              <li>• Document mobility and fall risk changes</li>
              <li>• Include mental status observations</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}