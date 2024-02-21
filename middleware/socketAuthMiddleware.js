import { sign, verify } from "jsonwebtoken";

const socketAuthMiddleware = (socket)=>{
    const [scheme, token]= socket.handshake.authorization.split(" ");

}