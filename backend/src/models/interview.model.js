import { Schema, model } from "mongoose";
import { technicalQuestionSchema } from "./Schema/technical.sub.Schema.js";
import { behavioralQuestionSchema } from "./Schema/behavioral.sub.Schema.js";
import { skillGapSchema } from "./Schema/skillGap.sub.Schema.js";
import { preparationPlanSchema } from "./Schema/preparationPlan.sub.Schema.js";

const interviewSchema = new Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job Description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Job Title is required"],
    },
  },
  { timestamps: true },
);

export const Interview = model("Interview", interviewSchema);
