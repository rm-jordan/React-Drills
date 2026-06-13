/**
 * SESSION 1 — Update + nested comment routes
 * TODO: GET/POST/PATCH/DELETE /api/updates
 *       GET/POST /api/updates/:id/comments
 * Reference: ../../../server/src/routes/updates.ts
 */

import { Router } from "express";
import { comments, findUser, generateCommentId, generateUpdateId, updates } from "../store.js";
import { validateCreateComment, validateCreateUpdate, validatePatchUpdate } from "../validation.js";
import type { Comment, Update } from "../types.js";

export const updatesRouter = Router();

// TODO: updatesRouter.get("/")
updatesRouter.get("/", (_req, res) => {
    const sorted = [...updates].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(sorted);
  });

// TODO: updatesRouter.get("/:id")
updatesRouter.get("/:id", (req,res) => {
    const update = updates.find((u) => u.id === req.params.id)
    if (!update) {
        res.status(404).json({error: "Update has not been found"})
        return
    }
    res.json(update)
})



// TODO: updatesRouter.post("/")
updatesRouter.post("/" , (req,res) => {
    const result = validateCreateUpdate(req.body)
    if(!result.ok) {
        res.status(400).json({ error: "This userId does not exist"})
        return
    }

    const newUpdate: Update = {
        id: generateUpdateId(),
        userId: result.data.userId,
        title: result.data.title,
        body: result.data.body,
        status: "pending",
        blockers: result.data.blockers,
        createdAt: new Date().toISOString(),
    }
    updates.push(newUpdate)
    res.status(201).json(newUpdate)
})

// TODO: updatesRouter.patch("/:id")
updatesRouter.patch("/:id", (req, res) => {
    const index = updates.findIndex((u) => u.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "Update not found" });
      return;
    }
  
    const result = validatePatchUpdate(req.body);
    if (!result.ok) {
      res.status(400).json({ error: result.error });
      return;
    }
  
    const current = updates[index];
    const patched: Update = {
      ...current,
      ...result.data,
    };
  
    if (patched.status === "blocked" && !patched.blockers.trim()) {
      res.status(400).json({ error: "blockers required when status is blocked" });
      return;
    }
  
    updates[index] = patched;
    res.json(patched);
  });

// TODO: updatesRouter.delete("/:id")
updatesRouter.delete("/:id", (req, res) => {
    const index = updates.findIndex((u) => u.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "Update not found" });
      return;
    }
  
    const [removed] = updates.splice(index, 1);
  
    // Remove nested comments for this update
    for (let i = comments.length - 1; i >= 0; i--) {
      if (comments[i].updateId === removed.id) {
        comments.splice(i, 1);
      }
    }
  
    res.json(removed);
  });
// TODO: updatesRouter.get("/:id/comments")
updatesRouter.get("/:id/comments", (req, res) => {
    const update = updates.find((u) => u.id === req.params.id);
    if (!update) {
      res.status(404).json({ error: "Update not found" });
      return;
    }
  
    const updateComments = comments
      .filter((c) => c.updateId === update.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
    res.json(updateComments);
  });
// TODO: updatesRouter.post("/:id/comments")
updatesRouter.post("/:id/comments", (req, res) => {
    const update = updates.find((u) => u.id === req.params.id);
    if (!update) {
      res.status(404).json({ error: "Update not found" });
      return;
    }
  
    const result = validateCreateComment(req.body);
    if (!result.ok) {
      res.status(400).json({ error: result.error });
      return;
    }
  
    const user = findUser(result.data.userId);
    if (!user) {
      res.status(400).json({ error: "userId does not exist" });
      return;
    }
  
    const newComment: Comment = {
      id: generateCommentId(),
      updateId: update.id,
      userId: result.data.userId,
      text: result.data.text,
      createdAt: new Date().toISOString(),
    };
  
    comments.push(newComment);
    res.status(201).json(newComment);
  });
