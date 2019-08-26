//Calculate days in Month

var getDaysInMonth = function(month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};
var Jan = getDaysInMonth(1, 2019);
var Feb = getDaysInMonth(2, 2019);
var Mar = getDaysInMonth(3, 2019);
var Apr = getDaysInMonth(4, 2019);
var May = getDaysInMonth(5, 2019);
var Jun = getDaysInMonth(6, 2019);
var Jul = getDaysInMonth(7, 2019);
var Aug = getDaysInMonth(8, 2019);
var Sep = getDaysInMonth(9, 2019);
var Oct = getDaysInMonth(10, 2019);
var Nov = getDaysInMonth(11, 2019);
var Dec = getDaysInMonth(12, 2019);

//Import Kolin Balance
function getbalance() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      var balancef = obj.balance / 100;
      //balances
      document.getElementById("KolinBalance").innerHTML = balancef
        .toFixed(2)
        .toLocaleString();
      document.getElementById("percentageKolinHolder").innerHTML = (
        (obj.balance / 300000000000) *
        100
      ).toFixed(2);
    }
  };
  var WavesAddress = document.getElementById("WavesAddress").value;
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/FiKspxSpkpzT4pMUA9ccZkbJmVXTdu4JhFDXNNXr5noW?t=",
    true
  );
  xhttp.send();
  xhttp.onload = function() {
    if (xhttp.status !== 404 && xhttp.status !== 400) {
      getbalance2();
    } else {
      console.log("Please check entered address");
    }
  };
}
//BTC balance
function getbalance2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("BitcoinBalance").innerHTML = (
        obj.balance / 100000000
      )
        .toFixed(8)
        .toLocaleString();
      document.getElementById("percentageBitcoinHolder").innerHTML = (
        (obj.balance / 2100000000000000) *
        100
      ).toFixed(2);
    }
  };
  var WavesAddress = document.getElementById("WavesAddress").value;
  xhttp.open(
    "GET",
    "https://nodes.wavesnodes.com/assets/balance/" +
      WavesAddress +
      "/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS?t=",
    true
  );
  xhttp.send();
  getbalance3();
}
//WavesBalance
function getbalance3() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);
      //balances
      document.getElementById("WavesBalance").innerHTML = (
        obj.balance / 100000000
      )
        .toFixed(8)
        .toLocaleString();
      document.getElementById("percentageWavesHolder").innerHTML = (
        (obj.balance / 100000000 / 100000000) *
        100
      ).toFixed(2);
    }
  };
  var WavesAddress = document.getElementById("WavesAddress").value;
  xhttp.open(
    "GET",
    "https://nodes.wavesplatform.com/addresses/balance/" + WavesAddress + "?t=",
    true
  );
  xhttp.send();
}
window.onload = function height() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      var obj = JSON.parse(text);

      //currentheight
      document.getElementById("height").innerHTML = obj.height.toLocaleString();
      currentHeight = obj.height;
    }
  };
  var WavesAddress = document.getElementById("WavesAddress").value;
  xhttp.open("GET", "https://nodes.wavesnodes.com/blocks/height?t=", true);
  xhttp.send();
  //setInterval(function() {
  //  height();
  //}, 30000);
  if (WavesKeeper.publicState()) {
    state => {
      console.log(state);
      console.log("you are already logged in");
    };
  } else wavesKeeper();
};

//WavesKeeeper interaction
function wavesKeeper() {
  if (typeof WavesKeeper !== "undefined") {
    console.log("WavesKeeper found");
    login();
    //login with Waveskeeper
    function login(x) {
      const authData = {
        data: "",
        name: "Kolin Locker 1.0",
        icon:
          "https://raw.githubusercontent.com/Kolinplatform/demo/master/images/Kolin-png.png"
      };
      WavesKeeper.auth(authData)
        .then(data => {
          //data – data from Waves Keeper
          //verifying signature and saving the address...
          console.log(data);
          document.getElementById("WavesAddress").value = data.address;
          WavesAddress = data.address;
          getbalance();
          // if data.address...
          //then {
          //document.getElementById("addressRegistered").innerHTML = ", welcome back <img class='img img-small' href='" data.avatar "'></img> <strong> " + data.alias + "</strong>";
          // }
          // else{document.getElementById("addressRegistered").innerHTML = "your wallet has not been used with this dApp before, please register" }
          // })
        })
        .catch(error => {
          console.log(error) && alert(error);
        });
    }
  } else {
    console.log("WavesKeeper is not installed");
    alert("Please install WavesKeeper");
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById("ScriptToDeploy").value = Script;
};

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
}
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//Signing the Script transaction
document.getElementById("futureHeight").addEventListener("change", event => {
  FutureHeight = document.getElementById("futureHeight").value;
  if (FutureHeight <= currentHeight) {
    alert("please choose a height higher than current height");
    Script = "please choose a height higher than current height";
    document.getElementById("acceptDeployment").style.visibility = "hidden";
  } else {
    document.getElementById("acceptDeployment").style.visibility = "visible";
    Script =
      "{-# STDLIB_VERSION 3 #-}{-# CONTENT_TYPE DAPP #-}{-# SCRIPT_TYPE ACCOUNT #-}@Verifier(tx)func verify() = {match tx {case o: SetScriptTransaction => sigVerify(tx.proofs[0], tx.bodyBytes, base58'" +
      WavesAddress +
      "') case o: TransferTransaction => (lastBlock.height >" +
      FutureHeight.toString() +
      ")case _ => false}}";
    base64Script = "base64:" + btoa(Script);
  }
});

function deployScript() {
  WavesKeeper.signAndPublishTransaction({
    type: 13,
    data: {
      script: base64Script,
      fee: {
        tokens: "0.04",
        assetId: "WAVES"
      }
    }
  })
    .then(tx => {
      console.log("Your account has been locked until block " + FutureHeight);
    })
    .catch(error => {
      console.error("Something went wrong", error);
    });
}
