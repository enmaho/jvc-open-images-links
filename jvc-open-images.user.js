// ==UserScript==
// @name jvc-open-images
// @namespace hap
// @include /^https?://www\.jeuxvideo\.com/forums/(1|42)-.*$/
// @version 1.0.0
// ==/UserScript==

var links = document.querySelectorAll('.conteneur-messages-pagi .bloc-message-forum .conteneur-message .bloc-contenu .txt-msg p a')
var bloc = document.querySelector('.lien-pratique-gestion')

bloc.appendChild(document.createElement('br'))
bloc.appendChild(makeButton('Ouvrir toutes les images', openImages))
bloc.appendChild(document.createTextNode(' - '))
bloc.appendChild(makeButton('Ouvrir tous les liens', openLinks))

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

function makeButton (text, cb) {
  var link = document.createElement('a')

  link.textContent = text
  link.href = '#'
  link.className = 'lien-jv'

  link.addEventListener('click', function (event) {
    event.preventDefault()
    cb(event)
  })

  return link
}
