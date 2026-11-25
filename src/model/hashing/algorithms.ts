import { sha256, sha384, sha512 } from "@noble/hashes/sha2.js";
import { sha3_256, keccak_256 } from "@noble/hashes/sha3.js";
import { sha1 } from "@noble/hashes/legacy.js";
import { blake3 } from "@noble/hashes/blake3.js";

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

/** The names of the algorithms as people write them. */
export const hash_algorithm_labels: Record<string, string> = {
  sha1: "SHA-1",
  sha256: "SHA-256",
  sha384: "SHA-384",
  sha512: "SHA-512",
  sha3_256: "SHA3-256",
  keccak_256: "Keccak-256",
  blake3: "BLAKE3",
};
