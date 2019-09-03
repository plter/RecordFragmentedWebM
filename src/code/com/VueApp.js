import tpl from "../tpls/VueApp.html"
import tools from "./tools";

const MIME_TYPE = 'video/webm; codecs="opus,vp8"';
const TIME_SLICE = 3000;

const VueApp = Vue.component("vueapp", {
    template: tpl,
    data() {
        return {
            recording: false,
            recordEnded: true,
            fragmentIndex: 0
        }
    },
    mounted() {
        this._initApp();
    },

    methods: {
        async _initApp() {
            this._stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            this.$refs.preview.srcObject = this._stream;

            this._mediaRecorder = new MediaRecorder(this._stream, {mimeType: MIME_TYPE});
            this._mediaRecorder.ondataavailable = this._mediaRecorder_ondataavailableHandler.bind(this);

            let mediaSource = this._mediaSource = new MediaSource();
            this.$refs.replay.src = URL.createObjectURL(mediaSource);
            await tools.waitForEvent(mediaSource, "sourceopen");
            this._sourceBuffer = mediaSource.addSourceBuffer(MIME_TYPE);
        },

        async _mediaRecorder_ondataavailableHandler(e) {
            await tools.sleep(TIME_SLICE / 2);
            this.appendBuffer(await e.data.arrayBuffer());

            this.fragmentIndex++;

            if (this.recording) {
                this.startRecordProcess();
            } else {
                this.recordEnded = true;
            }
        },

        startRecordBtnClicked(e) {
            this.recording = true;
            this.recordEnded = false;

            this.startRecordProcess();
        },

        startRecordProcess() {
            this._timeOffset = 0;
            this._mediaRecorder.start();
            this._currentRecordProcessTimerID = setTimeout(() => {
                this._mediaRecorder.stop();
            }, TIME_SLICE);
        },

        stopRecordBtnClicked(e) {
            this.recording = false;
        },

        async appendBuffer(arrayBuffer) {
            this._sourceBuffer.abort();
            this._sourceBuffer.timestampOffset = this._timeOffset;
            this._sourceBuffer.appendBuffer(arrayBuffer);
            await tools.waitForEvent(this._sourceBuffer, "updateend");
            this._timeOffset = this._sourceBuffer.buffered.end(this._sourceBuffer.buffered.length - 1);
        },

        replayTimeupdateHandler(e) {
            // console.log(e);
            // console.log(this._mediaSource.readyState);
        }
    }
});

export default VueApp;