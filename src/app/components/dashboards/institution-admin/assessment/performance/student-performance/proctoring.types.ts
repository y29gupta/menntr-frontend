export type Interruption = {
  id: number;
  title: string;
  events: {
    time: string;
    description: string;
  }[];
};

export type ProctoringData = {
  screenshots: string[];
  cameraOff: boolean;
  tabChanged: boolean;
  interruptions?: Interruption[];
  videoUrl?: string | null;
};
