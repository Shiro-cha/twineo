"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Machine, Task } from "@/lib/types"
import { Clock, Check, AlertCircle, Loader2 } from "lucide-react"

interface TaskManagerProps {
  tasks: Task[]
  machines: Machine[]
  onDispatch: (taskId: string, machineId: string) => void
}

export default function TaskManager({ tasks, machines, onDispatch }: TaskManagerProps) {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "completed":
        return <Check className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "running":
        return "secondary"
      case "completed":
        return "success"
      case "failed":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button>New Task</Button>
            <Select onValueChange={(value) => setSelectedMachine(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by machine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Machines</SelectItem>
                {machines.map((machine) => (
                  <SelectItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[400px] rounded-md border">
            <div className="p-4 space-y-4">
              {tasks
                .filter((task) => !selectedMachine || selectedMachine === "all" || task.assignedTo === selectedMachine)
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        {task.name}
                        <Badge variant={getStatusColor(task.status) as any}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(task.status)}
                            {task.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{task.description}</div>
                      {task.assignedTo && (
                        <div className="text-xs text-muted-foreground">
                          Assigned to: {machines.find((m) => m.id === task.assignedTo)?.name}
                        </div>
                      )}
                    </div>

                    {task.status === "pending" && (
                      <Select
                        onValueChange={(machineId) => onDispatch(task.id, machineId)}
                        disabled={task.status !== "pending"}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Dispatch" />
                        </SelectTrigger>
                        <SelectContent>
                          {machines
                            .filter((machine) => machine.status === "online")
                            .map((machine) => (
                              <SelectItem key={machine.id} value={machine.id}>
                                {machine.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}

                    {task.status === "running" && (
                      <Button variant="outline" size="sm" disabled>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Running
                      </Button>
                    )}

                    {task.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-2" />
                        View Results
                      </Button>
                    )}

                    {task.status === "failed" && (
                      <Button variant="outline" size="sm">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        View Error
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
