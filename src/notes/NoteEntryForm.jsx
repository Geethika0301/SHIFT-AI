import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function NoteEntryForm({ patients, onNoteProcessed }) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [noteText, setNoteText] = useState("");
  const [shift, setShift] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAIProcess = async () => {
    if (!selectedPatient || !noteText || !shift) return;
    
    setIsProcessing(true);
    
    try {
      const patient = patients.find(p => p.id === selectedPatient);
      
      const aiResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a clinical AI assistant analyzing nursing notes. Extract and summarize key clinical information from this nursing note.

Patient: ${patient?.name}, Room: ${patient?.room_number}
Note: "${noteText}"

Extract the following information and provide a structured summary:
1. Medications (given, missed, refused)
2. Vital signs (any mentioned)
3. Bowel movement status (if mentioned)
4. Fall risk indicators
5. Any critical alerts or concerns
6. Overall priority level (routine, attention, urgent, critical)

Provide a concise handoff summary (2-3 sentences) highlighting the most important information for the incoming nurse.`,
        response_json_schema: {
          type: "object",
          properties: {
            medications: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  status: { type: "string" },
                  time: { type: "string" }
                }
              }
            },
            vitals: {
              type: "object",
              properties: {
                bp: { type: "string" },
                hr: { type: "string" },
                temp: { type: "string" },
                o2: { type: "string" },
                concerns: { type: "string" }
              }
            },
            bowel_movement: {
              type: "object",
              properties: {
                status: { type: "string" },
                last_recorded: { type: "string" },
                concern: { type: "boolean" }
              }
            },
            fall_risk_indicators: {
              type: "array",
              items: { type: "string" }
            },
            alerts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  message: { type: "string" },
                  priority: { type: "string" }
                }
              }
            },
            priority_level: { type: "string" },
            summary: { type: "string" }
          }
        }
      });

      const noteData = {
        patient_id: selectedPatient,
        note_text: noteText,
        shift: shift,
        ai_summary: aiResponse.summary,
        extracted_data: aiResponse,
        priority_level: aiResponse.priority_level || "routine"
      };

      const savedNote = await base44.entities.NursingNote.create(noteData);
      
      // Update patient risk if needed
      if (aiResponse.priority_level === "critical" || aiResponse.priority_level === "urgent") {
        const newRisk = aiResponse.priority_level === "critical" ? "critical" : "high";
        await base44.entities.Patient.update(selectedPatient, { risk_level: newRisk });
      }
      
      if (aiResponse.fall_risk_indicators && aiResponse.fall_risk_indicators.length > 0) {
        await base44.entities.Patient.update(selectedPatient, { fall_risk: true });
      }

      onNoteProcessed?.(savedNote, aiResponse);
      setNoteText("");
      setSelectedPatient("");
      setShift("");
    } catch (error) {
      console.error("Error processing note:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">New Nursing Note</h2>
          <p className="text-sm text-slate-500">Enter patient updates for AI processing</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Patient</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - Room {patient.room_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Shift</Label>
            <Select value={shift} onValueChange={setShift}>
              <SelectTrigger>
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day (7am - 3pm)</SelectItem>
                <SelectItem value="evening">Evening (3pm - 11pm)</SelectItem>
                <SelectItem value="night">Night (11pm - 7am)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nursing Note</Label>
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter free-text nursing observations, medications given, vitals, patient status, concerns..."
            className="min-h-[160px] resize-none"
          />
          <p className="text-xs text-slate-500">
            Include: medications, vitals, bowel movements, mobility, mental status, concerns
          </p>
        </div>

        <Button
          onClick={handleAIProcess}
          disabled={!selectedPatient || !noteText || !shift || isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Process & Extract with AI
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}