import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model"; 
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" },
            }, async authorize(credentials:any ): Promise<any>{
                await dbConnect()
                try {
                    const user = await(UserModel.findOne({
                        $or:[
                            {email: credentials.identifier},
                            {username : credentials.identifier}
                        ]
                    }))
                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    if(!user.isVerified){
                        throw new Error('Please verify your account first')
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                    if(isPasswordCorrect){
                        return user; 
                    }else{
                        throw new Error('Incorrect password')
                    }
                     
                    
                } catch (err:any) {
                    throw new Error(err) 
                    
                }
            }

            }),GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
              }),
              GitHubProvider({
                clientId: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
              })
            ],
    callbacks:{
            async jwt({ token, user }) {
            if (user) {
              token._id = user._id;
              token.isVerified = user.isVerified;
              token.isAcceptingMessage = user.isAcceptingMessage;
              token.username = user.username;
            }
            return token;
          },
          async session({ session, token }) {
            session.user._id = token._id;
            session.user.username = token.username;
            session.user.isAcceptingMessage = token.isAcceptingMessage;
            session.user.isVerified = token.isVerified;  
            return session;
          }},
        
    
    pages:{
        signIn:'/auth/signin',
    },
    session: {
        strategy: 'jwt', 
      },
        secret: process.env.NEXTAUTH_SECRET

 
}