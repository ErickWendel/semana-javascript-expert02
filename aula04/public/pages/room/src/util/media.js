class Media {
    async getCamera(audio = true, video = true) {
        return navigator.mediaDevices.getUserMedia({
            video,
            audio
        })
    }
}