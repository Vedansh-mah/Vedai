const apiKey = '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'; // Replace this with your OpenAI API key

async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  
  if (userInput.trim() !== "") {
    const chatbox = document.getElementById("chatbox");
    
    // Add user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerText = userInput;
    chatbox.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    // Add loading message for bot
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message");
    botMessage.innerText = "Thinking...";
    chatbox.appendChild(botMessage);

    // Scroll chatbox to the bottom
    chatbox.scrollTop = chatbox.scrollHeight;

    // Call OpenAI API to get a response
    const response = await getAIResponse(userInput);
    
    // Update bot's message with the response from OpenAI
    botMessage.innerText = response;

    // Scroll chatbox to the bottom
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

async function getAIResponse(input) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const requestData = {
    model: "gpt-3.5-turbo",  // or "gpt-4" if you have access to it
    messages: [{ role: "user", content: input }],
    max_tokens: 100,  // You can adjust this value
    temperature: 0.7  // Controls the creativity of the response
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const data = await response.json();
      const aiMessage = data.choices[0].message.content;
      return aiMessage;
    } else {
      return "Error: Unable to get a response from the AI.";
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
