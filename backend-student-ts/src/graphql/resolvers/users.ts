import User from "../../models/User";

export default {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(parent, { id }, context, info) {
      try {
        return User.findById(id);
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async addUser(parent, { username }, context, info) {
      try {
        const user = await new User({ username });
        return user.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteUser(parent, { id }, context, info) {
      try {
        return User.findOneAndRemove(id);
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateUser(parent, { id, username }, context, info) {
      try {
        let userFields = {};
        if (username) {
          userFields = { username };
        }
        return User.findByIdAndUpdate(id, { $set: userFields }, { new: true });
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
