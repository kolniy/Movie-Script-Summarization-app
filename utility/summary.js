import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const openAIApiKey = process.env.OPENAPI_APIKEY;

const summary = async (text) => {
  try {
    const model = new OpenAI({ temperature: 0.9, openAIApiKey: openAIApiKey });
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text]);

    // This convenience function creates a document chain prompted to summarize a set of documents.
    const chain = loadSummarizationChain(model, { type: "map_reduce" });
    const res = await chain.call({
      input_documents: docs,
    });
    console.log({ res });
    return res;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export default summary;
