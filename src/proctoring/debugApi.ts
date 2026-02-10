// Add this to your handleCheat.ts to debug API issues

import { api } from '@/app/lib/api';

// Debug function to test API endpoint
export async function debugApiConnection(attemptId: number) {
  console.log('🔍 Testing API connection...');
  console.log('   attemptId:', attemptId);
  console.log('   API base URL:', (api as any).defaults?.baseURL || 'not set');

  try {
    // Test if the endpoint exists
    const response = await api.post('/proctoring/sas', {
      attemptId,
      fileType: 'video',
    });

    console.log('✅ API test successful:', response.data);
    return true;
  } catch (error: any) {
    console.error('❌ API test failed');
    console.error('   Status:', error.response?.status);
    console.error('   Message:', error.response?.data?.message || error.message);
    console.error('   URL:', error.config?.url);
    console.error('   Base URL:', error.config?.baseURL);
    return false;
  }
}

// Call this before your first cheat event to verify API is working
// debugApiConnection(attemptId).then(works => {
//   console.log('API connection works:', works);
// });
