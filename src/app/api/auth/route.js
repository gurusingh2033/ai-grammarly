import { NextResponse } from "next/server";

const users = [
    { email: "admin@gmail.com", password: "admin@123" },
];

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Login successful", token: "test-jwt-token" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
