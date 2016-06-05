/// <reference path="../../typings/index.d.ts"/>

const fs = require('fs');
import electron = require('electron');
import os = require('os');
const remote = electron.remote;
const app = remote.app;
const BrowserWindow = remote.BrowserWindow;

let webview = <Electron.WebViewElement> document.getElementById("webview");

webview.addEventListener('did-finish-load', function() {
    insertCss();
});

function insertCss(){
    fs.readFile(__dirname + '/css/insert.css','utf8', function(err, data) {
        webview.insertCSS(data);
        if(err) console.error(err);
    });
}
