import { randomBytes } from 'node:crypto';
import { assertLen, assertString } from './assert';

const UUID_V4_VERSION_BYTE = 0x40;
const UUID_BITS = 128;
const UUID_STRING_LENGTH = 36;

function byteToHex(byte: number): string {
  return byte.toString(16).padStart(2, '0');
}

export function uuid_v4(): string {
  const rb = randomBytes(UUID_BITS / 8);
  rb[6] = (rb[6] & 0x0f) | UUID_V4_VERSION_BYTE;
  rb[8] = (rb[8] & 0x3f) | 0x80;
  const result =
    byteToHex(rb[0]) +
    byteToHex(rb[1]) +
    byteToHex(rb[2]) +
    byteToHex(rb[3]) +
    '-' +
    byteToHex(rb[4]) +
    byteToHex(rb[5]) +
    '-' +
    byteToHex(rb[6]) +
    byteToHex(rb[7]) +
    '-' +
    byteToHex(rb[8]) +
    byteToHex(rb[9]) +
    '-' +
    byteToHex(rb[10]) +
    byteToHex(rb[11]) +
    byteToHex(rb[12]) +
    byteToHex(rb[13]) +
    byteToHex(rb[14]) +
    byteToHex(rb[15]);
  assertString(result);
  assertLen(result, UUID_STRING_LENGTH);
  return result;
}
