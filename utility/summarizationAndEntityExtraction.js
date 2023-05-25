import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const openAIApiKey = process.env.OPENAPI_APIKEY;

const summarizationAndEntityExtraction = async (text) => {
  const model = new OpenAI({ temperature: 0.9, openAIApiKey: openAIApiKey });
  const template =
    " Your task is to summarize the TV script I give you and extract name of all Actors and use bulletpoint to list them. pick good emoji to represent each actor. from this file {file}?";
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["file"],
  });

  const chain = new LLMChain({ llm: model, prompt: prompt });
  const res = await chain.call({ file: text });
  console.log(res);
};

export default summarizationAndEntityExtraction;
