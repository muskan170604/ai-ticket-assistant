// import { inngest } from "../client"
// import Ticket from "../../models/ticket.model.js"
// import { NonRetriableError } from "inngest"
// import {sendMail} from "../../utils/mailer.js"
// import analyzeTicket from "../../utils/ai.js"


// export const onTicketCreated=inngest.createFunction(
//     {id: "on-ticket-created",retries:2},
//     {event:"ticket/created"},
//     async({event,step})=>{
//         try{
//                 const {ticketId}=event.data

//                 //fetch ticket from MongoDB
//                 const ticket=await step.run("fetch-ticket",async
//                 ()=>{
//                 const ticketObject=await Ticket.findById
//                 (ticketId);
//                 if(!ticket){
//                     throw new NonRetriableError("Ticket not found");
//                 }
//                 return ticketObject
//                 })
                
                
//                 await step.run("update-ticket-status",async()=>{
//                 await Ticket.findByIdAndUpdate(ticket._id,{
//                     status:"TODO"
//                 })

//                 const aiResponse=await analyzeTicket(ticket)

//                 const relatedSkills=await step.run("ai-processing",
//                     async ()=>{
//                     let skills=[]
//                     if(aiResponse){
//                         await Ticket.findByIdAndUpdate(ticket._id,{
//                             priority: !["low","medium","high"].
//                             includes(aiResponse.priority) ? "medium"
//                             : aiResponse.priority,
//                             helpfulNotes: aiResponse.helpfulNotes,
//                             status:"IN_PROGRESS",
//                             relatedSkills:aiResponse.relatedSkills
//                         })
//                         skills=aiResponse.relatedSkills
//                     }
//                     return skills
//                 })
//           })


//         }catch(error){

//         }
//     }
// );