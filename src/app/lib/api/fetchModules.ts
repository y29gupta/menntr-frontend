export type Module = {
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
export const fetchModuleFeatures = async (moduleCode: string): Promise<FeaturesResponse> => {
  const response = await fetch(`/api/institutionsadmin/modules/features/${moduleCode}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch features for module ${moduleCode}`);
  }

  return response.json();
};
