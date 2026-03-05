import { sha256, sha384, sha512 } from "@noble/hashes/sha2";
import { sha3_256, keccak_256 } from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/legacy";
import { blake3 } from "@noble/hashes/blake3";

// supported algorithms
export const hash_algorithms: Record<string, (data: Uint8Array) => Uint8Array> = {
  sha1,
  sha256,
  sha384,
  sha512,
  sha3_256,
  keccak_256,
  blake3,
};

export type HashAlgorithmName = keyof typeof hash_algorithms;