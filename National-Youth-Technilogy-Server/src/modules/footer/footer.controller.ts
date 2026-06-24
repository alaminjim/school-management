import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { footerService } from "./footer.service";

export const createFooter = catchAsync(async (req, res) => {
  const result = await footerService.create(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Footer Created!",
    data: result,
  });
});

export const getFooter = catchAsync(async (req, res) => {
  const result = await footerService.getFooter();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Footer Fetched!",
    data: result,
  });
});

export const updateFooter = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await footerService.updateFooter(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Footer Updated!",
    data: result,
  });
});

export const deleteFooter = catchAsync(async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await footerService.deleteFooter(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Footer Deleted!",
    data: result,
  });
});
