import ForumNameAndDate from "./ForumNameAndDate";

export default function ForumComment({ comment }) {
  return (
    <div className="w-full border-b-2 border-neutral last:border-0">
      <ForumNameAndDate user={comment.commenter} date={comment.createdAt} />
      <p className="p-3 text-left text-sm">{comment.content}</p>
    </div>
  );
}
