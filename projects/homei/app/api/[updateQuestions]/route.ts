import fs from "fs";
import path from "path";

const questionsFilePath = path.join(process.cwd(), "data", "questions.json");

export async function GET() {
  try {
    const data = fs.readFileSync(questionsFilePath, "utf8");
    return new Response(data, { status: 200 });
  } catch (e) {
    return new Response("Error reading questions file", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    fs.writeFileSync(questionsFilePath, JSON.stringify(body, null, 2));
    return new Response("Questions saved successfully", { status: 200 });
  } catch (e) {
    return new Response("Error saving questions file", { status: 500 });
  }
}
