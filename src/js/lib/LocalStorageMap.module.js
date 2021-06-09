
class LocalStorageMap extends Map {

    name

    #data

    constructor(props, {
        name = getDefaultLocalStorageName()
    } = {}) {
        super(props)
        this.name = name
        this.#data = this.#fetch()

        for(let key in this.#data) {
            this.set(key, this.#data[key], true)
        }
    }

    set(key, value, silent = false) {
        super.set(key, value)
        if(!silent) {
            this.#save()
        }
        return this
    }

    #fetch() {
        return JSON.parse(window.localStorage.getItem(this.name))
    }

    #save() {
        window.localStorage.setItem(this.name, JSON.stringify(this.#data))
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
