const resolvers = {
  Query: {
    getSingleUser: async (parent, args, context) => {
      const foundUser = await User.findOne({
        username: args.username,
      });

      if (!foundUser) {
        return null;
      }

      //   res.json(foundUser);
      return foundUser;
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const user = await User.create(args);

      if (!user) {
        return null;
      }
      const token = signToken(user);
      //   res.json({ token, user });
      return { token, user };
    },

    login: async (parent, args, context) => {
        try {
          const user = await User.findOne({
            $or: [{ username: args.username }, { email: args.email }],
          });
          if (!user) {
            throw new Error('No user found with these credentials');
          }
  
          const correctPw = await user.isCorrectPassword(args.password);
          if (!correctPw) {
            throw new Error('Incorrect password');
          }
  
          const token = signToken(user);
          return { token, user };
        } catch (error) {
          console.error(error);
          throw new Error('Login error');
        }
      },
  
      saveBook: async (parent, args, context) => {
        try {
          // Assuming context contains the user object
          const { user } = context;
          if (!user) {
            throw new Error('User not authenticated');
          }
  
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: args.book } },
            { new: true, runValidators: true }
          );
  
          if (!updatedUser) {
            throw new Error('Error saving book');
          }
  
          return updatedUser;
        } catch (error) {
          console.error(error);
          throw new Error('Error saving book');
        }
      },
  
      deleteBook: async (parent, args, context) => {
        try {
          // Assuming context contains the user object
          const { user } = context;
          if (!user) {
            throw new Error('User not authenticated');
          }
  
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
          );
  
          if (!updatedUser) {
            throw new Error('Could not find user with this id');
          }
  
          return updatedUser;
        } catch (error) {
          console.error(error);
          throw new Error('Error deleting book');
        }
      },
    },
  };
  
  module.exports = resolvers;