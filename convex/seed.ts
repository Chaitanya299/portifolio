import { mutation } from "./_generated/server";
import { PORTFOLIO } from "../src/lib/portfolio-data";

export const seed = mutation({
  handler: async (ctx) => {
    // Clear existing docs
    const existing = await ctx.db.query("documents").collect();
    for (const doc of existing) {
      await ctx.db.delete(doc._id);
    }

    // Insert Bio
    await ctx.db.insert("documents", {
      title: "Bio",
      content: PORTFOLIO.bio,
      type: "bio",
    });

    // Insert Projects
    for (const project of PORTFOLIO.projects) {
      await ctx.db.insert("documents", {
        title: project.title,
        content: `${project.tagline}. ${project.description}. Built with: ${project.stack.join(", ")}.`,
        type: "project",
        metadata: { github: project.github },
      });
    }

    // Insert Skills
    await ctx.db.insert("documents", {
      title: "Technical Skills",
      content: "Languages: Python, Java, C. Databases: MySQL, PostgreSQL, MongoDB, Redis. DevOps: GitHub Actions, Jenkins, Docker, Kubernetes. Cloud: AWS, GCP.",
      type: "skill",
    });

    return "Database seeded successfully!";
  },
});
