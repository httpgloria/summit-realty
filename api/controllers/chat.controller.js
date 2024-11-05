import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          array_contains: tokenUserId,
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats." });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: parseInt(req.params.id),
        userIDs: {
          array_contains: tokenUserId,
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    res.status(200).json(chat);

    let updatedSeenBy;

    if (!chat.seenBy) {
      updatedSeenBy = [tokenUserId];
    } else {
      chat.seenBy.push(tokenUserId);
      updatedSeenBy = chat.seenBy;
    }

    await prisma.chat.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        seenBy: updatedSeenBy,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat." });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
        seenBy: [],
      },
    });

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats." });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: parseInt(req.params.id),
        userIDs: {
          array_contains: tokenUserId,
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    let updatedSeenBy;
    // console.log(tokenUserId);
    // console.log(chat.seenBy);
    // console.log(typeof chat.seenBy);

    if (!chat.seenBy) {
      updatedSeenBy = [tokenUserId];
    } else {
      chat.seenBy.push(tokenUserId);
      updatedSeenBy = chat.seenBy;
    }

    const updatedChat = await prisma.chat.update({
      where: {
        id: parseInt(req.params.id),
        userIDs: {
          array_contains: tokenUserId,
        },
      },
      data: {
        seenBy: updatedSeenBy,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    res.status(200).json(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats." });
  }
};
