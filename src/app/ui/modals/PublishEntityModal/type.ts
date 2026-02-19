export interface PublishEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: string;
  entityLabel: string; // "Assessment" | "Assignment"
  entityName: string;
  redirectPath: string;

  fetchSummary: (id: string) => Promise<any>;
  fetchAssignedTo: (id: string) => Promise<any>;
  fetchAccess: (id: string) => Promise<any>;
  updateAccess: (id: string, payload: any) => Promise<any>;
  updateSchedule: (id: string, payload: any) => Promise<any>;
  publishEntity: (id: string) => Promise<any>;
}



export type StepFourHandle = {
  submit: () => {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    allowReattempts: boolean;
    showCorrectAnswers: boolean;
    showScoreImmediately: boolean;
  };
};