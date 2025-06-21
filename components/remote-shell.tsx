"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Machine } from "@/lib/types"
import { Terminal, Send, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RemoteShellProps {
  machines: Machine[]
}

export default function RemoteShell({ machines }: RemoteShellProps) {
  const [activeMachine, setActiveMachine] = useState(machines[0].id)
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<{ machine: string; command: string; output: string }[]>([])
  const { toast } = useToast()

  const executeCommand = () => {
    if (!command.trim()) return

    // Simulate command execution
    const machine = machines.find((m) => m.id === activeMachine)

    // Add command to history
    setHistory((prev) => [
      ...prev,
      {
        machine: machine?.name || "",
        command,
        output: simulateCommandOutput(command),
      },
    ])

    toast({
      title: "Command executed",
      description: `Command executed on ${machine?.name}`,
    })

    setCommand("")
  }

  const simulateCommandOutput = (cmd: string) => {
    if (cmd.startsWith("ls")) {
      return "Documents  Downloads  Pictures  Videos  projects  node_modules"
    }
    if (cmd.startsWith("pwd")) {
      return "/home/user"
    }
    if (cmd.startsWith("echo")) {
      return cmd.substring(5)
    }
    if (cmd.startsWith("date")) {
      return new Date().toString()
    }
    return `Command '${cmd}' executed successfully.`
  }

  const saveScript = () => {
    toast({
      title: "Script saved",
      description: "Your script has been saved for future use",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Remote Shell</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeMachine} onValueChange={setActiveMachine}>
          <TabsList className="mb-4">
            {machines.map((machine) => (
              <TabsTrigger key={machine.id} value={machine.id}>
                {machine.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {machines.map((machine) => (
            <TabsContent key={machine.id} value={machine.id} className="space-y-4">
              <ScrollArea className="h-[350px] rounded-md border bg-black text-white font-mono p-4">
                <div className="space-y-2">
                  <div className="text-green-400">
                    Connected to {machine.name} - {machine.description}
                  </div>

                  {history
                    .filter((item) => item.machine === machine.name)
                    .map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">user@{machine.name.toLowerCase()}:~$</span>
                          <span>{item.command}</span>
                        </div>
                        <div className="text-gray-300 pl-4">{item.output}</div>
                      </div>
                    ))}

                  <div className="flex items-center gap-2 text-green-400">
                    <span>user@{machine.name.toLowerCase()}:~$</span>
                    <span className="animate-pulse">▌</span>
                  </div>
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Terminal className="h-4 w-4" />
                  <Input
                    placeholder="Enter command..."
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        executeCommand()
                      }
                    }}
                  />
                </div>
                <Button onClick={executeCommand}>
                  <Send className="h-4 w-4 mr-2" />
                  Execute
                </Button>
                <Button variant="outline" onClick={saveScript}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Script
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
