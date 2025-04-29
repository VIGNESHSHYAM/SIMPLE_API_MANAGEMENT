// models/ApiUsage.js

const mongoose = require('mongoose');

const ApiUsageSchema = new mongoose.Schema({
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Api',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['data']
  },
  cost: {
    type: Number,
    required: true
  },
  calledAt: {
    type: Date,
    default: Date.now
  }
});

export const ApiUsageModel = mongoose.models.ApiUsage || mongoose.model('ApiUsage', ApiUsageSchema);
