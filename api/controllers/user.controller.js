import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const query = req.query;
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: query.date == "oldest" ? "asc" : "desc",
      },
      where: { username: query.username || undefined },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users." });
  }
};

export const getUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user." });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const tokenUserId = req.userId;
  const isAdmin = req.isAdmin;
  const { password, avatar, ...inputs } = req.body;

  // console.log(isAdmin);

  if (id !== tokenUserId && !isAdmin) {
    return res.status(403).json({ message: "Not authorized." });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user." });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized." });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savePost.id,
        },
      });

      return res.status(200).json({ message: "Post removed from saved." });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId: postId,
        },
      });
      return res.status(200).json({ message: "Post saved." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save post." });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    console.log("PROFILE POST USER ID:", tokenUserId);
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
      include: {
        images: true,
      },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: {
          include: {
            images: true,
          },
        },
      },
    });

    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts." });
  }
};

export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          array_contains: tokenUserId,
        },
        NOT: {
          seenBy: {
            array_contains: tokenUserId,
          },
        },
      },
    });

    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts." });
  }
};
