import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  is_read: Scalars['Boolean'];
  receiver_id: Scalars['Float'];
  ride: Ride;
  sender_id: Scalars['Float'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRide: Ride;
  changePassword: UserResponse;
  createPost: Post;
  createRide: Ride;
  deletePost: Scalars['Boolean'];
  deleteRide: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendMessage: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
  updateRide: Ride;
};


export type MutationAcceptRideArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateRideArgs = {
  input: RideInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRideArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernameEmailPasswordInput;
};


export type MutationSendMessageArgs = {
  is_read: Scalars['Boolean'];
  receiver_id: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationUpdateRideArgs = {
  id: Scalars['Int'];
  input: RideInput;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type PaginatedRides = {
  __typename?: 'PaginatedRides';
  hasMore: Scalars['Boolean'];
  rides: Array<Ride>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  messages: PaginatedMessages;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  ride?: Maybe<Ride>;
  rides: PaginatedRides;
};


export type QueryMessagesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryRideArgs = {
  id: Scalars['Int'];
};


export type QueryRidesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Ride = {
  __typename?: 'Ride';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  from: Scalars['String'];
  id: Scalars['Float'];
  messages: Array<Message>;
  passengers: Array<Scalars['Int']>;
  remainingSeats: Scalars['Float'];
  seats: Scalars['Float'];
  to: Scalars['String'];
  updatedAt: Scalars['String'];
  when: Scalars['DateTime'];
};

export type RideInput = {
  from: Scalars['String'];
  seats: Scalars['Float'];
  to: Scalars['String'];
  when: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  avatar_source: Scalars['String'];
  car_plate: Scalars['String'];
  contact: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  isDriver: Scalars['Boolean'];
  ride: User;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernameEmailPasswordInput = {
  car_plate: Scalars['String'];
  contact: Scalars['String'];
  email: Scalars['String'];
  isDriver: Scalars['Boolean'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Error_DataFragment = { __typename?: 'FieldError', field: string, message: string };

export type Message_DataFragment = { __typename?: 'Message', id: number, sender_id: number, receiver_id: number, text: string, is_read: boolean, createdAt: string };

export type Post_DataFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, creatorId: number };

export type Ride_DataFragment = { __typename?: 'Ride', id: number, to: string, from: string, when: any, seats: number, remainingSeats: number, passengers: Array<number>, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, contact: string, car_plate: string } };

export type User_DataFragment = { __typename?: 'User', id: number, username: string, isDriver: boolean };

export type UserResponse_DataFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, isDriver: boolean } | null };

export type AcceptRideMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AcceptRideMutation = { __typename?: 'Mutation', acceptRide: { __typename?: 'Ride', id: number, to: string, from: string, when: any, seats: number, remainingSeats: number, passengers: Array<number>, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, contact: string, car_plate: string } } };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, isDriver: boolean } | null } };

export type CreateRideMutationVariables = Exact<{
  input: RideInput;
}>;


export type CreateRideMutation = { __typename?: 'Mutation', createRide: { __typename?: 'Ride', id: number, to: string, from: string, when: any, seats: number, remainingSeats: number, passengers: Array<number>, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, contact: string, car_plate: string } } };

export type DeleteRideMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRideMutation = { __typename?: 'Mutation', deleteRide: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, isDriver: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernameEmailPasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, isDriver: boolean } | null } };

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  receiver_id: Scalars['Int'];
  is_read: Scalars['Boolean'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UpdatePostMutationVariables = Exact<{
  title: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, creatorId: number } | null };

export type UpdateRideMutationVariables = Exact<{
  id: Scalars['Int'];
  input: RideInput;
}>;


export type UpdateRideMutation = { __typename?: 'Mutation', updateRide: { __typename?: 'Ride', id: number, to: string, from: string, when: any, seats: number, remainingSeats: number, passengers: Array<number>, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, contact: string, car_plate: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, isDriver: boolean } | null };

export type MessagesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'PaginatedMessages', hasMore: boolean, messages: Array<{ __typename?: 'Message', id: number, sender_id: number, receiver_id: number, text: string, is_read: boolean, createdAt: string }> } };

export type RideQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RideQuery = { __typename?: 'Query', ride?: { __typename?: 'Ride', id: number, to: string, from: string, when: any, seats: number, remainingSeats: number, passengers: Array<number>, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, contact: string, car_plate: string } } | null };

export type RidesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type RidesQuery = { __typename?: 'Query', rides: { __typename?: 'PaginatedRides', hasMore: boolean, rides: Array<{ __typename?: 'Ride', id: number, to: string, from: string, when: any, seats: number, remainingSeats: number, passengers: Array<number>, creatorId: number, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, username: string, contact: string, car_plate: string } }> } };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, sender_id: number, receiver_id: number, text: string, is_read: boolean, createdAt: string } };

export const Message_DataFragmentDoc = gql`
    fragment Message_Data on Message {
  id
  sender_id
  receiver_id
  text
  is_read
  createdAt
}
    `;
export const Post_DataFragmentDoc = gql`
    fragment Post_Data on Post {
  id
  createdAt
  updatedAt
  title
  text
  points
  creatorId
}
    `;
export const Ride_DataFragmentDoc = gql`
    fragment Ride_Data on Ride {
  id
  to
  from
  when
  seats
  remainingSeats
  creator {
    id
    username
    contact
    car_plate
  }
  passengers
  creatorId
  createdAt
  updatedAt
}
    `;
export const Error_DataFragmentDoc = gql`
    fragment Error_Data on FieldError {
  field
  message
}
    `;
export const User_DataFragmentDoc = gql`
    fragment User_Data on User {
  id
  username
  isDriver
}
    `;
export const UserResponse_DataFragmentDoc = gql`
    fragment UserResponse_Data on UserResponse {
  errors {
    ...Error_Data
  }
  user {
    ...User_Data
  }
}
    ${Error_DataFragmentDoc}
${User_DataFragmentDoc}`;
export const AcceptRideDocument = gql`
    mutation acceptRide($id: Int!) {
  acceptRide(id: $id) {
    ...Ride_Data
  }
}
    ${Ride_DataFragmentDoc}`;

export function useAcceptRideMutation() {
  return Urql.useMutation<AcceptRideMutation, AcceptRideMutationVariables>(AcceptRideDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponse_Data
  }
}
    ${UserResponse_DataFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateRideDocument = gql`
    mutation CreateRide($input: RideInput!) {
  createRide(input: $input) {
    ...Ride_Data
  }
}
    ${Ride_DataFragmentDoc}`;

export function useCreateRideMutation() {
  return Urql.useMutation<CreateRideMutation, CreateRideMutationVariables>(CreateRideDocument);
};
export const DeleteRideDocument = gql`
    mutation deleteRide($id: Int!) {
  deleteRide(id: $id)
}
    `;

export function useDeleteRideMutation() {
  return Urql.useMutation<DeleteRideMutation, DeleteRideMutationVariables>(DeleteRideDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResponse_Data
  }
}
    ${UserResponse_DataFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernameEmailPasswordInput!) {
  register(options: $options) {
    ...UserResponse_Data
  }
}
    ${UserResponse_DataFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendMessageDocument = gql`
    mutation sendMessage($text: String!, $receiver_id: Int!, $is_read: Boolean!) {
  sendMessage(text: $text, receiver_id: $receiver_id, is_read: $is_read)
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($title: String!, $id: Int!) {
  updatePost(title: $title, id: $id) {
    ...Post_Data
  }
}
    ${Post_DataFragmentDoc}`;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateRideDocument = gql`
    mutation updateRide($id: Int!, $input: RideInput!) {
  updateRide(id: $id, input: $input) {
    ...Ride_Data
  }
}
    ${Ride_DataFragmentDoc}`;

export function useUpdateRideMutation() {
  return Urql.useMutation<UpdateRideMutation, UpdateRideMutationVariables>(UpdateRideDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...User_Data
  }
}
    ${User_DataFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const MessagesDocument = gql`
    query Messages($limit: Int!, $cursor: String) {
  messages(limit: $limit, cursor: $cursor) {
    hasMore
    messages {
      ...Message_Data
    }
  }
}
    ${Message_DataFragmentDoc}`;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<MessagesQuery, MessagesQueryVariables>({ query: MessagesDocument, ...options });
};
export const RideDocument = gql`
    query Ride($id: Int!) {
  ride(id: $id) {
    ...Ride_Data
  }
}
    ${Ride_DataFragmentDoc}`;

export function useRideQuery(options: Omit<Urql.UseQueryArgs<RideQueryVariables>, 'query'>) {
  return Urql.useQuery<RideQuery, RideQueryVariables>({ query: RideDocument, ...options });
};
export const RidesDocument = gql`
    query Rides($limit: Int!, $cursor: String) {
  rides(limit: $limit, cursor: $cursor) {
    hasMore
    rides {
      ...Ride_Data
    }
  }
}
    ${Ride_DataFragmentDoc}`;

export function useRidesQuery(options: Omit<Urql.UseQueryArgs<RidesQueryVariables>, 'query'>) {
  return Urql.useQuery<RidesQuery, RidesQueryVariables>({ query: RidesDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    ...Message_Data
  }
}
    ${Message_DataFragmentDoc}`;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};