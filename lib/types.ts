export interface Machine {
  id: string
  name: string
  description: string
  status: "online" | "offline"
  cpu: number
  memory: number
  disk: number
  uptime: string
  load: string
  ip: string
}

export interface Task {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "failed"
  assignedTo?: string
  createdAt: string
  type: "build" | "transcode" | "download" | "script"
}

export interface File {
  name: string
  type: "file" | "folder"
  size: string
  lastModified?: string
}
