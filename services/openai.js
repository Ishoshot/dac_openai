const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const getPromptBreakdown = async (request) => {
    const sample = "Instruction: Extract the Intent from the prompt below, and identify if any parameter is empty or not present.\n\nPrompt: Can you tell me the current balance in account number 000253000?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"000253000\"}##\nPrompt: What's the current balance for account 89800872829?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"89800872829\"}##\nPrompt: What's the current balance for account?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"\"}##\nPrompt: I would like to know the balance in account 1239087536, can you provide me with that information?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"1239087536\"}##\nPrompt: Could you give me an update on the balance of account 000253000?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"000253000\"}\nPrompt: I'm wondering if you could inform me of the balance in account.\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"\"}\nPrompt: I'm curious about the balance in account ?#???. Can you provide me with that information?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"\"}\nPrompt: What is the balance for account 3119025601 presently?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"3119025601\"}\nPrompt: Please provide me with the current balance of account number 000253000.\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"000253000\"}\nPrompt: Account 000253000 balance?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"000253000\"}\nPrompt: Balance inquiry for 565789772 account?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"565789772\"}\nPrompt: How much in 9870908771 account?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"9870908771\"}\nPrompt: Account, how much?\nResponse: {\"Intent\": \"acct_bal\", \"AccountNumber\": \"\"}\nPrompt: ";
    const prompt = `${sample}${request}\n`;

    const response = await openai.createCompletion({
        'model': 'text-davinci-003',
        'top_p': 1,
        'max_tokens': 256,
        'frequency_penalty': 0,
        'presence_penalty': 0,
        'temperature': 0,
        'stop': ['##'],
        'prompt': prompt,
    });

    const content = response.data.choices[0].text;

    //remove 'Response: ' from the content
    const data = content.replace('Response: ', '');

    return {
        'code': '00',
        'data': data,
    };
}


module.exports = {
    getPromptBreakdown,
};