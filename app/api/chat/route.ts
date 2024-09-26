import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { CoreMessage } from "ai";

export async function POST(req: Request) {
  const { messages, chatContext } = await req.json();

  const systemMessage: CoreMessage = {
    role: "system",
    content: "Some files are attached by extracting text from the files and sending the text to the model with a system message."
  };

  // Check if the context has already been sent
  const previousContextExists = messages.some(
    (msg: CoreMessage) =>
      msg.role === "system" && msg.content.includes("The following text is extracted from uploaded files")
  );

  // Only include contextMessage if it's not already sent
  const contextMessage: CoreMessage | null =
    chatContext && !previousContextExists
      ? { role: "system", content: `The following text is extracted from uploaded files:\n\n${chatContext}` }
      : null;

  const allMessages: CoreMessage[] = [
    systemMessage,
    ...(contextMessage ? [contextMessage] : []),
    ...convertToCoreMessages(messages)
  ];

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: allMessages,
  });

  return result.toDataStreamResponse();
}
