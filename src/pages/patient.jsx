import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Users } from "lucide-react";
import PatientCard from "@/components/patients/PatientCard";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    room_number: "",
    age: "",
    diagnosis: "",
    risk_level: "low",
    fall_risk: false
  });

  const queryClient = useQueryClient();

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: () => base44.entities.Patient.list("-created_date")
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Patient.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      setIsAddOpen(false);
      setNewPatient({
        name: "",
        room_number: "",
        age: "",
        diagnosis: "",
        risk_level: "low",
        fall_risk: false
      });
    }
  });

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.room_number?.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = filterRisk === "all" || p.risk_level === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({
      ...newPatient,
      age: newPatient.age ? parseInt(newPatient.age) : null
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Patients</h1>
          <p className="text-slate-500 mt-1">{patients.length} patients in your care</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Patient Name *</Label>
                  <Input
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Room Number *</Label>
                  <Input
                    value={newPatient.room_number}
                    onChange={(e) => setNewPatient({ ...newPatient, room_number: e.target.value })}
                    placeholder="e.g., 101A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    placeholder="Years"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Primary Diagnosis</Label>
                  <Input
                    value={newPatient.diagnosis}
                    onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
                    placeholder="Primary diagnosis"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Risk Level</Label>
                  <Select
                    value={newPatient.risk_level}
                    onValueChange={(v) => setNewPatient({ ...newPatient, risk_level: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between pt-6">
                  <Label>Fall Risk</Label>
                  <Switch
                    checked={newPatient.fall_risk}
                    onCheckedChange={(v) => setNewPatient({ ...newPatient, fall_risk: v })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Patient
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or room..."
              className="pl-10"
            />
          </div>
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPatients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      {filteredPatients.length === 0 && !isLoading && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No patients found</h3>
          <p className="text-slate-500">
            {search || filterRisk !== "all" 
              ? "Try adjusting your search or filters" 
              : "Add your first patient to get started"}
          </p>
        </Card>
      )}
    </div>
  );
}