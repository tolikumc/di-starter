import generator from 'generate-pincode';

export async function generateVerificationKey(): Promise<string> {
  const verificationCodeLength = Number(process.env.VERIFICATION_CODE_LENGTH);
  return await generator(verificationCodeLength);
}
