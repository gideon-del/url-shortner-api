import { Request, Response } from "express";

import prisma from "./prisma";

async function createShortUrl(req: Request, res: Response) {
  try {
    const { nanoid } = await import("nanoid");
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        message: `Url is Required`,
      });
    }
    const existingUrl = await prisma.uRL.findFirst({
      where: {
        url,
      },
    });
    if (existingUrl) {
      return res.status(200).json({
        url,
        shortUrl: existingUrl.shortUrl,
        shortId: existingUrl.shortId,
      });
    }
    let id = nanoid(6);
    while (true) {
      const idExists = await prisma.uRL.findFirst({
        where: {
          shortId: id,
        },
      });
      if (!idExists) {
        break;
      }
      id = nanoid(6);
    }
    const shortUrlDb = await prisma.uRL.create({
      data: {
        url,
        shortUrl: `http://${req.headers.host}/${id}`,
        shortId: id,
      },
    });
    return res.status(201).json(shortUrlDb);
  } catch (error) {
    console.log(error);
  }
}
async function redirectUrl(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const existingUrl = await prisma.uRL.findFirst({
      where: {
        shortId,
      },
    });
    if (!existingUrl) {
      return res.status(404).json({
        message: "Invalid Link",
      });
    }
    await prisma.uRL.update({
      where: {
        shortId,
      },
      data: {
        accessCount: existingUrl.accessCount + 1,
      },
    });
    return res.redirect(existingUrl.url);
  } catch (error) {
    console.log(error);
  }
}

async function getUrlStatistics(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const existingUrl = await prisma.uRL.findFirst({
      where: {
        shortId,
      },
    });
    if (!existingUrl) {
      return res.status(404).json({
        message: "Url Not Found",
      });
    }
    return res.status(200).json(existingUrl);
  } catch (error) {}
}
export { createShortUrl, redirectUrl, getUrlStatistics };
