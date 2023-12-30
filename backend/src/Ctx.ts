import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ctx = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx,
);
