/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CompleteNewService } from "./complete-new.service";

const getId = (id: string | string[]): string =>
  Array.isArray(id) ? id[0] : id;

export const CompleteNewController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await CompleteNewService.getAll();
      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const data = await CompleteNewService.getById(getId(req.params.id));
      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { title, text, date, pdfUrl } = req.body;
      if (!title || !text || !date || !pdfUrl) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
      const data = await CompleteNewService.create({ title, text, date, pdfUrl });
      return res.status(201).json({ success: true, data, message: "Created!" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { text, date, pdfUrl } = req.body;
      const data = await CompleteNewService.update(getId(req.params.id), { text, date, pdfUrl });
      return res.json({ success: true, data, message: "Updated!" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await CompleteNewService.delete(getId(req.params.id));
      return res.json({ success: true, message: "Deleted!" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

// proxyPDF: async (req: Request, res: Response) => {
//   try {
//     const { url } = req.query;

//     if (!url || typeof url !== "string") {
//       return res.status(400).json({ success: false, message: "URL required" });
//     }

//     const response = await fetch(url);

//     if (!response.ok) {
//       return res.status(400).json({ success: false, message: "Failed to fetch PDF" });
//     }

//     const buffer = await response.arrayBuffer();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=document.pdf");
//     res.send(Buffer.from(buffer));
//   } catch (error: any) {
//     return res.status(500).json({ success: false, message: error.message });
//   }




//   }
};