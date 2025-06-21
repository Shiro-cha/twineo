"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Cpu, HardDrive, MemoryStickIcon as Memory, Power, Activity, Share, Settings } from "lucide-react"
import type { Machine } from "@/lib/types"

interface MachineStatusProps {
  machine: Machine
}

export default function MachineStatus({ machine }: MachineStatusProps) {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-200 truncate">
              {machine.name}
            </CardTitle>
            <CardDescription className="text-sm lg:text-base mt-1 line-clamp-2">{machine.description}</CardDescription>
          </div>
          <Badge
            variant={machine.status === "online" ? "success" : "destructive"}
            className="px-3 py-1 font-medium shrink-0"
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 ${machine.status === "online" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
            />
            {machine.status === "online" ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Cpu className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-medium text-sm lg:text-base">CPU</span>
            </div>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm lg:text-base">
              {machine.cpu.toFixed(1)}%
            </span>
          </div>
          <Progress value={machine.cpu} className="h-1.5 lg:h-2 bg-blue-100 dark:bg-blue-900/30" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Memory className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-medium text-sm lg:text-base">Memory</span>
            </div>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm lg:text-base">
              {machine.memory.toFixed(1)}%
            </span>
          </div>
          <Progress value={machine.memory} className="h-1.5 lg:h-2 bg-purple-100 dark:bg-purple-900/30" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <HardDrive className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="font-medium text-sm lg:text-base">Storage</span>
            </div>
            <span className="font-bold text-orange-600 dark:text-orange-400 text-sm lg:text-base">
              {machine.disk.toFixed(1)}%
            </span>
          </div>
          <Progress value={machine.disk} className="h-1.5 lg:h-2 bg-orange-100 dark:bg-orange-900/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <Activity className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 shrink-0" />
            <span className="text-muted-foreground">Uptime:</span>
            <span className="font-medium truncate">{machine.uptime}</span>
          </div>
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <Power className="h-3 w-3 lg:h-4 lg:w-4 text-blue-500 shrink-0" />
            <span className="text-muted-foreground">Load:</span>
            <span className="font-medium truncate">{machine.load}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 pt-4">
        <AnimatedButton variant="outline" size="sm" className="flex-1 border-2">
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </AnimatedButton>
        <AnimatedButton variant="outline" size="sm" className="flex-1 border-2">
          <Share className="h-4 w-4 mr-2" />
          Share
        </AnimatedButton>
      </CardFooter>
    </Card>
  )
}
