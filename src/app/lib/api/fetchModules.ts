export type Module = {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string | null;
  category: string;
  isCore: boolean;
};

export type ModulesResponse = {
  data: Module[];
};

export type Feature = {
  id: number;
  code: string;
  name: string;
  description: string;
};

export type FeaturesResponse = {
  data: Feature[];
};

/**
 * Fetch all modules for the institution
 */
export const fetchModules = async (): Promise<ModulesResponse> => {
  const response = await fetch(`/api/institutionsadmin/modules`, {
    credentials: 'include', // Send cookies with the request
  });

  if (!response.ok) {
    throw new Error('Failed to fetch modules');
  }

  return response.json();
};

/**
 * Fetch features for a specific module
 */
export const fetchModuleFeatures = async (moduleId: number): Promise<FeaturesResponse> => {
  const response = await fetch(`/api/institutionsadmin/modules/features/${moduleId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch features for module ${moduleId}`);
  }

  return response.json();
};
