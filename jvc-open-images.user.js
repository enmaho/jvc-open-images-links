// ==UserScript==
// @name jvc-open-images
// @namespace hap
// @include /^https?://www\.jeuxvideo\.com/forums/(1|42)-.*$/
// @version 1.1.0
// ==/UserScript==

var bloc = document.querySelector('.lien-pratique-gestion')

bloc.appendChild(document.createElement('br'))
bloc.appendChild(makeButton('Ouvrir toutes les images', openImages))
bloc.appendChild(document.createTextNode(' - '))
bloc.appendChild(makeButton('Ouvrir tous les liens', openLinks))

function openImages (event) {
  openFilter(isImage, strike(event))
}

function openLinks (event) {
  openFilter(isNotImage, strike(event))
}

function openFilter (filter, empty) {
  var urls = getLinks()
    .filter(isNotQuoted)
    .map(get('href'))
    .filter(filter)

  if (!urls.length) {
    empty()
  } else {
    urls.forEach(window.open)
  }
}

function get (prop) {
  return function (object) {
    return object[prop]
  }
}

function strike (event) {
  return function () {
    event.target.style.textDecoration = 'line-through'
  }
}

function getLinks () {
  return Array.from(document.querySelectorAll('.txt-msg a'))
}

function isNotQuoted (element) {
  return !isQuoted(element)
}

function isQuoted (element) {
  return element.matches('blockquote ' + element.nodeName)
}

function isNotImage (url) {
  return !isImage(url)
}

function isImage (url) {
  return /\.(jpe?g|png|gif|bmp|webm)$/.test(url)
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
