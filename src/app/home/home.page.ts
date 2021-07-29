import { AfterViewInit, Component } from '@angular/core';
declare var Peer: any;
var peer = new Peer();

var myVideoStream = null;
var howmany = null;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  mypeerid: any;
  anotherid: any;

  constructor() { }
  ngAfterViewInit() {
    this.checkOurOwnID();
    //this.receivedData();
    this.openCamera()
    //this.openCameraSecond();
    this.mediaAnswer();
  }
  openCamera() {
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia({
      video: {width: 320, height: 320},
      audio: true
    },
      function (stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        document.getElementById("myList").appendChild(video);
        document.getElementsByTagName("video")[0].setAttribute("id", "myCamera");
        myVideoStream = stream;
      });
  }
  openCameraSecond() {
    navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 320 },
      audio: true
    }).then(stream => {
      var video = document.createElement('video');
      myVideoStream = stream;
      video.srcObject = stream;
      video.play();
      document.getElementById("myList").appendChild(video);
      document.getElementsByTagName("video")[0].setAttribute("id", "myCamera");
    })
  }
  playStop() {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    //console.log(myVideoStream.getVideoTracks()[0]);
    console.log(enabled);
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      this.setPlayVideo();
    }
    else {
      this.setStopVideo();
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  setStopVideo() {
    const html = '<span>Stop Video</span>'
    document.querySelector('.main__video_button').innerHTML = html;
  }
  setPlayVideo() {
    const html = '<span>Play Video</span>'
    document.querySelector('.main__video_button').innerHTML = html;
  }
  muteUnmute (){
    let enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      this.setUnmuteButton();
    } else {
      myVideoStream.getAudioTracks()[0].enabled = true;
      this.setMuteButton();
    }
  }
  setMuteButton = () => {
    const html = '<span>Mute</span>'
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  setUnmuteButton = () => {
    const html = '<span>Unmute</span>'
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  // Function to check ID
  checkOurOwnID() {
    setTimeout(() => {
      this.mypeerid = peer.id;
      console.log(this.mypeerid);
    }, 1000);
  }
  // ## Data Connection ##
  receivedData() {
    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        // Will print 'hi!'
        console.log(data);
      });
    });
  }
  connectToPeer() {
    var conn = peer.connect(this.anotherid);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function () {
      // here you have conn.id
      conn.send('hi!');
    });
  }
  // ## Media calls ##
  mediaAnswer() {
    var video = document.createElement('video');
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    peer.on('call', function (call) {
      n.getUserMedia({ video: { width: 320, height: 320 }, audio: false }, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream) {
          // Show stream in some video/canvas element.
          video.srcObject = remoteStream;
          video.play();
          document.getElementById("myList").appendChild(video);
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });
    });
  }
  mediaCall() {
    var video = document.createElement('video');
    var locaVar = peer;
    var fname = this.anotherid;
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia({ video: { width: 320, height: 320 }, audio: false }, function (stream) {
      var call = locaVar.call(fname, stream);
      call.on('stream', function (remoteStream) {
        // Show stream in some video/canvas element.
        video.srcObject = remoteStream;
        video.play();
        document.getElementById("myList").appendChild(video);
        howmany = document.getElementById("myList").childElementCount;
        console.log(howmany);
        document.getElementsByTagName("video")[howmany - 1].setAttribute("id", fname);
      });
      call.on('close', () => {
        video.remove()
      })
    }, function (err) {
      console.log('Failed to get local stream', err);
    });
  }
}


     // var list = document.getElementById("myList");   // Get the <ul> element with id="myList"
      // howmany = document.getElementById("myList").childElementCount;
      // //howmany = document.getElementById("myList").id;
      // console.log(document.getElementById("myCamera"));
      // console.log(howmany);
      // if (howmany == 2) {
      //   list.removeChild(document.getElementById("myCamera"));           // Remove <ul>'s first child node (index 0)
      // }
      // myVideoStream = video.srcObject;
      //console.log(myVideoStream.active);
      // var videoTracks = stream.getVideoTracks();
      // console.log('Using video device: ' + videoTracks[0].label);

         // if ((myVideoStream == null) || (myVideoStream.active == false)) {
    //   this.openCamera();
    // }
    // else {

    //   var list = document.getElementById("myList");
    //   list.removeChild(document.getElementById("myCamera"));
    //   myVideoStream = null;

    // }