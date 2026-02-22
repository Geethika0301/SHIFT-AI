import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import HandoffReport from "@/components/handoff/HandoffReport";

export default function HandoffReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState(() => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 15) return "day";
    if (hour >= 15 && hour < 23) return "evening";
    return "night";
  });

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: () => base44.entities.Patient.list("-created_date")
  });

  const { data: notes = [], refetch } = useQuery({
    queryKey: ["notes", selectedDate, selectedShift],
    queryFn: () => base44.entities.NursingNote.filter(
      { shift: selectedShift },
      "-created_date",
      100
    )
  });

  const filteredNotes = notes.filter(note => {
    const noteDate = format(new Date(note.created_date), "yyyy-MM-dd");
    const targetDate = format(selectedDate, "yyyy-MM-dd");
    return noteDate === targetDate;
  });

  const handoff = {
    shift_date: format(selectedDate, "yyyy-MM-dd"),
    shift_type: selectedShift,
    status: "draft"
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(selectedDate, "MMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={selectedShift} onValueChange={setSelectedShift}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day Shift</SelectItem>
                <SelectItem value="evening">Evening Shift</SelectItem>
                <SelectItem value="night">Night Shift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Report */}
      <HandoffReport 
        handoff={handoff} 
        patients={patients} 
        notes={filteredNotes}
      />
    </div>
  );
}