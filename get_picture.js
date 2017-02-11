/**
   サーバーからファイルをダウンロードする
   https://maps.googleapis.com/maps/api/streetview?
*/

var fs = require('fs');
var https = require('https');
var util = require('util');

// google places APIの変数を定義
var query = 0;
const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';

var auth_key = 'AIzaSyBc1DoBy7wMdzYmYItbDiY0YJQmtmzatMA'

var get_count = 0;
function dump(v){
    return console.log(util.inspect(v));
}
// GOOGLE_PLACE_APIより検索ワードで画像を検索
function use_google_places_api(){
    var j = 0;
    var GOOGLE_PLACES_URL = 
            GOOGLE_PLACES_API      +
            'query='     + 'kanban'  +
            '&key='      + auth_key +
            '&language=' + 'ja';
    //console.log("GOOGLE_PLACES_URL :" + GOOGLE_PLACES_URL);

    https.get(GOOGLE_PLACES_URL, (res) => {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(chunk){
            res = JSON.parse(body);
            var lat = res['results'][0]['geometry']['location']['lat'];
            var lng = res['results'][0]['geometry']['location']['lat'];
            location = lat + "x" + lng;
            console.log(location);
            
        });
        j += 1;
    }).on('error', (e) => {
        console.log("エラーだお"); //エラー時
        //console.log(e.message); //エラー時
    });
    return location;
};

// google street view APIの変数を定義
const STREET_VIEW_IMAGE_API = 'https://maps.googleapis.com/maps/api/streetview?';
var size      = '400x500';
var heading   = 88;
var pitch     = 7;
var fov       = 0;
var zoom      = 3;

var location = use_google_places_api();

// STREET_VIEWより画像を取得
function get_picture(location, size, heading, pitch, fov, zoom){
    var STREET_VIEW_IMAGE_URL =
            STREET_VIEW_IMAGE_API  +
            'location=' + location +
            '&size='    + size     +
            '&heading=' + heading  +
            '&pitch='   + pitch    + 
            '$fov='     + fov      +
            '$zoom='    + zoom;
    
    console.log(STREET_VIEW_IMAGE_URL);

    request
      .get(STREET_VIEW_IMAGE_URL)
      .on('response', function (res) {
        console.log('statusCode: ', res.statusCode);
        console.log('content-length: ', res.headers['content-length']);
      })
      .pipe(fs.createWriteStream('./saved.jpg'));
    get_count+= 1;
};

get_picture(location, size, heading, pitch, fov, zoom);

