export function convertFileToPhoto(fileData) {
  const buffer = new Uint8Array(fileData);
  const blob = new Blob([buffer]);
  return URL.createObjectURL(blob);
}
