## Explaination

- a realtime audio recorder, it can generate `pcm` or `mp3` buffer of audio data with configurable sample rate and bit depth.

- when recording, it start a web worker thread in the browser to transform the `bitDepth` and `sampleRate`, so it's very fast in realtime

- please remember to using this package under `https`, or it won't work

## Usage

```js
import Recorder from 'recorder-realtime';

function initRecorder() {
  if (!Recorder.isRecordingSupported()) {
    this.screenLogger('Recording features are not supported in your browser.')
  } else {
    recorder = new Recorder({
      recordingGain: parseInt(this.recordingGain, 10),
      numberOfChannels: 1, // this is suggested
      wavBitDepth: 16,
      format: 'mp3', // default to pcm, which is larger
      wavSampleRate: 16000,
      streamPages: true // we can get the buffer stream in realtime in the ondataavailable callback
    })
    recorder.onstart = () => {
      console.log('recorder started');
    }
    recorder.onstreamerror = e => {
      this.screenLogger('Error encountered: ' + e.message)
    }
    recorder.ondataavailable = data => {
      if (data.command === 'buffer') {
        // data.buffer has the length of bufferLength
        this.sendToServer(data.buffer);
      }
    }
    recorder.start();
  }
}
```


## Optional Configuration

- **bufferLength** - (optional) default to `4096`, which means when the `ondataavailable` function called, the size of response buffer will be `4096`

- **monitorGain** - (optional) set the echo of your recording, the value range is `0-1`, default to `0`, which means mute the echo

- **numberOfChannels** - (optional) 1 or 2, 1 is suggested

- **recordingGain** - (optional) the volume of your voice, the value range is `0-1`, default to `1`

- **wavBitDepth** - (optional) the bit length of the recordered buffer, default is `16`, you can set it to `8`, `16`, `24`, `32`
