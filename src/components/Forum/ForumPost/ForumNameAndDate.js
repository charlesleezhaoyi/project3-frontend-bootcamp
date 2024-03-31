export default function ForumNameAndDate({ user, date }) {
  const userName = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : user.email.split("@")[0];

  const createdAt = new Date(date);
  return (
    <div className="flex justify-between items-center w-full p-2 border-b-2 border-secondary">
      <h3>{userName}</h3>
      <h3 className="text-xs">
        {createdAt.toLocaleString("en-GB", {
          timeZone: "UTC",
        })}
      </h3>
    </div>
  );
}
