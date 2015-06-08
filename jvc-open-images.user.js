// ==UserScript==
// @name jvc-open-images
// @namespace hap
// @include /^https?://www\.jeuxvideo\.com/forums/(1|42)-.*$/
// @version 1.0.0
// ==/UserScript==

var links = document.querySelectorAll('.conteneur-messages-pagi .bloc-message-forum .conteneur-message .bloc-contenu .txt-msg p a')
var bloc = document.querySelector('.lien-pratique-gestion')
var openImage = document.createElement('a')
var openLink = document.createElement('a')

openImage.innerHTML = 'Ouvrir toutes les images'
openImage.href = '#'
openImage.onclick = openImages
openImage.className = 'lien-jv'

openLink.innerHTML = 'Ouvrir tous les liens'
openLink.href = '#'
openLink.onclick = openLinks
openLink.className = 'lien-jv'

bloc.appendChild(document.createElement('br'))
bloc.appendChild(openImage)
bloc.appendChild(document.createTextNode(' - '))
bloc.appendChild(openLink)

var imagesExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp']

function openImages () {
  for (var i = 0; i < links.length; i++) {
    var linkExp = links[i].href.split('.')
    var extension = linkExp[linkExp.length - 1]
    var inArray = imagesExt.indexOf(extension)
    if (inArray !== -1) {
      window.open(links[i].href)
    }
  }
}

function openLinks () {
  for (var i = 0; i < links.length; i++) {
    var linkExp = links[i].href.split('.')
    var extension = linkExp[linkExp.length - 1]
    var inArray = imagesExt.indexOf(extension)
    if (inArray === -1) {
      window.open(links[i].href)
    }
  }
}
