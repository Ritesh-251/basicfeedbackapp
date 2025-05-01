import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmails";
import { ApiResponse } from "@/types/Apiresponse";

export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse>{
    try{
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification',
            react: VerificationEmail({username,otp:verifyCode}) 
          });
          if (error) {
            return {
              success: false,
              message: "Email sending failed: " + error.message
            }
          }
          
        
          
        return {
            success:true,message:"verification message send successfuly "
        }

    }catch(error){
        console.log("Error sending verification email",error)
        return {
                success:false,message:"failed to send verification message"}
        }
    }
    
