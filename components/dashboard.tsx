"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import MachineStatus from "@/components/machine-status"
import TaskManager from "@/components/task-manager"
import FileExplorer from "@/components/file-explorer"
import RemoteShell from "@/components/remote-shell"
import AddMachineDialog from "@/components/add-machine-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { mockMachines, mockTasks } from "@/lib/mock-data"
import { Plus, LogOut, Activity, Menu, X } from "lucide-react"
import type { Machine } from "@/lib/types"

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [machines, setMachines] = useState(mockMachines)
  const [tasks, setTasks] = useState(mockTasks)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddMachine, setShowAddMachine] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prev) =>
        prev.map((machine) => ({
          ...machine,
          cpu: Math.min(100, Math.max(5, machine.cpu + (Math.random() * 10 - 5))),
          memory: Math.min(100, Math.max(10, machine.memory + (Math.random() * 6 - 3))),
          disk: machine.disk,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleTaskDispatch = (taskId: string, machineId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: "running", assignedTo: machineId } : task)),
    )

    toast({
      title: "Task dispatched",
      description: `Task ${taskId} dispatched to ${machines.find((m) => m.id === machineId)?.name}`,
    })

    // Simulate task completion
    setTimeout(() => {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)))

      toast({
        title: "Task completed",
        description: `Task ${taskId} completed successfully`,
      })
    }, 8000)
  }

  const handleAddMachine = (machine: Machine) => {
    setMachines((prev) => [...prev, machine])
    toast({
      title: "Machine added",
      description: `${machine.name} has been added to your network`,
    })
  }

  const totalCpu = machines.reduce((acc, machine) => acc + machine.cpu, 0) / machines.length
  const totalMemory = machines.reduce((acc, machine) => acc + machine.memory, 0) / machines.length
  const totalDisk = machines.reduce((acc, machine) => acc + machine.disk, 0) / machines.length

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8 max-w-7xl">
        {/* Mobile Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 lg:py-6 gap-4">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Twineo Dashboard
              </h1>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg mt-1 lg:mt-2">
                Control your unified computing environment
              </p>
            </div>

            {/* Mobile Menu Button */}
            <AnimatedButton
              variant="outline"
              size="icon"
              className="lg:hidden border-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </AnimatedButton>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Badge
              variant={machines.every((m) => m.status === "online") ? "success" : "destructive"}
              className="px-4 py-2 text-sm font-medium"
            >
              <Activity className="h-4 w-4 mr-2" />
              {machines.every((m) => m.status === "online") ? "All Systems Online" : "System Alert"}
            </Badge>
            <AnimatedButton
              onClick={() => setShowAddMachine(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Machine
            </AnimatedButton>
            <ThemeToggle />
            <AnimatedButton variant="outline" onClick={onLogout} className="border-2">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </AnimatedButton>
          </div>

          {/* Mobile Actions Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border-2 p-4 space-y-3">
              <Badge
                variant={machines.every((m) => m.status === "online") ? "success" : "destructive"}
                className="px-4 py-2 text-sm font-medium w-full justify-center"
              >
                <Activity className="h-4 w-4 mr-2" />
                {machines.every((m) => m.status === "online") ? "All Systems Online" : "System Alert"}
              </Badge>
              <div className="flex gap-2">
                <AnimatedButton
                  onClick={() => {
                    setShowAddMachine(true)
                    setMobileMenuOpen(false)
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Machine
                </AnimatedButton>
                <ThemeToggle />
                <AnimatedButton variant="outline" onClick={onLogout} className="border-2" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </AnimatedButton>
              </div>
            </div>
          )}
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-700 dark:text-blue-300 text-lg">CPU Usage</CardTitle>
              <CardDescription className="text-sm">Combined processing power</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalCpu.toFixed(1)}%
              </div>
              <Progress value={totalCpu} className="mt-3 h-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-700 dark:text-purple-300 text-lg">Memory Usage</CardTitle>
              <CardDescription className="text-sm">Combined RAM utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">
                {totalMemory.toFixed(1)}%
              </div>
              <Progress value={totalMemory} className="mt-3 h-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-700 dark:text-orange-300 text-lg">Disk Usage</CardTitle>
              <CardDescription className="text-sm">Combined storage utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-orange-600 dark:text-orange-400">
                {totalDisk.toFixed(1)}%
              </div>
              <Progress value={totalDisk} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 h-auto">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 text-sm"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 text-sm"
            >
              Files
            </TabsTrigger>
            <TabsTrigger
              value="shell"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 text-sm"
            >
              Shell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {machines.map((machine) => (
                <MachineStatus key={machine.id} machine={machine} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManager tasks={tasks} machines={machines} onDispatch={handleTaskDispatch} />
          </TabsContent>

          <TabsContent value="files">
            <FileExplorer machines={machines} />
          </TabsContent>

          <TabsContent value="shell">
            <RemoteShell machines={machines} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-slate-200 dark:border-slate-700 mt-12">
          <p className="text-sm text-muted-foreground">
            © 2024{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Shiro-cha
            </span>
            . All rights reserved.
          </p>
        </footer>

        <AddMachineDialog open={showAddMachine} onOpenChange={setShowAddMachine} onAddMachine={handleAddMachine} />
      </div>
    </div>
  )
}
