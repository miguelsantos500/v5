import { detectBackend } from '../src'

describe('detectBackend', () => {
    it('should not set anything if host is set in caps', () => {
        const caps = {
            host: '0.0.0.0',
            port: 1234
        }
        expect(detectBackend(caps)).toEqual(caps)
    })

    it('should default to local selenium server', () => {
        const caps = detectBackend({})
        expect(caps.host).toBe('127.0.0.1')
        expect(caps.port).toBe(4444)

        const otherCaps = detectBackend()
        expect(otherCaps.host).toBe('127.0.0.1')
        expect(otherCaps.port).toBe(4444)
    })

    it('should default if host or port is not given', () => {
        let caps = detectBackend({ port: 1234 })
        expect(caps.host).toBe('127.0.0.1')
        expect(caps.port).toBe(1234)

        caps = detectBackend({ host: 'foobar' })
        expect(caps.host).toBe('foobar')
        expect(caps.port).toBe(4444)
    })

    it('should detect browserstack user', () => {
        const caps = detectBackend({
            user: 'foobar',
            key: 'zHcv9sZ39ip8ZPsxBVJ2'
        })
        expect(caps.host).toBe('hub.browserstack.com')
        expect(caps.port).toBe(80)
    })

    it('should detect testingbot user', () => {
        const caps = detectBackend({
            user: 'foobar',
            key: 'ec337d7b677720a4dde7bd72be0bfc67'
        })
        expect(caps.host).toBe('hub.testingbot.com')
        expect(caps.port).toBe(80)
    })

    it('should detect saucelabs user', () => {
        const caps = detectBackend({
            user: 'foobar',
            key: '50aa152c-1932-B2f0-9707-18z46q2n1mb0'
        })
        expect(caps.host).toBe('ondemand.saucelabs.com')
        expect(caps.port).toBe(443)
        expect(caps.protocol).toBe('https')
    })
})
