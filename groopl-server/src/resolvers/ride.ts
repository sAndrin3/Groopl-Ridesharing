import { Ride } from "../entitites/Ride";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IsAuth } from "../middlewares/isAuth";
import { User } from "../entitites/User";
import { dataSource } from "../constants";
import { createUserLoader } from "../utils/createUserLoader";

@InputType()
class RideInput {
  @Field()
  to: string;

  @Field()
  from: string;

  @Field()
  when: Date;

  @Field()
  seats: number;
}

@ObjectType()
class PaginatedRides {
  @Field(() => [Ride])
  rides: Ride[];
  @Field()
  hasMore: boolean;
}

@Resolver(Ride)
export class RideResolver {
  @FieldResolver(() => User)
  async creator(@Root() ride: Ride) {
    console.log(ride.creatorId);
    const user = await createUserLoader.load(ride.creatorId);
    console.log(user);
    return user;
  }

  @Mutation(() => Ride)
  @UseMiddleware(IsAuth)
  async createRide(
    @Arg("input", () => RideInput) input: RideInput,
    @Ctx() { req }: MyContext
  ): Promise<Ride> {
    input.seats = parseFloat(input.seats.toString());
    const remainingSeats = parseFloat(input.seats.toString());
    return Ride.create({
      ...input,
      creatorId: req.session.userId,
      remainingSeats: remainingSeats,
      passengers: [],
    }).save();
  }

  @Query(() => PaginatedRides)
  async rides(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedRides> {
    const capLimit = Math.min(50, limit);
    const reaLimitPlusOne = capLimit + 1;
    const qb = dataSource
      .getRepository(Ride)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);
    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const rides = await qb.getMany();

    return {
      rides: rides.slice(0, capLimit),
      hasMore: rides.length === reaLimitPlusOne,
    };
  }

  @Query(() => Ride, { nullable: true })
  ride(@Arg("id", () => Int) id: number): Promise<Ride | null> {
    return Ride.findOne({ where: { id } });
  }

  @Mutation(() => Ride)
  async updateRide(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => RideInput) input: RideInput
  ) {
    const ride = await Ride.update({ id: id }, { ...input });
    return ride;
  }

  @Mutation(() => Ride)
  async acceptRide(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const ride = await Ride.findOne({ where: { id: id } });
    const user_id = req.session.userId!
    if (ride?.remainingSeats! > 0 && !ride?.passengers?.includes(user_id)) {
      ride?.passengers!.push(user_id);
      const users = ride?.passengers!;
      const remainingSeats = ride?.remainingSeats! - 1;
      await Ride.update(
        { id: id },
        { remainingSeats: remainingSeats, passengers: users }
      );
      return ride;
    }
    return ride;
  }

  @Mutation(() => Boolean)
  async deleteRide(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Ride.delete({ id });
    return true;
  }
}
