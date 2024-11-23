import prisma from "../lib/prisma.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const whereClause = {};

    if (query.city !== "undefined") {
      whereClause.city = query.city;
    }

    const posts = await prisma.post.findMany({
      where: {
        ...whereClause,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        title: query.title ? { contains: query.title } : undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
        isFlagged: false,
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPostsAdmin = async (req, res) => {
  const query = req.query;
  try {
    const whereClause = {};

    if (query.city !== "undefined") {
      whereClause.city = query.city;
    }

    const posts = await prisma.post.findMany({
      where: {
        ...whereClause,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        title: query.title ? { contains: query.title } : undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  let postId = parseInt(req.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        postDetail: true,
        user: { select: { username: true, avatar: true } },
        images: true,
      },
    });

    let userId = null;

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: postId,
                userId: payload.id,
              },
            },
          });
          return res
            .status(200)
            .json({ ...post, isSaved: saved ? true : false });
        } else {
          // Handle error case if needed
          return res
            .status(400)
            .json({ message: "Token verification failed." });
        }
      });
    } else {
      // If no token is provided
      return res.status(200).json({ ...post, isSaved: false });
    }

    // if (token) {
    //   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    //     if (!err) {
    //       const saved = await prisma.savedPost.findUnique({
    //         where: {
    //           userId_postId: {
    //             postId: postId,
    //             userId: payload.id,
    //           },
    //         },
    //       });
    //       return res
    //         .status(200)
    //         .json({ ...post, isSaved: saved ? true : false });
    //     }
    //   });
    // }

    // res.status(200).json({ ...post, isSaved: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post." });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  console.log(req.userId);

  try {
    const imagesWithPostId = body.images.map((image) => ({
      ...image,
    }));

    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
        images: {
          create: imagesWithPostId,
        },
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

export const updatePost = async (req, res) => {
  let postId = parseInt(req.params.id);
  let tokenUserId = req.userId;
  const body = req.body;

  console.log(req.body);

  const imagesWithPostId = body.images.map((image) => ({
    url: image.url,
  }));

  console.log(imagesWithPostId);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized." });
    }

    await prisma.image.deleteMany({
      where: { postId: postId },
    });

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...body,
        images: {
          create: imagesWithPostId,
        },
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post." });
  }
};

export const deletePost = async (req, res) => {
  let postId = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized." });
    }

    await prisma.post.delete({
      where: { id: parseInt(postId) },
    });

    res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};
