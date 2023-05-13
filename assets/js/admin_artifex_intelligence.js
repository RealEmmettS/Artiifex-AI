function submitMessage() {
  var textarea = document.getElementById('artifex_input');
  var message = textarea.value;
  outbound_message = message;
}
var admin_outbound_message = "";
var admin_inbound_message = "";

//create a 'messages' array to store the messages sent and received from Artifex
var admin_messages = [];

var admin_submit_button = document.getElementById('admin_submit');

admin_submit_button.addEventListener('click', function() {

    //disable the submit button
    admin_submit_button.disabled = true;

    admin_outbound_message = document.getElementById('admin_artifex_input').value;
    admin_messages.push({role: "user", content: admin_outbound_message});
    //console.log(outbound_message);
    console.log("Sending to Artifex...");
    
    document.getElementById('admin_artifex_input').value = "sending...";

    admin_getArtifexResponse(admin_outbound_message);
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

async function admin_getArtifexResponse(outbound) {
    console.log("Getting response from Artifex...");

    //url-encode the outbound message
    var admin_outbound_urlencoded = encodeURIComponent(outbound);

    //create the url for the request
    let admin_artifex_url = "http://artiifexapi.replit.app/text/" + admin_outbound_urlencoded;

    /* SAMPLE API RESPONSE
    {"role": "assistant", "content": "Hello! My name is Artifex. How can I assist you today?"}
    */

    //make the request
    let admin_response = await fetch(admin_artifex_url);

    //get the response
    admin_inbound_message = await admin_response.text();


   //set inbound_message to the content of the response (use the example above as reference)
   inbound_message = admin_inbound_message;

    document.getElementById('admin_artifex_input').value = admin_inbound_message;
    admin_submit_button.disabled = false; 
};


// When the user clicks the textarea, if the value is not empty, clear it.
var admin_input_CLEAR = document.getElementById('admin_input_CLEAR');
admin_input_CLEAR.addEventListener('click', function() {
    if (admin_artifex_input.value != "") {
        admin_artifex_input.value = "";
    }
});


//write a function to make a requesto this URL (http://artifex-ai.emmettshaughnes.repl.co/speech/ + outbound_urlencoded), and then play the returned audio (mp3) file
async function getArtifexSpeech(outbound) {
    console.log("Getting audio from Elven...");

    //URL-encode the outbound message
    var outbound_encoded = encodeURIComponent(outbound);
    console.log(outbound_encoded);

    //create the url for the request
    let artifex_url = "http://artiifexapi.replit.app/speech/" + outbound_encoded;

    if (artifex_url.length < 1000) {
        //make the request
        let response = await fetch(artifex_url);

        //get the response (it's an mp3 file)
        inbound_message = await response.blob();

        //the inbound message is an mp3 file. Play it.
        var audio = new Audio(URL.createObjectURL(inbound_message));
        audio.play();
    } else {
        alert("The message is too long to be converted to speech.");
    };
};

//When the user clicks the speak button (id = admin_speak)), get the value of the textarea (id = admin_artifex_input) and pass it to the getArtifexSpeech function
var admin_speak_button = document.getElementById('admin_speak');
admin_speak_button.addEventListener('click', function() {
    admin_outbound_message = document.getElementById('admin_artifex_input').value;
    getArtifexSpeech(admin_outbound_message);
});