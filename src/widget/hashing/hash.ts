import { bytesToHex } from "@noble/hashes/utils.js";
import { hash_algorithms, type HashAlgorithmName } from "./algoithms";

// compute hash value based on selected algorithm and input string
export function computeHashHex(algorithm: string, input: string): string {
  const algo = (hash_algorithms as Record<
    string,
    ((d: Uint8Array) => Uint8Array) | undefined
  >)[algorithm];

  if (!algo) return "";
  if (!input) return "";

  try {
    const data = new TextEncoder().encode(input);
    return bytesToHex(algo(data));
  } catch {
    return "Error";
  }
}

export { hash_algorithms as HASH_ALGORITHMS };
export type { HashAlgorithmName };