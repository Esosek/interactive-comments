import { User } from "@/types/user";

import styles from "./styles/CommentHeader.module.css";
import UserImage from "../ui/UserImage";

type CommentHeaderProps = {
  user: User;
  createdAt: string;
};

export default function CommentHeader({
  user,
  createdAt: postedAt,
}: CommentHeaderProps) {
  return (
    <div className={styles.header}>
      <UserImage username={user.username} imagePath={user.image.webp} />
      <p>{user.username}</p>
      <p>{postedAt}</p>
    </div>
  );
}
