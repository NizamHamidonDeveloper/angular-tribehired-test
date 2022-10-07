export interface PostListInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentListInterface {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}