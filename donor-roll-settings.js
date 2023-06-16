// Display settings
var participantId = "Enter your ID"; // Enter your participant ID, you can find it at the end of the url for your Extra Life page
var showDate = true; // Variable to control the visibility of the date element
var showMessageElement = true; // Control the visibility of messageElement
var scrollDurationMultiplier = 1000; // Default is 1 second per donation (1000); increase this for more time
var customHeaderText = "Donors"; // Default "Donors"
var customThankYou = "So long, and thanks for all the fish."; // Default "So long, and thanks for all the fish."
var columnCount = 1; //Default is 1. If you have lots of donos try 2 or 3. Would not recommend more than 3. Scroll speed will remaing the same.
var showTotal = true; // Default is false; Turns total raised at the end on and off.
var showLogo = true; // Default is true; Turns logo at the end on and off.
var scrollDelay = 5000; // Default is 5 seconds (5000). Make this shorter or longer depending on when you actually want the scrolling to start.

//Theming. Default is Blue 1. Make sure to only have one of these on.
var theme = "Blue1"; // Options: "Blue1", "Blue2", "Green", "Light", "Dark"

// Custom type sizes. A bigger number means bigger text. A smaller number, smaller text. Don't forget the px.
var customHeaderFontSize = "100px"; // Default "100px"
var customTotalSize = "80px"; // Default "50px"
var customThankYouFontSize = "50px"; // Default "50px"
var customDonoAmountFontSize = "40px"; // Default "40px"
var customDonorNameFontSize = "30px"; // Default "30px"
var customDonoMessageFontSize = "18px"; // Default "18px"
var customDonoDateFontSize = "16px"; // Default "16px"

// Debugging settings
var enableAutoScroll = true; // Control the automatic scroll behavior, default is true
var enableDonationCount = false; // Control the visibility of the donation count, default is false
var showID = false; // default is false, good if you think you are getting duplicates
var enableScrollDurationDisplay = false; // default is false, good for seeing how long your credits will take to scroll to the bottom