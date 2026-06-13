import type { User } from "./types";

// Toggle between employee and manager to practice role-gated UI.
// In an interview, mention you'd replace this with real auth context.
export const currentUser: User = {
  id: "u3",
  name: "Sam Rivera",
  role: "manager",
};

// export const currentUser: User = {
//   id: "u1",
//   name: "Alex Chen",
//   role: "employee",
// };
