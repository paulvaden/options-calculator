// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { z } from "zod";
import { prisma } from "../db/client";
import { calculate } from "../../pages/api/backtest";

export const appRouter = createRouter()
  .transformer(superjson)
  .mutation("backtest", {
    input: z.object({
      vaultStrategy: z.object({}),
      strikeStrategy: z.object({}),
      hedgeStrategy: z.object({})
    }),
    async resolve({ input }) {
      const { vaultStrategy, strikeStrategy, hedgeStrategy } = input;
      const aprs = calculate(vaultStrategy, strikeStrategy, hedgeStrategy);
      return { aprs };
    },
  })
  .mutation("register-user", {
    input: z.object({
      email: z.string()
    }),
    async resolve({ input }) {
      const emailInDb = await prisma.user.create({
        data: {
          email: input.email,
        },
      });
      return { success: true, emailInDb };
    },
  });


// export type definition of API
export type AppRouter = typeof appRouter;