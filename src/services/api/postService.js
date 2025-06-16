import postData from '../mockData/posts.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PostService {
  constructor() {
    this.posts = [...postData];
  }

  async getAll() {
    await delay(350);
    return [...this.posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await delay(200);
    const post = this.posts.find(p => p.Id === parseInt(id, 10));
    if (!post) {
      throw new Error('Post not found');
    }
    return { ...post };
  }

  async getByUserId(userId) {
    await delay(300);
    const userPosts = this.posts.filter(p => p.userId === parseInt(userId, 10));
    return userPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getFeed(followingIds = []) {
    await delay(400);
    let feedPosts;
    
    if (followingIds.length > 0) {
      feedPosts = this.posts.filter(p => followingIds.includes(p.userId));
    } else {
      // If no following list, return all posts for demo
      feedPosts = [...this.posts];
    }
    
    return feedPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async create(postData) {
    await delay(450);
    const maxId = Math.max(...this.posts.map(p => p.Id), 0);
    const newPost = {
      Id: maxId + 1,
      ...postData,
      timestamp: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
      isLiked: false
    };
    this.posts.unshift(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await delay(350);
    const index = this.posts.findIndex(p => p.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Post not found');
    }
    
    const updatedPost = {
      ...this.posts[index],
      ...postData,
      Id: this.posts[index].Id // Prevent Id modification
    };
    this.posts[index] = updatedPost;
    return { ...updatedPost };
  }

  async delete(id) {
    await delay(300);
    const index = this.posts.findIndex(p => p.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Post not found');
    }
    
    const deletedPost = { ...this.posts[index] };
    this.posts.splice(index, 1);
    return deletedPost;
  }

  async toggleLike(postId, userId) {
    await delay(250);
    const post = this.posts.find(p => p.Id === parseInt(postId, 10));
    if (!post) {
      throw new Error('Post not found');
    }
    
    post.isLiked = !post.isLiked;
    post.likesCount += post.isLiked ? 1 : -1;
    
    return { ...post };
  }

  async incrementCommentCount(postId) {
    await delay(200);
    const post = this.posts.find(p => p.Id === parseInt(postId, 10));
    if (post) {
      post.commentsCount += 1;
      return { ...post };
    }
    throw new Error('Post not found');
  }
}

export default new PostService();