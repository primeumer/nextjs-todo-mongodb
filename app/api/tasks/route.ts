import {connectDB} from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(){
const db = await connectDB();
const collection = db.collection("Tasks");
const tasks = await collection.find().toArray();
return NextResponse.json(tasks);
}
export async function POST(request: Request){
const body = await request.json();
const db = await connectDB();
const collection = db.collection("Tasks");
await collection.insertOne(body);
return NextResponse.json({
    message: "Task Added Successfully"
});
}
import {ObjectId} from "mongodb";
export async function DELETE(request: Request){
    const body = await request.json();
    const db = await connectDB();
    const collection = db.collection("Tasks");
    await collection.deleteOne({
        _id: new ObjectId(body.id),
    });
    return NextResponse.json({
        message: "Task deleated Successfully"
    });
}
export async function PUT(request: Request){
    const body = await request.json();
    const db = await connectDB();
    const collection = db.collection("Tasks");
    await collection.updateOne({
        _id: new ObjectId(body.id),
    },
    {
        $set: {
            completed:body.completed,
        },
    }
);
return NextResponse.json({
    message: "Your Task is Updateded Successfully 😎"
})
}
