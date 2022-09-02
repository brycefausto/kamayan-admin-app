import axios from '@/lib/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req: NextApiRequest, res: NextApiResponse) => {
    const { data } = await axios.get('/api/ingredients/1')
    res.status(200).json({ data })
}
