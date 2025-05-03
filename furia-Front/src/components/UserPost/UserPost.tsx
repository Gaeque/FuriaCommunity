import { useState } from "react";
import "./UserPost.style.css";
import furia from "../../assets/600px-FURIA_Esports_full_darkmode.png";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/UseAuth";

interface Comment {
  id: number;
  username: string;
  content: string;
}

interface Post {
  id: number;
  username: string;
  content: string;
  comments: Comment[];
  showCommentField: boolean;
}

export const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const { user } = useAuth();

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const newPostObject: Post = {
      id: posts.length + 1,
      username: user?.userName ?? "",
      content: newPost,
      comments: [],
      showCommentField: false,
    };
    setPosts([newPostObject, ...posts]);
    setNewPost("");
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleToggleCommentField = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showCommentField: !post.showCommentField }
          : post
      )
    );
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    postId: number
  ) => {
    setNewComment({
      ...newComment,
      [postId]: e.target.value,
    });
  };

  const handleAddComment = (postId: number) => {
    const commentContent = newComment[postId]?.trim();
    if (!commentContent) return;

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newCommentObject: Comment = {
          id: post.comments.length + 1,
          username: "Comentador",
          content: commentContent,
        };
        return {
          ...post,
          comments: [...post.comments, newCommentObject],
          showCommentField: false,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment((prev) => {
      const updated = { ...prev };
      delete updated[postId];
      return updated;
    });
  };

  return (
    <div className="user-posts-container">
      <div className="new-post-card">
        <img src={furia} alt="Logo da Fúria" className="furia-logo" />
        <div className="new-post-content">
          <textarea
            value={newPost}
            onChange={handlePostChange}
            placeholder="Escreva algo..."
            className="new-post-textarea"
          />
          <div className="new-post-buttons">
            <button className="photo-button">Adicionar Foto</button>
            <button className="post-button" onClick={handlePostSubmit}>
              Postar
            </button>
          </div>
        </div>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img src={furia} alt="Logo Fúria" className="furia-logo-post" />
              <h4>{post.username}</h4>
            </div>

            <p>{post.content}</p>

            <div className="post-actions">
              <button className="like-button">❤️ Like</button>
              <button
                className="comment-button"
                onClick={() => handleToggleCommentField(post.id)}
              >
                💬 Comentar
              </button>
              <Button
                className="delete-Button"
                onClick={() => handleDeletePost(post.id)}
              >
                Apagar
              </Button>
            </div>

            {post.showCommentField && (
              <div className="comment-field">
                <img
                  src={furia}
                  alt="Logo da Fúria"
                  className="furia-logo-comment"
                />
                <textarea
                  value={newComment[post.id] || ""}
                  onChange={(e) => handleCommentChange(e, post.id)}
                  placeholder="Escreva seu comentário..."
                  className="comment-textarea"
                />
                <button onClick={() => handleAddComment(post.id)}>
                  Enviar
                </button>
              </div>
            )}

            {post.comments.length > 0 && (
              <div className="comments-section">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <strong>{comment.username}:</strong> {comment.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
