# donor-roll
A rolling credits style display for Extra Life donations through Donor Drive

----------------

To get you get your donations flowing put in your "participantID" in on line 2 in donor-roll-settings.js:

----------------

You can find your participantID in the url of your Extra Life page:

extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=123456  <----

----------------

Check the donor-roll-settings.js file for simple customizations options.

showDate -> tunrs on and off the donation date

showMessageElement -> turn on and off the message for a donation

scrollDurationMultiplier -> this controls the speed of the scroll; default is 1 second per donation received

customHeaderText -> change the header text

customThankYou -> change the message at the end

columnCount -> let's you set how many columns you want the donos to fall into. More columns for more donos means a shorter scroll.

----------------

Themes for picking something to fit with your setup. Based around EL branding.

Custom fonts sizes for all the various type displays. This could change wildly based on your setup and what you want. Just play around with it.

----------------

Debuggings settings
enableAutoScroll -> turns scroll on an off so you can manually scroll and look through things

enableDonationCount - > lets you see how many donations it's pulling in case you think it's wrong

showID -> show the donationID per donation; good for checking for duplicates

enableScrollDurationDisplay -> displays how long the scroll will take in mins, seconds.
