/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TaskDataService } from './task-data.service';

export const TaskDataController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await TaskDataService.getAll();
      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

   create: async (req: Request, res: Response) => {
    try {
      const { title, link, text, time } = req.body;
      if (!title || !link || !text || !time) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      const data = await TaskDataService.create({ title, link, text, time });
      return res.status(201).json({ success: true, data, message: 'Created!' });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

//   getById: async (req: Request, res: Response) => {
//     try {
//       const data = await TaskDataService.getById(req.params.id);
//       return res.json({ success: true, data });
//     } catch (error: any) {
//       return res.status(404).json({ success: false, message: error.message });
//     }
//   },

 

//   update: async (req: Request, res: Response) => {
//     try {
//       const { link, text, time } = req.body;
//       const data = await TaskDataService.update(req.params.id, { link, text, time });
//       return res.json({ success: true, data, message: 'Updated!' });
//     } catch (error: any) {
//       return res.status(500).json({ success: false, message: error.message });
//     }
//   },

//   delete: async (req: Request, res: Response) => {
//     try {
//       await TaskDataService.delete(req.params.id);
//       return res.json({ success: true, message: 'Deleted!' });
//     } catch (error: any) {
//       return res.status(500).json({ success: false, message: error.message });
//     }
//   },
// };

getById: async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
    const data = await TaskDataService.getById(id);
    return res.json({ success: true, data });
  } catch (error: any) {
    return res.status(404).json({ success: false, message: error.message });
  }
},

update: async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
    const { link, text, time } = req.body;
    const data = await TaskDataService.update(id, { link, text, time });
    return res.json({ success: true, data, message: 'Updated!' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
},

delete: async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
    await TaskDataService.delete(id);
    return res.json({ success: true, message: 'Deleted!' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
},
};