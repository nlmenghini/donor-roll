$(document).ready(function() {
  var participantEndpoint = `https://extralife.donordrive.com/api/participants/${participantId}/donations`;
  var teamEndpoint = `https://extralife.donordrive.com/api/teams/${teamId}/donations`;
  var totalParticipantEndpoint = `https://extralife.donordrive.com/api/participants/${participantId}`;
  var totalTeamEndpoint = `https://extralife.donordrive.com/api/teams/${teamId}`;
  var pageSize = 100;
  var donationIds = [];

  var themeMap = {
    Dark: "dark.css",
    Light: "light.css",
    Blue1: "blue-1.css",
    Blue2: "blue-2.css",
    Green: "green.css",
    Year2023: "2023-theme.css"
  };

  function applyTheme(theme) {
    if (themeMap.hasOwnProperty(theme)) {
      var cssFile = themeMap[theme];
      var linkElement = $(`<link rel='stylesheet' type='text/css' href='styles/${cssFile}'>`);
      $("head").append(linkElement);
    }
  }

  applyTheme(theme);

  var donationsByRecipient = [];

  function retrieveDonations(page) {
    var offset = (page - 1) * pageSize || 1;

    var url;
    if (/^\d{6}$/.test(participantId) && /^\d{5}$/.test(teamId))  {
      document.getElementById('error-message').innerText = "Valid Id found for both Participant and Team. \n That's nice, but you have to pick one.";
    } else if (/^\d{6}$/.test(participantId)) {
      url = `${participantEndpoint}?offset=${offset}&limit=${pageSize}`;
      document.getElementById('error-message').style.display = "none";
    } else if (/^\d{5}$/.test(teamId)) {
      url = `${teamEndpoint}?offset=${offset}&limit=${pageSize}`;
      document.getElementById('error-message').style.display = "none";
    } else {
      document.getElementById('error-message').innerText = "No ID present for participant or team. \n\n Find the 'donor-roll-settings.js' file and enter one at the top.";
    }

    var columnWidth;
    if (columnCount === 1) {
      columnWidth = "100%";
    } else if (columnCount === 2) {
      columnWidth = "50%";
    } else if (columnCount === 3) {
      columnWidth = "33.333%";
    } else if (columnCount === 4) {
      columnWidth = "25%";
    } else {
      var errorMessage = document.getElementById('error-message');
      errorMessage.innerText = "That's too many columns. I can't handle it. This will look terrible.";
      errorMessage.style.setProperty('display', 'block');
    }

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(response) {
        var donations = response;
        donations.sort((a, b) => new Date(b.createdDateUTC) - new Date(a.createdDateUTC));

        var donationList = $("#donationList");

        donations.forEach(function(donation) {
          if (!donationIds.includes(donation.donationID)) {
            donationIds.push(donation.donationID);

            var createdDate = new Date(donation.createdDateUTC);
            var options = { year: 'numeric', month: 'short', day: '2-digit' };
            var formattedDate = createdDate.toLocaleDateString('en-US', options);

            var donationItem = $("<li id=#donationItem></li>").css("flex-basis", columnWidth);

            var displayName = donation.displayName || "Mysterious Donor";
            var displayNameAmount = $("<div class='donor-details'></div>")
              .append($("<span class='dono-amount'></span>").append($("<span class='dollar-symbol'></span>").text("$")).append(donation.amount).css("font-size", customDonoAmountFontSize))
              .append($("<span class='donor-name'></span>").text(displayName).css("font-size", customDonorNameFontSize));

            var messageElement = showMessageElement && donation.message ? $("<div class='dono-message'></div>").text(donation.message).css("font-size", customDonoMessageFontSize) : null;
            var dateElement = showDate ? $("<div class='dono-date'></div>").text(formattedDate).css("font-size", customDonoDateFontSize) : null;

            var donationID = donation.donationID;

            donationItem.append(displayNameAmount);
            if (/^\d{5}$/.test(teamId) && showRecipientPerDonation) {
              donationItem.append($("<span class='dono-recipient'></span>").text("donated to " + donation.recipientName).css("font-size", customDonoRecipFontSize));
            }
            donationItem.append(messageElement);
            donationItem.append(dateElement);
            if (showID) {
              donationItem.append(donationID);
            }

            donationsByRecipient.push({
              recipientName: donation.recipientName,
              donationItem: donationItem
            });
          }
        });

        // Sort donations by recipientName
        donationsByRecipient.sort((a, b) => a.recipientName.localeCompare(b.recipientName));

        // Clear donationList
        donationList.empty();

        // Append sorted donation items to donationList
        var currentRecipient = null;
        donationsByRecipient.forEach(function(donation) {
          if (donation.recipientName !== currentRecipient) {
            currentRecipient = donation.recipientName;
            var recipientHeader = $("<li class='recipient-header'></li>").text(customRecipientHeaderText+ " " + currentRecipient).css("font-size", customRecipHeaderFontSize);
            recipientHeader.append("<br>");
            if (/^\d{5}$/.test(teamId) && groupDonationsByRecipient){
              donationList.append(recipientHeader); 
            }
          }
          donationList.append(donation.donationItem);
        });

        if (enableDonationCount) {
          $("#donationCount").text("Total Donations: " + donationIds.length);
        }

        if (donations.length === pageSize) {
          retrieveDonations(page + 1);
        } else {
          var scrollingDuration = ((scrollDurationMultiplier * donationIds.length) + (showLogo ? 15000 : 10000)) / columnCount;
          var scrollingDurationMinutes = Math.floor(scrollingDuration / 60000);
          var scrollingDurationSeconds = Math.floor((scrollingDuration % 60000) / 1000);

          if (enableAutoScroll) {
              setTimeout(function() {
                  var container = $(".container");
                  var scrollHeight = container.prop("scrollHeight");

                  if (showLogo) {
                      container.animate({ scrollTop: scrollHeight }, scrollingDuration, "linear", function() {
                      setTimeout(function() {
                          container.fadeOut(1000, function() {
                          var newContainer = $(".new-container");
                          newContainer.fadeIn(3000);
                          });
                      }, 3000);
                      });
                  } else {
                      container.animate({ scrollTop: scrollHeight }, scrollingDuration, "linear");
                  }
              }, scrollDelay);
          }

          var durationText = scrollingDurationMinutes > 0 ? scrollingDurationMinutes + " mins " : "";
          durationText += scrollingDurationSeconds + " seconds";

          if (enableScrollDurationDisplay) {
            $("#scrollingDuration").text("Scrolling Duration: ~" + durationText);
          }
        }
      },
      error: function() {
        console.log("Error retrieving donations.");
        var errorContainer = document.getElementById("error-message");
        var existingError = errorContainer.innerText;
        var newError = "There has been an error in retrieving donations.";

        if (existingError) {
          // Append the new error to the existing errors
          errorContainer.innerText = existingError + "\n\n" + newError;
        } else {
          // Set the new error as the first error
          errorContainer.innerText = newError;
        }
      }
    });

    var totalUrl;
    if (/^\d{6}$/.test(participantId)) {
      totalUrl = totalParticipantEndpoint;
    } else if (/^\d{5}$/.test(teamId)) {
      totalUrl = totalTeamEndpoint;
    }

    $.ajax({
      url: totalUrl,
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        var sumDonations = response.sumDonations;
        var roundedDonations = Math.ceil(sumDonations);
        var formattedDonations = roundedDonations.toLocaleString();
        if (showTotal) {
          $('#donationAmount').html("Total Raised: <span class='totalAmount'> $" + formattedDonations + "</span>");
        }
      },
      error: function(error) {
        console.log('Error getting totals: ', error);
        var errorContainer = document.getElementById("error-message");
        var existingError = errorContainer.innerText;
        var newError = "There has been an error trying to get donation totals.";
      }
    });
  }

  retrieveDonations(1);
});
