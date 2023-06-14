// Display settings
var participantId = "ENTER YOUR ID"; // Enter your participant ID, you can find it at the end of the url for your Extra Life page
var showDate = true; // Variable to control the visibility of the date element
var showMessageElement = true; // Control the visibility of messageElement
var scrollDurationMultiplier = 1000; // Default is 1 second per donation (1000); increase this for more time
var customHeaderText = "Donors"; // Default "Donors"
var customThankYou = "So long, and thanks for all the fish."; // Default "So long, and thanks for all the fish."
var isDarkMode = true; // Default is true. Set to false for dark text.

// Custom type sizes. A bigger number means bigger text. A smaller number, smaller text. Don't forget the px.
var customHeaderFontSize = "100px"; // Default "100px"
var customThankYouFontSize = "50px"; // Default "50px"
var customDonorNameFontSize = "25px"; // Default "25px"
var customDonoAmountFontSize = "20px"; // Default "20px"
var customDonoMessageFontSize = "18px"; // Default "18px"
var customDonoDateFontSize = "16px"; // Default "16px"

// Debugging settings
var enableAutoScroll = true; // Control the automatic scroll behavior, default is true
var enableDonationCount = false; // Control the visibility of the donation count, default is false
var showID = false; // default is false, good if you think you are getting duplicates
var enableScrollDurationDisplay = false; // default is false, good for seeing how long your credits will take to scroll to the bottom
