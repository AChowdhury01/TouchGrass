const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    chauffeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    duration: {
      type: String,
    },
    details: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: "requested",
      required: true,
    },
  },
  { timestamps: true }
);

EventSchema.index({ location: "2dsphere" });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
