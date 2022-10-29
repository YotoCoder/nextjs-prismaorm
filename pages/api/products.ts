// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


type Data = {
  data: Object,
}


export default function API(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method === 'GET') {
    prisma.product.findMany().then((data) => {
      res.status(200).json({ data })
    })
  }
  else if (req.method === 'POST') {
    prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
      }
    }).then((data) => {
      res.status(200).json({ data })
    }).catch((err) => {
      res.status(400).json({ data: err })
    })
  }
  else if (req.method === 'PATCH') {
    prisma.product.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        price: req.body.price,
      }
    }).then((data) => {
      res.status(200).json({ data })
    }).catch((err) => {
      res.status(400).json({ data: err })
    })
  }
  else if (req.method === 'DELETE') {
    prisma.product.delete({
      where: {
        id: req.body.id,
      }
    }).then((data) => {
      res.status(200).json({ data })
    }).catch((err) => {
      res.status(400).json({ data: err })
    })
  }
  else {
    res.status(405).end() //Method Not Allowed
  }
}