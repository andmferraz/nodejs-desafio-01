import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
          .then(data => {
            this.#database = JSON.parse(data)
          })
          .catch(() => {
            this.#persist()
          })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, filter) {
        let data = this.#database[table] ?? []

        if(filter) {
            data = data.filter(row => {
                return Object.entries(filter).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data)
    {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = []
        }

        this.#persist()

        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        
        let result = true

        const { completed_at, created_at } = this.#database[table][rowIndex]

        if(rowIndex > -1) {            
            this.#database[table][rowIndex] = { 
                id,
                title: data.title,
                description: data.description,
                completed_at,
                created_at,
                updated_at: new Date().toLocaleDateString()
            }

            let { title, description } = data

            if(!title || !description) {
                result = false
            }
            
            this.#persist()
        }

        return result
    }

    find(table, id) {
        let result = true

        if(id) {
            const rowIndex = this.#database[table].findIndex(row => row.id === id)
            
            if(rowIndex > -1) {
                result = false
            }
        }

        return result
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}