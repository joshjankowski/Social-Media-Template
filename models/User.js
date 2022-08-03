const { Schema, model } = require("mongoose");
const dayjs = require('dayjs');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    bio: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    posts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Post'
      }
  ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
],
createdAt: {
  type: Date,
  default: Date.now,
  get: createdAtVal => dayjs(createdAtVal).format('MMM DD, YYYY h:mm a')
}
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// total count of friends a user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

// const handleError = (err) => console.error(err);
// User.create(
//   {
//     username: 'britneyspears',
//     password: 'xxx',
//     email: 'britneyspears@britney.com',
//     bio: 'me fun',
//     firstName: 'Britney',
//     lastName: 'Spears',
//     dateOfBirth: '04/01/1976',
//     zipCode: '12536',
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );

module.exports = User;
