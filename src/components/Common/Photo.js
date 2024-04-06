export default function Photo({ url, children }) {
  return (
    <div
      className="w-32 h-44 bg-center bg-cover flex justify-end border rounded-lg"
      style={{ backgroundImage: `url(${url})` }}
    >
      {children}
    </div>
  );
}
