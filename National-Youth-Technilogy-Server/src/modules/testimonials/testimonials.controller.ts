import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { createTestimonialsServer, deleteTestimonialsService, getTestimonialsService, updateTestimonialsService } from "./testimonials.service";


export const createTestimonials = catchAsync(async (req, res) => {
  const result = await createTestimonialsServer.create(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Testimonial created successfully!",
    data: result,
  });
});

export const getAllTestimonials = catchAsync(async (req, res) => {
  const result = await getTestimonialsService.getAll();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Testimonials retrieved successfully!",
    data: result,
  });
});

export const updateTestimonial = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await updateTestimonialsService(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Testimonial updated! 🛠️",
    data: result,
  });
});

// DELETE CONTROLLER
export const deleteTestimonial = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  await deleteTestimonialsService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Testimonial deleted! 🗑️",
    data: null,
  });
});