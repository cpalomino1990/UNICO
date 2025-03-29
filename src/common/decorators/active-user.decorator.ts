import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest<{ user?: { id: string; name: string; email: string } }>();
    return request.user ?? null;
})

