import { MutableRefObject, useState } from "react";
import toast from "react-hot-toast";
import { useAddCommentMutation } from "src/store/api/comment-api-slice";

interface CommentInputProps {
  postId: string
  inputRef: MutableRefObject<HTMLTextAreaElement | null>
}

export default function CommentInput({postId, inputRef}: CommentInputProps) {
  const [rows, setRows] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [addComment] = useAddCommentMutation()
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   
    const previousValue = comment;
    const currentValue = e.target.value;
    setComment(currentValue);
    if (comment.length > 60 * rows) {
      setRows((prev) => prev + 1);
    }
    if (
      previousValue.length > currentValue.length &&
      previousValue.length === 62 * (rows - 1)
    ) {
      setRows((prev) => prev - 1);
    }
  };

  const handleComment = async() => {
    try {
      const content = comment
      setComment("")
      const {message} = await addComment({postId, content}).unwrap()
      toast.success(message)
    } catch  {
      toast.error("Comment can not be added!")
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
        <textarea
        ref={inputRef}
          value={comment}
          rows={rows}
          className="outline-none resize-none text-sm"
          onChange={handleInputChange}
          placeholder="Add a comment"
        />
        <button onClick={handleComment} className="bg-blue-500 text-white rounded-md w-[75px] py-1 border-blue-500 text-sm border transition-all hover:bg-white hover:text-blue-500 duration-300 " type="submit">Add</button>
    </div>
  );
}
