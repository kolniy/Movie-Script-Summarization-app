import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const openAIApiKey = process.env.OPENAPI_APIKEY;

const summarizationAndEntityExtraction = async (text) => {
  const model = new OpenAI({ temperature: 0.9, openAIApiKey: openAIApiKey });

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000 });
  const docs = await textSplitter.createDocuments([text]);

  const vectorStore = await HNSWLib.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: openAIApiKey,
      modelName: "text-embedding-ada-002",
    })
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  const question =
    "Your task is to analyze and summarize the TV script I give you with a title summary and extract the names of all actors with a title actors. Use bullet points to list them and pick a good emoji to represent each actor.";
  const result = await chain.call({ question, chat_history: [] });
  return result;
};

export default summarizationAndEntityExtraction;
