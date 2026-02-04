import axios from 'axios';

export async function uploadToAzure(sasUrl: string, blob: Blob) {
  console.log('⬆️ Uploading to Azure:', blob.size, 'bytes');

  await axios.put(sasUrl, blob, {
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': blob.type,
      'Content-Length':blob.size,
    },
  });

  console.log('✅ Azure upload success');
}
