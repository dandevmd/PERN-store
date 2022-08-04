import { NextFunction, Request, Response } from 'express'
import { pool } from '../database'
import path from 'path'
import ApiError from '../errorHandler'
import { v4 } from 'uuid'

class DeviceController {
  createDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, type_id, brand_id, rating } = req.body
      const { img } = req.files as any
      let fileName = v4() + '.jpg'
      img.mv(
        process.env.DIRECTORY_TO_SAVE_IMAGES &&
          path.resolve(
            process.env.DIRECTORY_TO_SAVE_IMAGES,
            'static',
            fileName,
          ),
      )
      const device = await pool.query(
        'INSERT INTO device (name, price, rating, img, type_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, price, rating, fileName, type_id, brand_id],
      )
      res.json(device.rows[0])
    } catch (error) {
      if (error instanceof ApiError) {
        return next(ApiError.badRequest(error.message))
      }
      return error
    }
  }

  getDevices = async (req: Request, res: Response, next: NextFunction) => {
    let { type_id, brand_id, limit, page } = req.query
    page = page || '1'
    limit = limit || '10'
    let offset = Number(page) * Number(limit) - Number(limit)
    let devices
    try {
      if (!type_id && !brand_id) {
        devices = await pool.query('SELECT * FROM device LIMIT $1 OFFSET $2', [
          Number(limit),
          Number(offset),
        ])
      }
      if (type_id && !brand_id) {
        devices = await pool.query(
          'SELECT * FROM device WHERE type_id = $1 LIMIT $2 OFFSET $3',
          [type_id, Number(limit), Number(offset)],
        )
      }
      if (!type_id && brand_id) {
        devices = await pool.query(
          'SELECT * FROM device WHERE brand_id = $1  LIMIT $2 OFFSET $3',
          [brand_id, Number(limit), Number(offset)],
        )
      }
      if (type_id && brand_id) {
        devices = await pool.query(
          'SELECT * FROM device WHERE type_id = $1 AND brand_id = $2 LIMIT $3 OFFSET $4',
          [type_id, brand_id, Number(limit), Number(offset)],
        )
      }

      res.json(devices.rows)
    } catch (error) {
      if (error instanceof ApiError) {
        return next(ApiError.badRequest(error.message))
      }
      return error
    }
  }

  getDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const device = await pool.query('SELECT * FROM device WHERE id = $1', [
        id,
      ])
      res.json(device.rows[0])
    } catch (error) {
      if (error instanceof ApiError) {
        return next(ApiError.badRequest(error.message))
      }
      return error
    }
  }

  updateDevice = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      const device = await pool.query('SELECT * FROM device WHERE id = $1', [
        id,
      ])
      let { name, price, type_id, brand_id, rating } = req.body
      let fileName = v4() + '.jpg'
      if (req.files) {
        const { img } = req.files as any
        img.mv(
          process.env.DIRECTORY_TO_SAVE_IMAGES &&
            path.resolve(
              process.env.DIRECTORY_TO_SAVE_IMAGES,
              'static',
              fileName,
            ),
        )
      }
      if(!name) name = device.rows[0].name;
      if(!price) price = device.rows[0].price;
      if(!type_id) type_id = device.rows[0].type_id;
      if(!brand_id) brand_id = device.rows[0].brand_id;
      if(!rating) rating = device.rows[0].rating;
      if(!fileName) fileName = device.rows[0].img;
      

      const UpdatedDevice = await pool.query(
        `UPDATE device SET name = $1, price = $2, rating = $3, img = $4, type_id = $5, brand_id = $6 WHERE id = $7 RETURNING *`,
        [name, price, rating, fileName, type_id, brand_id, id],
      )
      res.json(UpdatedDevice.rows[0])
    } catch (error) {
      if (error instanceof ApiError) {
        return next(ApiError.badRequest(error.message))
      }
      return error
    }
  }

  deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      await pool.query('DELETE FROM device WHERE id = $1', [id])
      res.json({ message: 'Device deleted' })
    } catch (error) {
      if (error instanceof ApiError) {
        return next(ApiError.badRequest(error.message))
      }
      return error
    }
  }
}

export const deviceController = new DeviceController()
