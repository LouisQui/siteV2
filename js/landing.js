$(function () {
  async function disconnect() {
    if (window.solana) {
      try {
        await window.solana.disconnect();
        $.ajax({
          url: "/logoutUser/",
          dataType: "json",
          success: function (data) {
            $("#solanaConnectButton").prop("value", "Connect with Solana");
            $("#twitterConnectButton").html("Link my Twitter");
            $("#twitterConnectButton").prop("disabled", false);
            $("#twitterConnectButton").css("visibility", "hidden");
          },
        });
      } catch (err) {
        $("#solanaConnectButton").prop("value", err.message);
      }
    }
  }

  async function connect() {
    if (window.solana) {
      try {
        var todayDate = new Date().toISOString().slice(0, 10);
        const resp = await window.solana.connect();
        const message = `${todayDate} : sign bellow to authentificate to The Incentive`;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await window.solana.signMessage(
          encodedMessage,
          "utf8"
        );

        var data = {};
        data["pubkey"] = resp.publicKey.toString();
        data["signedMessage"] = buf2hex(signedMessage.signature);
        $.ajax({
          url: "/solanaConnect/",
          data: data,
          dataType: "json",
          success: function (data) {
            if (data[0] == "Logged") {
              $("#solanaConnectButton").prop(
                "value",
                "Logged as " + resp.publicKey.toString().substring(0, 6) + "..."
              );
              $("#twitterConnectButton").css("visibility", "visible");
              if (data[1] != null) {
                $("#twitterConnectButton").html(`Twitter: ${data[1]}`);
                $("#twitterConnectButton").prop("disabled", true);
              }
            }
          },
        });
      } catch (err) {
        $("#solanaConnectButton").prop("value", err.message);
      }
    } else {
      $("#solanaConnectButton").prop("value", "Please install Phantom");
    }
  }

  $("#solanaConnectButton").click(function () {
    if ($(this).attr("value").startsWith("Logged as ")) disconnect();
    else connect();
  });

  $("#raidSectionButton").click(function () {
    $(this).addClass("activeButton");
    $("#tweetSectionButton").removeClass("activeButton");
    $("#tweetSection").hide();
    $("#raidSection").show();
    window.history.pushState({}, "", "?raid#about");
  });

  $("#tweetSectionButton").click(function () {
    $(this).addClass("activeButton");
    $("#raidSectionButton").removeClass("activeButton");
    $("#raidSection").hide();
    $("#tweetSection").show();
    window.history.pushState(
      {},
      "",
      document.location.href.split("?")[0] + "#about"
    );
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("raid") != null) $("#raidSectionButton").trigger("click");
});

function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
