import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request:Request) {
    await dbConnect()

    try {
       const {username,email,password} = await request.json();
        
    } catch (error) {
        console.error('Error registring user', error)
        return Response.json({ 
            success:false,
            messsage:"Error registering user"
    },
    {status:500})
        
    }
    
}