import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
  
//zod ko connect krna hai isme
export async function POST(request: Request) {
    await dbConnect()
    try {
        const {username, code} = await request.json();
        const user = await UserModel.findOne({
            username
        })
        if(!user){
            return Response.json(
                {
                success:false,
                message:"Error verifying user"
    
                    },{
                        status: 500 
                    }
                
            )
        }
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date();
        if(isCodeNotExpired && isCodeValid){
            user.isverified = true;
            await user.save();
            return Response.json(
                {
                success:true,
                message:"Successfully verified User"
    
                    },{
                        status: 200 
                    }
                
            )
        }
    } catch (error) {
        console.error("Error verifying  user",error)
        return Response.json(
            {
            success:false,
            message:"Error verifying user"

                },{
                    status: 500 
                }
            
        )
        
    }
    
}