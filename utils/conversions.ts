import { Bytes } from "@graphprotocol/graph-ts"

const ZERO_BYTE = new Bytes(0)

// credits
// https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript
// https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin

// Convert a hex string to a byte array
export function hexToBytes(hex: string): Bytes {
    let bytes = new Uint8Array(hex.length / 2)
    for (var i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
    return Bytes.fromUint8Array(bytes)
}

// Convert a byte array to a hex string
export function bytesToHex(bytes: Bytes): string {
    let hex = []
    for (let i = 0; i < bytes.length; i++) {
        let current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i]
        hex.push((current >>> 4).toString(16))
        hex.push((current & 0xf).toString(16))
    }
    return hex.join("")
}
