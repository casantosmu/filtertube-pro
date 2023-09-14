type SerializablePrimitives = string | number | boolean | null;

type Serializable =
  | SerializablePrimitives
  | Record<string | number, SerializablePrimitives>
  | SerializablePrimitives[];

export default Serializable;
