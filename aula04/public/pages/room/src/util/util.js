class Util {
    static sleep(ms) {
        return new Promise(r => setTimeout(r, ms))
    }
}