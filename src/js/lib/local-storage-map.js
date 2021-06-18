
class LocalStorageMap extends Map {

    name

    #data
    #createdKey
    #updatedKey

    constructor(props, {
        name = getDefaultLocalStorageName(),
        createdKey = '__created__',
        updatedKey = '__updated__'
    } = {}) {
        super(props)
        this.name = name
        this.#data = this.#fetch()
        this.#createdKey = createdKey
        this.#updatedKey = updatedKey

        for(let key in this.#data) {
            this.set(key, this.#data[key], true)
        }

        if (!this.has(this.#createdKey)) this.set(this.#createdKey, this.#getNowUTC())
    }

    set(key, value, silent = false) {
        super.set(key, value)
        if(!silent) {
            super.set(this.#updatedKey, this.#getNowUTC())
            this.#save()
        }
        return this
    }

    toJSON() {
        let result = Object.create(null)
        Array.from(this.keys()).sort().forEach(key => result[key] = this.get(key))
        return  result
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }

    #fetch() {
        return JSON.parse(window.localStorage.getItem(this.name))
    }

    #getNowUTC() {
        return (new Date()).toUTCString()
    }

    #save() {
        window.localStorage.setItem(this.name, this.toString())
        return this
    }
}

function getDefaultLocalStorageName() {
    return window.location.hostname.split('.').reduceRight((previous, value) => 
        `${previous}.${value}`
    ,'')
}

export {
    getDefaultLocalStorageName,
    LocalStorageMap
}
