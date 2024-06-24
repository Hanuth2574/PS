import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is stored securely
});

const openai = new OpenAIApi(configuration);

async function main() {
  try {
    const response = await openai.createImage({
      prompt: "A cute baby sea otter",
      n: 1,
      size: "512x512",
    });

    console.log(response.data.data[0].url);
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

main();
