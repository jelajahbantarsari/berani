
var footerPenImgSrc="<img src=./_img/pen-footer.png>";


// Return the value for the passed in field in the url, or null
function getUrlParamValue(field) {
    "use strict";
    var href = window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    var retVal = string ? string[1] : null;
    return retVal;
}

// Perform simple sprintf function
function sprintf(format) {
    "use strict";
    var args = Array.prototype.slice.call(arguments, 1);
    var i = 0;
    return format.replace(/%s/g, function () {
        return args[i++];
    });
}

// Write out string based on the url param in, else return default string
function writeWithUrlParam(urlParam, paramString, defaultString) {
    "use strict";
    var paramValue = getUrlParamValue(urlParam);

    if (paramValue === null) {
        document.write(defaultString);
    }
        else {
            paramValue = decodeURI(paramValue);
            document.write(sprintf(paramString, paramValue));
        }

    /*
    how to use:
    <h1><script>writeWithUrlParam("n", "How weʼll create your copy, %s", "How weʼll create your copy");</script></h1>

    in the url: http://toddsgotapen.com/webpage/?n=joe
    */
}

// Include html files
function includeHTML() {
    "use strict";
    var z, i, elmnt, file, xhttp;
      /*loop through a collection of all HTML elements:*/
      z = document.getElementsByTagName("*");
      for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
          /*make an HTTP request using the attribute value as the file name:*/
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
              if (this.status == 200) {elmnt.innerHTML = this.responseText;}
              if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
              /*remove the attribute, and call this function once more:*/
              elmnt.removeAttribute("include-html");
              includeHTML();
            }
          }
          xhttp.open("GET", file, true);
          xhttp.send();
          /*exit the function:*/
          return;
        }
      }

    /* example usage...
    <body>
        <div include-html="h1.html"></div>
        <div include-html="inc.html"></div>
    <script>
        includeHTML();
    </script>
    </body>
    */
}


// show/hide tabbed content
function openTab(evt, tabName) {
    // Get all elements with class "tabcontent" and hide them
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class "tablinks" and remove the class "active"
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// popup scripting
if (!sessionStorage.getItem("formDisplayed")) {
    setTimeout(function () {
        document.getElementById("popup-form").style.display = "block";
    }, 20000);

    sessionStorage.setItem("formDisplayed", "true");
}

/*
place code below in script tags at botton of html page
<script>
    document.getElementById("close-btn").addEventListener("click", function () {
        document.getElementById("popup-form").style.display = "none";
    });
</script>
*/


// scroll to an id—smoothly
function scrollToElement(elementId) {
    document.getElementById(elementId).scrollIntoView({
        behavior: "smooth"
    });
}

/*
example call...
<a class="button" onclick="scrollToElement('yes-no')">click to scroll down</a>
*/


// remove a specific parameter from the URL
function removeURLParameter(param) {
    if (history.replaceState) {
        const url = window.location.href;
        const urlParts = url.split('?');

        if (urlParts.length >= 2) {
            const params = urlParts[1].split('&');
            const newParams = params.filter(p => !p.startsWith(param + '='));

            if (newParams.length > 0) {
                const updatedURL = urlParts[0] + '?' + newParams.join('&');
                history.replaceState(null, '', updatedURL);
            } else {
                // If no other parameters, just keep the "?" character
                history.replaceState(null, '', urlParts[0]);
            }
        }
    }
}

// check ifa file exists on disk
function doesFileExist(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', filename, false);
    xhr.send();
    return xhr.status !== 404;
}

