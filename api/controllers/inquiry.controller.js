import prisma from "../lib/prisma.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const getInquiries = async (req, res) => {
  try {
    const query = req.query;

    const inquiries = await prisma.inquiry.findMany({
      where: {
        subject: query.inquiry || undefined,
        seen:
          query.seen === "true"
            ? true
            : query.seen === "false"
            ? false
            : undefined,
      },
      orderBy: {
        sentAt: query.date == "latest" ? "asc" : "desc",
      },
    });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to get inquiries." });
  }
};

export const getInquiry = async (req, res) => {
  let inquiryId = parseInt(req.params.id);
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: {
        id: inquiryId,
      },
    });

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to get inquiry." });
  }
};

export const sendInquiry = async (req, res) => {
  try {
    const body = req.body;

    const newInquiry = await prisma.inquiry.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        subject: body.subject,
        message: body.message,
      },
    });

    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to send inquiry." });
  }
};

export const updateInquiry = async (req, res) => {
  const body = req.body;
  let inquiryId = parseInt(req.params.id);
  try {
    const updatedInquiry = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: {
        seen: body.seen,
      },
    });

    res.status(200).json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry." });
  }
};
