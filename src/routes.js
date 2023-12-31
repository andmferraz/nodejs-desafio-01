import { buildRoutePath } from './utils/build-route-path.js'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {            
            const { filter } = req.query

            const tasks = database.select('tasks', filter ? {
                title: filter,
                description: filter
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {   
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toLocaleDateString(),
                updated_at: null
            }

            if(!database.insert('tasks', task)) {
                return res.writeHead(400).end()
            }

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {            
            const { id } = req.params
            const { title, description } = req.body

            if(database.find('tasks', id)) {            
                return res.writeHead(404).end(JSON.stringify('Register not found'))
            }
            
            if(!database.update('tasks', id, { title, description })) {
                return res.writeHead(400).end()                
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            if(database.find('tasks', id)) {                
                return res.writeHead(404).end(JSON.stringify('Register not found'))
            }

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {            
            const { id } = req.params

            if(database.find('tasks', id)) {                
                return res.writeHead(404).end(JSON.stringify('Register not found'))
            }

            database.complete('tasks', id)

            return res.writeHead(204).end()
        }
    }
]