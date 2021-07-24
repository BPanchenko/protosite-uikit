const BUS = new Map

export default class EventEmmiter {

    on(...args) {
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

        let events = BUS.get(obj)

        if (!events) BUS.set(obj, events = new Map)

        let handlers = events.get(name)

        if (!handlers) events.set(name, handlers = new Set)

        handlers.add(callback)

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
            events.has(event) && events.get(event).forEach(callback => callback(...args))
        }
        return this
    }

    static extend(obj) {
        const { on, off, trigger } = EventEmmiter.prototype
        Object.assign(obj, { on, off, trigger })
        return obj
    }
}