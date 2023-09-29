const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { ticketStatus } = require("../utils/constants");



const ticketSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ticketPriority: {
    type: Number,
    default: 5,
  },
  ticketStatus: {
    type: String,
    required: true,
    enum: Object.keys(ticketStatus),
  },
  requestor: {
    type: ObjectId,
    ref: "userCollection",
  },
  assignee: {
    type: ObjectId,
    ref: "userCollection",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const ticketModel = mongoose.model("TicketCollection",ticketSchema);

module.exports = ticketModel;