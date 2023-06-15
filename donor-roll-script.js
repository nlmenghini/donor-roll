$(document).ready(function() {
    var endpoint = "https://extralife.donordrive.com/api/participants/" + participantId + "/donations";
    var pageSize = 100; // Number of donations to retrieve per page
    var donationIds = []; // Array to store donation IDs and check for duplicates

    if (theme === "DarkMode") {
        var cssFile = "dark-mode.css"; // Replace with the filename of your dark mode CSS file
        var linkElement = $("<link rel='stylesheet' type='text/css' href='styles/" + cssFile + "'>");
        $("head").append(linkElement);
    } else if (theme === "LightMode") {
        var cssFile = "light-mode.css"; // Replace with the filename of your light mode CSS file
        var linkElement = $("<link rel='stylesheet' type='text/css' href='styles/" + cssFile + "'>");
        $("head").append(linkElement);
    } else if (theme === "Blue1") {
        var cssFile = "blue-1.css"; // Replace with the filename of your Blue1 CSS file
        var linkElement = $("<link rel='stylesheet' type='text/css' href='styles/" + cssFile + "'>");
        $("head").append(linkElement);
    } else if (theme === "Blue2") {
        var cssFile = "blue-2.css"; // Replace with the filename of your Blue2 CSS file
        var linkElement = $("<link rel='stylesheet' type='text/css' href='styles/" + cssFile + "'>");
        $("head").append(linkElement);
    } else if (theme === "Green") {
        var cssFile = "green.css"; // Replace with the filename of your Green CSS file
        var linkElement = $("<link rel='stylesheet' type='text/css' href='styles/" + cssFile + "'>");
        $("head").append(linkElement);
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
                            .append($("<span class='dono-amount'></span>").append($("<span class='dollar-symbol'></span>").text("$")).append(donation.amount).css("font-size", customDonoAmountFontSize))
                            .append($("<span class='donor-name'></span>").text(displayName).css("font-size", customDonorNameFontSize));
                        var messageElement = null;
                        if (showMessageElement && donation.message) {
                            messageElement = $("<div class='dono-message'></div>").text(donation.message).css("font-size", customDonoMessageFontSize);
                        }
                        if (showDate) {
                            var dateElement = $("<div class='dono-date'></div>").text(formattedDate).css("font-size", customDonoDateFontSize);
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

                if (enableDonationCount) {
                    $("#donationCount").text("Total Donations: " + donationIds.length);
                }
                
                // Check if there are more donations to retrieve
                if (donations.length === pageSize) {
                    retrieveDonations(page + 1); // Fetch the next page
                } else {
                    // Calculate the scrolling duration based on the number of donation items. The additional 10 seconds is to account for the header and thank you message
                    var scrollingDuration = ((scrollDurationMultiplier * donationIds.length) + 10000) / columnCount;
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
