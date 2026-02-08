import axios from 'axios';

export async function uploadToAzure(sasUrl: string, blob: Blob) {
  console.log('⬆️ uploadToAzure called');
  console.log('   Blob size:', blob.size, 'bytes');
  console.log('   SAS URL:', sasUrl.substring(0, 100) + '...');

  try {
    const response = await axios.put(sasUrl, blob, {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': blob.type || 'video/webm',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        console.log(`   Upload progress: ${percentCompleted}%`);
      },
    });

    console.log('✅ Azure upload success');
    console.log('   Status:', response.status);
    return response;
  } catch (error: any) {
    console.error('❌ Azure upload failed');
    console.error('   Error:', error.message);
    console.error('   Response:', error.response?.data);
    console.error('   Status:', error.response?.status);
    throw error;
  }
}
