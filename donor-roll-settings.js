// ID settings (USE ONLY ONE, not both!)
var participantId = "Enter your ID"; // Enter your participant ID, you can find it at the end of the url for your Extra Life page
var teamId = "Enter your Team ID"; // Enter your participant ID, you can find it at the end of the url for your Extra Life page

// Display settings
var showDate = true; // Variable to control the visibility of the date element
var showMessageElement = true; // Control the visibility of donation message
var scrollDurationMultiplier = 1000; // Default is 1 second per donation (1000); increase this for more time
var scrollDelay = 5000; // Default is 5 seconds (5000). Make this shorter or longer depending on when you actually want the scrolling to start.
var customHeaderText = "Donors"; // Default "Donors"
var customThankYou = "So long, and thanks for all the fish."; // Default "So long, and thanks for all the fish."
var columnCount = 1; //Default is 1. If you have lots of donos try 2 or 3. 4 might be good for a team page. 5+ breaks it; that's too many anyway. Scroll speed will remain the same.
var showTotal = false; // Default is false; Turns total raised at the end on and off.
var showLogo = true; // Default is true; Turns logo at the end on and off.

//Theming. Default is Blue 1. Make sure to only have one of these on.
var theme = "Blue1"; // Options: "Blue1", "Blue2", "Green", "Light", "Dark"
var highlightLargeDonoText = false; // Default false. This makes $100+ donos bigger, $500+ even bigger, $1000+ donos bigger still.
var highlightLargeDonoColor = false; // Default false. This adds a color effect to 500+ donos and a fancy color effect to 1000+ donos.

// Custom type sizes. A bigger number means bigger text. A smaller number, smaller text. Don't forget the px.
var customHeaderFontSize = "100px"; // Default "100px"
var customTotalSize = "80px"; // Default "50px"
var customThankYouFontSize = "50px"; // Default "50px"
var customDonoAmountFontSize = "40px"; // Default "40px"
var customDonorNameFontSize = "30px"; // Default "30px"
var customDonoMessageFontSize = "18px"; // Default "18px"
var customDonoDateFontSize = "16px"; // Default "16px"

// Team only settings
var showRecipientPerDonation = false; // Control the visibility of who the donation went to on each donation (team only setting)
var groupDonationsByRecipient = true; // Group donations by who they went to (team only setting)
var customRecipientHeaderText = "For"; // Default "For"
var customRecipHeaderFontSize = "50px"; // Default "50px"
var customDonoRecipFontSize = "20px"; // Default "16px" (team only setting)

// Debugging settings
var enableAutoScroll = true; // Control the automatic scroll behavior, default is true
var enableDonationCount = false; // Control the visibility of the donation count, default is false
var showID = false; // Default is false, good if you think you are getting duplicates
var enableScrollDurationDisplay = false; // default is false, good for seeing how long your credits will take to scroll to the bottom