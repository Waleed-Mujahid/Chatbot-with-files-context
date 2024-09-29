# Chat with Files

Chat with Files is an advanced chatbot application that allows users to interact with an AI while providing context through various file types. This project leverages the Vercel AI SDK for seamless chat functionality.

## Main Features

1. **Vercel AI SDK Integration**: Utilizes the Vercel AI SDK's `useChat` hook to create a powerful and efficient chatbot interface.

2. **Dynamic Context Management**: Users can manually set context by uploading various file types, adding them to the conversation, and deleting them as needed.

3. **State Persistence**: Implements Zustand for state management, allowing files to persist in the browser across sessions.

4. **Wide File Type Support**: Handles multiple file formats including:
   - CSV
   - Plain text
   - Microsoft Word documents (DOC/DOCX)
   - PDFs (text extraction)
   - Images

5. **Efficient Token Utilization**: Minimizes token usage by leveraging blob URLs for file references.

6. **Image Processing**: Converts image files to base64 for efficient storage and retrieval.

## Setup and Installation

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables:
   - Rename `.env.example` to `.env.local`   
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Run the development server: `pnpm dev`

## Usage

1. Start a chat conversation or upload files to provide context.
2. Switch between chat and documents view using the header buttons.
3. Preview, add, or delete documents as needed.
4. The AI will use the context from the uploaded files in its responses.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
