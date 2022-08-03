const { Schema, model, Types } = require("mongoose");
const dayjs = require('dayjs');

const reactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: true,
          maxlength: 280
      },
      username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dayjs(createdAtVal).format('MMM DD, YYYY h:mm a')
      }
  },
  {
      toJSON: {
          getters: true
      }
  }
);

const postSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: createdAtVal => dayjs(createdAtVal).format('MMM DD, YYYY h:mm a')
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Total count of reactions a thought has
postSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Post = model("post", postSchema);

// const handleError = (err) => console.error(err);
// Post.create(
//   {
//     thoughtText: 'Diary of Anne was Amazing!!!!!',
//     username: 'britneyspears',
//     reactions: {
//       reactionBody: 'What in the world!?',
//       username: 'britneyspears',
//     }
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );

module.exports = Post;
