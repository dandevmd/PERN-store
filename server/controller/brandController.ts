import { Response, Request } from 'express'
import { pool } from '../database'

class BrandController {
  createBrand = async (req: Request, res: Response) => {
    const { name } = req.body
    await pool.query('INSERT INTO brand (name) VALUES ($1)', [name])
    res.json({ message: `${name} brand was created successfully` })
  }

  getBrands = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM brand')
    res.json(result.rows)
  }

  getBrandById = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM brand WHERE id = $1', [id])
    res.json(result)
  }

  updateBrand = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    await pool.query('UPDATE brand SET name= $1 WHERE id = $2', [name, id])
    res.json({ message: `The brand was updated successfully` })
  }

  deleteBrand = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    await pool.query('DELETE FROM brand WHERE id = $1', [id])
    res.json({ message: `The ${name} brand was deleted successfully` })
  }
}

export const brandController = new BrandController()
