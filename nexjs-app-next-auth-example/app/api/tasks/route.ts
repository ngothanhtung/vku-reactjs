import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(request: Request, res: Response) {
  const session = await getServerSession(authOptions);
  console.log('<<=== 🚀 session ===>>',session);

  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }


  //fetch api với Authorization header
   try {
     const response = await fetch('https://server.aptech.io/workspaces/tasks', {
        headers: {
        'Authorization': `Bearer ${session.user.accessToken}`,
        },
    });
    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({ status: "error", message: "Failed to fetch profile" }),
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json({
        status: "success", 
        message: "Profile fetched successfully", 
        data
    });

   } catch (error) {
     return new NextResponse(
      JSON.stringify({ status: "error", message: "An error occurred" }),
      { status: 500 }
    );
   }
   
    
}
