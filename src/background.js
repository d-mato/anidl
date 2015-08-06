chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "dl",
    title: "anidl",
    type: "normal",
    contexts: [ "link" ],
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "dl") { // here's where you'll need the ID

    $.get(info.linkUrl, function(data){
      match = data.match(/http:\/\/www\.anitube\.se\/player\/config\.php\?key=[\w\d]+/);
      config_url = match[0];
      console.log(config_url);

      match = info.linkUrl.match(/http:\/\/www\.anitube\.se\/video\/\d+\/(.+)/);
      title = match[1];
      console.log(title);

      $.get(config_url, function(data) {
        match = data.match(/http:\/\/[a-zA-Z0-9\/._-]+?\.mp4/);
        video_url = match[0];
        console.log(video_url);

        console.log("Start download");
        
        chrome.downloads.download({
          url: video_url,
          filename: title + ".mp4"
        });

      }, 'text');
    });
  }
});

/* 動画ページのURLを引数として、video(mp4)の場所を返す関数 */
function get_video_config(page_url){
  return $.get(page_url).done(function(data) {
    match = data.match(/http:\/\/www\.anitube\.se\/player\/config\.php\?key=[\w\d]+/);
    config_url = match[0];
    console.log(config_url);
  });
}

function get_video_url(config_url){
  return $.get(config_url).done(function(data) {
    match = data.match(/http:\/\/[a-zA-Z0-9\/._-]+?\.mp4/);
    video_url = match[0];
    console.log(video_url);
  });
}
