import usersResolvers from "./users";

export default {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};
