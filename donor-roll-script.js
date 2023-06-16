$(document).ready(function() {
    var endpoint = `https://extralife.donordrive.com/api/participants/${participantId}/donations`;
    var totalEndpoint = `https://extralife.donordrive.com/api/participants/${participantId}`;
    var pageSize = 100;
    var donationIds = [];
  
    var themeMap = {
      DarkMode: "dark-mode.css",
      LightMode: "light-mode.css",
      Blue1: "blue-1.css",
      Blue2: "blue-2.css",
      Green: "green.css"
    };
  
    function applyTheme(theme) {
      if (themeMap.hasOwnProperty(theme)) {
        var cssFile = themeMap[theme];
        var linkElement = $(`<link rel='stylesheet' type='text/css' href='styles/${cssFile}'>`);
        $("head").append(linkElement);
      }
    }
  
    applyTheme(theme);
  
    function retrieveDonations(page) {
      var offset = (page - 1) * pageSize || 1;
      var url = `${endpoint}?offset=${offset}&limit=${pageSize}`;

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
              
              var donationItem = $("<li></li>");
              
              var displayName = donation.displayName || "Mysterious Donor";
              var displayNameAmount = $("<div class='donor-details'></div>")
                .append($("<span class='dono-amount'></span>").append($("<span class='dollar-symbol'></span>").text("$")).append(donation.amount).css("font-size", customDonoAmountFontSize))
                .append($("<span class='donor-name'></span>").text(displayName).css("font-size", customDonorNameFontSize));
              
              var messageElement = showMessageElement && donation.message ? $("<div class='dono-message'></div>").text(donation.message).css("font-size", customDonoMessageFontSize) : null;
              var dateElement = showDate ? $("<div class='dono-date'></div>").text(formattedDate).css("font-size", customDonoDateFontSize) : null;
  
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
        }
      });

      $.ajax({
        url: totalEndpoint,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          var sumDonations = response.sumDonations;
          var roundedDonations = Math.ceil(sumDonations); // Round up to the nearest whole number
          var formattedDonations = roundedDonations.toLocaleString(); // Add proper punctuation
          // Display the formattedDonations value in an element with id "donationAmount"
          if (showTotal) {
            $('#donationAmount').html("Total Raised: <span class='totalAmount'> $" + formattedDonations + "</span>");

          }
        },
        error: function(error) {
          console.log('Error:', error);
        }
      });
    }
  
    retrieveDonations(1);
  });  