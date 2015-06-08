// ==UserScript==
// @name jvc-open-images
// @namespace hap
// @include /^https?://www\.jeuxvideo\.com/forums/(1|42)-.*$/
// @version 1.0.0
// ==/UserScript==

var bloc = document.querySelector('.lien-pratique-gestion')

bloc.appendChild(document.createElement('br'))
bloc.appendChild(makeButton('Ouvrir toutes les images', openImages))
bloc.appendChild(document.createTextNode(' - '))
bloc.appendChild(makeButton('Ouvrir tous les liens', openLinks))

function openImages () {
  openFilter(isImage)
}

function openLinks () {
  openFilter(isNotImage)
}

function openFilter (filter) {
  getLinks().filter(filter).map(get('href')).forEach(window.open)
}

function get (prop) {
  return function (object) {
    return object[prop]
  }
}

function getLinks () {
  return Array.from(document.querySelectorAll('.txt-msg a'))
}

function isNotImage (url) {
  return !isImage(url)
}

function isImage (url) {
  return /\.(jpe?g|png|gif|bmp)$/.test(url)
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
