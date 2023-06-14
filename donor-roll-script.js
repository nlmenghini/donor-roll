$(document).ready(function() {
    var endpoint = "https://extralife.donordrive.com/api/participants/" + participantId + "/donations";
    var pageSize = 100; // Number of donations to retrieve per page
    var totalDonationCount = 0; // Variable to hold the total donation count
    var donationIds = []; // Array to store donation IDs and check for duplicates

    if (isDarkMode) {
        $("body").addClass("dark-mode");
    }
    
    // Function to retrieve the donations with pagination
    function retrieveDonations(page) {
        var offset = ((page - 1) * pageSize);
        if (offset === 0) {
            offset = 1;
        }
        var url = endpoint + "?offset=" + offset + "&limit=" + pageSize;
        
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(response) {
                var donations = response;
                
                // Sort the donations by createdDateUTC in descending order (newest first)
                donations.sort(function(a, b) {
                    return new Date(b.createdDateUTC) - new Date(a.createdDateUTC);
                });
                
                // Process the donations data as needed
                // ...
                
                // Example: Display the donation information on the webpage
                var donationList = $("#donationList");
                donations.forEach(function(donation) {
                    // Check if the donation ID already exists in the array
                    if (!donationIds.includes(donation.donationID)) {
                        // Add the donation ID to the array
                        donationIds.push(donation.donationID);

                        var createdDate = new Date(donation.createdDateUTC);
                        var options = { year: 'numeric', month: 'short', day: '2-digit' };
                        var formattedDate = createdDate.toLocaleDateString('en-US', options);
                        
                        var donationItem = $("<li></li>");
                        
                        // Display the displayName in bold and right-align the amount
                        
                        var displayName = donation.displayName || "Mysterious Donor";
                        var displayNameAmount = $("<div class='donor-details'></div>")
                            .append($("<span class='donor-name'></span>").text(displayName).css("font-size", customDonorNameFontSize))
                            .append($("<span class='dono-amount'></span>").text("$" + donation.amount).css("font-size", customDonoAmountFontSize));
                        var messageElement = null;
                        if (showMessageElement) {
                            messageElement = $("<div class='dono-message'></div>")
                                .text(donation.message).css("font-size", customDonoMessageFontSize);
                        }
                        if (showDate) {
                            var dateElement = $("<div class='dono-date'></div>")
                                .text(formattedDate).css("font-size", customDonoDateFontSize);
                        }

                        var donationID = donation.donationID;

                        donationItem.append(displayNameAmount);
                        donationItem.append(messageElement);
                        donationItem.append(dateElement);
                        if (showID) {
                             donationItem.append(donationID);
                        }

                        donationList.append(donationItem);
                    }
                });

                // Update the total count of donation items
                totalDonationCount += donations.length;
                if (enableDonationCount) {
                    $("#donationCount").text("Total Donations: " + totalDonationCount);
                }
                
                // Check if there are more donations to retrieve
                if (donations.length === pageSize) {
                    retrieveDonations(page + 1); // Fetch the next page
                } else {
                    // Calculate the scrolling duration based on the number of donation items. The additional 10 seconds is to account for the header and thank you message
                    var scrollingDuration = (scrollDurationMultiplier * totalDonationCount) + 10000;
                    var scrollingDurationMinutes = Math.floor(scrollingDuration / 60000); // Convert duration to minutes
                    var scrollingDurationSeconds = Math.floor((scrollingDuration % 60000) / 1000); // Convert remaining duration to seconds

                    // Automatically scroll to the bottom of the container over the calculated duration
                    if (enableAutoScroll) {
                        var container = $(".container");
                        var scrollHeight = container.prop("scrollHeight");
                        container.animate({ scrollTop: scrollHeight }, scrollingDuration, "linear");
                    }

                    // Display the scrolling duration in minutes and seconds
                    var durationText = "";
                    if (scrollingDurationMinutes > 0) {
                        durationText += scrollingDurationMinutes + " mins ";
                    }
                    durationText += scrollingDurationSeconds + " seconds";
                    if (enableScrollDurationDisplay) {
                        $("#scrollingDuration").text("Scrolling Duration: ~" + durationText);
                    }

                }
            },
            error: function() {
                console.log("Error retrieving donations.");
            }
        });
    }
    
    // Start retrieving the donations from the first page (skipping the first batch)
    retrieveDonations(1);
});
