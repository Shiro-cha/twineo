"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import type { Machine } from "@/lib/types"
import { Server, Laptop, Monitor } from "lucide-react"

interface AddMachineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMachine: (machine: Machine) => void
}

export default function AddMachineDialog({ open, onOpenChange, onAddMachine }: AddMachineDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ip: "",
    type: "",
    shared: false,
    accessKey: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newMachine: Machine = {
      id: `machine-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      status: "online",
      cpu: Math.random() * 50 + 10,
      memory: Math.random() * 60 + 20,
      disk: Math.random() * 80 + 10,
      uptime: "0d 0h 1m",
      load: "0.1, 0.2, 0.1",
      ip: formData.ip,
    }

    onAddMachine(newMachine)

    if (formData.shared) {
      toast({
        title: "Machine added and shared",
        description: `${formData.name} is now available to other users with access key: ${formData.accessKey}`,
      })
    } else {
      toast({
        title: "Machine added",
        description: `${formData.name} has been successfully added to your network`,
      })
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      ip: "",
      type: "",
      shared: false,
      accessKey: "",
    })

    setIsLoading(false)
    onOpenChange(false)
  }

  const generateAccessKey = () => {
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setFormData({ ...formData, accessKey: key })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add New Machine
          </DialogTitle>
          <DialogDescription className="text-sm lg:text-base">
            Connect a new machine to your FusionX network. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Machine Name *
              </Label>
              <Input
                id="name"
                placeholder="e.g., Gaming PC"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-2 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Machine Type *
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, type: value })} required>
                <SelectTrigger className="border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desktop">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Desktop
                    </div>
                  </SelectItem>
                  <SelectItem value="laptop">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" />
                      Laptop
                    </div>
                  </SelectItem>
                  <SelectItem value="server">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      Server
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="e.g., High-performance gaming rig with RTX 4090"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-2 focus:border-blue-500 resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ip" className="text-sm font-medium">
              IP Address *
            </Label>
            <Input
              id="ip"
              placeholder="e.g., 192.168.1.100"
              value={formData.ip}
              onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
              className="border-2 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="shared" className="text-sm font-medium">
                  Share Machine
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow other users to access this machine with an access key
                </p>
              </div>
              <Switch
                id="shared"
                checked={formData.shared}
                onCheckedChange={(checked) => setFormData({ ...formData, shared: checked })}
              />
            </div>

            {formData.shared && (
              <div className="space-y-2">
                <Label htmlFor="accessKey" className="text-sm font-medium">
                  Access Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="accessKey"
                    placeholder="Generate or enter custom key"
                    value={formData.accessKey}
                    onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
                    className="border-2 focus:border-blue-500"
                  />
                  <AnimatedButton type="button" variant="outline" onClick={generateAccessKey}>
                    Generate
                  </AnimatedButton>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <AnimatedButton
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="order-2 sm:order-1"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 order-1 sm:order-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </div>
              ) : (
                "Add Machine"
              )}
            </AnimatedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
