import * as z from "zod";

const str = () => z.string().trim();

const number = () => z.coerce.number<string | number>();

const email = () =>
  z
    .email({
      error: (issue) => (!issue.input ? "Email is required" : "Invalid email"),
    })
    .trim()
    .toLowerCase();

const nonEmptyNumber = (name: string, schema: z.ZodNumber) => {
  return str()
    .min(1, `${name} is required`)
    .transform(Number)
    .pipe(schema)
    .or(schema);
};

export const regex = {
  youTube:
    /^(?:(?:https?:\/\/)?(?:www\.|m\.|live\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11}))/,
};

export const isUserName = (userName: string): boolean => {
  const hasLetter = /[A-Za-z]/.test(userName);
  if (!hasLetter) return false;
  const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(userName);
  return isAlphanumeric;
};

const username = () =>
  str()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be maximum 20 characters")
    .toLowerCase()
    .refine((val) => isUserName(val), {
      message: "Username must contain alphabets or alphanumeric",
    });

const password = (name: string = "Password") =>
  str()
    .min(1, `${name} is required`)
    .min(6, `${name} must be at least ${6} characters`);

type StripProtobufMeta<T> = T extends (infer U)[]
  ? StripProtobufMeta<U>[]
  : T extends object
    ? {
        [K in keyof T as K extends "$typeName" | "$unknown"
          ? never
          : K]: StripProtobufMeta<T[K]>;
      }
    : T;

type ExtraKeys<TSchema, TModel> = Exclude<keyof TSchema, keyof TModel>;

type ThrowIfExtraKeys<TSchema, TModel> =
  ExtraKeys<TSchema, TModel> extends never ? unknown : { [key: string]: never };

type ProtobufInput<T> = StripProtobufMeta<T>;

export function withZodSchema<T>() {
  return <
    TSchema extends {
      [K in keyof ProtobufInput<T>]: z.ZodType<ProtobufInput<T>[K]>;
    } & ThrowIfExtraKeys<TSchema, ProtobufInput<T>>,
  >(
    schema: TSchema,
  ): z.ZodObject<TSchema> => {
    return z.object(schema);
  };
}

export const ZOD_SCHEMA = {
  str,
  number,
  nonEmptyNumber,
  email,
  username,
  password,
};
