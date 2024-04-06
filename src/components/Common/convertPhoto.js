export function convertBufferToPhoto(bufferData) {
  const buffer = new Uint8Array(bufferData);
  const blob = new Blob([buffer]);
  return URL.createObjectURL(blob);
}
