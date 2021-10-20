# donor-roll
A rolling credits style display for Extra Life donations through Donor Drive

Huge credit to KReden for the bones for this. His original gist can be found here: https://gist.github.com/KReden/56c15c227a8c9445c9b6a44d120965b7

----------------

To get you get your donations flowing put in your "participantID" in on line 49 in donor-roll.html:

fetchDonationsForParticipant(participantId = "REPLACE WITH YOUR ID HERE, NO QUOTES")

example: fetchDonationsForParticipant(participantId = 12356)

----------------

You can find your participantID in the url of your Extra Life page:

extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=123456  <----

----------------

All the styles are fairly simple.
If you want to change the color of the all the type do so here in donor-roll.css:

html, body {
    height: 100%;
    color: white; <----
}

The text sizes become static at anything below 750px width and grow with the view port.
If you want to change those look for the 
