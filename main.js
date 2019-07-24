function text_trim(text)
{
	var longMessage =text;
charLimit = 159,//Maximum Allowed Message Text in one Part
    maxSplits = 15,
    placeholder='',
    indicator='',
    breakPoint='',
    messages = [],
    n='',
    m='',
    splits='';

// Take an indicator '(x/splits)' for example. The indicator must be either 5, 6, or 7
// characters wide: '(1/1)' all the way to '(1/9)', '(1/10)' all the way to '(9/15)', or
// '(10/10)' all the way to '(15/15)'. We only have to consider the first case versus
// either of the other two (because we only care about knowing if y is one digit or two and
// y is always two digits in any of the second or third cases. So, assume the indicator is 5
// characters wide. Then, if inserting the indicators yields a length less than or equal to the
// length of a 9-part message, we know that y is one digit. Otherwise, it's two.

var totalLength = longMessage.length + (9 * 5);

// Use some obscure placeholder character that no one will actually type... (This part is a
// little dangerous...
if (totalLength <= (charLimit * 9)) {
    placeholder = '\v';
}
else {
    placeholder = '\v\v';
}

for (n = 0, m = 0; n < longMessage.length / charLimit && n < maxSplits; n++) {
    m = n * charLimit;
    // set the indicator so we can now how long it is
    indicator = ' (' + (n + 1) + '/' + placeholder + ')';
    // set the breakpoint, taking indicator length into consideration
    breakPoint = m + charLimit - indicator.length;
    // insert the indicator into the correct spot
    longMessage = longMessage.substring(0, breakPoint) + indicator + longMessage.substring(breakPoint);
}

// Replace the placeholder.
longMessage = longMessage.replace(/\v+/g, n);

splits = n;

// Split the indicator-inserted message at every charLimit.
for (n = 0; n < splits; n++) {
    m = n * charLimit;
    messages.push(longMessage.substring(m, m + charLimit));
}

return messages;
}
function deliverMessageViaCarrier (text, to, from) {
    SmsCarrier.deliverMessage(text, to, from);
}
function sendSmsMessage(textmsg,to,from)
{
	if(textmsg.length>159){
		var msgarr=text_trim(textmsg);
		// spit out each message
		$.each(msgarr, function(n, text) {
			if(deliverMessageViaCarrier(text, to, from)){
				console.log("Message Sent!");
			}else{
				console.log("Not Sent!");
			}
		});
	}else{
		deliverMessageViaCarrier(textmsg, to, from);
	}
}