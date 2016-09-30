'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  name: String,
  info: String,
  hint:String,
  point:Number,
  answer:String,
  active: Boolean
});

export default mongoose.model('Question', QuestionSchema);
