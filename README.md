# donor-roll
A rolling credits style display for Extra Life donations through Donor Drive

Huge credit to KReden for the bones for this. His original gist can be found here: https://gist.github.com/KReden/56c15c227a8c9445c9b6a44d120965b7

----------------

To get you get your donations flowing put in your "participantID" in on line 50 in donor-roll.html:

fetchDonationsForParticipant(participantId = "REPLACE WITH YOUR ID HERE, NO QUOTES")

example: fetchDonationsForParticipant(participantId = 12356)

----------------

You can find your participantID in the url of your Extra Life page:

extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=123456  <----

----------------

----------------

If you don't wish to show the messages then delete or comment out the whole div with the donor.message in donor-roll.html.

----------------

All the styles are fairly simple.
If you want to change the color of the all the type do so here in donor-roll.css:

html, body {
    height: 100%;
    color: white; <----
}

The text sizes become static at anything below 750px width and grow with the view port.
If you want to change those look for the classes 'donor-name', 'donor-message', 'donation-amoun't, and 'donation-date'.

The speed at which is scrolls is a simple time setting. Not the best but it works.
You should tweak this based on how many donations you have/expect to have.
Basically if you have 10 donations then 120s will seem like forever. If you have 500 donations 120s is going to make them fly by.

Find it here in donor-roll.css:

.wrapper {
    animation: 120s credits linear infinite; <----
}

You will also probably need to edit the 'credits' 100% keyframe depending on how many donos you have so that it doesn't clip.
Example: 35 donos needs around -700% to look smooth an not clip.

Find that here in donor-roll.css:

@keyframes credits {
    100% {
        top: -700%; <----
    }
}
