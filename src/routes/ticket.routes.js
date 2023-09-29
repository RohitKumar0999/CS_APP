const { createTicket, getAllTickets } = require("../Controllers/ticket.controller")
const { Verifyjwt } = require("../middlewares/auth.middleware")

module.exports= (app)=>{
    app.post("/cs/api/v1/tickets",[Verifyjwt],createTicket)
    app.get("/cs/api/v1/tickets",[Verifyjwt,],getAllTickets)
    // app.get("/cs/api/v1/tickets/:id",getTicketById)
    // app.put("/cs/api/v1/tickets/:id",updateTicketById)
    // app.delete("/cs/api/v1/tickets/:id",deleteTicketById)
}

