import type { Machine, Task, File } from "./types"

export const mockMachines: Machine[] = [
  {
    id: "machine-1",
    name: "Laptop",
    description: "MacBook Pro M2",
    status: "online",
    cpu: 35,
    memory: 42,
    disk: 68,
    uptime: "3d 7h 22m",
    load: "1.2, 1.5, 1.3",
    ip: "192.168.1.100",
  },
  {
    id: "machine-2",
    name: "Desktop",
    description: "Custom PC i9-13900K",
    status: "online",
    cpu: 12,
    memory: 28,
    disk: 45,
    uptime: "12d 5h 47m",
    load: "0.8, 0.6, 0.7",
    ip: "192.168.1.101",
  },
]

export const mockTasks: Task[] = [
  {
    id: "task-1",
    name: "Build React Project",
    description: "npm run build for e-commerce frontend",
    status: "completed",
    assignedTo: "machine-2",
    createdAt: "2023-06-15T10:30:00Z",
    type: "build",
  },
  {
    id: "task-2",
    name: "Transcode 4K Video",
    description: "Convert vacation.mp4 to H.265",
    status: "pending",
    createdAt: "2023-06-15T11:45:00Z",
    type: "transcode",
  },
  {
    id: "task-3",
    name: "Download Dataset",
    description: "Fetch ML training data (2.3GB)",
    status: "running",
    assignedTo: "machine-1",
    createdAt: "2023-06-15T12:15:00Z",
    type: "download",
  },
  {
    id: "task-4",
    name: "Run Data Analysis",
    description: "Python script for quarterly report",
    status: "pending",
    createdAt: "2023-06-15T14:00:00Z",
    type: "script",
  },
  {
    id: "task-5",
    name: "Database Backup",
    description: "Full backup of PostgreSQL database",
    status: "failed",
    assignedTo: "machine-2",
    createdAt: "2023-06-15T09:00:00Z",
    type: "script",
  },
]

export const mockFiles: File[] = [
  {
    name: "Documents",
    type: "folder",
    size: "--",
  },
  {
    name: "Projects",
    type: "folder",
    size: "--",
  },
  {
    name: "report.pdf",
    type: "file",
    size: "2.4 MB",
  },
  {
    name: "presentation.pptx",
    type: "file",
    size: "5.7 MB",
  },
  {
    name: "vacation.mp4",
    type: "file",
    size: "1.2 GB",
  },
  {
    name: "data.csv",
    type: "file",
    size: "345 KB",
  },
  {
    name: "script.py",
    type: "file",
    size: "12 KB",
  },
  {
    name: "node_modules",
    type: "folder",
    size: "--",
  },
  {
    name: "build.sh",
    type: "file",
    size: "4 KB",
  },
  {
    name: "config.json",
    type: "file",
    size: "2 KB",
  },
]
