import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Contact } from "../models/contact.model";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
const createContact = asyncHandler(async (req: Request, res: Response) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    throw new ApiError(400, "Subject and message are required");
  }

  const contact = new Contact({
    user: req.user._id,
    subject,
    message,
  });

  try {
    await contact.save();
    res
      .status(201)
      .json(new ApiResponse(201, contact, "Contact message sent successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      (error as Error)?.message ||
      "Something went wrong while sending the contact message"
    );
  }
});
// Update contact status
const updateContactStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { contactId } = req.params;
    const { adminMessage } = req.body;
    try {
      const contact = await Contact.findByIdAndUpdate(
        contactId,
        { status: true, adminMessage },
        { new: true }
      );

      if (!contact) {
        throw new ApiError(404, "Contact message not found");
      }

      res
        .status(200)
        .json(
          new ApiResponse(200, contact, "Contact status updated successfully")
        );
    } catch (error) {
      throw new ApiError(
        500,
        (error as Error)?.message ||
          "Something went wrong while updating the contact status"
      );
    }
  }
);
const getContacts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const contact = await Contact.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!contact) {
      throw new ApiError(404, "Contact messages not found");
    }

    res.status(200).json(new ApiResponse(200, contact, "success"));
  } catch (error) {
    throw new ApiError(
      500,
      (error as Error)?.message || "could not get all contacts"
    );
  }
});
const getAllContacts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const contact = await Contact.find().populate("user", "username fullName");

    if (!contact) {
      throw new ApiError(404, "Contact messages not found");
    }

    res.status(200).json(new ApiResponse(200, contact, "success"));
  } catch (error) {
    throw new ApiError(
      500,
      (error as Error)?.message || "could not get all contacts"
    );
  }
});

export { createContact, updateContactStatus, getContacts, getAllContacts };
