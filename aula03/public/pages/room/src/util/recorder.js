class Recorder {
    constructor(userName, stream) {
        this.userName = userName
        this.stream = stream

        this.filename = `id:${userName}-when:${Date.now()}`
        this.videoType = 'video/webm'

        this.mediaRecorder = {}
        this.recordedBlobs = []
        this.completeRecordings = []
        this.recordingActive = false
    }
    _setup() {
        const commonCodecs = [
            "codecs=vp9,opus",
            "codecs=vp8,opus",
            ""
        ]

        const options = commonCodecs
            .map(codec => ({ mimeType: `${this.videoType};${codec}`}))
            .find(options => MediaRecorder.isTypeSupported(options.mimeType))
        
        if(!options) {
            throw new Error(`none of the codecs: ${commonCodecs.join(',')} are supported`)
        }

        return options
    }

    startRecording() {
        const options = this._setup()
        // se nao estiver recebendo mais video, já ignora!
        if(!this.stream.active) return;
        this.mediaRecorder = new MediaRecorder(this.stream, options)
        console.log(`Created MediaRecorder ${this.mediaRecorder} with options ${options}`)

        this.mediaRecorder.onstop = (event) => {
            console.log('Recorded Blobs', this.recordedBlobs)
        }

        this.mediaRecorder.ondataavailable = (event) => {
            if(!event.data || !event.data.size) return; 

            this.recordedBlobs.push(event.data)
        }

        this.mediaRecorder.start()
        console.log(`Media Recorded started`, this.mediaRecorder)
        this.recordingActive = true

    }

    async stopRecording() {
        if(!this.recordingActive) return;
        if(this.mediaRecorder.state === "inactive") return;

        console.log('`media recorded stopped!', this.userName)
        this.mediaRecorder.stop()
        
        this.recordingActive = false 
        await Util.sleep(200)
        this.completeRecordings.push([...this.recordedBlobs])
        this.recordedBlobs = []
    }
}