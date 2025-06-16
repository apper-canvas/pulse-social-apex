import commentData from '../mockData/comments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CommentService {
  constructor() {
    this.comments = [...commentData];
  }

  async getAll() {
    await delay(300);
    return [...this.comments];
  }

  async getById(id) {
    await delay(200);
    const comment = this.comments.find(c => c.Id === parseInt(id, 10));
    if (!comment) {
      throw new Error('Comment not found');
    }
    return { ...comment };
  }

  async getByPostId(postId) {
    await delay(250);
    const postComments = this.comments.filter(c => c.postId === parseInt(postId, 10));
    return postComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  async create(commentData) {
    await delay(400);
    const maxId = Math.max(...this.comments.map(c => c.Id), 0);
    const newComment = {
      Id: maxId + 1,
      ...commentData,
      timestamp: new Date().toISOString(),
      likesCount: 0
    };
    this.comments.push(newComment);
    return { ...newComment };
  }

  async update(id, commentData) {
    await delay(350);
    const index = this.comments.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Comment not found');
    }
    
    const updatedComment = {
      ...this.comments[index],
      ...commentData,
      Id: this.comments[index].Id // Prevent Id modification
    };
    this.comments[index] = updatedComment;
    return { ...updatedComment };
  }

  async delete(id) {
    await delay(300);
    const index = this.comments.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Comment not found');
    }
    
    const deletedComment = { ...this.comments[index] };
    this.comments.splice(index, 1);
    return deletedComment;
  }

  async toggleLike(commentId) {
    await delay(200);
    const comment = this.comments.find(c => c.Id === parseInt(commentId, 10));
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    comment.likesCount += 1; // Simple increment for demo
    return { ...comment };
  }
}

export default new CommentService();