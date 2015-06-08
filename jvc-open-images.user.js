// ==UserScript==
// @name jvc-open-images
// @namespace hap
// @include http://www.jeuxvideo.com/forums/1-*
// @include http://www.jeuxvideo.com/forums/42-*
// @version 1.0.0
// ==/UserScript==

var links     = $('.conteneur-messages-pagi .bloc-message-forum .conteneur-message .bloc-contenu .txt-msg p a');
var header    = document.querySelectorAll('.bloc-pre-pagi-forum')[0];
var openImage = document.createElement('a');
var openLink  = document.createElement('a');

openImage.innerHTML = "Ouvrir toutes les images";
openImage.href      = "#";
openImage.onclick   = openImages;

header.style.overflow = "hidden";

openImage.style.marginTop    = "5px";
openImage.style.marginBottom = "5px";
openImage.style.display      = "block";
openImage.style.width        = "200px";
openImage.style.cssFloat     = "left"

openLink.innerHTML = "Ouvrir tous les liens";
openLink.href      = "#";
openLink.onclick   = openLinks;

openLink.style.marginTop    = "5px";
openLink.style.marginBottom = "5px";
openLink.style.display      = "block";
openLink.style.cssFloat     = "right"

header.appendChild(openImage);
header.appendChild(openLink);

var imagesExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

function openImages()
{
    for (var i = 0; i < links.length; i++) {
        var linkExp   = links[i].href.split('.');
        var extension = linkExp[linkExp.length - 1];
        var inArray   = imagesExt.indexOf(extension);
        if (inArray !== -1) {
            open(links[i].href);
        }
    }
}

function openLinks()
{
    for (var i = 0; i < links.length; i++) {
        var linkExp   = links[i].href.split('.');
        var extension = linkExp[linkExp.length - 1];
        var inArray = imagesExt.indexOf(extension);
        if (inArray === -1) {
            open(links[i].href);
        }
    }
}

