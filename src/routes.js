export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {            
            return res.end('GET')
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {            
            return res.end('POST')
        }
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        handler: (req, res) => {            
            return res.end('PUT')
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (req, res) => {
            return res.end('DELETE')
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (req, res) => {            
            return res.end('PATCH')
        }
    }
]