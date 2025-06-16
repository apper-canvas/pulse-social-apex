import followData from '../mockData/follows.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FollowService {
  constructor() {
    this.follows = [...followData];
  }

  async getAll() {
    await delay(300);
    return [...this.follows];
  }

  async getFollowers(userId) {
    await delay(250);
    const followers = this.follows.filter(f => f.followingId === parseInt(userId, 10));
    return followers.map(f => ({ ...f }));
  }

  async getFollowing(userId) {
    await delay(250);
    const following = this.follows.filter(f => f.followerId === parseInt(userId, 10));
    return following.map(f => ({ ...f }));
  }

  async isFollowing(followerId, followingId) {
    await delay(200);
    return this.follows.some(f => 
      f.followerId === parseInt(followerId, 10) && 
      f.followingId === parseInt(followingId, 10)
    );
  }

  async follow(followerId, followingId) {
    await delay(350);
    
    // Check if already following
    const exists = this.follows.some(f => 
      f.followerId === parseInt(followerId, 10) && 
      f.followingId === parseInt(followingId, 10)
    );
    
    if (exists) {
      throw new Error('Already following this user');
    }
    
    const maxId = Math.max(...this.follows.map(f => f.Id), 0);
    const newFollow = {
      Id: maxId + 1,
      followerId: parseInt(followerId, 10),
      followingId: parseInt(followingId, 10),
      timestamp: new Date().toISOString()
    };
    
    this.follows.push(newFollow);
    return { ...newFollow };
  }

  async unfollow(followerId, followingId) {
    await delay(300);
    
    const index = this.follows.findIndex(f => 
      f.followerId === parseInt(followerId, 10) && 
      f.followingId === parseInt(followingId, 10)
    );
    
    if (index === -1) {
      throw new Error('Follow relationship not found');
    }
    
    const deletedFollow = { ...this.follows[index] };
    this.follows.splice(index, 1);
    return deletedFollow;
  }

  async getFollowingIds(userId) {
    await delay(200);
    const following = this.follows.filter(f => f.followerId === parseInt(userId, 10));
    return following.map(f => f.followingId);
  }
}

export default new FollowService();