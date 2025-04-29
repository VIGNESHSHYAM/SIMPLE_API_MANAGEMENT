
const mongoose = require('mongoose');

// Define the Api schema
const ApiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    endpoint: {
      type: String,
      required: true,
      trim: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    initialCredits: {
      type: Number,
      required: true,
      default: 40,
    },
    remainingCredits: {
      type: Number,
      required: true,
      default: 40,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Export the model, checking if it already exists to prevent OverwriteModelError
export const apiModel = mongoose.models.Api || mongoose.model('Api', ApiSchema);
