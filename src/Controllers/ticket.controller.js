const ticketModel = require("../models/ticket.model");
const UserModel = require("../models/user.model");
const { ticketStatus, userType, userStatus } = require("../utils/constants");

const createTicket = async(req,res)=>{

    const {title,description,ticketPriority} = req.body;
    
    const allocateEngineer = await UserModel.findOne({
        userType:userType.ENGINEER,
        userStatus:userStatus.APPROVED
    })
 
console.log(allocateEngineer);
    const ticket = {
        title,
        description,
        ticketPriority,
         ticketStatus:ticketStatus.OPEN,
         requestor:req.id,
         assignee: allocateEngineer
         }

         const newTicket = new ticketModel(ticket)
      try{
          const createdTicket= await newTicket.save();
           res.status(201).send(createdTicket);

      }
      catch(err){
        res.status(400).send({message:err.message|| "Internal Sever Error"})
      }
    }
    

    const getAllTickets= async(req,res)=>{

        var condition = {};

        const {maxPriority,minPriority,limitValue,page} = req.query;
        console.log(`maxPriority=${maxPriority}`);
        console.log(`minPriority=${minPriority}`);
        
        if(maxPriority && minPriority){
            console.log("Entered Inisde IF")
            condition = {$and:[{ticketPriority:{$gte:minPriority}},{ticketPriority:{$lte:maxPriority}}]}
        }
        else if(maxPriority){
            console.log("Entered Inisde ELSE")
            condition.ticketPriority = {$lte:maxPriority}
            console.log(condition);
        }

        if(req.userType===userType.CUSTOMER){
            condition.requestor = req.id;
            
        }
        else if(req.userType === userType.ENGINEER){
            condition.assignee= req.id
        }
        console.log(condition);

        const skipValue = limitValue * page ;
        try{

            const tickets = await ticketModel.find(condition).populate('assignee').populate("requestor").skip(skipValue).limit(limitValue).sort({"ticketPriority":-1}).cache(30);
            
            res.status(200).send(tickets);
        }
        catch(err){
            res.status(404).send({message:err.message|| "Internal Sever Error"});
        }

         }
    module.exports={
        createTicket,getAllTickets
    }
 
