// utils/openai.js
// Example helper for using the OpenAI API (optional)

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // set this in your .env
});
const openai = new OpenAIApi(configuration);

/**
 * Example function to get a completion from OpenAI.
 * @param {string} prompt
 * @returns {Promise<string>} The text response from OpenAI.
 */
export async function getOpenAICompletion(prompt) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}
