// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
  
  var screenName = getScreenName();

  var fakes = getFakeFollowers(screenName);

  appendFakes(fakes);
}

function appendFakes(fakes) {
  var newTab = '<li class="ProfileNav-item ProfileNav-item--favorites" data-more-item=".ProfileNav-dropdownItem--favorites"><a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav u-textUserColor" data-nav="favorites" data-original-title=" ' + fakes + '% Fake"><span class="ProfileNav-label">Fake</span><span class="ProfileNav-value" data-is-compact="false"> ' + fakes + '% </span></a></li>';
  var script = "document.querySelector('.ProfileNav-list').innerHTML = document.querySelector('.ProfileNav-list').innerHTML + '" + newTab + "'";
  //{code:"document.querySelector('.ProfileNav-list').style.backgroundColor='" + e.target.textContent + "'"});

  chrome.tabs.executeScript(null,
      {code: script});
  window.close();
}

function getFakeFollowers() {
  var callback = arguments[arguments.length - 1];
  var xhr = new XMLHttpRequest();

  //callback for asynchronic request
  //xhr.onreadystatechange = function() {
  //  if (xhr.readyState == 4 && xhr.status == 200) {
  //    debugger;
  //    response = callback(xhr.responseText);
  //    debugger;
  //  }
  //}

  url = 'http://fakefollower.com/api/v1/twitter-audit/analize_followers?screen_name=Mercado_Ingles';
  xhr.open('GET', url, false); //for asynchronic request, set las value to true
  xhr.send(null);

  var responseText = JSON.parse(xhr.responseText);

  if (responseText.errors.length == 0) {
    return responseText.audit.score;
  }
  else {
    return "error";
  }

}

function getScreenName() {
  var script = "return document.querySelector('.ProfileHeaderCard-screennameLink').value";

  var screenName = chrome.tabs.executeScript(null,
      {code: script});
  debugger;

  return screenName;
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
