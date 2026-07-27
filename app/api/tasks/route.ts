// import {connectDB} from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// export async function GET(){
// const db = await connectDB();
// const collection = db.collection("Tasks");
// const tasks = await collection.find().toArray();
// return NextResponse.json(tasks);
// }
// export async function POST(request: Request){
// const body = await request.json();
// const db = await connectDB();
// const collection = db.collection("Tasks");
// await collection.insertOne(body);
// return NextResponse.json({
//     message: "Task Added Successfully"
// });
// }
// import {ObjectId} from "mongodb";
// export async function DELETE(request: Request){
//     const body = await request.json();
//     const db = await connectDB();
//     const collection = db.collection("Tasks");
//     await collection.deleteOne({
//         _id: new ObjectId(body.id),
//     });
//     return NextResponse.json({
//         message: "Task deleated Successfully"
//     });
// }
// export async function PUT(request: Request){
//     const body = await request.json();
//     const db = await connectDB();
//     const collection = db.collection("Tasks");
//     await collection.updateOne({
//         _id: new ObjectId(body.id),
//     },
//     {
//         $set: {
//             completed:body.completed,
//         },
//     }
// );
// return NextResponse.json({
//     message: "Your Task is Updateded Successfully 😎"
// })
// } previous code in which everone can see everone's tasks
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

function getUserId (request: Request): string | null{
    const cookieHeader = request.headers.get("cookie");
    console.log("Cookie header:", cookieHeader);
    if(!cookieHeader) return null;

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    console.log("Token match:", tokenMatch);
    if(!tokenMatch) return null;

    const token = tokenMatch[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as {
            userId: string;
        };
        console.log("Decoded:", decoded);
        return decoded.userId;
    } 
    catch(err){
        console.log("JWT verify error:", err);
        return null;
    }
}
export async function GET(request: Request){
    const userId = getUserId(request);
    if(!userId){
        return NextResponse.json({error:"Unauthorized"},{
            status:401,
        });
    }
    const db = await connectDB();
    const collection = db.collection("Tasks");
    const tasks = await collection.find({ userId}).toArray();
    return NextResponse.json(tasks);
}
export async function POST(request: Request){
    const userId = getUserId(request);
    if(!userId){
        return NextResponse.json(
            {error:"Unauthorized"},
            {status: 401},
        );
    }
    const body = await request.json();
    const db = await connectDB();
    const collection = db.collection("Tasks");
    await collection.insertOne({ ...body,userId});
    return NextResponse.json({
        message: "Task added Successfully",
    });
}
export async function DELETE (request: Request){
    const userId = getUserId(request);
    if (!userId){
        return NextResponse.json(
            { error: "Unauthorized"},
            {status:401}
        );
    }
    const body = await request.json();
    const db = await connectDB();
    const collection = db.collection ("Tasks");
    await collection.deleteOne({
        _id: new ObjectId(body.id),
        userId,
    });
    return NextResponse.json({
        message:"Task deleted Successfully",
    });
}
export async function PUT (request: Request){
    const userId = getUserId(request);
    if(!userId){
        return NextResponse.json(
            { error: "Unauthorized"},
            {status: 401},
        );
    }
    const body = await request.json();
    const db = await connectDB();
    const collection = db.collection("Tasks");
    await collection.updateOne(
        {
            _id: new ObjectId(body.id),
            userId,
        },
        {
            $set:{
                completed: body.completed
            },
        }
    );
    return NextResponse.json({
        message: "UR Task is updated Successfully 😇"
    });
}