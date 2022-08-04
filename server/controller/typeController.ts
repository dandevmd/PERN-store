import { Request, Response } from 'express'
import {pool} from '../database'


class TypeController {
  create = async (req: Request, res: Response) => {
    const {name} = req.body
    const result = await pool.query('INSERT INTO type (name) VALUES ($1)', [name])
    res.json({message: `${name} type was created successfully`})
  }

  getTypes = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM type')
    res.json(result.rows)
  }

  selectedTypeId = async (req: Request, res: Response) => {
    const {id} = req.params
    const selected = await pool.query('SELECT * FROM type WHERE id = $1', [id])
    res.json(selected.rows)
  }


  updateType = async (req: Request, res: Response) => {
    const {id} = req.params
    const {name} = req.body
    await pool.query('UPDATE type SET name = $1 WHERE id = $2', [name, id])
    res.json({message: `${name} type was updated successfully`})
  }

  deleteType = async (req: Request, res: Response) => {
    const {id} = req.params
    await pool.query('DELETE FROM type WHERE id = $1', [id])
    res.json({message: `Type ${id} was deleted successfully`})
  }
}

export const typeController = new TypeController()