import { Message } from "../entitites/Message";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { IsAuth } from "../middlewares/isAuth";
import { dataSource } from "../constants";

@ObjectType()
class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];
  @Field()
  hasMore: boolean;
}
@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(IsAuth)
  async sendMessage(
    @Arg("receiver_id", () => Int) receiver_id: number,
    @Arg("text", () => String) text: string,
    @Arg("is_read", () => Boolean) is_read: boolean,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const msg = await Message.create({
      sender_id: req.session.userId,
      receiver_id: receiver_id,
      is_read: is_read,
      text: text,
    }).save();

    const payload = { message: msg };
    await pubSub.publish("MESSAGES", payload);

    console.log(msg.createdAt);

    return true;
  }

  @Subscription(() => Message || null, { topics: "MESSAGES" })
  newMessage(
    @Root() messagePayload: { message: Message },
    @Ctx() { req }: MyContext
  ): Message | null {
    if (
      messagePayload.message.sender_id == req.session.userId ||
      messagePayload.message.receiver_id == req.session.userId
    ) {
      return messagePayload.message;
    }
    return null;
  }

  @Query(() => PaginatedMessages)
  async messages(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedMessages> {
    const capLimit = Math.min(50, limit);
    const reaLimitPlusOne = capLimit + 1;
    const qb = dataSource
      .getRepository(Message)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);
    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const messages = await qb.getMany();

    return {
      messages: messages.slice(0, capLimit),
      hasMore: messages.length === reaLimitPlusOne,
    };
  }
}
