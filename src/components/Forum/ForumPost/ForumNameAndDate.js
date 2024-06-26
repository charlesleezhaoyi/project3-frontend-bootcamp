import OutputUserName from "../../Common/OutputUserName";

export default function ForumNameAndDate({ user, date }) {
  const userName = OutputUserName(user);

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
