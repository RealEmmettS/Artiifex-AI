// When the submit button (id 'submit') is clicked, get the value of textarea (id 'artifex_input') and store it in a global variable called 'outbound_message'
var outbound_message = "";
var inbound_message = "";

//create a 'messages' array to store the messages sent and received from Artifex
var messages = [];

// Set the personalty for Artifex
let personality_subroutine = "";
//messages.push({role: "system", content: personality_subroutine});

var submit_button = document.getElementById('submit');

submit_button.addEventListener('click', function() {

    //disable the submit button
    submit_button.disabled = true;

    outbound_message = document.getElementById('artifex_input').value;
    messages.push({role: "user", content: outbound_message});
    //console.log(outbound_message);
    console.log("Sending to Artifex...");
    
    document.getElementById('artifex_input').value = "sending...";

    getArtifexResponse(outbound_message);
});

/* BEGIN EXAMPLE~~

    console.log("Getting response from Artifex...");

    const { Configuration, OpenAIApi } = require("openai");

    // API Key: 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
    const configuration = new Configuration({
        //apiKey: process.env.OPENAI_API_KEY,
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: outbound}],
    });

    inbound_message = completion.data.choices[0].message;
    console.log("Received from Artifex.");

    // Update the 'messages' array with the message received from Artifex.
    messages.push({role: "bot", content: inbound_message});

    // This line is important. It makes sure that the code waits for the
    // response from Artifex before continuing.
    return completion.data.choices[0].message

~~END EXAMPLE */

async function getArtifexResponse(outbound) {
    console.log("Getting response from Artifex...");

    //url-encode the outbound message
    var outbound_urlencoded = encodeURIComponent(outbound);

    //create the url for the request
    let artifex_url = "https://artifex-ai.emmettshaughnes.repl.co/artifex/" + outbound_urlencoded;

    //make the request
    let response = await fetch(artifex_url);

    //get the response
    inbound_message = await response.text();

    /* EXAMPLE RESPONSE
    {"role": "assistant", "content": "Hello! My name is Artifex. How can I assist you today?"}
    */

   //set inbound_message to the content of the response (use the example above as reference)
   inbound_message = JSON.parse(inbound_message).content;


    document.getElementById('artifex_input').value = inbound_message;
    submit_button.disabled = false; 
};


// When the user clicks the textarea, if the value is not empty, clear it.
var input_CLEAR = document.getElementById('input_CLEAR');
input_CLEAR.addEventListener('click', function() {
    if (artifex_input.value != "") {
        artifex_input.value = "";
    }
});