const BUS = new Map

function decomposeArguments(args) {
    let obj, name, callback
    
    if (
        args.length === 2 &&
        typeof args[0] === 'string' &&
        typeof args[1] === 'function'
    ) {
        obj = this
        name = args[0]
        callback = args[1]

    } else if (
        args.length === 3 &&
        typeof args[0] === 'object' &&
        typeof args[1] === 'string' &&
        typeof args[2] === 'function'
    ) {
        obj = args[0]
        name = args[1]
        callback = args[2]
        
    } else console.error('Wrong Parameters')

    console.log(obj, name, callback)

    return { obj, name, callback }
}

export default class EventEmmiter {

    on(...args) {
        let { obj, name, callback } = decomposeArguments.call(this, args)

        let events = BUS.get(obj)
        if (!events) BUS.set(obj, events = new Map)

        let handlers = events.get(name)
        if (!handlers) events.set(name, handlers = new Set)

        handlers.add(callback.bind(obj))

        return this
    }

    onAndRun(...args) {
        this.on(...args)
        let { obj, callback } = decomposeArguments(args)
        callback.call(obj)
        return this
    }

    off(event = '', callback = null) {
        if (event === '') {
            BUS.delete(this)
        } else if (BUS.has(this)) {
            let events = BUS.get(this)
            if (callback) {
                events.has(event) && events.get(event).delete(callback)
            } else {
                events.delete(event)
            }
        }
        return this
    }

    trigger(event, ...args) {
        if (BUS.has(this)) {
            let events = BUS.get(this)
            events.has(event) && events.get(event).forEach(callback => {
                if (window.debug) {
                    console.log(
                        `%cevent %c"${event}"%c: `,
                        'color: grey;',
                        'color: black; font-weight: bold',
                        'color: grey; font-weight: normal',
                        ...args
                    )
                }
                callback(...args)
            })
        }
        return this
    }

    static extend(obj) {
        const { on, onAndRun, off, trigger } = EventEmmiter.prototype
        Object.assign(obj, { on, onAndRun, off, trigger })
        return obj
    }
}