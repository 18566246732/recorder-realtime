# 语音录制工具
该工具包源于[opus-recorder](https://github.com/chris-rudmin/opus-recorder)包，但其设计初衷以及一些功能上缺失，所以该模块包单独fork了一份进行改写。主要做了以下支持：
1. 支持修改`.wav`文件的采样率（暂时只有高采样率压缩变低）
2. 支持修改`.wav`文件的位深
3. 支持获取实时语音流（PCM数据），录制结束提供录音文件（.wav)
4. 对worker文件的webpack打包，不再进行支持oggOpus的文件格式（不常用干脆剔除开）

该工具主要可以用于以下场景：Web-Rtc、实时语音ASR、录音采集等场景。需要注意的是，开启浏览器录音功能需要服务页面是`HTTPS`协议的域名。本地开发使用localhost绕过。

另外建议是可以将本文档和上面源包的文档结合来看。因为整理文档的时间并没有特别多，如果没有特殊说明基本源库支持的方法这边都会支持。

----

## Usage

### Constructor 构造函数

```js
import Recorder from '@zhuiyi/recorder';
var rec = new Recorder([config]);
```

### 生成Config参数

- **bufferLength** - (optional) 内部使用的JavaScriptNode用于捕获音频流的缓存区大小。如果遇到性能问题或者ASR规定录制的时间范围。默认值是`4096`.
- **monitorGain** - (optional) 设置录音的回声（即可以听到自己录制的声音）。可以设置的范围是`0``到`1`.默认设置为`0`。即静音不开启
- **numberOfChannels** - (optional) 设置录制的声道数。默认是单声道，最多支持双声道（如无特殊需求不建议使用）。
- **recordingGain** - (optional) 设置录制的音量大小。默认是1，支持范围`0`到`1`.（`0`即静音录制）
- **wavBitDepth** - (optional) 设置期望`.wav`文件的位深。默认是`16`.支持`8`/`16`/`24`以及`32`位的位深。

----

### 实例的方法

```js
rec.pause([flush])
```

**pause**方法可以保持流和录音功能但是不会再将buffer数据存储到文件中。



...





## Examples

```js
    initRecorder() {
      if (!Recorder.isRecordingSupported()) {
        this.screenLogger('Recording features are not supported in your browser.')
      } else {
        this.recorder = new Recorder({
          recordingGain: parseInt(this.recordingGain, 10),
          numberOfChannels: 1,
          wavBitDepth: 16,
          wavSampleRate: 16000,
          streamPages: true
        })
        this.recorder.onstart = () => {
          this.isStart = true
          this.audioSrc = null
        }
        this.recorder.onstop = () => {
          this.isStart = false
        }
        this.recorder.onstreamerror = e => {
          this.screenLogger('Error encountered: ' + e.message)
        }
        this.recorder.ondataavailable = data => {
          if (data.command === 'buffer') {
            this.sendBlogToServer(data.buffer); // 片段数据，bufferLength的大小
          } else if (data.command === 'wav') {
            const dataBlob = new Blob([typedArray], { type: 'audio/wav' })
            const url = URL.createObjectURL(dataBlob)
            this.audioSrc = url
          }
        }
      }
    },
```

