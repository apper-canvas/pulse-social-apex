import userData from '../mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserService {
  constructor() {
    this.users = [...userData];
  }

  async getAll() {
    await delay(300);
    return [...this.users];
  }

  async getById(id) {
    await delay(200);
    const user = this.users.find(u => u.Id === parseInt(id, 10));
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  }

  async searchByUsername(query) {
    await delay(250);
    if (!query.trim()) return [];
    
    const searchResults = this.users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.displayName.toLowerCase().includes(query.toLowerCase())
    );
    return searchResults.map(user => ({ ...user }));
  }

  async create(userData) {
    await delay(400);
    const maxId = Math.max(...this.users.map(u => u.Id), 0);
    const newUser = {
      Id: maxId + 1,
      ...userData,
      followersCount: 0,
      followingCount: 0,
      joinedDate: new Date().toISOString()
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await delay(350);
    const index = this.users.findIndex(u => u.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...this.users[index],
      ...userData,
      Id: this.users[index].Id // Prevent Id modification
    };
    this.users[index] = updatedUser;
    return { ...updatedUser };
  }

  async delete(id) {
    await delay(300);
    const index = this.users.findIndex(u => u.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const deletedUser = { ...this.users[index] };
    this.users.splice(index, 1);
    return deletedUser;
  }

  async getCurrentUser() {
    await delay(200);
    // Return the first user as the current user for demo purposes
    return { ...this.users[0] };
  }

  async updateFollowerCount(userId, increment) {
    await delay(200);
    const user = this.users.find(u => u.Id === parseInt(userId, 10));
    if (user) {
      user.followersCount += increment;
      return { ...user };
    }
    throw new Error('User not found');
  }

  async updateFollowingCount(userId, increment) {
    await delay(200);
    const user = this.users.find(u => u.Id === parseInt(userId, 10));
    if (user) {
      user.followingCount += increment;
      return { ...user };
    }
    throw new Error('User not found');
  }
}

export default new UserService();