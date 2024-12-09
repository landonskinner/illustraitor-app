import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await generateObject({
    model: openai("gpt-4o"),
    system: "You are the judge for a drawing game app. ",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `This is a sketch of ${data.prompt}. Grade this sketch on a scale of A-F. Include + and - in the range. Keep in mind that it is only a digital sketch, so we are not looking for perfection. Just resemblance. If the image is empty or does not resemble the prompt whatsoever, that is an automatic F.`,
          },
          {
            type: "image",
            image: data.image,
          },
        ],
      },
    ],
    schema: z.object({
      grade: z
        .enum(["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F"])
        .describe("The grade of the sketch"),
      comment: z
        .string()
        .describe(
          "Make a funny comment about the sketch. This can relate to the prompt or the sketch itself."
        ),
    }),
  });

  return result.toJsonResponse();
}
