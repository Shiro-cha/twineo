"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Machine } from "@/lib/types"
import { Folder, File, Upload, Download, RefreshCw, Search } from "lucide-react"
import { mockFiles } from "@/lib/mock-data"

interface FileExplorerProps {
  machines: Machine[]
}

export default function FileExplorer({ machines }: FileExplorerProps) {
  const [activeMachine, setActiveMachine] = useState(machines[0].id)
  const [currentPath, setCurrentPath] = useState("/home/user")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFiles = mockFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Explorer</CardTitle>
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
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm">{currentPath}</div>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>

              <ScrollArea className="h-[350px] rounded-md border">
                <div className="p-4 space-y-1">
                  {filteredFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {file.type === "folder" ? (
                          <Folder className="h-4 w-4 text-blue-500" />
                        ) : (
                          <File className="h-4 w-4 text-gray-500" />
                        )}
                        <span>{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                        {file.type !== "folder" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
