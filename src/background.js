"use strict"
const MENU_ID = 'id_anidl_d-mato'
const MENU_TITLE = "anidl"

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: MENU_TITLE,
    type: "normal",
    contexts: [ "link" ],
  })
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === MENU_ID) {
    let video_info = new VideoInfo(info.linkUrl, () => {
      chrome.downloads.download({
        url: video_info.video_url,
        filename: `${video_info.title}.mp4`
      })
    })
  }
})

class VideoInfo {
  constructor(video_page_url, callback) {
    if (!video_page_url)
      throw 'video_page_url is empty'
    if (typeof callback != 'function')
      throw 'callback is not function'

    let match = video_page_url.match(/http:\/\/www\.anitube\.se\/video\/\d+\/(.+)/)
    if (match == null || match.length == 0)
      throw 'video_page_url is invalid'
    this.title = match[1]

    this.fetch_config_url(video_page_url)
      .then(this.fetch_video_url.bind(this))
      .then(callback)
  }

  fetch_config_url(video_page_url) {
    return fetch(video_page_url).then((res) => res.text()).then((text) => {
      let match = text.match(/http:\/\/www\.anitube\.se\/player\/config\.php\?key=[\w\d]+/)
      if (match == null) throw 'Cannot parse html'
      return match[0]
    })
  }

  fetch_video_url(config_url) {
    return fetch(config_url).then((res) => res.text()).then((text) => {
      let match = text.match(/http:\/\/[a-zA-Z0-9\/._-]+?\.mp4/)
      if (match == null) throw 'Cannnot parse config'
      this.video_url = match[0]
      return this
    })
  }
}
