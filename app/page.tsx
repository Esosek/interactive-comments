"use client";
import styles from "./page.module.css";

import Comment from "@/components/comments/Comment";
import { useCommentStore } from "@/stores/commentStore";

export default function Home() {
  const comments = useCommentStore((state) => state.comments);
  return (
    <main>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </main>
  );
}
